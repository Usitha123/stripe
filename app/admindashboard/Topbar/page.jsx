"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";

const Topbar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to the home page after sign-out
  };

  return (
    <div className="flex items-center justify-between p-4 text-white bg-[#2B2623]">
      <span>A Perfect Blend of Tea & Coffee</span>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Topbar;
