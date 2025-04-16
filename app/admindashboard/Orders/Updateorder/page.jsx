"use client";

import React from 'react';
import Sidebar from '@/app/admindashboard/Sidebar/page';
import Topbar from '@/app/admindashboard/Topbar/page';
import Header from '@/app/admindashboard/Header/page';
import Updateorder from '@/app/admindashboard/Products/Updateproduct/page';


const AddProducts = () => {
  return (
    <div className="flex bg-black">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <Header title="Update Order" /> {/* Pass route-specific title */}
        <div className="p-4">
         <Updateorder />
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
