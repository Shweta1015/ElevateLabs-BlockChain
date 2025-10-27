import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlockList from '../components/chain/BlockList';
import BlockDetail from '../components/chain/BlockDetail';
import { blockchainService } from '../services/api';

const Chain = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    fetchChain();
    const interval = setInterval(fetchChain, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchChain = async () => {
    try {
      const chain = await blockchainService.getChain();
      setBlocks(chain.reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chain:', error);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold gradient-text mb-2">
          Blockchain Explorer
        </h1>
        <p className="text-gray-400">
          Explore all blocks in the blockchain
        </p>
      </div>

      <BlockList 
        blocks={blocks}
        loading={loading}
        onBlockClick={setSelectedBlock}
      />

      {selectedBlock && (
        <BlockDetail 
          block={selectedBlock}
          onClose={() => setSelectedBlock(null)}
        />
      )}
    </motion.div>
  );
};

export default Chain;