const QUIZ_API_BASE_URL = 'https://quiz-challenge-service-production.up.railway.app/api/quiz';
const TOPIC_API_BASE_URL = 'https://content-service-xumaa-production.up.railway.app/api/content/topics';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Helper function for making API requests
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
    console.error('Quiz API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      errorData
    });
    throw new Error(errorData.message || errorData.error || `Error ${response.status}`);
  }

  // For DELETE requests with no content
  if (method === 'DELETE' && (response.status === 204 || response.headers.get('content-length') === '0')) {
    return { success: true };
  }

  // For other responses, try to parse as JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }

  return { success: true };
};

// Topic Services
export const getTopicDetails = async (topicId) => {
  try {
    return await makeRequest(`${TOPIC_API_BASE_URL}/${topicId}`);
  } catch (error) {
    console.error('Error fetching topic details:', error);
    throw error;
  }
};

// Quiz Services
export const getQuizzesByTopic = async (topicId) => {
  try {
    const data = await makeRequest(`${QUIZ_API_BASE_URL}/by-topic/${topicId}`);
    return Array.isArray(data) ? data : (data.items || data.data || []);
  } catch (error) {
    console.error('Error fetching quizzes by topic:', error);
    throw error;
  }
};

export const createQuiz = async (quizData) => {
  try {
    // Validate required fields
    if (!quizData.title || !quizData.description || !quizData.topicId) {
      throw new Error('Title, description and topicId are required');
    }

    console.log('Creating quiz with data:', quizData);
    console.log('Target URL:', QUIZ_API_BASE_URL);
    
    return await makeRequest(QUIZ_API_BASE_URL, 'POST', quizData);
  } catch (error) {
    console.error('Error creating quiz:', error);
    throw error;
  }
};

export const updateQuiz = async (quizId, quizData) => {
  try {
    // Validate required fields
    if (!quizData.title || !quizData.description) {
      throw new Error('Title and description are required');
    }

    return await makeRequest(`${QUIZ_API_BASE_URL}/${quizId}`, 'PUT', quizData);
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
};

export const deleteQuiz = async (quizId) => {
  try {
    return await makeRequest(`${QUIZ_API_BASE_URL}/${quizId}`, 'DELETE');
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
};

export const publishQuiz = async (quizId) => {
  try {
    return await makeRequest(`${QUIZ_API_BASE_URL}/${quizId}/publish`, 'PUT');
  } catch (error) {
    console.error('Error publishing quiz:', error);
    throw error;
  }
};

export const unpublishQuiz = async (quizId) => {
  try {
    return await makeRequest(`${QUIZ_API_BASE_URL}/${quizId}/unpublish`, 'PUT');
  } catch (error) {
    console.error('Error unpublishing quiz:', error);
    throw error;
  }
};