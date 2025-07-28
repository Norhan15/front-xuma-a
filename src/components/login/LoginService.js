import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/Auth/AuthContext';
import validateLoginForm, { initialErrors } from './LoginValidator';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    open: false,
    message: '',
    severity: 'error'
  });
  const [fieldErrors, setFieldErrors] = useState(initialErrors);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const resetFieldErrors = () => {
    setFieldErrors(initialErrors);
  };

  const clearError = () => {
    setError({
      open: false,
      message: '',
      severity: 'error'
    });
  };

  const handleLogin = async (formData) => {
    resetFieldErrors();
    
    const validationError = validateLoginForm(formData);
    if (validationError) {
      setError(validationError);
      
      // Marcar errores en campos específicos
      if (validationError.field) {
        setFieldErrors(prev => ({
          ...prev,
          [validationError.field]: {
            error: true,
            message: validationError.message
          }
        }));
      }
      
      return;
    }

    setLoading(true);
    setError({ ...error, open: false });

    try {
      const response = await fetch('https://auth-service-production-e333.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Manejo de errores específicos del servidor
        let errorMessage = result.message || 'Error al iniciar sesión';
        
        if (response.status === 401) {
          errorMessage = 'Credenciales incorrectas. Por favor verifica tu correo y contraseña';
          setFieldErrors({
            email: { error: true, message: '' },
            password: { error: true, message: errorMessage }
          });
        } else if (response.status === 403) {
          errorMessage = 'Cuenta desactivada o sin permisos';
        } else if (response.status === 429) {
          errorMessage = 'Demasiados intentos. Por favor espera antes de intentar nuevamente';
        }

        throw new Error(errorMessage);
      }

      if (result.success) {
        const userRole = result.data.user.role;
        if (userRole === 'administrator' || userRole === 'moderator') {
          const userData = {
            ...result.data.user,
            userId: result.data.userId
          };

          login(result.data.accessToken, userData);

          if (userRole === 'administrator') {
            navigate('/home');
          } else if (userRole === 'moderator') {
            navigate('/media');
          }
        } else {
          throw new Error('Acceso denegado: Tu rol no tiene permisos para iniciar sesión.');
        }
      } else {
        throw new Error(result.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError({
        open: true,
        message: err.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, fieldErrors, clearError };
};

export default useLogin;