import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn, favorites, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/restaurants");
        if (!response.ok) {
          throw new Error("Error fetching restaurants");
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Check if the restaurant is in favorites
  const isFavorite = (restaurantId) => favorites.includes(restaurantId);

  const handleFavoriteToggle = (restaurantId) => {
    if (!isLoggedIn) {
      alert('Please log in to add favorites.');
      return;
    }
    if (isFavorite(restaurantId)) {
      removeFavorite(restaurantId);
    } else {
      addFavorite(restaurantId);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Restaurants</h1>

      <input
        type="text"
        placeholder="Search restaurants"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 w-full border rounded-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg"
            onClick={() => handleRestaurantClick(restaurant._id)}
          >
            <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.cuisine}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating when clicking the button
                handleFavoriteToggle(restaurant._id);
              }}
              className={`w-full px-4 py-2 mt-2 rounded ${
                isFavorite(restaurant._id)
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              {isFavorite(restaurant._id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
