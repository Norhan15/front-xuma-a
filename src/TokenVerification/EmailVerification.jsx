import {
  Box,
  Typography,
  CircularProgress,
  Button,
  useTheme,
  Container
} from '@mui/material';
import { useVerifyEmail } from '../TokenVerification/useVerifyEmail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const { loading, error, success } = useVerifyEmail();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: { xs: 2, sm: 3 },
        backgroundColor: '#f8f9fa'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '500px',
          p: { xs: 2.5, sm: 3.5, md: 4 },
          backgroundColor: 'background.paper',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 3 }
        }}
      >
        {/* Estado de carga */}
        {loading && (
          <Box sx={{ width: '100%' }}>
            <CircularProgress 
              size={64} 
              thickness={4}
              sx={{ 
                color: theme.palette.primary.main, 
                mb: { xs: 1.5, sm: 2 }
              }}
            />
            <Typography 
              variant="h5" 
              component="h1"
              sx={{ 
                color: 'text.primary',
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: '1.4rem', sm: '1.5rem' }
              }}
            >
              Verificando tu email...
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                maxWidth: '90%',
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Estamos confirmando tu dirección de correo electrónico.
            </Typography>
          </Box>
        )}

        {/* Estado de éxito */}
        {success && (
          <Box sx={{ width: '100%' }}>
            <CheckCircleIcon 
              sx={{ 
                fontSize: { xs: 60, sm: 72 },
                color: 'success.main',
                mb: { xs: 1.5, sm: 2 }
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                color: 'success.main',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.6rem', sm: '2rem' }
              }}
            >
              ¡Verificación exitosa!
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                mb: 3,
                maxWidth: '90%',
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Tu dirección de correo ha sido verificada correctamente.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="success"
              onClick={() => navigate('/login')}
              sx={{
                mt: 1,
                py: 1.25,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                maxWidth: '280px',
                mx: 'auto'
              }}
            >
              Continuar al login
            </Button>
          </Box>
        )}

        {/* Estado de error */}
        {error && (
          <Box sx={{ width: '100%' }}>
            <ErrorIcon 
              sx={{ 
                fontSize: { xs: 60, sm: 72 },
                color: 'error.main',
                mb: { xs: 1.5, sm: 2 }
              }} 
            />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{ 
                color: 'error.main',
                fontWeight: 700,
                mb: 1,
                fontSize: { xs: '1.6rem', sm: '2rem' }
              }}
            >
              Error en la verificación
            </Typography>
            <Typography 
              variant="body1"
              sx={{ 
                color: 'text.secondary',
                mb: 3,
                maxWidth: '90%',
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              {error}
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2,
                width: '100%',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  px: 3,
                  minWidth: { xs: '100px', sm: '120px' },
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                Reintentar
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/')}
                sx={{
                  px: 3,
                  minWidth: { xs: '100px', sm: '120px' },
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                Volver al inicio
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default EmailVerification;