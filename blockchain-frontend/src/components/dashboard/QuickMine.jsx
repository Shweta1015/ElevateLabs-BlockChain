import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { blockchainService } from '../../services/api';
import toast from 'react-hot-toast';
import { HiCube, HiLightningBolt } from 'react-icons/hi';

const QuickMine = ({ onMineComplete }) => {
  const [mining, setMining] = useState(false);
  const [minerAddress, setMinerAddress] = useState('miner1');

  const handleMine = async () => {
    setMining(true);
    try {
      const result = await blockchainService.mineBlock(minerAddress);
      toast.success(`Block #${result.index} mined successfully!`);
      if (onMineComplete) onMineComplete();
    } catch (error) {
      toast.error('Mining failed: ' + error.message);
    } finally {
      setMining(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center space-x-2 mb-4">
        <HiLightningBolt className="text-yellow-400 w-6 h-6" />
        <h2 className="text-xl font-semibold">Quick Mine</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Miner Address
          </label>
          <input
            type="text"
            value={minerAddress}
            onChange={(e) => setMinerAddress(e.target.value)}
            className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Enter miner address"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleMine}
          disabled={mining || !minerAddress}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
            mining
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {mining ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <HiCube className="w-5 h-5" />
              </motion.div>
              <span>Mining...</span>
            </>
          ) : (
            <>
              <HiCube className="w-5 h-5" />
              <span>Start Mining</span>
            </>
          )}
        </motion.button>

        <div className="text-center text-sm text-gray-400">
          Mine a new block and earn rewards
        </div>
      </div>
    </Card>
  );
};

export default QuickMine;