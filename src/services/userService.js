const API_BASE_URL = 'https://user-service-xumaa-production.up.railway.app/api';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const getUsers = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    const data = await response.json();
    return data.data; // Asegúrate de que la API devuelve los datos en data.data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete user');
    }

    return { success: true, message: 'User deleted successfully' };
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};