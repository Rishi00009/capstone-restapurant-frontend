import React, { useEffect, useState } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Menu</h1>
      
      {menuItems.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-lg p-6">
              <img
                src={item.image || 'default-image.jpg'} // Default image if no image is available
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-gray-800 font-bold mb-4">Price: ₹{item.price.toFixed(2)}</p>

              <div className="text-sm text-gray-500">
                
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Ingredients:</strong> {item.ingredients}</p>
              </div>

              <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-200">
                Order Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No menu items available.</p>
      )}
    </div>
  );
};

export default Menu;
