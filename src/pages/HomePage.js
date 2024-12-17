import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext to check login status

const HomePage = () => {
  const { isLoggedIn, logout } = useAuth(); // Assuming `user` contains user details (like username)
  const [restaurants, setRestaurants] = useState([]);
  const [userName, setUserName] = useState(null); // State to store username

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('http://localhost:3001/api/restaurants');
      const data = await response.json();
      setRestaurants(data);
    };
    fetchRestaurants();
  }, []);

  // Fetch username if the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/user', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // or use context or cookies for token
            }
          });
          const data = await response.json();
          setUserName(data.username); // Assuming the API returns user data with a 'username' field
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      };

      fetchUser();
    }
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Dynamic Login/Signup buttons */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <h2 className="text-xl font-bold text-gray-800">Food App</h2>
        <div className="space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-800">Welcome, {userName || 'User'}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Welcome to Our Food App</h1>

        {/* Restaurant List */}
        <div className="restaurants-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="restaurant-card bg-white rounded-lg shadow-lg p-6 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-800">{restaurant.name}</h3>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <p className="text-gray-600">{restaurant.address}</p>
              <p className="text-gray-600">Phone: {restaurant.phone}</p>
              <p className="text-gray-600">Price Range: {restaurant.priceRange}</p>
              <p className="text-gray-600">Rating: {restaurant.rating}</p>
              
              {/* Display restaurant image if available */}
              {restaurant.menu[0]?.image && (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="mt-4 w-full h-48 object-cover rounded-md"
                />
              )}

              <div className="mt-4">
                <Link
                  to={`/restaurant/${restaurant._id}/menu`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                  View Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
