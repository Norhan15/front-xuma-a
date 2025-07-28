const API_BASE_URL = 'https://gamification-service-production.up.railway.app/api/gamification';
const STATIC_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNzU4ZGYwNi1hYTQ1LTQxNzEtYjA1MC0yZmRlNWFiOWFlMjQiLCJlbWFpbCI6Im1hcmlmZXJxczIwMDRAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTI0MjMwNTEsImV4cCI6MTc1MjQyNjY1MSwiYXVkIjoieHVtYWEtYXBpIiwiaXNzIjoieHVtYWEtYXV0aCIsInN1YiI6IjI3NThkZjA2LWFhNDUtNDE1MC0yZmRlNWFiOWFlMjQiLCJleHAiOjE3NTI0MjY2NTF9.0CCLtR9WRLZLi2gjFLSvcFpntiyGsE6Om6ow2nisaH0'; // Your static token

export const getPetEvolutionCosts = async (petId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet-evolution-costs/${petId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch evolution costs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching evolution costs:', error);
    throw error;
  }
};

export const createEvolutionCost = async (requestData) => {
  try {
    // Verificamos que requestData tenga los campos necesarios
    if (!requestData || !requestData.petId || !requestData.stage || !requestData.cost) {
      throw new Error('Datos incompletos para crear el costo de evolución');
    }

    const response = await fetch(`${API_BASE_URL}/pet-evolution-costs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify({
        petId: requestData.petId,
        stage: Number(requestData.stage),
        cost: Number(requestData.cost)
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create evolution cost');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating evolution cost:', error);
    throw error;
  }
};

export const updateEvolutionCost = async (petId, stage, costData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet-evolution-costs/${petId}/${stage}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
      body: JSON.stringify({
        petId: petId,
        stage: stage,
        cost: costData.cost
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update evolution cost');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating evolution cost:', error);
    throw error;
  }
};

export const deleteEvolutionCost = async (petId, stage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pet-evolution-costs/${petId}/${stage}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${STATIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete evolution cost');
    }

    return true;
  } catch (error) {
    console.error('Error deleting evolution cost:', error);
    throw error;
  }
};