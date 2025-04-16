"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  async function signInWithEmail() {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch the user's role from the Supabase database
      const { data: userData, error: userError } = await supabase
        .from('profiles') // Assuming you have a 'users' table with a 'role' column
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (userError) throw userError;

      if (userData?.role === 'admin') {
        router.push('/admindashboard'); // Redirect to admin dashboard
      } 

    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: `Error signing in: ${error.message}` });
      }
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Assuming you have a 'users' table where you store user data with a default 'role' of 'user'
      await supabase
        .from('users')
        .upsert({ id: data.user.id, role: 'user' });

      setMessage({ type: 'success', text: 'Check your email for the confirmation link!' });
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: `Error signing up: ${error.message}` });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 bg-red-500">Tea App</h1>
      <h1 className="text-2xl font-bold text-center mb-6">Login or Sign Up</h1>

      {message.text && (
        <div className={`p-3 rounded mb-4 ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className="flex items-center border rounded px-3 py-2">
          <span className="text-gray-400 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
          <input
            id="email"
            className="w-full focus:outline-none"
            type="email"
            placeholder="email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <div className="flex items-center border rounded px-3 py-2">
          <span className="text-gray-400 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            id="password"
            className="w-full focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="none"
          />
        </div>
      </div>

      <div className="mb-4">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
          onClick={signInWithEmail}
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </div>

      <div>
        <button
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
          onClick={signUpWithEmail}
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
      </div>
    </div>
  );
}
