import React, { useState } from 'react';
import { Package, X, Calendar, Tag, Layers } from 'lucide-react';
import { createListing } from "../../services/listings";

const CATEGORIES = [
  'Bakery',
  'Dairy',
  'Pastry',
  'Dessert',
  'Meat',
  'Prepared meals',
  'Snacks',
  'Beverages',
  'Other',
];

export default function AddProductForm({ isOpen, onClose, onProductAdded }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    category: 'Bakery',
    quantity: 1,
    originalPrice: 0,
    discountPrice: 0,
    expiryDate: '',
    imageUrl: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['quantity', 'originalPrice', 'discountPrice'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        item_name: formData.productName,
        description: formData.description || undefined,
        quantity: Number(formData.quantity),
        original_price: Number(formData.originalPrice),
        discounted_price: Number(formData.discountPrice),
        pickup_deadline: `${formData.expiryDate}T23:59:59`,
      };

      const r = await createListing(payload);

      if (!r.ok) {
        alert(r.data?.error || "Failed to add product");
        return;
      }

      onProductAdded?.(r.data); // pass the real saved listing back up
      onClose?.();
    } catch (error) {
      console.error('Failed to add product:', error);
      alert("An unexpected error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
              <p className="text-xs text-gray-500">Fill in details to list a new item in the database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="productName"
                  required
                  placeholder="e.g. Fresh Artisan Sourdough"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Original Price (Ksh) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-gray-400">Ksh</span>
                <input
                  type="number"
                  name="originalPrice"
                  min="0"
                  required
                  placeholder="0.00"
                  value={formData.originalPrice || ''}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-11 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Discount Price (Ksh) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs font-bold text-gray-400">Ksh</span>
                <input
                  type="number"
                  name="discountPrice"
                  min="0"
                  required
                  placeholder="0.00"
                  value={formData.discountPrice || ''}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-11 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Image URL <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Description <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief description of the product..."
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-700 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Adding to DB...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}