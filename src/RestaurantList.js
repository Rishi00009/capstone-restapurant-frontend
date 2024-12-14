import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get('/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant._id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;