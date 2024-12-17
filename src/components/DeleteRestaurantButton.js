import React from 'react';
import { useHistory } from 'react-router-dom';

const DeleteRestaurantButton = { restaurantId }) => {
  const history = useHistory();

  const handleDelete = async (restaurantId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
      // Handle successful deletion
      console.log('Restaurant deleted:', data);
    } else {
      // Handle error
      console.error('Error deleting restaurant:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
  return <button onClick={handleDelete}>Delete Restaurant</button>;
};

export default DeleteRestaurantButton;
