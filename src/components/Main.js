// Main.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Restaurant Menus</h1>
      <div className="grid grid-cols-3 gap-4">
        {restaurants.map(restaurant => (
          <div key={restaurant._id} className="bg-white rounded shadow-md p-4">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-bold mb-2">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;