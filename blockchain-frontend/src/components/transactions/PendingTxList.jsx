import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import TxCard from './TxCard';
import { HiClock } from 'react-icons/hi';

const PendingTxList = ({ transactions, loading }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
        <HiClock className="text-pink-400" />
        <span>Pending Transactions ({transactions.length})</span>
      </h2>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            Loading transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No pending transactions. Create one to get started!
          </div>
        ) : (
          transactions.map((tx, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TxCard transaction={tx} />
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
};

export default PendingTxList;