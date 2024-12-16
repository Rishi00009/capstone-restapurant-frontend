import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import RestaurantList from './pages/RestaurantList';
import RestaurantMenu from './pages/RestaurantMenu';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/:restaurantId/menu" element={<RestaurantMenu />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
