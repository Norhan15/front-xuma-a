const API_BASE_URL = 'https://auth-service-production-e333.up.railway.app/api/auth';
const STATIC_TOKEN = 'tu-token-de-autenticacion'; // Solo si el endpoint lo requiere

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify-email/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${STATIC_TOKEN}`, // Descomenta si es necesario
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al verificar el email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};