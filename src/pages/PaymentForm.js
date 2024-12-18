import React, { useEffect } from 'react';

const PaymentForm = ({ amount, handleSuccess }) => {
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay Key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Food App',
      description: 'Order Payment',
      handler: function (response) {
        console.log('Payment Response:', response);
        if (response.razorpay_payment_id) {
          handleSuccess();
        } else {
          alert('Payment Failed');
        }
      },
      prefill: {
        name: 'Guest',
        email: 'guest@example.com',
        contact: '9876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Razorpay payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentForm;
