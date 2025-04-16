// Deletecanteens.js
import React from 'react';

const Deleteorders = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="w-1/3 p-6 bg-black text-gray-300 rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-center">Are you sure you want to delete this canteen?</h2>
        <div className="flex justify-around">
          <button 
            onClick={onDelete}
            className=" px-4 py-2 text-sm font-medium bg-orange-500 text-black rounded-xl hover:bg-orange-600
"
          >
            Yes
          </button>
          <button 
            onClick={onClose}
            className=" px-4 py-2 text-sm font-medium bg-[#3B3737] text-orange-500 border border-orange-500 rounded-xl hover:bg-black
"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Deleteorders;
