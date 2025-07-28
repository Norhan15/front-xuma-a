const API_BASE_URL = 'https://gamification-service-production.up.railway.app/api/gamification';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const getUserStats = async (userId) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/rankings/user-stats/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user stats');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};