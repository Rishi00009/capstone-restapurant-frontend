import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UpdateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const { restaurantId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}`);
      const data = await response.json();
      if (response.ok) {
        setRestaurant(data);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

   const handleUpdate = async (restaurantId, updatedData) => {
  try {
    const response = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle successful update
      console.log('Restaurant updated:', data);
    } else {
      // Handle error
      console.error('Error updating restaurant:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div>
      <h2>Update Restaurant</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={restaurant.name || ''}
          onChange={handleChange}
          placeholder="Restaurant Name"
        />
        <input
          type="text"
          name="address"
          value={restaurant.address || ''}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="phone"
          value={restaurant.phone || ''}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="timing"
          value={restaurant.timing || ''}
          onChange={handleChange}
          placeholder="Timing"
        />
        <input
          type="text"
          name="cuisine"
          value={restaurant.cuisine || ''}
          onChange={handleChange}
          placeholder="Cuisine Type"
        />
        <input
          type="text"
          name="priceRange"
          value={restaurant.priceRange || ''}
          onChange={handleChange}
          placeholder="Price Range"
        />
        <input
          type="text"
          name="menu"
          value={restaurant.menu || ''}
          onChange={handleChange}
          placeholder="Menu"
        />
        <button type="submit">Update Restaurant</button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
