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
  Tooltip,
  Tabs,
  Tab
} from '@mui/material';
import { useChallengeRankings } from './useChallengeRankings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate, useParams } from 'react-router-dom';

const GlobalChallengeRankings = ({ userId, defaultTab = 'global' }) => {
  const navigate = useNavigate();
  const { tab: urlTab } = useParams();
  const [tabValue, setTabValue] = React.useState(urlTab || defaultTab);

  const { rankings, userRanking, loading, error } = useChallengeRankings(userId, tabValue);

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1: return '#FFD700'; // Oro
      case 2: return '#C0C0C0'; // Plata
      case 3: return '#CD7F32'; // Bronce
      default: return '#4caf50'; // Verde por defecto
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/rankings/challenges/${newValue}`);
  };

  React.useEffect(() => {
    if (urlTab && urlTab !== tabValue) {
      setTabValue(urlTab);
    }
  }, [urlTab]);

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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const renderSecondaryContent = (user) => {
    return (
      <Box component="span" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Typography component="span" variant="body2">
          {tabValue === 'global' 
            ? `Puntos: ${user.total_challenge_score}` 
            : `Impacto: ${user.environmental_impact_score}`}
        </Typography>
        <Typography component="span" variant="body2">
          | Desafíos: {user.total_challenges_completed}
        </Typography>
        <Typography component="span" variant="body2">
          | Completados: {user.challenge_completion_rate}%
        </Typography>
        {tabValue === 'global' && (
          <>
            <Typography component="span" variant="body2">
              | Semanal: {user.weekly_challenge_score}
            </Typography>
            <Typography component="span" variant="body2">
              | Mensual: {user.monthly_challenge_score}
            </Typography>
          </>
        )}
      </Box>
    );
  };

  // Colores del tema verde
  const greenTheme = {
    primary: '#2e7d32',
    secondary: '#4caf50',
    light: '#e8f5e9',
    dark: '#1b5e20',
    text: '#1e293b'
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
        mb: 2,
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
          {tabValue === 'global' ? 'Ranking Global de Desafíos' : 'Ranking de Impacto Ambiental'}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Cómo funciona el ranking">
            <IconButton
              sx={{
                backgroundColor: greenTheme.light,
                color: greenTheme.dark,
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
              color: greenTheme.dark,
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

      {/* Tabs para cambiar entre rankings */}
      <Box sx={{ width: '100%', maxWidth: '1200px', mb: 3, mx: 'auto' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: greenTheme.primary,
              height: 3
            }
          }}
        >
          <Tab 
            value="global" 
            label="Ranking Global" 
            icon={<TrendingUpIcon />} 
            iconPosition="start"
            sx={{ 
              minHeight: 48,
              color: tabValue === 'global' ? greenTheme.primary : greenTheme.text,
              '&.Mui-selected': {
                color: greenTheme.primary,
                fontWeight: 'bold'
              }
            }}
          />
          <Tab 
            value="environmental" 
            label="Impacto Ambiental" 
            icon={<LeafIcon />} 
            iconPosition="start"
            sx={{ 
              minHeight: 48,
              color: tabValue === 'environmental' ? greenTheme.primary : greenTheme.text,
              '&.Mui-selected': {
                color: greenTheme.primary,
                fontWeight: 'bold'
              }
            }}
          />
        </Tabs>
      </Box>

      {/* Contenido principal */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Sección informativa */}
        <Box sx={{ width: '100%', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: greenTheme.primary,
              fontWeight: 600,
              fontSize: '1.2rem'
            }}
          >
            {tabValue === 'global' 
              ? 'Clasificación por puntos totales en desafíos' 
              : 'Clasificación por impacto ambiental generado'}
          </Typography>
        </Box>

        {/* Ranking del usuario actual */}
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
                      bgcolor: getMedalColor(userRanking.rank), 
                      mr: 2,
                      width: 56, 
                      height: 56,
                      fontSize: '1.5rem',
                      color: '#fff'
                    }}>
                      {userRanking.rank}
                    </Avatar>
                    
                    <Box>
                      <Typography component="div" variant="body1" fontWeight="bold" color={greenTheme.dark}>
                        Tu progreso
                      </Typography>
                      <Typography component="div" variant="body2" color={greenTheme.primary}>
                        {tabValue === 'global' 
                          ? `Puntos totales: ${userRanking.total_challenge_score}` 
                          : `Impacto ambiental: ${userRanking.environmental_impact_score}`}
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
                      label={`#${userRanking.rank}`} 
                      color="primary"
                      size="medium"
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: greenTheme.primary,
                        color: '#fff'
                      }}
                    />
                    
                    <Chip 
                      label={`${userRanking.total_challenges_completed} desafíos`} 
                      variant="outlined"
                      sx={{ color: greenTheme.primary, borderColor: greenTheme.secondary }}
                    />
                    
                    <Chip 
                      label={`${userRanking.challenge_completion_rate}% completados`} 
                      variant="outlined"
                      sx={{ color: greenTheme.primary, borderColor: greenTheme.secondary }}
                    />
                    
                    {tabValue === 'global' && (
                      <>
                        <Chip 
                          label={`${userRanking.weekly_challenge_score} pts semanales`} 
                          variant="outlined"
                          sx={{ color: greenTheme.primary, borderColor: greenTheme.secondary }}
                        />
                        <Chip 
                          label={`${userRanking.monthly_challenge_score} pts mensuales`} 
                          variant="outlined"
                          sx={{ color: greenTheme.primary, borderColor: greenTheme.secondary }}
                        />
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Lista de rankings */}
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
              {rankings.map((user) => (
                <React.Fragment key={user.user_id}>
                  <ListItem sx={{ 
                    py: 2,
                    px: { xs: 0, sm: 2 },
                    '&:hover': {
                      backgroundColor: '#e8f5e9'
                    }
                  }}>
                    <ListItemAvatar>
                      <Avatar sx={{ 
                        bgcolor: getMedalColor(user.rank),
                        width: 48, 
                        height: 48,
                        fontSize: '1.25rem',
                        color: '#fff'
                      }}>
                        {user.rank <= 3 ? (
                          <EmojiEventsIcon sx={{ color: '#fff' }} />
                        ) : (
                          <PersonIcon sx={{ color: '#fff' }} />
                        )}
                      </Avatar>
                    </ListItemAvatar>
                    
                    <Box sx={{ flex: '1 1 auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Typography component="span" variant="body1" fontWeight="medium" color={greenTheme.dark}>
                          {user.username || `Usuario ${user.user_id}`}
                        </Typography>
                        {user.rank <= 3 && (
                          <Chip 
                            label={user.rank === 1 ? 'Oro' : user.rank === 2 ? 'Plata' : 'Bronce'} 
                            size="small" 
                            sx={{ 
                              ml: 1,
                              backgroundColor: getMedalColor(user.rank),
                              color: '#fff',
                              fontWeight: 'bold'
                            }} 
                          />
                        )}
                      </Box>
                      <Typography component="span" variant="body2" color={greenTheme.primary}>
                        {renderSecondaryContent(user)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-end',
                      ml: 2
                    }}>
                      <Chip 
                        label={`#${user.rank}`} 
                        sx={{ 
                          fontWeight: 600,
                          mb: 0.5,
                          backgroundColor: user.rank <= 3 ? getMedalColor(user.rank) : greenTheme.secondary,
                          color: '#fff'
                        }} 
                      />
                      <Typography variant="caption" color={greenTheme.primary}>
                        Validación: {user.avg_validation_score}/10
                      </Typography>
                    </Box>
                  </ListItem>
                  
                  {user.rank < rankings.length && (
                    <Divider variant="inset" component="li" sx={{ ml: 7, borderColor: greenTheme.secondary }} />
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

export default GlobalChallengeRankings;