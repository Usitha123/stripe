"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Import your Supabase client

export default function Admin() {
  const [session, setSession] = useState(null);
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    const fetchSession = async () => {
      const { data: currentSession } = await supabase.auth.getSession();
      setSession(currentSession.session);
    };

    fetchSession();

    // Listen for changes in the session
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to "check" route after sign-out
  };

  if (!session) {
    return <div>Please log in to access the admin panel.</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, {session.user?.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
