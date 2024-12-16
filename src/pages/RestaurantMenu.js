import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth(); // Use the custom hook to access login state

  useEffect(() => {
    const fetchMenu = async () => {
  try {
    const response = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    const data = await response.json();
    setMenu(data);
  } catch (error) {
    setError(error.message);
  }
};

    fetchMenu();
  }, [restaurantId]);

  const handleOrder = (menuItem) => {
    if (isLoggedIn) {
      alert(`Ordered: ${menuItem.name}`);
    } else {
      alert("Please log in to place an order.");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menu.map((item) => (
          <li key={item._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <button
              onClick={() => handleOrder(item)}
              className="text-white bg-green-500 px-4 py-2 rounded mt-2 hover:bg-green-600"
            >
              Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
