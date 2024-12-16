import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold">{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <Link to={`/menu/${restaurant.name}`} className="bg-blue-500 text-white px-3 py-2 rounded mt-3 inline-block">
        View Menu
      </Link>
    </div>
  );
};

export default RestaurantCard;
