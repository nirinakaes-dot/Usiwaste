import React from 'react'

export default function ListingCard({meal, onAddToCart}) {
    return(
        <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
                <h3>{meal.strMeal}</h3>
                <div>
                        {/* Displays the category of products ie bakery, dairy, desserts, beverages, prepared meals */}
                        {/* NOTE:Card Render may not occur due to variable mismatch */}                    
                    {meal.strCategory && (
                        <span>{meal.MealCategory}</span>
                    )}
                    {/* Displays the expiry date of the meal*/}
                    {meal.strExpiresOn && (
                        <span>{meal.MealExpiresOn}</span>
                    )}
                    <div>
                    {meal.MealDiscountedPrice && (
                        <span>Ksh {meal.MealDiscountedPrice}</span> )
                    }
                    {meal.MealOriginalPrice && (
                        <span>Ksh {meal.MealOriginalPrice}</span>
                    )}
                    </div>
                </div>
                <div>
                    <button onClick={() => onAddToCart(meal)} data-testid= {'meal-'+meal.MealId}>
                        {meal.inStock ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
                    

            </div>
        </div>
    )
}

