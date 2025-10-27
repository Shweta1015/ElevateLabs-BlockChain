import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { blockchainService } from '../../services/api';
import { formatDistanceToNow } from 'date-fns';
import { HiArrowRight, HiCube } from 'react-icons/hi';

const RecentBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const chain = await blockchainService.getChain();
      setBlocks(chain.slice(-5).reverse());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blocks:', error);
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <HiCube className="text-purple-400" />
          <span>Recent Blocks</span>
        </h2>
        <Link 
          to="/chain"
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 text-sm"
        >
          <span>View all</span>
          <HiArrowRight />
        </Link>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading blocks...</div>
        ) : blocks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No blocks yet</div>
        ) : (
          blocks.map((block, idx) => (
            <motion.div
              key={block.id || block.index || idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-dark-800/50 rounded-lg p-4 border border-dark-700/50 hover:border-purple-500/30 transition-colors"
>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400 font-semibold">
                      Block #{block.index}
                    </span>
                    <span className="text-xs text-gray-500">
                      {block.timestamp
                      ? formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })
                      : 'Unknown time'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-mono">
                    {block.hash 
                      ? `${block.hash.substring(0, 20)}...`
                      : 'No hash available'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">
                    {block.transactions && Array.isArray(block.transactions)
                      ? `${block.transactions.length} txs`
                      : '0 txs'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Nonce: {block.nonce}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentBlocks;