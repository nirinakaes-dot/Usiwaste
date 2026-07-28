import React, { useState, useEffect } from 'react';
import { Package, Clock, CircleCheckBig } from 'lucide-react';

export default function Dashboard() {
//   const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch metrics & items from backend API
//   useEffect(() => {
//     async function fetchInventory() {
//       try {
//         const response = await fetch('/api/store/inventory');
//         const data = await response.json();
//         setItems(data);
//       } catch (err) {
//         console.error("Failed to load inventory", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchInventory();
//   }, []);

  // Compute live dashboard metrics
 const totalAvailable = items
    .filter(i => i.status === 'available')
    .reduce((acc, i) => acc + i.quantity, 0);

  const totalBooked = items
    .filter(i => i.status === 'booked')
    .reduce((acc, i) => acc + i.quantity, 0);

  const totalCollected = items
    .filter(i => i.status === 'collected')
    .reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      {/* Metric KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <Package className="h-6 w-6 text-white bg-yellow-500" />
        <p className="text-3xl font-bold text-slate-900 mt-2">{totalAvailable}</p>
        <p className="text-sm font-medium text-slate-500">Available Items</p>
         </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    </div>
    </div>
    </div>
  );
}