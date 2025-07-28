const TOPICS_API_BASE_URL = 'https://content-service-xumaa-production.up.railway.app/api/content/topics';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const getAllTopics = async () => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${TOPICS_API_BASE_URL}`, {
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

    return await response.json();
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};
