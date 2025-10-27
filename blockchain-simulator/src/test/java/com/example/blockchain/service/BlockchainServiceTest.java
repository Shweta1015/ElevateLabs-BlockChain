package com.example.blockchain.service;

import com.example.blockchain.Repository.BlockRepository;
import com.example.blockchain.Repository.BlockchainMetaRepository;
import com.example.blockchain.Repository.TransactionRepository;
import com.example.blockchain.model.Block;
import com.example.blockchain.model.BlockchainMeta;
import com.example.blockchain.model.Transaction;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;            // <<-- static import for when(), any(), verify(), etc.
import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;

public class BlockchainServiceTest {
    @Mock
    private BlockRepository blockRepository;
    @Mock
    private TransactionRepository transactionRepository;
    @Mock
    private BlockchainMetaRepository metaRepository;

    @InjectMocks
    private BlockchainService service;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);

        BlockchainMeta meta = new BlockchainMeta();
        meta.setDifficulty(2);
        meta.setMiningReward(10.0);
        meta.setLatestIndex(0);
        when(metaRepository.findAll()).thenReturn(List.of(meta));
    }

    @Test
    void addTransaction_shouldSaveAndReturnTransaction(){
        Transaction tx = new Transaction("alice", "bob", 1000);
        when(transactionRepository.save(any(Transaction.class))).thenAnswer(invocation -> {
            Transaction t = invocation.getArgument(0, Transaction.class); // << typed getArgument
            t.setId("txt");
            return t;
        });

        Transaction saved = service.addTransaction(tx);
        verify(transactionRepository, times(1)).save(any(Transaction.class));
        assertThat(saved.getSender()).isEqualTo("alice");
        assertThat(service.getPendingTransactions()).isNotEmpty();
    }

    void minePendingTransaction_shouldCreateBlockAndClearPending() {
        //pre-populate pending via addTransaction
        Transaction tx = new Transaction("a", "b", 100.0);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(tx);
        service.addTransaction(tx);

        //latest block
        Block genesis = new Block();
        genesis.setIndex(0);
        genesis.setHash("0");
        when(blockRepository.findTopByOrderByIndexDesc()).thenReturn(Optional.of(genesis));

        // when saving block, return with same fields (simulate db save)
        when(blockRepository.save(any(Block.class))).thenAnswer(invocation ->{
            Block b = invocation.getArgument(0);
            b.setId(UUID.randomUUID().toString());
            return b;
        });

        Block mined = service.minePendingTransaction("miner1");

        assertThat(mined).isNotNull();
        assertThat(mined.getIndex()).isGreaterThanOrEqualTo(1);

        //pendingTransactions inside service should be cleared
        assertThat(service.getPendingTransactions()).isEmpty();
    }
}
