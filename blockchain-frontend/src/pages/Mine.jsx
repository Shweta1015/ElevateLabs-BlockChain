import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MinerPanel from '../components/mining/MinerPanel';
import MiningHistory from '../components/mining/MiningHistory';
import { blockchainService } from '../services/api';

const Mine = () => {
  const [miningHistory, setMiningHistory] = useState([]);
  const [stats, setStats] = useState({
    totalMined: 0,
    totalRewards: 0,
    difficulty: 4
  });

  useEffect(() => {
    fetchMiningData();
  }, []);

  const fetchMiningData = async () => {
    try {
      const chain = await blockchainService.getChain();
      // Filter blocks that were mined (not genesis)
      const minedBlocks = chain.filter(block => block.index > 0);
      setMiningHistory(minedBlocks.slice(-10).reverse());
      
      setStats({
        totalMined: minedBlocks.length,
        totalRewards: minedBlocks.length * 100, // Assuming 100 coins per block
        difficulty: 4
      });
    } catch (error) {
      console.error('Error fetching mining data:', error);
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
          Mining Center
        </h1>
        <p className="text-gray-400">
          Mine new blocks and earn rewards
        </p>
      </div>

      {/* Mining Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Total Blocks Mined</p>
          <p className="text-3xl font-bold mt-1 text-purple-400">
            {stats.totalMined}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Total Rewards Earned</p>
          <p className="text-3xl font-bold mt-1 text-green-400">
            {stats.totalRewards}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6"
        >
          <p className="text-gray-400 text-sm">Current Difficulty</p>
          <p className="text-3xl font-bold mt-1 text-pink-400">
            {stats.difficulty}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MinerPanel onMineComplete={fetchMiningData} />
        <MiningHistory history={miningHistory} />
      </div>
    </motion.div>
  );
};

export default Mine;