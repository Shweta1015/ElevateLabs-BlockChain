import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { blockchainService } from '../../services/api';
import { HiArrowRight, HiClock } from 'react-icons/hi';

const PendingTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      const pending = await blockchainService.getPendingTransactions();
      setTransactions(pending.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <HiClock className="text-pink-400" />
          <span>Pending Transactions</span>
        </h2>
        <Link 
          to="/transactions"
          className="text-purple-400 hover:text-purple-300 flex items-center space-x-1 text-sm"
        >
          <span>View all</span>
          <HiArrowRight />
        </Link>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No pending transactions
          </div>
        ) : (
          transactions.map((tx, idx) => (
            <motion.div
              key={tx.id || idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-400">From:</span>
                    <span className="font-mono text-xs text-purple-400">
                      {tx.sender ? `${tx.sender.substring(0, 8)}...` : 'System'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm mt-1">
                    <span className="text-gray-400">To:</span>
                    <span className="font-mono text-xs text-pink-400">
                      {tx.recipient.substring(0, 8)}...
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">
                    {tx.amount}
                  </p>
                  <p className="text-xs text-gray-500">coins</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};

export default PendingTransactions;