package com.example.blockchain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Block document saved in MongoDB. Each block contains a list of Transaction embedded docs.
 */

@Document(collection = "blocks")
public class Block {

    @Id
    private String id;
    private int index;
    private long timestamp;
    private List<Transaction> transactions;
    private long nonce;
    @Indexed
    private String previousHash;
    @Indexed(unique = true)
    private String hash;

    public Block(){}

    public Block(int index, long timestamp, List<Transaction> transactions, String previousHash){
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        // set hash after mining and then save to DB.
    }
    public Block(int index, long timestamp, List<Transaction> transactions, long nonce, String previousHash, String hash){
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.nonce = nonce;
        this.previousHash = previousHash;
        this.hash = hash;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public int getIndex() { return index; }
    public void setIndex(int index) { this.index = index; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    public List<Transaction> getTransactions() { return transactions; }
    public void setTransactions(List<Transaction> transactions) { this.transactions = transactions; }

    public long getNonce() { return nonce; }
    public void setNonce(long nonce) { this.nonce = nonce; }

    public String getPreviousHash() { return previousHash; }
    public void setPreviousHash(String previousHash) { this.previousHash = previousHash; }

    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }

}
