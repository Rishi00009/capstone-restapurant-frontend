// src/api/favoritesApi.js
export const getFavorites = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/favorites?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch favorites');
    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addFavorite = async (userId, restaurantId) => {
  try {
    const response = await fetch('http://localhost:3001/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, restaurantId }),
    });
    if (!response.ok) throw new Error('Failed to add favorite');
    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const removeFavorite = async (userId, restaurantId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/favorites/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) throw new Error('Failed to remove favorite');
    const data = await response.json();
    return data.favorites;
  } catch (error) {
    console.error(error);
    return [];
  }
};
