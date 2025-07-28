import { useState, useEffect } from 'react';

const CHALLENGES_API_URL = 'https://quiz-challenge-service-production.up.railway.app/api/quiz/challenges';
const CHALLENGES_VALIDATION_API_URL = 'https://quiz-challenge-service-production.up.railway.app/api/quiz/challenges/pending-validation';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function to get user data from localStorage
const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Generic API request function
const makeRequest = async (endpoint, method = 'GET', body = null) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('Authentication required');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  // Para DELETE, si la respuesta está vacía o es 204, devolvemos un objeto de éxito
  if (method === 'DELETE' && (response.status === 204 || response.headers.get('content-length') === '0')) {
    return { success: true };
  }

  // Para otras respuestas, intentamos parsear como JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  // Si no es JSON, devolvemos un objeto de éxito
  return { success: true };
};

// Servicios de API
export const getAllChallenges = async () => {
  try {
    return await makeRequest(CHALLENGES_API_URL);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }
};

export const getChallengeById = async (challengeId) => {
  try {
    return await makeRequest(`${CHALLENGES_API_URL}/${challengeId}`);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    throw error;
  }
};

export const createChallenge = async (challengeData) => {
  try {
    const user = getUserData();
    const challengeWithCreator = {
      ...challengeData,
      createdBy: user?.userId
    };
    return await makeRequest(CHALLENGES_API_URL, 'POST', challengeWithCreator);
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
};

export const updateChallenge = async (challengeId, challengeData) => {
  try {
    const user = getUserData();
    const challengeWithUpdater = {
      ...challengeData,
      updatedBy: user?.userId
    };
    return await makeRequest(`${CHALLENGES_API_URL}/${challengeId}`, 'PUT', challengeWithUpdater);
  } catch (error) {
    console.error('Error updating challenge:', error);
    throw error;
  }
};

export const deleteChallenge = async (challengeId) => {
  try {
    return await makeRequest(`${CHALLENGES_API_URL}/${challengeId}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting challenge:', error);
    throw error;
  }
};

export const getPendingValidations = async () => {
  try {
    return await makeRequest(CHALLENGES_VALIDATION_API_URL);
  } catch (error) {
    console.error('Error fetching pending validations:', error);
    throw error;
  }
};

export const validateSubmission = async (submissionId, validationData) => {
  try {
    const user = getUserData();
    if (!user?.userId) {
      throw new Error('User information missing for validation');
    }
    
    const validationWithValidator = {
      ...validationData,
      validatorId: user.userId
    };
    
    return await makeRequest(
      `${CHALLENGES_API_URL}/validate/${submissionId}`,
      'POST',
      validationWithValidator
    );
  } catch (error) {
    console.error('Error validating submission:', error);
    throw error;
  }
};

// Hook personalizado
export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [pendingValidations, setPendingValidations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const data = await getAllChallenges();
      setChallenges(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchChallenge = async (challengeId) => {
    try {
      setLoading(true);
      const data = await getChallengeById(challengeId);
      setCurrentChallenge(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addChallenge = async (challengeData) => {
    try {
      setLoading(true);
      const newChallenge = await createChallenge(challengeData);
      setChallenges(prev => [...prev, newChallenge]);
      setError(null);
      return newChallenge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editChallenge = async (challengeId, challengeData) => {
    try {
      setLoading(true);
      const updatedChallenge = await updateChallenge(challengeId, challengeData);
      setChallenges(prev => 
        prev.map(challenge => challenge.id === challengeId ? updatedChallenge : challenge)
      );
      setError(null);
      return updatedChallenge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeChallenge = async (challengeId) => {
    try {
      setLoading(true);
      await deleteChallenge(challengeId);
      setChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingValidations = async () => {
    try {
      setLoading(true);
      const data = await getPendingValidations();
      setPendingValidations(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitValidation = async (submissionId, validationData) => {
    try {
      setLoading(true);
      const result = await validateSubmission(submissionId, validationData);
      await fetchPendingValidations();
      setError(null);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchPendingValidations();
  }, []);

  return {
    challenges,
    currentChallenge,
    pendingValidations,
    loading,
    error,
    fetchChallenge,
    addChallenge,
    editChallenge,
    removeChallenge,
    fetchChallenges,
    fetchPendingValidations,
    submitValidation
  };
};