import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../TokenVerification/authService';

export const useVerifyEmail = () => {
  const { token: routeToken } = useParams(); // Token desde la ruta (/confirm-email/:token)
  const [searchParams] = useSearchParams(); // Token desde query params (?token=...)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Obtener el token desde query params o desde la ruta
  const token = searchParams.get('token') || routeToken;

  const verify = async () => {
    try {
      setLoading(true);
      await verifyEmail(token);
      setSuccess(true);
      // Redirigir después de 3 segundos si lo deseas
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Error al verificar el email');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      verify();
    } else {
      setError('Token no proporcionado');
      setLoading(false);
    }
  }, [token]);

  return { loading, error, success };
};