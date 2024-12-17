// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import { getFavorites, addFavorite, removeFavorite } from '../api/favoritesApi';

const Favorites = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  
  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const fetchedFavorites = await getFavorites(userId);
      setFavorites(fetchedFavorites);
    };
    
    fetchFavorites();
  }, [userId]);

  // Handle adding to favorites
  const handleAddFavorite = async (restaurantId) => {
    const updatedFavorites = await addFavorite(userId, restaurantId);
    setFavorites(updatedFavorites);
  };

  // Handle removing from favorites
  const handleRemoveFavorite = async (restaurantId) => {
    const updatedFavorites = await removeFavorite(userId, restaurantId);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Restaurants</h2>
      <ul>
        {favorites.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          favorites.map((restaurant) => (
            <li key={restaurant._id} className="favorite-item">
              <h3>{restaurant.name}</h3>
              <button onClick={() => handleRemoveFavorite(restaurant._id)}>Remove from Favorites</button>
            </li>
          ))
        )}
      </ul>

      <h3>All Restaurants</h3>
      <div>
        {/* Example of adding a restaurant to favorites */}
        {/* You can replace this with actual restaurant data */}
        <button onClick={() => handleAddFavorite('restaurantId123')}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default Favorites;
