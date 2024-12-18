import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm'; // Import the payment form component

const PaymentPage = () => {
  // Get the location object to access the passed state
  const location = useLocation();
  
  // Retrieve the totalAmount from the location's state, with a fallback of 0 if it's not available
  const { totalAmount } = location.state || { totalAmount: 0 };

  // Check if the totalAmount is present and valid
  if (!totalAmount || totalAmount <= 0) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Error</h1>
        <p className="text-center text-gray-600">Invalid amount. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">Payment</h1>
      
      <div className="payment-form">
        <h2 className="text-xl text-gray-800">Payment Details</h2>
        {/* Display the total amount */}
        <p className="mb-6 text-gray-700">Amount to pay: ₹{totalAmount}</p>
        
        {/* Include the Payment Form */}
        <PaymentForm amount={totalAmount} handleSuccess={() => alert('Payment successful!')} />
      </div>
    </div>
  );
};

export default PaymentPage;

