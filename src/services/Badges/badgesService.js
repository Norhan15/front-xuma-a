const GAMIFICATION_API_URL = 'https://gamification-service-production.up.railway.app/api/gamification';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0'; // Your static token

export const getAllBadges = async () => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/badges`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching badges');
    return response.json();
  } catch (error) {
    console.error('Error fetching badges:', error);
    throw error;
  }
};

export const getBadgeById = async (badgeId) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/badges/id/${badgeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching badge');
    return response.json();
  } catch (error) {
    console.error('Error fetching badge:', error);
    throw error;
  }
};

export const createBadge = async (badgeData) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/badges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(badgeData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create badge');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating badge:', error);
    throw error;
  }
};

export const updateBadge = async (badgeId, badgeData) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/badges/id/${badgeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(badgeData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update badge');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating badge:', error);
    throw error;
  }
};

export const deleteBadge = async (badgeId) => {
  try {
    const response = await fetch(`${GAMIFICATION_API_URL}/badges/id/${badgeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete badge');
    }
    return { success: true };
  } catch (error) {
    console.error('Error deleting badge:', error);
    throw error;
  }
};