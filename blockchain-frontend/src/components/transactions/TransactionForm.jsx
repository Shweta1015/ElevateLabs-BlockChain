import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card';
import { blockchainService } from '../../services/api';
import toast from 'react-hot-toast';
import { HiPaperAirplane } from 'react-icons/hi';

const TransactionForm = ({ onTransactionCreated }) => {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    amount: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await blockchainService.createTransaction({
        sender: formData.sender || null,  // null for mining rewards
        recipient: formData.recipient,
        amount: parseFloat(formData.amount)
      });
      toast.success('Transaction created successfully!');
      setFormData({ sender: '', recipient: '', amount: '' });
      if (onTransactionCreated) onTransactionCreated();
    } catch (error) {
      toast.error('Failed to create transaction: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
        <HiPaperAirplane className="text-purple-400" />
        <span>Create Transaction</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sender Address
          </label>
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Sender's address (optional for mining reward)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="Recipient's address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            className="w-full px-4 py-2 bg-dark-800/50 border border-dark-700 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            placeholder="0.00"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            submitting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {submitting ? 'Creating...' : 'Create Transaction'}
        </motion.button>
      </form>
    </Card>
  );
};

export default TransactionForm;