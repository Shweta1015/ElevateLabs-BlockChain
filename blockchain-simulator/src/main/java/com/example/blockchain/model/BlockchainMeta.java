package com.example.blockchain.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blockchain_meta")
public class BlockchainMeta {
    private String id;
    private int difficulty;
    private double miningReward;
    private int latestIndex;

    public BlockchainMeta() {}

    public BlockchainMeta(int difficulty, double miningReward, int latestIndex){
        this.difficulty = difficulty;
        this.miningReward = miningReward;
        this.latestIndex = latestIndex;
    }

    public int getDifficulty(){
        return difficulty;
    }
    public void setDifficulty(int difficulty){
        this.difficulty = difficulty;
    }

    public double getMiningReward(){
        return miningReward;
    }
    public void setMiningReward(double miningReward){
        this.miningReward = miningReward;
    }

    public int getLatestIndex(){
        return latestIndex;
    }
    public void setLatestIndex(int latestIndex){
        this.latestIndex = latestIndex;
    }
}
