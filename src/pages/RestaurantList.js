import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is set up for managing login state

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCuisine, setFilterCuisine] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");

  const { isLoggedIn } = useAuth(); // Fetch login state from context
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/restaurants");
        const data = await response.json();
        if (response.ok) {
          setRestaurants(data);
        } else {
          console.error("Error fetching restaurants:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Dynamic Cuisine Options
  const cuisineOptions = [
    ...new Set(restaurants.map((restaurant) => restaurant.cuisine)),
  ];

  // Filtered Restaurant List
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = searchTerm
      ? restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCuisine = filterCuisine
      ? restaurant.cuisine.toLowerCase() === filterCuisine.toLowerCase()
      : true;
    const matchesRating = filterRating
      ? restaurant.rating >= parseFloat(filterRating)
      : true;
    const matchesPriceRange = filterPriceRange
      ? restaurant.priceRange === filterPriceRange
      : true;

    return matchesSearch && matchesCuisine && matchesRating && matchesPriceRange;
  });

  const handleViewMenu = (restaurantId) => {
    if (isLoggedIn) {
      navigate(`/restaurants/${restaurantId}/menu`);
    } else {
      alert("Please log in to view the menu and place an order.");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Restaurants
      </h1>

      {/* Filters Section */}
      <div className="filters grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Cuisine Filter */}
        <select
          value={filterCuisine}
          onChange={(e) => setFilterCuisine(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Cuisines</option>
          {cuisineOptions.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>

        {/* Rating Filter */}
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Ratings</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3.5">3.5+ Stars</option>
        </select>

        {/* Price Range Filter */}
        <select
          value={filterPriceRange}
          onChange={(e) => setFilterPriceRange(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Price Ranges</option>
          <option value="₹">₹</option>
          <option value="₹₹">₹₹</option>
          <option value="₹₹₹">₹₹₹</option>
        </select>
      </div>

      {/* Restaurant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {restaurant.name}
            </h2>
            <p className="text-gray-600">{restaurant.cuisine}</p>
            <p className="text-gray-600">Rating: {restaurant.rating} Stars</p>
            <p className="text-gray-600">Price Range: {restaurant.priceRange}</p>
            <button
              onClick={() => handleViewMenu(restaurant._id)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
            >
              View Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
