import React from 'react';
import { Link } from 'react-router-dom';
import RestaurantList from './RestaurantList';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-lg font-bold">
          <Link to="/" className="hover:text-gray-300">
            Restaurant Site
          </Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const Home = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 min-h-screen py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to our restaurant site!
          </h1>
          <p className="text-gray-600 mb-10">
            Explore our curated list of restaurants and find the perfect meal.
          </p>
          <RestaurantList />
        </div>
      </main>
    </div>
  );
};

export default Home;
