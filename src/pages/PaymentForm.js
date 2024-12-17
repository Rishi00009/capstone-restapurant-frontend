import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your own Stripe public key
const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    const stripe = await stripePromise;

    // Call your backend to create a payment intent
    const response = await fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name: 'User' },
      },
    });

    if (result.error) {
      // Handle error
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Payment form goes here */}
      <div>
        <h2>Total Amount: ₹{amount}</h2>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
