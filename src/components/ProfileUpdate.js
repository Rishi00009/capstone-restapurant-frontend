import React, { useState, useEffect } from 'react';

// Assuming you're fetching the token from localStorage
const ProfileUpdate = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Retrieve the token (e.g., from localStorage or context)
  const userToken = localStorage.getItem('userToken');  // Adjust if your token is stored differently

  useEffect(() => {
    if (!userToken) {
      setError('You must be logged in to update your profile');
    }
    // Optionally, fetch user data here using the userToken if needed
  }, [userToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make sure userToken is available before sending API request
      if (!userToken) {
        setError('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,  // Send the token as part of the Authorization header
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update profile');

      setLoading(false);
      // Handle successful update (e.g., show a success message, update UI)
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
