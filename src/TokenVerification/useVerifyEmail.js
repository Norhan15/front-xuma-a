import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../TokenVerification/authService';

export const useVerifyEmail = () => {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    error: null,
    success: false
  });

  // Obtener el token (prioriza query param sobre route param)
  const token = searchParams.get('token') || routeToken;

  const verify = async () => {
    try {
      if (!token) {
        throw new Error('Token de verificación no proporcionado');
      }

      setState(prev => ({ ...prev, loading: true }));
      await verifyEmail(token);
      
      setState({
        loading: false,
        error: null,
        success: true
      });

      // Redirigir después de éxito (opcional)
      setTimeout(() => navigate('/login', { replace: true }), 3000);
    } catch (err) {
      setState({
        loading: false,
        error: err.response?.data?.message || err.message || 'Error al verificar el email',
        success: false
      });
    }
  };

  useEffect(() => {
    // Verificar solo si tenemos token
    if (token) {
      verify();
    } else {
      setState({
        loading: false,
        error: 'Token de verificación no encontrado en la URL',
        success: false
      });
    }
  }, [token]); // Solo se ejecuta cuando token cambia

  return state;
};