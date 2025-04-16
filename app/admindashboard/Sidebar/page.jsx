"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChartColumn, UserRoundPen, LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    // Automatically expand the menu based on current route
    const matchedMenu = links.find((link) =>
      link.subMenu && pathname.startsWith(link.href)
    );
    if (matchedMenu) {
      setOpenMenu(matchedMenu.label);
    }
  }, [pathname]);

  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to the home page after sign-out
  };

  const links = [
    { href: "/admindashboard", label: "Dashboard", icon: <ChartColumn /> },
    { href: "/admindashboard/Products", label: "Products", icon: <ChartColumn /> },
    { href: "/admindashboard/Orders", label: "Orders", icon: <ChartColumn /> },
    { href: "/admindashboard/Users", label: "Users", icon: <ChartColumn /> },
    { href: "/admindashboard/Profile", label: "Profile", icon: <UserRoundPen /> },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="w-20 h-screen p-4 text-gray-300 bg-[#2B2623] md:w-60">
      <h1 className="mb-10 hidden md:block text-center text-2xl font-bold text-[#77FF95]">LOGO</h1>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex gap-3 p-2 rounded hover:bg-[#3d3632] hover:text-[#77FF95] ${
                isActive(link.href) ? "text-[#77FF95] font-bold" : ""
              }`}
            >
              {link.icon}
              <span className="hidden md:flex">{link.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleSignOut}
            className="flex w-full gap-3 p-2 rounded hover:bg-[#3d3632] hover:text-orange-500"
          >
            <LogOut />
            <span className="hidden md:flex">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
