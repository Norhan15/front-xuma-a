import { Box, Typography, IconButton, Card, Button, Chip, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoIcon from '@mui/icons-material/Videocam';
import DocumentIcon from '@mui/icons-material/Description';
import PresentationIcon from '@mui/icons-material/Slideshow';
import QuizIcon from '@mui/icons-material/Quiz';
import mathImg from '../../assets/Reciclaje.png';
import { useNavigate } from 'react-router-dom';

const AprendamosContenido = () => {
  const navigate = useNavigate();
  
  const handleModifyClick = () => {
    navigate('/aprendamos-formulario');
  };

  const handleBackClick = () => {
    navigate(-1); // Volver a la página anterior
  };

  // Función para obtener el icono según el tipo de contenido
  const getContentIcon = (type) => {
    switch(type) {
      case 'Video': return <VideoIcon fontSize="small" sx={{ mr: 1.5 }} />;
      case 'Documento': return <DocumentIcon fontSize="small" sx={{ mr: 1.5 }} />;
      case 'Presentación': return <PresentationIcon fontSize="small" sx={{ mr: 1.5 }} />;
      case 'Quiz': return <QuizIcon fontSize="small" sx={{ mr: 1.5 }} />;
      default: return <VideoIcon fontSize="small" sx={{ mr: 1.5 }} />;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        p: { xs: 2, md: 4 },
        width: '100%',
      }}
    >
      {/* Header section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        position: 'relative'
      }}>
        <IconButton
          onClick={handleBackClick}
          sx={{
            color: '#399649',
            mr: 2
          }}
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        
        <Typography
          variant="h4"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            textAlign: 'center',
            flex: 1
          }}
        >
          Introducción al reciclaje
        </Typography>
        
        <IconButton
          sx={{
            backgroundColor: '#f1f5f9',
            color: '#1e293b',
            '&:hover': {
              backgroundColor: '#e2e8f0'
            },
            ml: 2
          }}
          aria-label="notificaciones"
        >
          <NotificationsIcon fontSize="medium" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Main content */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 4,
        maxWidth: '1200px',
        mx: 'auto',
        mt: 2
      }}>
        {/* Content Card - Left side */}
        <Card sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderLeft: '4px solid #399649',
          minWidth: 0 // Prevent overflow
        }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography variant="h5" sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              fontSize: '1.5rem'
            }}>
              Fundamentos del Reciclaje
            </Typography>
            
            <Chip 
              label="Video" 
              color="success"
              variant="outlined"
              sx={{ 
                backgroundColor: '#f0f9f0',
                borderColor: '#399649',
                fontWeight: 500
              }}
            />
          </Box>

          {/* Content Media */}
          <Box sx={{
            width: '100%',
            height: { xs: '250px', sm: '350px', md: '400px' },
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            mb: 3,
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src={mathImg}
              alt="Contenido educativo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              display: 'flex',
              alignItems: 'flex-end',
              p: 2
            }}>
              <Typography variant="body2" sx={{ color: 'white' }}>
                15 min • HD
              </Typography>
            </Box>
          </Box>

          {/* Content Description */}
          <Box>
            <Typography variant="subtitle1" sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 1
            }}>
              Descripción
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#334155',
              lineHeight: '1.8',
              whiteSpace: 'pre-line'
            }}>
              Aprende los conceptos básicos del reciclaje y su importancia para el medio ambiente. 
              Este contenido cubre:
              - Tipos de materiales reciclables
              - Proceso de separación de residuos
              - Beneficios ambientales
              - Consejos prácticos para el hogar
            </Typography>
          </Box>

          {/* Metadata */}
          <Box sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 3,
            pt: 2,
            borderTop: '1px solid #e2e8f0'
          }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              <strong>Publicado:</strong> 15 Jul 2023
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              <strong>Autor:</strong> Equipo de Sostenibilidad
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              <strong>Nivel:</strong> Básico
            </Typography>
          </Box>
        </Card>

        {/* Action Panel - Right side */}
        <Box sx={{
          width: { xs: '100%', lg: '300px' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          {/* Content Type Selector */}
          <Card sx={{ 
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="subtitle1" sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 2
            }}>
              Tipo de Contenido
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}>
              {['Video', 'Documento', 'Presentación', 'Quiz'].map((type) => (
                <Button
                  key={type}
                  variant="outlined"
                  fullWidth
                  sx={{
                    justifyContent: 'flex-start',
                    px: 2,
                    py: 1.5,
                    borderColor: type === 'Video' ? '#399649' : '#e2e8f0',
                    backgroundColor: type === 'Video' ? '#f0f9f0' : 'white',
                    color: type === 'Video' ? '#399649' : '#64748b',
                    '&:hover': {
                      borderColor: type === 'Video' ? '#2e7d32' : '#cbd5e1',
                      backgroundColor: type === 'Video' ? '#e6f6e6' : '#f8fafc'
                    }
                  }}
                >
                  {getContentIcon(type)}
                  {type}
                </Button>
              ))}
            </Box>
          </Card>

          {/* Action Buttons */}
          <Card sx={{ 
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="subtitle1" sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 2
            }}>
              Acciones
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<EditIcon />}
                onClick={handleModifyClick}
                sx={{
                  backgroundColor: '#1976d2',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                Editar Contenido
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<DeleteIcon />}
                sx={{
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#fff5f5',
                    borderColor: '#b71c1c'
                  }
                }}
              >
                Eliminar
              </Button>
            </Box>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ 
            p: 2,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="subtitle1" sx={{ 
              color: '#1e293b',
              fontWeight: 600,
              mb: 2
            }}>
              Estadísticas
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748b' }}>Visualizaciones:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>1,245</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748b' }}>Completados:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>892 (72%)</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#64748b' }}>Última modificación:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>5 días</Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AprendamosContenido;