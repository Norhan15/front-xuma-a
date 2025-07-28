import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import mathImg from '../../assets/Reciclaje.png';
import { useAprendamos } from './../Aprendamos/useAprendamos';

const Aprendamos = () => {
  const {
    categories,
    loading,
    error
  } = useAprendamos();

  const navigate = useNavigate();

  const handleCardClick = (categoryId) => {
    navigate(`/trivias-categorias/${categoryId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error al cargar las categorías: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#fffffff1',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
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
        mb: 2,
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
          Trivias
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

      {/* Categories section */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          width: '100%'
        }}>
          <Typography
            variant="h5"
            sx={{
              color: '#399649',
              fontWeight: 600,
              fontSize: '1.4rem'
            }}
          >
            Explora categorías
          </Typography>
        </Box>

        {/* Contenedor principal para centrar las cards */}
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Grid container - Primera fila */}
          <Grid container spacing={3} sx={{ 
            mb: 3, 
            width: '100%',
            maxWidth: '900px',
            justifyContent: 'center'
          }}>
            {categories.slice(0, 3).map((category) => (
              <Grid item xs={12} sm={4} key={category.id} sx={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Card 
                  sx={{
                    width: '260px',
                    height: '220px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.icon_url !== "string" ? category.icon_url : mathImg}
                    alt={category.name}
                    sx={{
                      height: '140px',
                      width: '100%',
                      objectFit: 'cover',
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px'
                    }}
                    onClick={() => handleCardClick(category.id)}
                  />
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    px: 1.5,
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: category.color_hex,
                      borderBottomLeftRadius: '12px',
                      borderBottomRightRadius: '12px'
                    }
                  }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        maxWidth: '80%',
                        textAlign: 'center',
                        color: '#1e293b',
                        fontWeight: 600,
                        mb: 0,
                        fontSize: '0.95rem',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-word'
                      }}
                      onClick={() => handleCardClick(category.id)}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Grid container - Segunda fila */}
          {categories.length > 3 && (
            <Grid container spacing={3} sx={{ 
              width: '100%',
              maxWidth: '900px',
              justifyContent: 'center'
            }}>
              {categories.slice(3, 6).map((category) => (
                <Grid item xs={12} sm={4} key={category.id} sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Card 
                    sx={{
                      width: '260px',
                      height: '220px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={category.icon_url !== "string" ? category.icon_url : mathImg}
                      alt={category.name}
                      sx={{
                        height: '140px',
                        width: '100%',
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px'
                      }}
                      onClick={() => handleCardClick(category.id)}
                    />
                    <CardContent sx={{ 
                      flexGrow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      px: 1.5,
                      '&:after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        backgroundColor: category.color_hex,
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px'
                      }
                    }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          maxWidth: '80%',
                          textAlign: 'center',
                          color: '#1e293b',
                          fontWeight: 600,
                          mb: 0,
                          fontSize: '0.95rem',
                          lineHeight: '1.3',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word'
                        }}
                        onClick={() => handleCardClick(category.id)}
                      >
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Aprendamos;