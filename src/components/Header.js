// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <ul className="flex">
          <li className="mr-4">
            <a href="#" className="text-white hover:text-gray-300">
              Login
            </a>
          </li>
          <li className="mr-4">
            <a href="#" className="text-white hover:text-gray-300">
              Signup
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;