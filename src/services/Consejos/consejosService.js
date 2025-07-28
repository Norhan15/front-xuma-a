const API_BASE_URL = 'https://content-service-xumaa-production.up.railway.app/api/content';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0'; // Tu token estático

export const getDailyTips = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/all-tips`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch daily tips');
    }

    const data = await response.json();
    return {
      items: data.data || [],
      total: data.total || 0,
      page: data.page || page,
      limit: data.limit || limit
    };
  } catch (error) {
    console.error('Error fetching daily tips:', error);
    throw error;
  }
};

export const createTip = async (tipData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(tipData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create tip');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating tip:', error);
    throw error;
  }
};

export const updateTip = async (tipId, tipData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tips/${tipId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(tipData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update tip');
    }

    return response.json();
  } catch (error) {
    console.error(`Error updating tip ${tipId}:`, error);
    throw error;
  }
};

export const deleteTip = async (tipId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tips/${tipId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete tip');
    }

    return { success: true, message: 'Tip deleted successfully' };
  } catch (error) {
    console.error(`Error deleting tip ${tipId}:`, error);
    throw error;
  }
};