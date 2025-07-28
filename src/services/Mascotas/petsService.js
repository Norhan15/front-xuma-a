const API_BASE_URL = 'https://gamification-service-production.up.railway.app/api/gamification';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0';

export const getAvailablePets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/available`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch pets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

export const createPet = async (petData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(petData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create pet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

export const updatePet = async (petId, petData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/id/${petId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify(petData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update pet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pets/id/${petId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete pet');
    }

    return true;
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};