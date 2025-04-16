'use client';

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, SquarePen, Trash2 } from "lucide-react";
import Deleteorders from '@/app/admindashboard/Orders/Deleteorder/deleteorder';

const ActionButtons = ({ onEdit, onDelete }) => (
  <td className="px-4 py-2 flex gap-2">
    <button onClick={onEdit} className="text-yellow-500 hover:text-yellow-400">
      <SquarePen size={18} />
    </button>
    <button onClick={onDelete} className="text-red-500 hover:text-red-400">
      <Trash2 size={18} />
    </button>
  </td>
);

const OrderRow = ({ order, onEdit, onDelete }) => (
  <tr key={order.id} className="border-b border-gray-700">
    <td className="px-4 py-2">{order.name}</td>
    <td className="px-4 py-2">{order.email}</td>
    <td className="px-4 py-2">{order.phone}</td>
    <td className="px-4 py-2">{order.status}</td>
    <td className="px-4 py-2">{order.ownerStatus}</td>
    <td className="px-4 py-2">{order.openedDate}</td>
    <td className="px-4 py-2">{order.openCloseTime}</td>
    <ActionButtons onEdit={onEdit} onDelete={onDelete} />
  </tr>
);

const OrdersTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Sample data instead of API call
  const [orders, setOrders] = useState([
    { id: 1, name: "Canteen A", email: "a@example.com", phone: "1234567890", status: "Active", ownerStatus: "Verified", openedDate: "2024-01-10", openCloseTime: "8 AM - 8 PM" },
    { id: 2, name: "Canteen B", email: "b@example.com", phone: "9876543210", status: "Inactive", ownerStatus: "Pending", openedDate: "2023-12-05", openCloseTime: "9 AM - 5 PM" },
    { id: 3, name: "Canteen C", email: "c@example.com", phone: "4561237890", status: "Active", ownerStatus: "Verified", openedDate: "2022-07-15", openCloseTime: "10 AM - 6 PM" },
  ]);

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="rounded-md shadow-lg">
      
      <div className="overflow-auto max-w-[75vw] lg:max-w-full rounded-xl">
        <table className="w-full text-sm text-left text-gray-400 bg-[#2B2623] rounded-xl">
          <thead className="text-gray-900 bg-[#77FF95]">
            <tr>
              <th className="px-4 py-2">Canteen</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Canteen Status</th>
              <th className="px-4 py-2">Owner Status</th>
              <th className="px-4 py-2">Opened Date</th>
              <th className="px-4 py-2">Opened-Closed</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onEdit={() => {}}
                  onDelete={() => {
                    setSelectedOrderId(order.id);
                    setIsDeleteModalOpen(true);
                  }}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No canteens found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDeleteModalOpen && (
        <Deleteorders
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDelete(selectedOrderId)}
        />
      )}
    </div>
  );
};

export default OrdersTable;
