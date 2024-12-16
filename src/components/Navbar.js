import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
      {isAuthenticated && (
        <>
          <Link to="/restaurants">Restaurants</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
