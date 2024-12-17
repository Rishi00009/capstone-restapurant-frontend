import React, { useState } from 'react';

const AddRestaurant = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [timing, setTiming] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [menu, setMenu] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRestaurant = {
      name,
      address,
      phone,
      timing,
      cuisine,
      priceRange,
      menu,
    };

    const response = await fetch('http://localhost:3001/api/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRestaurant),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Restaurant created successfully!');
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div>
      <h2>Create a New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Timing"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cuisine Type"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price Range"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <input
          type="text"
          placeholder="Menu"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurant;
