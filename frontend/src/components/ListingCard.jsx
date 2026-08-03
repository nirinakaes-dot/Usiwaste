import React from 'react';
import { ShoppingCart } from 'lucide-react';

const sampleMeals = [
  {
    id: 1,
    name: 'Muffins',
    category: 'Bakery',
    expiry: '30/07/2026',
    price: 100,
    originalPrice: 150,
    discount: 33,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDaoL5ORzP5iktNjuC62LMmkTgqyF9xP40XvA76XGBQ&s=10',
    inStock: true,
  },
  {
    id: 2,
    name: 'Samosas',
    category: 'Snacks',
    expiry: '26/07/2026',
    price: 60,
    originalPrice: 100,
    discount: 40,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI78Upa2ocz8RUJcl0WSD7h76qb-QYG9AoqYCXDKsLBw&s=10',
    inStock: true,
  },
  {
    id: 3,
    name: 'Chicken Wings',
    category: 'Fresh Food',
    expiry: '26/07/2026',
    price: 200,
    originalPrice: 350,
    discount: 42,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCVeWaI4B1oMLduAPEKiR-UJT5fN2mcJNKW_i-tODDw&s=10',
    inStock: false,
  },
];

function DiscountBadge({ percent }) {
  if (!percent) return null;

  return (
       <span className="absolute top-3 left-3 bg-[#DED97A] text-[#000000] font-['Istok_Web',sans-serif] text-xs font-bold px-2 py-1 rounded-full z-10">
      {percent}% OFF
    </span>
  );
}

export default function ListingCard({ meal, onAdd = () => {} }) {
  const mealsToRender = meal ? [meal] : sampleMeals;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 max-w-5xl">
      {mealsToRender.map((item) => (
        <div key={item.id} className="flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-36 w-full bg-gray-100">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            <DiscountBadge percent={item.discount} />
          </div>

          <div className="flex flex-1 flex-col p-3">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="mt-0.5 text-xs text-gray-500">{item.category}</p>
            <p className="mt-2 text-sm text-gray-500">
              Expiry Date: <span className="font-medium text-red-400">{item.expiry}</span>
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">Ksh {item.price}</span>
              <span className="text-xs text-gray-400 line-through">Ksh {item.originalPrice}</span>
            </div>

            <button
              onClick={() => onAdd(item)}
              disabled={!item.inStock}
              className=" hover:-translate-y-1 transition-all duration-300 mt-3 flex w-full items-center justify-center rounded-full bg-green-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 disabled:cursor-not-allowed disabled:bg-gray-300 cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              {item.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}



