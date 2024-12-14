import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestaurantDetails({ match }) {
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    axios.get(`https://your-heroku-app-url.com/api/restaurants/${match.params.id}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>
      <ul>
        {restaurant.menu.map(item => (
          <li key={item._id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDetails;