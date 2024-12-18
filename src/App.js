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
import PaymentPage from './pages/PaymentPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

function App() {
  return (
    <div className="App">
      <Routes>  
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
        
        {/* Payment Route wrapped with Elements provider */}
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
