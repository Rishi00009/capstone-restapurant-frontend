import React, { useState } from 'react';
import axios from 'axios';

function OrderForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://your-heroku-app-url.com/api/orders', {
      name,
      address,
      phone,
      order
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label>
          Address:
          <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          Order:
          <select value={order} onChange={(event) => setOrder(event.target.value)}>
            <option value="">Select an order</option>
            {/* options will be populated from the API */}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OrderForm;