const API_BASE_URL = 'https://media-service-production-6446.up.railway.app/api/media';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

export const getMediaByCategory = async (category, page = 1, limit = 10) => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication required');

  try {
    const response = await fetch(`${API_BASE_URL}/by-category/${category}?page=${page}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Error ${response.status}`);
    }

    const data = await response.json();
    
    return {
      items: Array.isArray(data.data) ? data.data : [],
      total: Number(data.total) || 0,
      page: Number(data.page) || page,
      limit: Number(data.limit) || limit
    };
    
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Modified to accept userId
export const uploadMedia = async (fileData, userId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('No authentication token found. Please log in.');
    throw new Error('No authentication token found.');
  }
  if (!userId) {
    console.error('User ID is required for media upload.');
    throw new Error('User ID is required for media upload.');
  }

  try {
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('category', fileData.category);
    formData.append('isPublic', fileData.isPublic);
    formData.append('tags', JSON.stringify(fileData.tags || []));

    const url = `${API_BASE_URL}/upload/${userId}`; // Dynamically include userId
    console.log(`Attempting to upload media to: ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to upload media (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

export const deleteMedia = async (userId, fileId) => {
  const token = getAuthToken();

  if (!token) {
    console.error('No authentication token found. Please log in.');
    throw new Error('No authentication token found.');
  }

  if (!userId) {
    console.error('User ID is required for media deletion.');
    throw new Error('User ID is required for media deletion.');
  }

  try {
    const url = `${API_BASE_URL}/files/${userId}/${fileId}`;
    console.log(`Attempting to delete media from: ${url}`);
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete media (Status: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting media ${fileId}:`, error);
    throw error;
  }
};
