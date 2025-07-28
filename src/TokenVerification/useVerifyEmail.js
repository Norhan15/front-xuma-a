import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../TokenVerification/authService';

export const useVerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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