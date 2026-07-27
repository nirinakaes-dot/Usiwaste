import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X , Filter, StoreIcon} from 'lucide-react';

// Sample Data & Mock Fetch
const CATEGORIES = ['Bakery', 'Beverages', 'Prepared Meals', 'Snacks'];
const fetchStores = () => 
  new Promise((res) => setTimeout(() => res(['Naivas', 'Quickmart', 'Mug and Bean', 'Shoprite']), 300));

export default function SearchAndFilterBar({ onFilterChange = () => {} }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [store, setStore] = useState('');
  const [stores, setStores] = useState([]);
  const inputRef = useRef(null);

  //  Fetch store names on mount
  useEffect(() => {
    fetchStores().then(setStores);
  }, []);

  // Notify parent component whenever search or dropdown filters change
  useEffect(() => {
    onFilterChange({ search, category, store });
  }, [search, category, store]);

  return (
    <div className="bg-white p-4 rounded-xl">
      {/* Search Input */}
      <div className="relative flex-1 flex items-center">
        <Search size={18} className="absolute left-4 text-stone-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by product name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent shadow-inner transition-shadow"
        />
        {search && (
          <button
            type="button"
            onClick={() => { setSearch(''); inputRef.current?.focus(); }}
            className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
        <div className="p-4 flex flex-col sm:flex-row gap-2 mb-6 w-full">
      {/*  All Categories Dropdown */}
      <div className="relative flex items-center sm:w-48">
        <Filter className="mr-2 left-4 text-stone-400 pointer-events-none "/>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full appearance-none pl-4 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent shadow-inner transition-shadow cursor-pointer"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <ChevronDown size={18} className="absolute right-3 text-stone-400 pointer-events-none" />
      </div>

      {/*  All Stores Dropdown */}
      <div className="relative flex items-center sm:w-48">
        <StoreIcon className="mr-2 left-4 text-stone-400 pointer-events-none "/> 
        <select
          value={store}
          onChange={(e) => setStore(e.target.value)}
          className="w-full appearance-none pl-4 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent shadow-inner transition-shadow cursor-pointer"
        >
          <option value="">All Stores</option>
          {stores.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <ChevronDown size={18} className="absolute right-3 text-stone-400 pointer-events-none" />
      </div></div>
    </div>
  );
}

