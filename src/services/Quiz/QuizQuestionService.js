const QUIZ_QUESTION_API_BASE_URL = 'https://quiz-challenge-service-production.up.railway.app/api/quiz';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

const makeRequest = async (url, method = 'GET', body = null) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const config = {
    method,
    headers
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  if (method === 'DELETE' && (response.status === 204 || response.headers.get('content-length') === '0')) {
    return { success: true };
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return { success: true };
};

export const getQuizQuestions = async (quizId) => {
  try {
    const data = await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/quiz/${quizId}`);
    return Array.isArray(data) ? data : (data.items || data.data || []);
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};

export const createQuestion = async (questionData) => {
  try {
    if (!questionData.quizId || !questionData.questionText || !questionData.questionType) {
      throw new Error('quizId, questionText and questionType are required');
    }
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions`, 'POST', questionData);
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

export const updateQuestion = async (questionId, questionData) => {
  try {
    if (!questionData.questionText || !questionData.questionType) {
      throw new Error('questionText and questionType are required');
    }
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/${questionId}`, 'PUT', questionData);
  } catch (error) {
    console.error('Error updating question:', error);
    throw error;
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/${questionId}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};

// Crear una opción para una pregunta
export const createQuestionOption = async (questionId, optionData) => {
  try {
    if (!optionData.optionText) {
      throw new Error('optionText is required');
    }
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/${questionId}/options`, 'POST', optionData);
  } catch (error) {
    console.error('Error creating question option:', error);
    throw error;
  }
};

// Actualizar una opción
export const updateQuestionOption = async (optionId, optionData) => {
  try {
    if (!optionData.optionText) {
      throw new Error('optionText is required');
    }
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/options/${optionId}`, 'PUT', optionData);
  } catch (error) {
    console.error('Error updating question option:', error);
    throw error;
  }
};

// Eliminar una opción
export const deleteQuestionOption = async (optionId) => {
  try {
    return await makeRequest(`${QUIZ_QUESTION_API_BASE_URL}/questions/options/${optionId}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting question option:', error);
    throw error;
  }
};