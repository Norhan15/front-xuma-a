const GAMIFICATION_API_URL = 'https://gamification-service-production.up.railway.app/api/gamification';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0';

export const getGlobalQuizRankings = async () => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/quiz-points/rankings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching global quiz rankings');
    return response.json();
  } catch (error) {
    console.error('Error fetching global quiz rankings:', error);
    throw error;
  }
};

export const getWeeklyQuizRankings = async () => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/quiz-points/rankings/weekly`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching weekly quiz rankings');
    return response.json();
  } catch (error) {
    console.error('Error fetching weekly quiz rankings:', error);
    throw error;
  }
};

export const getAgeGroupQuizRankings = async (ageGroup) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/quiz-points/rankings/age-group/${ageGroup}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching age group quiz rankings');
    return response.json();
  } catch (error) {
    console.error('Error fetching age group quiz rankings:', error);
    throw error;
  }
};

export const getUserQuizRanking = async (userId) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/quiz-points/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching user quiz ranking');
    return response.json();
  } catch (error) {
    console.error('Error fetching user quiz ranking:', error);
    throw error;
  }
};