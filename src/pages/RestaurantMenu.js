import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null); // State to store order details
  const [deliveryOption, setDeliveryOption] = useState('immediate'); // Delivery option state
  const [scheduledTime, setScheduledTime] = useState(''); // Scheduled time state
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [newReview, setNewReview] = useState({ rating: 0, text: '' }); // State for new review form
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false); // Flag to check if review is submitted

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/restaurants/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data: ' + response.statusText);
        }
        const data = await response.json();
        setRestaurant(data);
        setMenuItems(data.menu);
        setReviews(data.reviews || []); // Assuming reviews are part of the restaurant data
      } catch (err) {
        setError("Error loading data. Please try again.");
      }
    };

    fetchRestaurantAndMenu();
  }, [restaurantId]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem._id === item._id);
      if (itemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== itemId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (deliveryOption === 'scheduled' && !scheduledTime) {
      alert('Please select a delivery time.');
      return;
    }

    const newOrder = {
      id: Date.now(), // Unique ID for the order
      items: cart,
      totalPrice: calculateTotalPrice(),
      status: 'Preparing', // Initial order status
      deliveryOption, // Delivery option: 'immediate' or 'scheduled'
      scheduledTime, // Scheduled time for delivery
    };

    setOrder(newOrder); // Set the order state
    setCart([]); // Clear the cart
    setIsReviewSubmitted(false); // Reset review submission flag after order is placed
    alert(`Your order has been placed! ${deliveryOption === 'scheduled' ? `Scheduled for: ${scheduledTime}` : 'Immediate delivery'}`);
  };

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
    setScheduledTime(''); // Reset scheduled time when changing delivery option
  };

  const handleDateChange = (e) => {
    setScheduledTime(e.target.value);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmitReview = () => {
    // Ensure review submission only happens after order
    if (!order) {
      alert('Please place an order before submitting a review.');
      return;
    }

    // Simulate moderation: new reviews must be approved before display
    const approvedReview = { ...newReview, id: Date.now(), approved: false };
    setReviews((prevReviews) => [...prevReviews, approvedReview]);

    // Clear review form and mark review as submitted
    setNewReview({ rating: 0, text: '' });
    setIsReviewSubmitted(true); // Flag to indicate review has been submitted
    alert('Your review has been submitted and is under moderation.');
  };

  if (error) {
    return <div className="error-message text-red-500 text-center">{error}</div>;
  }

  if (!restaurant) {
    return <div className="loading text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* Order Details */}
      {order ? (
        <div className="order-details fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4">
          <div className="order-info text-lg text-gray-700 text-center">
            Order #{order.id} - Status: {order.status}
          </div>
          <div className="order-items mt-2">
            <ul className="text-sm">
              {order.items.map((item) => (
                <li key={item._id} className="flex justify-between mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="total-price text-lg font-semibold">
              Total: ₹{order.totalPrice}
            </div>
            <div className="delivery-time mt-2">
              {order.deliveryOption === 'scheduled' ? (
                <p>Scheduled Delivery Time: {order.scheduledTime}</p>
              ) : (
                <p>Immediate Delivery</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Cart Display at the top
        <div className="cart-container fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4">
          <div className="cart-info text-lg text-gray-700 text-center">
            Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </div>
          <div className="cart-details mt-2">
            <ul className="text-sm">
              {cart.map((item) => (
                <li key={item._id} className="flex justify-between mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-price text-lg font-semibold">
              Total: ₹{calculateTotalPrice()}
            </div>
          </div>
          {/* Delivery Option Selection */}
          <div className="delivery-option mt-4">
            <label className="block text-gray-700">Choose Delivery Option:</label>
            <select
              value={deliveryOption}
              onChange={handleDeliveryOptionChange}
              className="mt-2 p-2 border rounded-md w-full"
            >
              <option value="immediate">Immediate Delivery</option>
              <option value="scheduled">Scheduled Delivery</option>
            </select>

            {deliveryOption === 'scheduled' && (
              <div className="scheduled-time mt-4">
                <label className="block text-gray-700">Select Delivery Date and Time:</label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={handleDateChange}
                  className="mt-2 p-2 border rounded-md w-full"
                />
              </div>
            )}
          </div>

          <div className="text-center mt-2">
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">{restaurant.name} - Menu</h1>

        {/* Menu Items */}
        <div className="menu-items-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <p className="text-gray-500">{item.nutritionalInfo}</p>
              <p className="text-gray-500">Category: {item.category}</p>
              <div className="mt-4">
                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Review Form - Display only if the order is placed */}
        {order && !isReviewSubmitted && (
          <div className="review-form mt-6">
            <h3 className="text-lg font-semibold">Leave a Review</h3>
            <div className="mt-4">
              <label className="block text-gray-700">Rating:</label>
              <select
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                className="mt-2 p-2 border rounded-md w-full"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && 's'}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Review:</label>
              <textarea
                name="text"
                value={newReview.text}
                onChange={handleReviewChange}
                className="mt-2 p-2 border rounded-md w-full"
                rows="4"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSubmitReview}
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* Display Reviews */}
        <div className="reviews mt-6">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <div className="mt-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                review.approved && (
                  <div key={review.id} className="review border-b py-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                      <p className="ml-2 text-sm text-gray-500">Rating: {review.rating} stars</p>
                    </div>
                    <p className="text-gray-700 mt-2">{review.text}</p>
                  </div>
                )
              ))
            ) : (
              <p>No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
