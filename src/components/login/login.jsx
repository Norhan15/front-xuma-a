import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormHelperText,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Recycling } from '@mui/icons-material';
import logoXumaa from '../../assets/logo_xumaa.jpg';
import useLogin from './LoginService';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { handleLogin, loading, error, fieldErrors } = useLogin();
  
  // Estado local para el error Snackbar
  const [showError, setShowError] = useState(false);

  // Efecto para mostrar errores
  useEffect(() => {
    if (error && error.open) {
      setShowError(true);
    }
  }, [error]);

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(formData);
  };

  return (
    <Grid container direction={{ xs: 'column', md: 'row' }} height="100vh" sx={{ overflow: 'hidden', position: 'relative' }}>
      {/* Elementos decorativos de fondo */}
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

      {/* Logo móvil */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4
        }}
      >
        <img
          src={logoXumaa}
          alt="XUMA'A Logo"
          style={{ maxWidth: '250px', height: 'auto' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/250x150/CCCCCC/000000?text=Logo+Not+Found"; }}
        />
      </Box>

      {/* Columna del logo para desktop */}
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
            src={logoXumaa}
            alt="XUMA'A Logo"
            style={{ maxWidth: '700px', height: 'auto' }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/700x400/CCCCCC/000000?text=Logo+Not+Found"; }}
          />
        </Box>
      </Grid>

      {/* Columna del formulario */}
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
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
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
              placeholder="ejemplo@dominio.com"
              error={fieldErrors.email.error}
              disabled={loading}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff'
                }
              }}
            />
            {fieldErrors.email.error && (
              <FormHelperText error sx={{ mb: 2, mt: -1 }}>
                {fieldErrors.email.message}
              </FormHelperText>
            )}

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
              error={fieldErrors.password.error}
              disabled={loading}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#fff'
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      onClick={handleClickShowPassword} 
                      edge="end" 
                      size="small"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {fieldErrors.password.error && (
              <FormHelperText error sx={{ mb: 2, mt: -1 }}>
                {fieldErrors.password.message}
              </FormHelperText>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: loading ? '#e0e0e0' : '#4CAF50',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                color: loading ? '#999' : 'white',
                '&:hover': { 
                  backgroundColor: loading ? '#e0e0e0' : '#45a049' 
                },
                '&:disabled': { 
                  backgroundColor: '#e0e0e0',
                  color: '#999'
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} sx={{ color: '#999' }} />
                  Verificando...
                </Box>
              ) : (
                'Iniciar Sesión'
              )}
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

      {/* Sistema de errores personalizado */}
      <Snackbar
        open={showError && error && error.open}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity={error?.severity || 'error'}
          sx={{ width: '100%' }}
        >
          {error?.message || 'Error desconocido'}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LoginView;