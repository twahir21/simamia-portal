"use client";

import { SERVER_LINK } from '@/const/links.const';
import { UserShop } from '@/ts/users.types';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Types for our data

interface Transaction {
  id: string;
  createdAt: string;
  expiredAt: string;
  isUsed: boolean;
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
  const [loading, setloading] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]| null>(null);
  const [userShops, setUsershops] = useState<UserShop[] | null> (null);
  const [formData, setFormData] = useState<TransactionForm>({
    transactionId: '',
    amount: '',
    expiredAt: '',
  });


  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [statusValue, setStatusValue] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
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
        fetchTransactions();
      }else {
        toast.error(message)
      }
    
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "error in creating transaction")
    } finally{
      setloading(false);
    }
  };


  const fetchTransactions = async () => {
    setInitialLoad(true);
    try {
      const res = await fetch(`${SERVER_LINK}/api/admin`, { credentials: 'include' });
      const json = await res.json();
      if (json.success) setTransactions(json.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load transactions");
    } finally {
      setInitialLoad(false);
    }
  };

  const fetchUsers = async () => {
    setInitialLoad(true);
    try {
      const res = await fetch(`${SERVER_LINK}/api/users`, { credentials: 'include' });
      const json = await res.json();

      console.log("Shops: ", json);
      if (json.success) setUsershops(json.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load transactions");
    } finally {
      setInitialLoad(false);
    }
  };

  // Call this in a useEffect
  useEffect(() => {
    fetchTransactions();
    fetchUsers()
  }, []);

  const handleDelete = async (id: string) => {
    toast.info(`Delete this ${id}?`, {
      duration: Infinity, // Keep it open until user decides
      action: {
        label: "Delete",
        onClick: async () => {
          // We use toast.promise to handle loading, success, and error states automatically
          const deletePromise = async () => {
            const res = await fetch(`${SERVER_LINK}/api/admin/${id}`, {
              method: 'DELETE',
              credentials: 'include',
            });
            
            const data = await res.json();
            if (!data.success) throw new Error(data.message || "Failed to delete");
            
            fetchTransactions(); // Refresh the list
            return data.message;
          };

          toast.promise(deletePromise(), {
            loading: 'Deleting transaction...',
            success: (message) => `${message}`,
            error: (err) => `${err.message}`,
          });
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

const handleStatusUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedTransaction) return;
  
  setStatusLoading(true);
  try {
    const response = await fetch(`${SERVER_LINK}/api/admin/${selectedTransaction.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ isUsed: statusValue }),
    });

    const ans = await response.json();

    if(ans.success) {
      setShowStatusModal(false);
      toast.success(`Status updated to ${statusValue ? 'Used' : 'Available'}`);
      fetchTransactions(); // Refresh the list
      setSelectedTransaction(null);
    } else {
      toast.error(ans.message);
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Error updating status");
  } finally {
    setStatusLoading(false);
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
                      <th className="px-6 py-4">S/N</th>
                      <th className="px-6 py-4">Transaction ID</th>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4">Expired At</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    { initialLoad || !transactions ? (
                      // Loading state
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex justify-center">
                            <svg 
                              className="animate-spin h-8 w-8 text-sky-600" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24"
                            >
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                              />
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                          <p className="mt-2 text-gray-500">Loading transactions...</p>
                        </td>
                      </tr>
                    ) : transactions.length === 0 ? (
                      // Empty state row
                      <tr>
                        <td 
                          colSpan={6} 
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            {/* Empty state icon */}
                            <svg 
                              className="w-12 h-12 text-gray-400" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                              />
                            </svg>
                            <p className="text-lg font-medium text-gray-600">No transactions found</p>
                            <p className="text-sm text-gray-400">Transactions will appear here once created</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      // Map through transactions if array has items
                      transactions.map((tx, i) => (
                        <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-600">{i+1}</td>
                          <td className="px-6 py-4 font-mono font-medium text-sky-600">{tx.id}</td>
                          <td className="px-6 py-4 text-gray-600">{tx.createdAt}</td>
                          <td className="px-6 py-4 text-gray-600">{tx.expiredAt}</td>
                          <td className="px-6 py-4 font-semibold text-gray-900">{Number(tx.amount).toLocaleString()}/=</td>
                          <td className="px-6 py-4">
                            <span className={`
                              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${tx.isUsed 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-green-100 text-green-800'
                              }
                            `}>
                              {tx.isUsed ? 'Used' : 'Available'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Actions 
                              id={tx.id}
                              onDelete={handleDelete}
                                  onStatusToggle={(id) => {
                                  const transaction = transactions.find(t => t.id === id);
                                  setSelectedTransaction(transaction || null);
                                  setStatusValue(transaction?.isUsed || false);
                                  setShowStatusModal(true);
                                }}
                            />
                          </td>
                        </tr>
                      ))
                    )}
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {initialLoad || !userShops ? (
                      // Loading state
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex justify-center">
                            <svg 
                              className="animate-spin h-8 w-8 text-sky-600" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24"
                            >
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                              />
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                          </div>
                          <p className="mt-2 text-gray-500">Loading User shops...</p>
                        </td>
                      </tr>
                    ) : userShops.length === 0 ? (
                    // Empty state row
                    <tr>
                      <td 
                        colSpan={6} 
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center justify-center gap-3">
                          {/* Empty state icon */}
                          <svg 
                            className="w-12 h-12 text-gray-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
                            />
                          </svg>
                          <p className="text-lg font-medium text-gray-600">No User Shop found</p>
                          <p className="text-sm text-gray-400">User shops will appear here once created</p>
                        </div>
                      </td>
                    </tr>
                  ) : userShops.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{user.shopName}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.phoneNumber}</td>
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
                          user.verified === "Verified" ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <i className={`fa-solid ${user.verified === "Verified" ? 'fa-check-circle text-sky-600' : 'fa-clock text-gray-500'} w-3 h-3`} />
                          {user.verified === 'Verified' ? 'Verified' : 'Pending'}
                        </span>
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
                  value={extractReference(formData.transactionId)}
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
                  disabled={loading}
                  className={`
                    rounded-lg px-4 py-2 text-sm font-medium text-white 
                    transition-all duration-200 ease-in-out
                    ${loading 
                      ? 'bg-sky-400 cursor-not-allowed opacity-75' 
                      : 'bg-sky-600 hover:bg-sky-700 active:scale-95'
                    }
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                    disabled:pointer-events-none
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg 
                        className="h-4 w-4 animate-spin text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    'Submit Transaction'
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Update Transaction Status</h3>
            
            <form onSubmit={handleStatusUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md border border-gray-200">
                  {selectedTransaction?.id}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="false"
                      checked={statusValue === false}
                      onChange={() => setStatusValue(false)}
                      className="w-4 h-4 text-sky-600"
                    />
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="true"
                      checked={statusValue === true}
                      onChange={() => setStatusValue(true)}
                      className="w-4 h-4 text-sky-600"
                    />
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Used
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={statusLoading}
                  className={`
                    rounded-lg px-4 py-2 text-sm font-medium text-white 
                    transition-all duration-200 ease-in-out
                    ${statusLoading 
                      ? 'bg-sky-400 cursor-not-allowed opacity-75' 
                      : 'bg-sky-600 hover:bg-sky-700 active:scale-95'
                    }
                    focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
                    disabled:pointer-events-none
                  `}
                >
                  {statusLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg 
                        className="h-4 w-4 animate-spin text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Updating...</span>
                    </span>
                  ) : (
                    'Update Status'
                  )}
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
function Actions({ id, onDelete, onStatusToggle }: { 
  id: string; 
  onDelete: (id: string) => void;
  onStatusToggle: (id: string) => void;
}) {
    return (
    <div className="flex items-center gap-2">
      <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-sky-600 transition-colors"
       onClick={() => onStatusToggle(id)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
        onClick={() => onDelete(id)}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

function extractReference(text: string): string {
  // Pattern: "Kumbukumbu No." + (anything) + "."
  const regex = /Kumbukumbu No\.(.*?)\./;
  const match = text.match(regex);

  return match ? match[1].trim() : text;
}