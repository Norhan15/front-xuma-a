const API_BASE_URL = 'https://content-service-xumaa-production.up.railway.app/api/content';

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

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      errorData
    });
    throw new Error(errorData.message || errorData.error || `Error ${response.status}`);
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

// Obtener los contenidos de una categoría específica
export const getCategoryContents = async (categoryId) => {
  try {
    const responseData = await makeRequest(`/by-topic/${categoryId}`);

    // Manejar diferentes estructuras de respuesta
    if (Array.isArray(responseData)) {
      return responseData;
    } else if (responseData.data && Array.isArray(responseData.data)) {
      return responseData.data;
    } else if (responseData.items && Array.isArray(responseData.items)) {
      return responseData.items;
    } else {
      console.warn('Unexpected API response structure:', responseData);
      return [];
    }
  } catch (error) {
    console.error('Error fetching category contents:', error);
    throw error;
  }
};

// Obtener detalles de una categoría específica
export const getCategoryDetails = async (categoryId) => {
  try {
    const responseData = await makeRequest(`/topics/${categoryId}`);
    return responseData.data;
  } catch (error) {
    console.error('Error fetching category details:', error);
    throw error;
  }
};

// Crear un nuevo contenido
export const createContent = async (contentData) => {
  try {
    // Validar que el topic_id esté presente
    if (!contentData.topic_id) {
      throw new Error('El topic_id es requerido');
    }

    const user = getUserData();
    const requestBody = {
      title: contentData.title,
      description: contentData.description,
      content_type: contentData.content_type || 'ARTICLE',
      topic_id: contentData.topic_id, // Mantener topic_id aunque no esté en el ejemplo
      main_media_id: contentData.main_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      thumbnail_media_id: contentData.thumbnail_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      difficulty_level: contentData.difficulty_level || 'BEGINNER',
      target_age_min: parseInt(contentData.target_age_min) || 8,
      target_age_max: parseInt(contentData.target_age_max) || 18,
      reading_time_minutes: parseInt(contentData.reading_time_minutes) || 0,
      duration_minutes: parseInt(contentData.duration_minutes) || 0,
      is_downloadable: Boolean(contentData.is_downloadable),
      is_featured: Boolean(contentData.is_featured),
      is_published: Boolean(contentData.is_published),
      published_at: contentData.is_published ? new Date().toISOString() : null,
      metadata: contentData.metadata || {}
    };

    console.log('Sending content data:', requestBody);
    return await makeRequest('', 'POST', requestBody);
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

// Actualizar un contenido existente
export const updateContent = async (id, contentData) => {
  try {
    // Validar campos requeridos
    if (!contentData.title || !contentData.description) {
      throw new Error('Title and description are required');
    }

    const user = getUserData();
    const requestBody = {
      title: contentData.title,
      description: contentData.description,
      content_type: contentData.content_type || 'ARTICLE',
      main_media_id: contentData.main_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      thumbnail_media_id: contentData.thumbnail_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      difficulty_level: contentData.difficulty_level || 'BEGINNER',
      target_age_min: contentData.target_age_min || 8,
      target_age_max: contentData.target_age_max || 18,
      reading_time_minutes: contentData.reading_time_minutes || 1,
      duration_minutes: contentData.duration_minutes || 1,
      is_downloadable: Boolean(contentData.is_downloadable),
      is_featured: Boolean(contentData.is_featured),
      is_published: Boolean(contentData.is_published),
      updated_by: user?.userId // Incluye el ID del usuario que actualiza el contenido
    };

    return await makeRequest(`/${id}`, 'PUT', requestBody);
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

// Eliminar un contenido
export const deleteContent = async (id) => {
  try {
    // Hacer la petición DELETE usando la función genérica
    const result = await makeRequest(`/${id}`, 'DELETE');
    
    // Si la función makeRequest completó sin errores, significa que fue exitoso
    return { success: true, data: result };

  } catch (error) {
    console.error('Error deleting content:', error);
    throw error;
  }
};