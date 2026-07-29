import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Dashboard from './Dashboard';
import Bookings from './Bookings';
import ProductCard from '../../components/ProductCard';
import AddProductForm from './AddProductForm';

export default function Listings() {
  // State for toggling collapsible sections (Task 1 & Task 2)
  const [isAvailableOpen, setIsAvailableOpen] = useState(true);
  const [isBookedOpen, setIsBookedOpen] = useState(true);

  // State for opening/closing Add Product sidebar (Task 3)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 p-6">
      {/* Header Bar */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Naivas</h1>
          <p className="text-sm font-medium text-gray-500">
            <span>Supermarket</span>
          </p>
        </div>

        {/* Task 3: Add Product Button opens the form */}
        <button
          onClick={() => setIsAddProductOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-2.5 font-semibold text-white shadow-md hover:bg-green-700 active:scale-95 transition-all"
        >
          <Plus className="h-5 w-5 text-white" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Dashboard Metrics */}
      <div className="mb-8">
        <Dashboard />
      </div>

      <div className="space-y-6">
        {/* Task 1: Collapsible Available Items Section */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setIsAvailableOpen((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold text-gray-900">Available Items</h2>
            {isAvailableOpen ? (
              <ChevronUp className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </button>
          
          {isAvailableOpen && (
            <div className="p-6">
              <ProductCard />
            </div>
          )}
        </div>

        {/* Task 2: Collapsible Booked Items Section */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <button
            type="button"
            onClick={() => setIsBookedOpen((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-gray-100 px-6 py-4 text-left transition-colors hover:bg-gray-50"
          >
            <h2 className="text-xl font-bold text-gray-900">Booked Items</h2>
            {isBookedOpen ? (
              <ChevronUp className="h-6 w-6 text-gray-500" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-500" />
            )}
          </button>
          
          {isBookedOpen && (
            <div className="p-6">
              <Bookings />
            </div>
          )}
        </div>
      </div>

      {/* Task 3: Add Product Form Slide-Over Drawer on the Right Side */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-xl bg-white shadow-2xl">
              <AddProductForm
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onProductAdded={(formData) => {
                  console.log('New product added:', formData);
                  setIsAddProductOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}