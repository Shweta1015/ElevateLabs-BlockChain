package com.example.blockchain.controller;

import com.example.blockchain.model.Block;
import com.example.blockchain.model.Transaction;
import com.example.blockchain.service.BlockchainService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = BlockchainController.class)
public class BlockchainControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private BlockchainService service;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockConfig{
        @Bean
        public BlockchainService blockchainService(){
            return org.mockito.Mockito.mock(BlockchainService.class);
        }
    }

    @Test
    void addTransactionEndPoint_returnSavedTransaction() throws Exception{
        Transaction tx = new Transaction("alice", "bob", 200);
        tx.setId("txt1");
        when(service.addTransaction(org.mockito.Mockito.any(Transaction.class))).thenReturn(tx);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/transactions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(tx))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sender").value("alice"))
                .andExpect(jsonPath("$.recipient").value("bob"));
    }

    @Test
    void mineEndpoint_returnMinedBlock() throws Exception {
        Block b = new Block();
        b.setIndex(1);
        b.setHash("000abc");
        when(service.minePendingTransaction("miner1")).thenReturn(b);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/mine")
                        .param("minerAddress", "miner1")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.index").value(1))
                .andExpect(jsonPath("$.hash").value("000abc"));
    }

    @Test
    void getChain_returnList() throws Exception {
        Block b = new Block();
        b.setIndex(0);
        when(service.getChain()).thenReturn(List.of(b));

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/chain")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].index").value(0));
    }
}
