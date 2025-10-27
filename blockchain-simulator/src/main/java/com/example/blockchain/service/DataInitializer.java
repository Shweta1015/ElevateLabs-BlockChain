package com.example.blockchain.service;

import com.example.blockchain.Repository.BlockRepository;
import com.example.blockchain.Repository.BlockchainMetaRepository;
import com.example.blockchain.Repository.TransactionRepository;
import com.example.blockchain.model.Block;
import com.example.blockchain.model.BlockchainMeta;
import com.example.blockchain.model.Transaction;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    @Autowired
    private BlockRepository blockRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private BlockchainMetaRepository metaRepository;

    @PostConstruct
    public void init(){
        //  Ensure transactions collection has at least one document
        if (transactionRepository.count() == 0){
            Transaction sampleTx = new Transaction();
            sampleTx.setSender("System");
            sampleTx.setRecipient("genesis-address");
            sampleTx.setAmount(100.0);
            transactionRepository.save(sampleTx);
            System.out.println("Sample transaction saved -> 'transactions' collection created.");
        }

        // Ensure blocks collection has genesis block
        if (blockRepository.count() == 0){
            Block genesis = new Block();
            genesis.setIndex(0);
            genesis.setTimestamp(System.currentTimeMillis());
            genesis.setNonce(0);
            genesis.setPreviousHash("0");
            genesis.setHash("0");
            blockRepository.save(genesis);
            System.out.println("Genesis block saved -> 'blocks' collection created.");
        }

        //Ensure blockchain_meta collection has a meta document
        if (metaRepository.count() == 0){
            BlockchainMeta meta = new BlockchainMeta();
            meta.setDifficulty(3);
            meta.setMiningReward(50.0);
            meta.setLatestIndex(0);
            metaRepository.save(meta);
            System.out.println("Blockchain meta saved -> 'blockchain_meta' collection created.");
        }
    }
}
