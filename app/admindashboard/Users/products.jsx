'use client';

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, SquarePen, Trash2 } from "lucide-react";
import Deletecanteens from '@/app/admindashboard/Products/Deleteproduct/deleteproduct';
import DescriptionModel from '@/app/admindashboard/Products/Descriptionmodal/page';

const ProductsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDescriptionModelOpen, setIsDescriptionModelOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, name: "Canteen A", email: "a@example.com", phone: "1234567890", status: "Active", ownerStatus: "Verified", openedDate: "2024-01-10", openCloseTime: "8 AM - 8 PM" },
    { id: 2, name: "Canteen B", email: "b@example.com", phone: "9876543210", status: "Inactive", ownerStatus: "Pending", openedDate: "2023-12-05", openCloseTime: "9 AM - 5 PM" },
    { id: 3, name: "Canteen C", email: "c@example.com", phone: "4561237890", status: "Active", ownerStatus: "Verified", openedDate: "2022-07-15", openCloseTime: "10 AM - 6 PM" },
  ]);

  const handleDelete = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    setIsDeleteModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDescriptionClick = (product) => {
    setSelectedProductDetails(product);
    setIsDescriptionModelOpen(true);
  };

  return (
    <div className="rounded-md shadow-lg">
      

      {/* Table */}
      <div className="overflow-auto max-w-[75vw] lg:max-w-full rounded-xl">
        <table className="w-full text-sm text-left text-gray-400 bg-[#2B2623] rounded-xl">
          <thead className="text-gray-900 bg-[#77FF95]">
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Factory</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(({ id, name, email, phone, status, openedDate, openCloseTime }) => (
              <tr key={id} className="border-b border-gray-700">
                <td className="px-4 py-2">{name}</td>
                <td className="px-4 py-2">{email}</td>
                <td className="px-4 py-2">{phone}</td>
                <td className="px-4 py-2">{status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDescriptionClick({ id, name, email, phone, status, openedDate, openCloseTime })}
                    className="text-orange-400 hover:underline"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">{openedDate}</td>
                <td className="px-4 py-2">{openCloseTime}</td>
                <td className="px-4 py-2">{openCloseTime}</td>
                <td className="px-4 py-2">{openCloseTime}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href="/admindashboard/Products/Updateproduct" className="ml-2">
                    <SquarePen size={18} />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Description Modal */}
      {selectedProductDetails && (
        <DescriptionModel
          isOpen={isDescriptionModelOpen}
          onClose={() => setIsDescriptionModelOpen(false)}
          description={selectedProductDetails.name} // Passing product name as the description
          selectedProductId={selectedProductId} // Pass product ID for Description modal
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Deletecanteens
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDelete(selectedProductId)} 
        />
      )}
    </div>
  );
};

export default ProductsTable;
