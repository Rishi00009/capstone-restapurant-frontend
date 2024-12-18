import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('immediate');
  const [scheduledTime, setScheduledTime] = useState('');
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false); // Modal state for review
  const [review, setReview] = useState('');
  
  // Calculate total price of items in cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Fetch restaurant data and menu
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
      id: Date.now(),
      items: cart,
      totalPrice: calculateTotalPrice(),
      status: 'Preparing',
      deliveryOption,
      scheduledTime,
    };

    setOrder(newOrder);
    setCart([]);
    alert(`Your order has been placed! ${deliveryOption === 'scheduled' ? `Scheduled for: ${scheduledTime}` : 'Immediate delivery'}`);
    
    // Show review modal after placing the order
    setReviewModalOpen(true);
  };

  const handleAddToFavorites = (item) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(item._id)) {
        return prevFavorites.filter((id) => id !== item._id);
      } else {
        return [...prevFavorites, item._id];
      }
    });
  };

  const handleReviewSubmit = () => {
    if (review) {
      console.log(`Review submitted: ${review}`);
      setReviewModalOpen(false);
      setReview(''); // Reset review after submission
    } else {
      alert('Please write a review before submitting.');
    }
  };

  if (error) {
    return <div className="error-message text-red-500 text-center">{error}</div>;
  }

  if (!restaurant) {
    return <div className="loading text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
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
                  <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500">Remove</button>
                </li>
              ))}
            </ul>
            <div className="total-price text-lg font-semibold">
              Total: ₹{calculateTotalPrice()}
            </div>
          </div>
          <div className="delivery-option mt-4">
            <label className="block text-gray-700">Choose Delivery Option:</label>
            <select value={deliveryOption} onChange={(e) => setDeliveryOption(e.target.value)} className="mt-2 p-2 border rounded-md w-full">
              <option value="immediate">Immediate Delivery</option>
              <option value="scheduled">Scheduled Delivery</option>
            </select>

            {deliveryOption === 'scheduled' && (
              <div className="scheduled-time mt-4">
                <label className="block text-gray-700">Select Delivery Date and Time:</label>
                <input type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} className="mt-2 p-2 border rounded-md w-full" />
              </div>
            )}
          </div>
          <div className="text-center mt-2">
            <button onClick={handlePlaceOrder} className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">Place Order</button>
            <button onClick={() => navigate('/payment', { state: { totalAmount: calculateTotalPrice() } })} className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-8">{restaurant.name} - Menu</h1>

        <div className="menu-items-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-item bg-white rounded-lg shadow-lg p-6 hover:shadow-xl">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <div className="mt-4 flex justify-between items-center">
                <button onClick={() => addToCart(item)} className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600">Add to Cart</button>
                <button onClick={() => handleAddToFavorites(item)} className={`px-4 py-2 rounded-md ${favorites.includes(item._id) ? 'bg-yellow-500' : 'bg-gray-500'} text-white`}>
                  {favorites.includes(item._id) ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              rows="4"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button onClick={() => setReviewModalOpen(false)} className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Close</button>
              <button onClick={handleReviewSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
