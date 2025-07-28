import { 
  Box,
  Typography,
  Chip,
  useTheme
} from '@mui/material';

const Home = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f8fafc',
        padding: { xs: '20px 16px', md: '40px 24px' },
        boxSizing: 'border-box'
      }}
    >
      {/* Contenedor principal centrado */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Header section - completamente centrado */}
        <Box sx={{ 
          width: '100%',
          textAlign: 'center',
          mb: { xs: 3, md: 6 }
        }}>
          <Typography
            variant="h4"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              lineHeight: 1.2,
              mb: 2
            }}
          >
            ¡Bienvenido a XUMA'A!
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#64748b',
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.5
            }}
          >
            Tu plataforma educativa sobre ecología y sostenibilidad ambiental
          </Typography>
        </Box>

        {/* Contenido principal - centrado con máximo ancho */}
        <Box sx={{
          width: '100%',
          maxWidth: '790 px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Tarjeta de contenido */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '400px',
            border: '2px dashed #e2e8f0',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            textAlign: 'center',
            p: { xs: 3, md: 6 },
            width: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Icono decorativo */}
            <Box sx={{
              fontSize: '4rem',
              mb: 3,
              color: theme.palette.primary.main,
              lineHeight: 1
            }}>
              🌎
            </Box>
            
            <Typography variant="h4" sx={{ 
              mb: 3, 
              fontWeight: 600,
              color: theme.palette.primary.main,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              lineHeight: 1.2
            }}>
              Descubre un mundo de aprendizaje
            </Typography>
            
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 400,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              color: '#64748b',
              lineHeight: 1.5
            }}>
              Explora nuestros recursos educativos
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 4, 
              maxWidth: '500px',
              lineHeight: 1.6,
              color: '#94a3b8',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}>
              XUMAA te ofrece trivias interactivas, artículos educativos, desafíos ecológicos 
              y mucho más para que aprendas sobre cómo cuidar nuestro planeta de manera divertida.
            </Typography>

            {/* Chips decorativos - centrados */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '500px'
            }}>
              <Chip
                label="📚 Aprendamos"
                sx={{
                  backgroundColor: '#e8f5e8',
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              />
              <Chip
                label="🏆 Desafíos"
                sx={{
                  backgroundColor: '#e8f5e8',
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              />
              <Chip
                label="🧠 Trivias"
                sx={{
                  backgroundColor: '#e8f5e8',
                  color: theme.palette.primary.main,
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;