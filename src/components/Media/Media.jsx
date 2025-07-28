import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const SeleccionarTipoArchivo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Opciones disponibles con tipos específicos para la API
  const opciones = [
    { 
      id: 1,
      titulo: "Video", 
      descripcion: "Sube un archivo de video", 
      icono: <VideocamIcon fontSize="large" color="primary" />,
      color: theme.palette.primary.main,
      tipo: "video" // Valor para la API
    },
    { 
      id: 2,
      titulo: "Imagen", 
      descripcion: "Sube una imagen o fotografía", 
      icono: <ImageIcon fontSize="large" color="secondary" />,
      color: theme.palette.secondary.main,
      tipo: "image" // Valor para la API
    },
    { 
      id: 3,
      titulo: "Documento", 
      descripcion: "Sube un PDF, Word o similar", 
      icono: <DescriptionIcon fontSize="large" style={{ color: '#4caf50' }} />,
      color: '#4caf50',
      tipo: "document" // Valor para la API
    },
    { 
      id: 4,
      titulo: "Audio", 
      descripcion: "Sube un archivo de audio", 
      icono: <AudiotrackIcon fontSize="large" style={{ color: '#ff9800' }} />,
      color: '#ff9800',
      tipo: "audio" // Valor para la API
    },
    { 
      id: 5,
      titulo: "Otro", 
      descripcion: "Otro tipo de archivo", 
      icono: <MoreHorizIcon fontSize="large" style={{ color: '#9e9e9e' }} />,
      color: '#9e9e9e',
      tipo: "other" // Valor para la API
    }
  ];

  const handleSeleccion = (tipo) => {
    // Navegar a la vista de medios con el tipo seleccionado
    navigate(`/media/${tipo}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fffffff1',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
        justifyContent: 'center',
        marginTop: { xs: '10px', sm: 0 },
        px: { xs: 2, md: 14 }
      }}
    >
      {/* Header section */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto'
      }}>
        <Typography
          variant="h4"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          Aprendamos
        </Typography>
        <IconButton
          sx={{
            backgroundColor: '#f1f5f9',
            color: '#1e293b',
            '&:hover': {
              backgroundColor: '#e2e8f0'
            }
          }}
          aria-label="notificaciones"
        >
          <NotificationsIcon fontSize="medium" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Sección de selección */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#399649',
              fontWeight: 600,
              fontSize: '1.4rem'
            }}
          >
            Selecciona el tipo de archivo a subir
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
            Elige una de las siguientes opciones según el tipo de contenido que deseas compartir
          </Typography>
        </Box>

        {/* Grid de opciones */}
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {opciones.map((opcion) => (
            <Grid item xs={12} sm={6} md={4} key={opcion.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                onClick={() => handleSeleccion(opcion.tipo)}
                sx={{
                width: '260px',
                height: '180px',
                  maxWidth: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    cursor: 'pointer'
                  },
                  borderLeft: `4px solid ${opcion.color}`
                }}
              >
                <CardContent sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  textAlign: 'center'
                }}>
                  {opcion.icono}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#1e293b',
                      fontSize: '1.1rem'
                    }}
                  >
                    {opcion.titulo}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#64748b',
                      fontSize: '0.875rem'
                    }}
                  >
                    {opcion.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SeleccionarTipoArchivo;