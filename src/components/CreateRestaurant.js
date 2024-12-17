import React, { useState } from 'react';

const CreateRestaurant = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = async (newRestaurantData) => {
  try {
    const response = await fetch('http://localhost:3001/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurantData),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle successful creation
      console.log('Restaurant created:', data);
    } else {
      // Handle error
      console.error('Error creating restaurant:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
    <div>
      <h2>Create a New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cuisine Type</label>
          <input
            type="text"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hours of Operation</label>
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRestaurant;
