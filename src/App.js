import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing
import HomePage from './pages/HomePage';
import Signup from './components/Signup';
import RestaurantList from './pages/RestaurantList';
import './App.css';  // Ensure your styles are applied
import LoginPage from './components/Login';
import RestaurantMenu from './pages/RestaurantMenu';
import ProfileUpdate from './components/ProfileUpdate';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="App">
      <Routes>  {/* Wrap the routes with the Routes component */}
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        
        {/* Dynamic route for restaurant menu */}
        <Route path="/restaurant/:restaurantId/menu" element={<RestaurantMenu />} />

        {/* Profile update */}
        <Route path="/profile/update" element={<ProfileUpdate />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
