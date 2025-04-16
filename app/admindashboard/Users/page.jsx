"use client";

import React from 'react';
import Sidebar from '@/app/admindashboard/Sidebar/page';
import Topbar from '@/app/admindashboard/Topbar/page';
import Header from '@/app/admindashboard/Header/page';
import Product from '@/app/admindashboard/Users/products';


const AdminDashboard = () => {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <Header title="Users" /> {/* Pass route-specific title */}
        <div className="p-4">
         <Product />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
