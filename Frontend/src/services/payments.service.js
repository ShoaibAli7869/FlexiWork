// Payments Service - Handles all payment-related API calls
// This service will integrate with Stripe and manage escrow operations

import api from './api';

// Simulated delay for demo purposes
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Demo payment methods
const demoPaymentMethods = [
  { id: 'pm_1', type: 'card', brand: 'Visa', last4: '4242', expMonth: 12, expYear: 2025, isDefault: true },
  { id: 'pm_2', type: 'card', brand: 'Mastercard', last4: '8888', expMonth: 6, expYear: 2026, isDefault: false },
];

// Demo transactions
const demoTransactions = [
  { id: 't1', type: 'fund', amount: 1250, projectTitle: 'E-commerce Website', milestone: 'Testing', date: '2024-02-28', status: 'completed' },
  { id: 't2', type: 'release', amount: 1750, projectTitle: 'E-commerce Website', freelancer: 'Sarah Johnson', date: '2024-02-27', status: 'completed' },
  { id: 't3', type: 'fund', amount: 3600, projectTitle: 'Mobile App', milestone: 'Backend Development', date: '2024-02-20', status: 'completed' },
];

/**
 * Payment Methods
 */
export const getPaymentMethods = async () => {
  await simulateDelay(500);
  // In production: return api.get('/payments/methods');
  return { success: true, data: demoPaymentMethods };
};

export const addPaymentMethod = async (paymentMethodData) => {
  await simulateDelay(1000);
  // In production: return api.post('/payments/methods', paymentMethodData);
  const newMethod = {
    id: `pm_${Date.now()}`,
    ...paymentMethodData,
    isDefault: false,
  };
  return { success: true, data: newMethod, message: 'Payment method added successfully' };
};

export const removePaymentMethod = async (paymentMethodId) => {
  await simulateDelay(500);
  // In production: return api.delete(`/payments/methods/${paymentMethodId}`);
  return { success: true, message: 'Payment method removed successfully' };
};

export const setDefaultPaymentMethod = async (paymentMethodId) => {
  await simulateDelay(500);
  // In production: return api.put(`/payments/methods/${paymentMethodId}/default`);
  return { success: true, message: 'Default payment method updated' };
};

/**
 * Escrow Operations
 */
export const fundEscrow = async (milestoneId, amount, paymentMethodId) => {
  await simulateDelay(1500);
  // In production: return api.post('/escrow/fund', { milestoneId, amount, paymentMethodId });
  return {
    success: true,
    data: {
      transactionId: `txn_${Date.now()}`,
      milestoneId,
      amount,
      status: 'funded',
      fundedAt: new Date().toISOString(),
    },
    message: `$${amount} funded to escrow successfully`,
  };
};

export const releaseEscrow = async (milestoneId, amount, freelancerId) => {
  await simulateDelay(1500);
  // In production: return api.post('/escrow/release', { milestoneId, amount, freelancerId });
  return {
    success: true,
    data: {
      transactionId: `txn_${Date.now()}`,
      milestoneId,
      amount,
      freelancerId,
      status: 'released',
      releasedAt: new Date().toISOString(),
    },
    message: `$${amount} released to freelancer successfully`,
  };
};

export const requestRefund = async (milestoneId, amount, reason) => {
  await simulateDelay(1000);
  // In production: return api.post('/escrow/refund-request', { milestoneId, amount, reason });
  return {
    success: true,
    data: {
      refundRequestId: `rfnd_${Date.now()}`,
      milestoneId,
      amount,
      status: 'pending_review',
      createdAt: new Date().toISOString(),
    },
    message: 'Refund request submitted for review',
  };
};

export const getEscrowBalance = async (projectId) => {
  await simulateDelay(500);
  // In production: return api.get(`/escrow/balance/${projectId}`);
  return {
    success: true,
    data: {
      projectId,
      totalBudget: 5000,
      funded: 5000,
      released: 3750,
      balance: 1250,
      pendingRelease: 0,
    },
  };
};

