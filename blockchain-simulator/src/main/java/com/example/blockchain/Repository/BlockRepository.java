package com.example.blockchain.Repository;

import com.example.blockchain.model.Block;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlockRepository extends MongoRepository<Block, String> {
    Optional<Block> findTopByOrderByIndexDesc();
    Optional<Block> findByHash(String hash);

}
