package com.example.blockchain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

public class Transaction {

    @Id
    private String id;
    @Field("sender")
    private String sender;

    @Field("recipient")
    private String recipient;

    @Field("amount")
    private double amount;

    @Field("signature")
    private String signature;

    public Transaction(){}

    // Custom constructor without signature
    public Transaction(String sender, String recipient, double amount){
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }

    public Transaction(String id, String sender, String recipient, double amount, String signature){
        this.id = id;
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.signature = signature;
    }

    public String getId(){return id;}

    public void setId(String id){
        this.id = id;
    }

    public String getSender(){
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