export const getEscrowDetails = async (projectId) => {
  await simulateDelay(500);
  // In production: return api.get(`/escrow/${projectId}`);
  return {
    success: true,
    data: {
      projectId,
      milestones: [
        { id: 'm1', title: 'Setup', amount: 500, status: 'released', releasedAt: '2024-02-06' },
        { id: 'm2', title: 'Design', amount: 1500, status: 'released', releasedAt: '2024-02-13' },
        { id: 'm3', title: 'Development', amount: 1750, status: 'released', releasedAt: '2024-02-27' },
        { id: 'm4', title: 'Testing', amount: 1250, status: 'funded', fundedAt: '2024-02-28' },
      ],
    },
  };
};

/**
 * Transaction History
 */
export const getTransactionHistory = async (filters = {}) => {
  await simulateDelay(500);
  // In production: return api.get('/payments/transactions', { params: filters });
  let filtered = [...demoTransactions];

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  return {
    success: true,
    data: filtered,
    pagination: {
      page: 1,
      totalPages: 1,
      total: filtered.length,
    },
  };
};

export const getTransactionDetails = async (transactionId) => {
  await simulateDelay(500);
  // In production: return api.get(`/payments/transactions/${transactionId}`);
  const transaction = demoTransactions.find(t => t.id === transactionId);
  return { success: !!transaction, data: transaction };
};

export const downloadInvoice = async (transactionId) => {
  await simulateDelay(1000);
  // In production: return api.get(`/payments/invoices/${transactionId}`, { responseType: 'blob' });
  return { success: true, message: 'Invoice download started' };
};

/**
 * Stripe Integration Helpers
 */
export const createPaymentIntent = async (amount, currency = 'usd') => {
  await simulateDelay(1000);
  // In production: return api.post('/payments/create-intent', { amount, currency });
  return {
    success: true,
    data: {
      clientSecret: `pi_demo_${Date.now()}_secret`,
      paymentIntentId: `pi_demo_${Date.now()}`,
    },
  };
};

export const confirmPayment = async (paymentIntentId, paymentMethodId) => {
  await simulateDelay(1500);
  // In production: return api.post('/payments/confirm', { paymentIntentId, paymentMethodId });
  return {
    success: true,
    data: {
      status: 'succeeded',
      paymentIntentId,
    },
    message: 'Payment confirmed successfully',
  };
};

/**
 * Wallet / Balance Operations
 */
export const getWalletBalance = async () => {
  await simulateDelay(500);
  // In production: return api.get('/wallet/balance');
  return {
    success: true,
    data: {
      available: 2340,
      pending: 800,
      inEscrow: 4500,
      currency: 'usd',
    },
  };
};

export const withdrawFunds = async (amount, withdrawalMethod) => {
  await simulateDelay(1500);
  // In production: return api.post('/wallet/withdraw', { amount, withdrawalMethod });
  return {
    success: true,
    data: {
      withdrawalId: `wd_${Date.now()}`,
      amount,
      status: 'processing',
      estimatedArrival: '2-3 business days',
    },
    message: 'Withdrawal initiated successfully',
  };
};

export const addFunds = async (amount, paymentMethodId) => {
  await simulateDelay(1500);
  // In production: return api.post('/wallet/add-funds', { amount, paymentMethodId });
  return {
    success: true,
    data: {
      transactionId: `txn_${Date.now()}`,
      amount,
      newBalance: 2340 + amount,
    },
    message: `$${amount} added to your account`,
  };
};

export default {
  // Payment Methods
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  setDefaultPaymentMethod,

  // Escrow
  fundEscrow,
  releaseEscrow,
  requestRefund,
  getEscrowBalance,
  getEscrowDetails,

  // Transactions
  getTransactionHistory,
  getTransactionDetails,
  downloadInvoice,

  // Stripe
  createPaymentIntent,
  confirmPayment,

  // Wallet
  getWalletBalance,
  withdrawFunds,
  addFunds,
};
