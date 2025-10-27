package com.example.blockchain.service;

import com.example.blockchain.Repository.BlockRepository;
import com.example.blockchain.Repository.BlockchainMetaRepository;
import com.example.blockchain.Repository.TransactionRepository;
import com.example.blockchain.model.Block;
import com.example.blockchain.model.BlockchainMeta;
import com.example.blockchain.model.Transaction;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class BlockchainService {
    private final BlockRepository blockRepository;
    private final TransactionRepository transactionRepository;
    private final BlockchainMetaRepository metaRepository;

    //in-memory pending pool
    private final List<Transaction> pendingTransactions = new ArrayList<>();
    private final ReentrantLock lock = new ReentrantLock();   //work as a door lock to allow one thread at a time.

    public BlockchainService(BlockRepository blockRepository, TransactionRepository transactionRepository, BlockchainMetaRepository metaRepository){
        this.blockRepository = blockRepository;
        this.transactionRepository = transactionRepository;
        this.metaRepository = metaRepository;

        //Ensure meta exists with defaults if not present
        if (metaRepository.count() != 0){
            BlockchainMeta meta = new BlockchainMeta();
            meta.setDifficulty(3);
            meta.setMiningReward(50.0);
            meta.setLatestIndex(0);
            metaRepository.save(meta);
        }
    }

    // Add transaction to both pending pool and transaction collection
    public Transaction addTransaction(Transaction tx){
        if (tx.getSender() == null || tx.getRecipient() == null){
            throw new IllegalArgumentException("Transaction must have sender and recipient");

        }
        if (tx.getAmount() <= 0){
            throw new IllegalArgumentException("Amount must be positive");
        }
        lock.lock();
        try{
            Transaction saved = transactionRepository.save(tx);
            pendingTransactions.add(saved);
            return saved;
        }finally {
            lock.unlock();
        }
    }

    // Return pending transactions copy
    public List<Transaction> getPendingTransactions(){
        lock.lock();
        try {
            return new ArrayList<>(pendingTransactions);
        }finally {
            lock.unlock();
        }
    }

    //Return full chain ordered by index asc
    public List<Block> getChain(){
        return blockRepository.findAll(Sort.by(Sort.Direction.ASC, "index"));
    }

    //compute balance by scanning persisted blocks (committed)
    public double getBalance(String address){
        double balance = 0.0;
        List<Block> chain = getChain();
        for (Block block: chain){
            if (block.getTransactions() == null) continue;
            for (Transaction tx: block.getTransactions()){
                if (address.equals(tx.getRecipient())) balance += tx.getAmount();
                if (address.equals(tx.getSender())) balance -= tx.getAmount();
            }
        }
        return balance;
    }

    //Mine pending transactions: create reward tx, create block, run Pow, save block
    public Block minePendingTransaction(String minerAddress){
        lock.lock();
        try{
            if (minerAddress == null || minerAddress.isBlank()){
                throw new IllegalArgumentException("Miner address required");
            }
            BlockchainMeta meta = metaRepository.findAll().stream().findFirst().orElseThrow();
            int difficulty = meta.getDifficulty();
            double reward = meta.getMiningReward();

            //Add reward transaction to pending list (persist it)
            Transaction rewardTx = new Transaction("SYSTEM", minerAddress, reward);
            rewardTx = transactionRepository.save(rewardTx);
            pendingTransactions.add(rewardTx);

            // Build new block using pending transactions snapshot
            List<Transaction> txsForBlock = new ArrayList<>(pendingTransactions);

            //get latest block hash and index
            Optional<Block> latest = blockRepository.findTopByOrderByIndexDesc();
            String previousHash = latest.map(Block::getHash).orElse("0");
            int nextIndex = latest.map(b -> b.getIndex()+1).orElse(0);

            Block newBlock = new Block();
            newBlock.setIndex(nextIndex);
            newBlock.setTimestamp(System.currentTimeMillis());
            newBlock.setTransactions(txsForBlock);
            newBlock.setNonce(0);
            newBlock.setPreviousHash(previousHash);

            //Do PoW (blocking). Keep the PoW method simple here.
            mineBlock(newBlock, difficulty);

            //save block and clear pending pool
            Block savedBlock = blockRepository.save(newBlock);

            //update meta.latestIndex
            meta.setLatestIndex(savedBlock.getIndex());
            metaRepository.save(meta);

            //clear pendingTransactions but keep persisted transactions (they are in tx collection)
            pendingTransactions.clear();

            return savedBlock;
        }finally {
            lock.unlock();
        }
    }

    //Simple PoW: adjust nonce until hash has difficulty leading zeros
    private void mineBlock(Block block, int difficulty){
        String target = "0".repeat(Math.max(0, difficulty));
        block.setHash(calculateHashForBlock(block));
        while (block.getHash() == null || !block.getHash().substring(0, difficulty).equals(target)){
            block.setNonce(block.getNonce()+1);
            block.setHash(calculateHashForBlock(block));
        }
    }

    // Basic SHA-256 calculation - identical logic as in your Block.calculateHash (but here accessible)
    private String calculateHashForBlock(Block block){
        try {
            StringBuilder sb = new StringBuilder();
            sb.append(block.getIndex())
                    .append(block.getTimestamp())
                    .append(block.getTransactions() == null ? "": block.getTransactions().toString())
                    .append(block.getNonce())
                    .append(block.getPreviousHash() == null? "": block.getPreviousHash());

            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(sb.toString().getBytes("UTF-8"));
            StringBuilder hex = new StringBuilder();
            for (byte b: hashBytes){
                String h = Integer.toHexString(0xff & b);
                if (h.length() == 1) hex.append('0');
                hex.append(h);
            }
            return hex.toString();
        }catch (Exception e){
            throw new RuntimeException("Error computing hash", e);
        }
    }

    //Basic chain validation using persisted chain
    public boolean isChainValid(){
        List<Block> chain = getChain();
        if (chain.isEmpty()) return true;
        BlockchainMeta meta = metaRepository.findAll().stream().findFirst().orElse(new BlockchainMeta());
        int difficulty = meta.getDifficulty();

        for (int i = 1; i < chain.size(); i++){
            Block current = chain.get(i);
            Block previous = chain.get(i-1);

            String recalculated = calculateHashForBlock(current);
            if (!recalculated.equals(current.getHash())) return false;
            if (!Objects.equals(current.getPreviousHash(), previous.getHash())) return false;
            String target = "0".repeat(Math.max(0, difficulty));
            if (!current.getHash().substring(0, difficulty).equals(target)) return false;
        }
        return true;
    }
}
