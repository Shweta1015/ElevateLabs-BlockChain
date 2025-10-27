package com.example.blockchain.Repository;

import com.example.blockchain.model.BlockchainMeta;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlockchainMetaRepository extends MongoRepository<BlockchainMeta, String> {

}
