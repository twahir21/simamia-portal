"use client";

import { SERVER_LINK } from '@/const/links.const';
import React, { useState } from 'react';
import { toast } from 'sonner';

// Types for our data
interface User {
  id: string;
  shopName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  isVerified: boolean;
}

interface Transaction {
  id: string;
  transactionId: string;
  createdAt: string;
  expiredAt: string;
  amount: string;
}

interface TransactionForm {
  transactionId: string;
  amount: string;
  expiredAt: string;
}

export default function Private() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'users'>('transactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<TransactionForm>({
    transactionId: '',
    amount: '',
    expiredAt: '',
  });

  // Hardcoded Transactions
  const transactions: Transaction[] = [
    { id: 'TXN-001', transactionId: 'TXN-99281', createdAt: '2024-05-20 09:30 AM', expiredAt: '2024-06-20 09:30 AM', amount: 'Tsh 450,000' },
    { id: 'TXN-002', transactionId: 'TXN-99282', createdAt: '2024-05-21 02:15 PM', expiredAt: '2024-06-21 02:15 PM', amount: 'Tsh 120,000' },
    { id: 'TXN-003', transactionId: 'TXN-99283', createdAt: '2024-05-21 04:45 PM', expiredAt: '2024-06-21 04:45 PM', amount: 'Tsh 85,000' },
    { id: 'TXN-004', transactionId: 'TXN-99284', createdAt: '2024-05-22 11:00 AM', expiredAt: '2024-06-22 11:00 AM', amount: 'Tsh 230,000' },
  ];

  // Hardcoded Users
  const users: User[] = [
    { id: 'USR-001', shopName: 'John\'s Electronics', email: 'john@simamia.com', phone: '+255 123 456 789', status: 'Active', isVerified: true },
    { id: 'USR-002', shopName: 'Sarah Fashion House', email: 'sarah@business.com', phone: '+255 234 567 890', status: 'Active', isVerified: true },
    { id: 'USR-003', shopName: 'Chen\'s Grocery', email: 'mike@shop.tz', phone: '+255 345 678 901', status: 'Inactive', isVerified: false },
    { id: 'USR-004', shopName: 'ABC Supermarket', email: 'info@abcshop.co.tz', phone: '+255 456 789 012', status: 'Active', isVerified: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_LINK}/api/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const ans = await response.json() as { success: boolean; message: string | object };

      const message = typeof ans.message === 'object' 
        ? JSON.stringify(ans.message) 
        : ans.message;

      if(ans.success) {
        setShowModal(false);
        // Reset form or refresh data here
        setFormData({ transactionId: '', amount: '', expiredAt: '' });
        toast.success(message)
      }else {
        toast.error(message)
      }
    
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "error in creating transaction")
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Top Bar with Tabs and Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Tabs */}
          <div className="flex gap-1 rounded-lg bg-gray-100 border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'transactions'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin Posted Transactions
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              System Users
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={activeTab === 'transactions' ? "Search transactions..." : "Search users..."}
              className="w-full sm:w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 pl-10 text-sm focus:border-sky-500 focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <section>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-800">
              {activeTab === 'transactions' ? 'Admin Posted Transactions' : 'System Users'}
            </h2>
            <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 self-start sm:self-auto"
              onClick={() => activeTab === 'transactions' ? setShowModal(true) : null}
            >
              {activeTab === 'transactions' ? 'Create Transaction' : 'Add User'}
            </button>
          </div>

          {/* Transactions Table */}
          {activeTab === 'transactions' && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-160 md:min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-300 text-gray-600 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4">Expired At</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-sky-600">{tx.transactionId}</td>
                        <td className="px-6 py-4 text-gray-600">{tx.createdAt}</td>
                        <td className="px-6 py-4 text-gray-600">{tx.expiredAt}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{tx.amount}</td>
                        <td className="px-6 py-4">
                          <ActionButtons />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm min-w-160 md:min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-300 text-gray-600 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-4">Shop Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Verified</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{user.shopName}</td>
                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                            user.isVerified ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <i className={`fa-solid ${user.isVerified ? 'fa-check-circle text-sky-600' : 'fa-clock text-gray-500'} w-3 h-3`} />
                            {user.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <ActionButtons /> {/* Pass user prop if needed */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Create New Transaction</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-sky-500 focus:ring-sky-500 outline-none"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  required
                  type="number"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-sky-500 focus:ring-sky-500 outline-none"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  required
                  type="date"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-sky-500 focus:ring-sky-500 outline-none"
                  value={formData.expiredAt}
                  onChange={(e) => setFormData({...formData, expiredAt: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Submit Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-component for buttons to keep the main code clean
function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-sky-600 transition-colors">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}