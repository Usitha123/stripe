'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, SquarePen, Trash2 } from "lucide-react";
import Deletecanteens from '@/app/admindashboard/Products/Deleteproduct/deleteproduct';
import DescriptionModel from '@/app/admindashboard/Products/Descriptionmodal/page';
import { supabase } from "@/lib/supabase"; 

const ProductsTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isDescriptionModelOpen, setIsDescriptionModelOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [products, setProducts] = useState([]);
  
    // Fetch products from Supabase
    useEffect(() => {
      const fetchProducts = async () => {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          console.error("Error fetching products:", error);
        } else {
          setProducts(data);
        }
      };
  
      fetchProducts();
    }, []);
  

    const handleDelete = async (id) => {
      try {
          const { data, error } = await supabase
              .from('products')  // Replace with your table name
              .delete()
              .eq('id', id);
  
          if (error) {
              console.error('Error deleting row:', error);
              return;
          }
  
          console.log('Deleted row:', data);
          
          // Optionally update state after deletion
          setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
  
      } catch (err) {
          console.error('Unexpected error:', err);
      } finally {
          setIsDeleteModalOpen(false);
      }
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
      {/* Add Products Button */}
      <div className="mb-4 flex justify-end">
        <Link
          href="/admindashboard/Products/Addproducts"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#3B3737] text-[#77FF95] border border-[#77FF95] rounded-xl hover:bg-black transition"
        >
          <span>Add Products</span>
          <PlusCircle size={20} />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-auto max-w-[75vw] lg:max-w-full rounded-xl">
        <table className="w-full text-sm text-left text-gray-400 bg-[#2B2623] rounded-xl">
          <thead className="text-gray-900 bg-[#77FF95]">
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          
          <tbody>
          {products.map((product) => (
              <tr key={product.id}  className="border-b border-gray-700">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.product_name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.company}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDescriptionClick(product)}
                    className="text-orange-400 hover:underline"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">fd</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2 ">{product.status ? "Available" : "Out of Stock"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href="/admindashboard/Products/Updateproduct" className="ml-2">
                    <SquarePen size={18} />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
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
          name={selectedProductDetails.product_name} // Passing product name as the name
          description={selectedProductDetails.description} // Passing product name as the description
          selectedProductId={selectedProductDetails.id} // Pass product ID for Description modal
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
