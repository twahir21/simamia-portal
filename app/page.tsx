'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginAction } from './action';

export default function Home() {
  const router = useRouter();
  
  // useActionState handles the server response and loading state
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Effect to trigger Sonner toast when state changes
  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message);
        // Redirect after a short delay so they see the toast
        setTimeout(() => router.push('/private'), 1500);
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500">Please enter your details</p>
        </div>

        <form action={formAction} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input
                type="text"
                name="username"
                required
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-sky-600 py-3 font-semibold text-white transition-colors hover:bg-sky-700 active:bg-sky-800 disabled:bg-sky-300"
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&#39;t have an account? <a href="#" className="font-medium text-sky-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}