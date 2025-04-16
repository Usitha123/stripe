"use client";

import React from 'react';
import Sidebar from '@/app/admindashboard/Sidebar/page';
import Topbar from '@/app/admindashboard/Topbar/page';
import Header from '@/app/admindashboard/Header/page';
import UpdateProduct from '@/app/admindashboard/Products/Updateproduct/updateproducts';


const AdminDashboard = () => {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <Header title=" Update Product" /> {/* Pass route-specific title */}
        <div className="p-4">
         <UpdateProduct />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
