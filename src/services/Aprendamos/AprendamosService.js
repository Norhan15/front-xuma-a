const API_BASE_URL = 'https://content-service-xumaa-production.up.railway.app/api/content';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function to get user data from localStorage
const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getTopics = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/topics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch topics');
    }

    const responseData = await response.json();
    
    if (!responseData.data || !Array.isArray(responseData.data)) {
      console.warn('Unexpected API response structure:', responseData);
      return [];
    }
    
    return responseData.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};

export const createTopic = async (topicData) => {
  const token = getAuthToken();
  const user = getUserData();
  
  if (!token) throw new Error('Authentication required');
  if (!user?.userId) throw new Error('User information missing');

  try {
    const response = await fetch(`${API_BASE_URL}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...topicData,
        created_by: user.userId // Incluye el userId del usuario autenticado
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create topic');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
};

export const updateTopic = async (id, topicData) => {
  const token = getAuthToken();
  const user = getUserData();
  
  if (!token) throw new Error('Authentication required');
  if (!user?.userId) throw new Error('User information missing');

  try {
    const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...topicData,
        updated_by: user.userId // Incluye el userId del usuario autenticado
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update topic');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
};

export const deleteTopic = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete topic');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};