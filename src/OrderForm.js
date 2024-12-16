import React, { useState, useEffect } from 'react';
import axiosInstance from './components/api/axiosInstance';  // Adjust path if needed


function OrderForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/menu')  // Make sure this is the correct endpoint
      .then(response => {
        console.log(response.data);
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance.post('/api/orders', { name, address, phone, order: selectedOrder })
      .then(response => {
        console.log('Order submitted:', response.data);
        setName('');
        setAddress('');
        setPhone('');
        setSelectedOrder('');
      })
      .catch(error => {
        console.error('Error submitting order:', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Order Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Order</label>
          <select
            value={selectedOrder}
            onChange={(event) => setSelectedOrder(event.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select an order</option>
            {menuItems.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} - ${item.price}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
