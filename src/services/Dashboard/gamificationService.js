const GAMIFICATION_API_URL = 'https://gamification-service-production.up.railway.app/api/gamification';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0';

export const getCombinedRankings = async (limit = 10) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/rankings/combined?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch rankings');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

export const getUserRanking = async (userId) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/rankings/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user ranking');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user ranking:', error);
    throw error;
  }
};