package com.example.blockchain.controller;

import com.example.blockchain.model.Block;
import com.example.blockchain.model.Transaction;
import com.example.blockchain.service.BlockchainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api")
@RestController
public class BlockchainController {
    @Autowired
    private BlockchainService service;

    @PostMapping("/transactions")
    public ResponseEntity<?> addTransaction(@RequestBody Transaction tx){
        try{
            Transaction saved = service.addTransaction(tx);
            return ResponseEntity.ok(saved);
        }catch (IllegalArgumentException ex){
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Transaction>> getPending(){
        return ResponseEntity.ok(service.getPendingTransactions());
    }

    @PostMapping("/mine")
    public ResponseEntity<?> mine(@RequestParam("minerAddress") String minerAddress){
        try {
            Block mined = service.minePendingTransaction(minerAddress);
            return ResponseEntity.ok(mined);
        }catch (IllegalArgumentException ex){
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/chain")
    public ResponseEntity<List<Block>> getChain(){
        return ResponseEntity.ok(service.getChain());
    }

    @GetMapping("/balance/{address}")
    public ResponseEntity<?> getBalance(@PathVariable String address){
        double balance = service.getBalance(address);
        return ResponseEntity.ok(Map.of("address", address, "balance", balance));
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateChain(){
        boolean valid = service.isChainValid();
        return ResponseEntity.ok(Map.of("valid", valid));
    }
}
