import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TransactionForm from '../components/transactions/TransactionForm';
import PendingTxList from '../components/transactions/PendingTxList';
import { blockchainService } from '../services/api';

const Transactions = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchTransactions = async () => {
    try {
      const pending = await blockchainService.getPendingTransactions();
      setPendingTransactions(pending);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
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
          Transactions
        </h1>
        <p className="text-gray-400">
          Create and manage blockchain transactions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm onTransactionCreated={fetchTransactions} />
        </div>
        <div className="lg:col-span-2">
          <PendingTxList 
            transactions={pendingTransactions}
            loading={loading}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Transactions;