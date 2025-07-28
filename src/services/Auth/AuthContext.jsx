import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Estado mejorado que verifica tanto token como usuario
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    
    return {
      authToken: token,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token && !!user // Solo autenticado si ambos existen
    };
  });

  const navigate = useNavigate();

  // Función login actualizada
  const login = (token, userData) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setAuthState({
      authToken: token,
      user: userData,
      isAuthenticated: true
    });
  };

  // Función logout actualizada
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAuthState({
      authToken: null,
      user: null,
      isAuthenticated: false
    });
    navigate('/login');
  };

  // Verificar autenticación al cargar
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // Aquí puedes agregar una verificación con el backend si es necesario
          // const isValid = await verifyTokenWithBackend(token);
          // if (!isValid) logout();
        } catch (error) {
          logout();
        }
      }
    };
    verifyAuth();
  }, []);

  const contextValue = {
    ...authState,
    login,
    logout,
    isAdmin: authState.user?.role === 'administrator',
    isModerator: authState.user?.role === 'moderator'
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};