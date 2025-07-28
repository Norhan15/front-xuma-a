import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Tooltip
} from '@mui/material';
import { useGamification } from './useGamification';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Green theme colors
const greenTheme = {
  primary: '#2e7d32',
  secondary: '#4caf50',
  light: '#e8f5e9',
  dark: '#1b5e20',
  text: '#1e293b',
  medal: {
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32'
  }
};

const RankingsComponent = ({ userId }) => {
  const { rankings, userRanking, loading, error } = useGamification(userId);

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1: return greenTheme.medal.gold;
      case 2: return greenTheme.medal.silver;
      case 3: return greenTheme.medal.bronze;
      default: return greenTheme.secondary;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: greenTheme.primary }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
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
            color: greenTheme.dark,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          Tabla de Clasificación
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Cómo funciona el ranking">
            <IconButton
              sx={{
                backgroundColor: greenTheme.light,
                color: greenTheme.text,
                '&:hover': {
                  backgroundColor: '#c8e6c9'
                }
              }}
            >
              <HelpOutlineIcon fontSize="medium" sx={{ color: greenTheme.primary }} />
            </IconButton>
          </Tooltip>
          
          <IconButton
            sx={{
              backgroundColor: greenTheme.light,
              color: greenTheme.text,
              '&:hover': {
                backgroundColor: '#c8e6c9'
              }
            }}
            aria-label="notificaciones"
          >
            <NotificationsIcon fontSize="medium" sx={{ color: greenTheme.primary }} />
          </IconButton>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Info section */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: greenTheme.primary,
              fontWeight: 600,
              fontSize: '1.2rem'
            }}
          >
            Clasificación por desempeño en quizzes y retos
          </Typography>
        </Box>

        {/* User ranking card */}
        {userRanking && (
          <Card sx={{ 
            mb: 3, 
            width: '100%',
            borderLeft: `4px solid ${greenTheme.primary}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            backgroundColor: greenTheme.light
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: greenTheme.dark }}>
                Tu posición en el ranking
              </Typography>
              
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: getMedalColor(userRanking.combined_rank), 
                      mr: 2,
                      width: 56, 
                      height: 56,
                      fontSize: '1.5rem',
                      color: '#fff'
                    }}>
                      {userRanking.combined_rank}
                    </Avatar>
                    
                    <Box>
                      <Typography variant="body1" fontWeight="bold" color={greenTheme.dark}>
                        Tu progreso
                      </Typography>
                      <Typography variant="body2" color={greenTheme.primary}>
                        Puntuación total: {userRanking.total_score} pts
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1
                  }}>
                    <Chip 
                      label={`#${userRanking.combined_rank}`} 
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: greenTheme.primary,
                        color: '#fff'
                      }}
                    />
                    
                    <Chip 
                      label={`${userRanking.quiz_data.quizzes_completed} quizzes`} 
                      variant="outlined"
                      sx={{
                        color: greenTheme.primary,
                        borderColor: greenTheme.secondary
                      }}
                    />
                    
                    <Chip 
                      label={`${userRanking.challenge_data.challenges_completed} retos`} 
                      variant="outlined"
                      sx={{
                        color: greenTheme.primary,
                        borderColor: greenTheme.secondary
                      }}
                    />
                    
                    <Chip 
                      label={`${userRanking.challenge_data.completion_rate}% completados`} 
                      variant="outlined"
                      sx={{
                        color: greenTheme.primary,
                        borderColor: greenTheme.secondary
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Rankings list */}
        <Card sx={{ 
          width: '100%', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          backgroundColor: greenTheme.light
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: greenTheme.dark }}>
              Top Jugadores
            </Typography>
            
            <List sx={{ py: 0 }}>
              {rankings.map((user, index) => (
                <React.Fragment key={user.user_id}>
                  <ListItem sx={{ 
                    py: 2,
                    px: { xs: 0, sm: 2 },
                    '&:hover': {
                      backgroundColor: '#f8f9fa'
                    }
                  }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: getMedalColor(index + 1),
                        width: 48, 
                        height: 48,
                        fontSize: '1.25rem',
                        color: '#fff'
                      }}>
                        {index < 3 ? (
                          <EmojiEventsIcon />
                        ) : (
                          <PersonIcon />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Typography fontWeight="medium" color={greenTheme.dark}>
                          Usuario #{index + 1}
                          {index < 3 && (
                            <Chip 
                              label={index === 0 ? 'Oro' : index === 1 ? 'Plata' : 'Bronce'} 
                              size="small" 
                              sx={{ 
                                ml: 1,
                                backgroundColor: getMedalColor(index + 1),
                                color: '#fff',
                                fontWeight: 'bold'
                              }} 
                            />
                          )}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ 
                          display: 'flex', 
                          flexWrap: 'wrap',
                          gap: 1,
                          mt: 0.5
                        }}>
                          <Typography variant="body2" component="span" color={greenTheme.primary}>
                            Puntos: <strong>{user.total_score}</strong>
                          </Typography>
                          <Typography variant="body2" component="span" color={greenTheme.primary}>
                            | Quizzes: <strong>{user.quiz_data.quizzes_completed}</strong>
                          </Typography>
                          <Typography variant="body2" component="span" color={greenTheme.primary}>
                            | Retos: <strong>{user.challenge_data.challenges_completed}</strong>
                          </Typography>
                          <Typography variant="body2" component="span" color={greenTheme.primary}>
                            | Impacto: <strong>{user.challenge_data.environmental_impact}</strong>
                          </Typography>
                        </Box>
                      }
                      sx={{ flex: '1 1 auto' }}
                    />
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      ml: 2
                    }}>
                      <Chip 
                        label={`#${index + 1}`} 
                        sx={{ 
                          fontWeight: 600,
                          mb: 0.5,
                          backgroundColor: getMedalColor(index + 1),
                          color: '#fff'
                        }} 
                      />
                      <Typography variant="caption" color={greenTheme.primary}>
                        {user.quiz_data.quiz_accuracy}% precisión
                      </Typography>
                    </Box>
                  </ListItem>
                  
                  {index < rankings.length - 1 && (
                    <Divider variant="inset" component="li" sx={{ ml: 7, borderColor: greenTheme.light }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default RankingsComponent;