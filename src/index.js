import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import { BrowserRouter } from 'react-router-dom'; // Use BrowserRouter for routing

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>  {/* Use BrowserRouter here for routing */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
