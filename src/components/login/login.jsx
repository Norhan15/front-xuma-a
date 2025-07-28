import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Recycling } from '@mui/icons-material';

// Import the AuthContext
import { AuthContext } from '../../services/Auth/AuthContext';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();
  setError('');

  try {
    const response = await fetch('https://auth-service-production-e333.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      const userRole = result.data.user.role;
      if (userRole === 'administrator' || userRole === 'moderator') {
        // Estructura correcta del objeto user con userId incluido
        const userData = {
          ...result.data.user,
          userId: result.data.userId // Añade el userId al objeto user
        };

        login(result.data.accessToken, userData);

        if (userRole === 'administrator') {
          navigate('/home');
        } else if (userRole === 'moderator') {
          navigate('/media');
        }
      } else {
        setError('Acceso denegado: Tu rol no tiene permisos para iniciar sesión.');
      }
    } else {
      setError(result.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  } catch (err) {
    console.error('Login error:', err);
    setError('No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.');
  }
};

  return (
    <Grid
      container
      direction={{ xs: 'column', md: 'row' }}
      height="100vh"
      sx={{ overflow: 'hidden', position: 'relative' }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          width: 200,
          height: 200,
          backgroundColor: '#4CAF50',
          borderRadius: '50%',
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 200,
          height: 200,
          backgroundColor: '#4CAF50',
          borderRadius: '50%',
          zIndex: 0
        }}
      />

      {/* Logo centered only on mobile */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4
        }}
      >
        <img
          src="src/assets/logo_xumaa.jpg"
          alt="XUMAA Logo"
          style={{ maxWidth: '250px', height: 'auto' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/250x150/CCCCCC/000000?text=Logo+Not+Found"; }}
        />
      </Box>

      {/* Left column with logo - desktop */}
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ textAlign: 'center', pr: 5 }}>
          <img
            src="src/assets/logo_xumaa.jpg"
            alt="XUMA´A Logo"
            style={{ maxWidth: '700px', height: 'auto' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/700x400/CCCCCC/000000?text=Logo+Not+Found"; }}
          />
        </Box>
      </Grid>

      {/* Right column with form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
            borderRadius: 3,
            zIndex: 1,
            position: 'relative',
            backgroundColor: 'white',
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontWeight: 600,
              color: '#333'
            }}
          >
            Iniciar Sesión
          </Typography>

          <Box sx={{ borderBottom: '2px solid #4CAF50', mb: 3, width: '100%' }} />

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#555' }}>
              Correo Electrónico
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange('email')}
              placeholder="Ingresa tu correo electrónico"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff'
                }
              }}
            />

            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#555' }}>
              Contraseña
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Ingresa tu contraseña"
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" size="small">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: '#4CAF50',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#45a049'
                }
              }}
            >
              Iniciar Sesión
            </Button>
          </Box>

          <Box sx={{ mt: 4, borderBottom: '2px solid #4CAF50', mb: 3, width: '100%' }} />

          <Box sx={{ textAlign: 'center', mt: 3, opacity: 0.6 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Recycling style={{ color: '#fff', fontSize: '1.5rem' }} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginView;