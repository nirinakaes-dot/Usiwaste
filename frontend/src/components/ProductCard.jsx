import React from 'react';

// Fallback sample data so the card renders when no `meal` prop is passed.
// Replace with real listings from the API once the feed is wired up.
const sampleMeals = [
  { id: 1, name: 'Muffins', category: 'Bakery', expiry: 'Today 8:00pm', price: 180, originalPrice: 350, quantity: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDaoL5ORzP5iktNjuC62LMmkTgqyF9xP40XvA76XGBQ&s=10' },
  { id: 2, name: 'Chicken Wings', category: 'Fresh Food', expiry: 'Today 7:00pm', price: 120, originalPrice: 250, quantity: 3, image: 'https://placehold.co/400x300/97BC62/17250F?text=Bread' },
  { id: 3, name: 'Beef Samosas (6pk)', category: 'Snacks', expiry: 'Today 6:30pm', price: 90, originalPrice: 180, quantity: 8, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCVeWaI4B1oMLduAPEKiR-UJT5fN2mcJNKW_i-tODDw&s=10' },
];

export default function ProductCard({ meal, onAdd = () => {} }) {
  const mealsToRender = meal ? [meal] : sampleMeals;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mealsToRender.map((item) => (
        <div key={item.id} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="relative h-44 w-full bg-gray-100">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-1 flex-col p-4">
            <h3 className="text-2xl font-semibold text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
            <p className="mt-3 text-sm text-gray-500">
              Expiry Date: <span className="font-medium text-red-400">{item.expiry}</span>
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">Ksh {item.price}</span>
              <span className="text-sm text-gray-400 line-through">Ksh {item.originalPrice}</span>
            </div>

            <div>
                <span>Qty: {item.quantity}</span>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}
    