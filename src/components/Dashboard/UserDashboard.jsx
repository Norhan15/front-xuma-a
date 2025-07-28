import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Card,
  CardContent,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Pets as PetsIcon,
  EmojiEvents as BadgesIcon,
  Quiz as QuizIcon,
  TrendingUp as ChallengesIcon,
  CalendarToday as JoinDateIcon,
  Star as LevelIcon,
  Timeline as ProgressIcon,
  History as ActivityIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useUserStats } from './useUserStats';

const RarityChip = ({ rarity }) => {
  const rarityColors = {
    common: '#4caf50',
    rare: '#2196f3',
    epic: '#9c27b0',
    legendary: '#ff9800'
  };

  return (
    <Chip
      label={rarity}
      size="small"
      sx={{
        backgroundColor: rarityColors[rarity] || '#9e9e9e',
        color: 'white',
        textTransform: 'capitalize',
        fontWeight: 500
      }}
    />
  );
};

const TierChip = ({ tier }) => {
  const tierColors = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2'
  };

  return (
    <Chip
      label={tier}
      size="small"
      sx={{
        backgroundColor: tierColors[tier] || '#9e9e9e',
        color: tier === 'gold' ? '#000' : '#fff',
        textTransform: 'capitalize',
        fontWeight: 500
      }}
    />
  );
};

const UserDashboard = () => {
  const { stats, loading, error, userId, fetchStats, setUserId } = useUserStats();
  const [tabValue, setTabValue] = React.useState(0);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      fetchStats(userId).catch(err => {
        setSnackbar({
          open: true,
          message: err.message || 'Error al cargar estadísticas',
          severity: 'error'
        });
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
            color: '#1e293b',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          Dashboard de Usuario
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

      {/* Search section */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {!stats && !loading && (
          <Box sx={{ width: '100%', mb: 3, textAlign: 'center' }}>
            <Typography
              variant="h5"
              sx={{
                color: '#399649',
                fontWeight: 600,
                fontSize: '1.4rem',
                mb: 2
              }}
            >
              Ingresa el ID de un usuario
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              Para visualizar las estadísticas, por favor ingresa el ID de usuario en el campo de búsqueda
            </Typography>
          </Box>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField
                label="ID de Usuario"
                variant="outlined"
                fullWidth
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: '#399649', mr: 1 }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ 
                  height: '56px',
                  backgroundColor: '#399649',
                  '&:hover': {
                    backgroundColor: '#2e7d32'
                  }
                }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Buscar'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {error && (
        <Card sx={{ 
          backgroundColor: '#ffebee',
          mb: 3,
          maxWidth: '1200px',
          mx: 'auto'
        }}>
          <CardContent>
            <Typography color="error">{error}</Typography>
          </CardContent>
        </Card>
      )}

      {stats && (
        <>
          {/* Resumen General */}
          <Box sx={{ 
            width: '100%',
            maxWidth: '1200px',
            mb: 3,
            mx: 'auto'
          }}>
            <Typography
              variant="h5"
              sx={{
                color: '#399649',
                fontWeight: 600,
                fontSize: '1.2rem',
                mb: 2
              }}
            >
              Resumen General
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Puntaje Total
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 700 }}>
                      {stats.overview.total_combined_score.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Nivel de Cuenta
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 700 }}>
                      {stats.overview.account_level}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.overview.account_level * 10} 
                      sx={{ 
                        mt: 2,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#399649'
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Mascotas
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 700 }}>
                      {stats.overview.total_pets_owned}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      Insignias
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 700 }}>
                      {stats.overview.total_badges_owned}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Tabs para las secciones */}
          <Box sx={{ 
            width: '100%',
            maxWidth: '1200px',
            mb: 3,
            mx: 'auto'
          }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              sx={{ 
                mb: 3,
                '& .MuiTabs-indicator': {
                  backgroundColor: '#399649'
                }
              }}
            >
              <Tab 
                label="Quiz" 
                icon={<QuizIcon />} 
                iconPosition="start" 
                sx={{ 
                  '&.Mui-selected': { 
                    color: '#399649' 
                  } 
                }} 
              />
              <Tab 
                label="Retos" 
                icon={<ChallengesIcon />} 
                iconPosition="start" 
                sx={{ 
                  '&.Mui-selected': { 
                    color: '#399649' 
                  } 
                }} 
              />
              <Tab 
                label="Mascotas" 
                icon={<PetsIcon />} 
                iconPosition="start" 
                sx={{ 
                  '&.Mui-selected': { 
                    color: '#399649' 
                  } 
                }} 
              />
              <Tab 
                label="Insignias" 
                icon={<BadgesIcon />} 
                iconPosition="start" 
                sx={{ 
                  '&.Mui-selected': { 
                    color: '#399649' 
                  } 
                }} 
              />
              <Tab 
                label="Actividad" 
                icon={<ActivityIcon />} 
                iconPosition="start" 
                sx={{ 
                  '&.Mui-selected': { 
                    color: '#399649' 
                  } 
                }} 
              />
            </Tabs>

            {/* Contenido de los Tabs */}
            {tabValue === 0 && (
              <Card sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#399649',
                  fontWeight: 600
                }}>
                  <QuizIcon color="inherit" /> Sistema de Quiz
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Puntos de Quiz</Typography>
                      <Typography>Total: <strong>{stats.quiz_system.total_quiz_points}</strong></Typography>
                      <Typography>Disponibles: <strong>{stats.quiz_system.available_quiz_points}</strong></Typography>
                      <Typography>Gastados: <strong>{stats.quiz_system.spent_quiz_points}</strong></Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Progreso</Typography>
                      <Typography>Nivel de Quiz: <strong>{stats.quiz_system.quiz_level}</strong></Typography>
                      <Typography>Racha actual: <strong>{stats.quiz_system.current_quiz_streak}</strong></Typography>
                      <Typography>Racha más larga: <strong>{stats.quiz_system.longest_quiz_streak}</strong></Typography>
                      <Typography>Precisión: <strong>{stats.quiz_system.quiz_accuracy_percentage}%</strong></Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            )}

            {tabValue === 1 && (
              <Card sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#399649',
                  fontWeight: 600
                }}>
                  <ChallengesIcon color="inherit" /> Sistema de Retos
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Puntos de Retos</Typography>
                      <Typography>Total: <strong>{stats.challenge_system.total_challenge_points}</strong></Typography>
                      <Typography>Históricos: <strong>{stats.challenge_system.lifetime_challenge_points}</strong></Typography>
                      <Typography>Impacto ambiental: <strong>{stats.challenge_system.environmental_impact_score}</strong></Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Progreso</Typography>
                      <Typography>Nivel actual: <strong><TierChip tier={stats.challenge_system.current_badge_tier} /></strong></Typography>
                      <Typography>Retos completados: <strong>{stats.challenge_system.challenges_completed}</strong></Typography>
                      <Typography>Tasa de completitud: <strong>{stats.challenge_system.challenge_completion_rate}%</strong></Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Card>
            )}

            {tabValue === 2 && (
              <Card sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#399649',
                  fontWeight: 600
                }}>
                  <PetsIcon color="inherit" /> Colección de Mascotas
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Total: {stats.pets_collection.total_pets}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {Object.entries(stats.pets_collection.pets_by_rarity).map(([rarity, count]) => (
                    <Chip
                      key={rarity}
                      label={`${rarity}: ${count}`}
                      avatar={<Avatar sx={{ 
                        backgroundColor: 'transparent',
                        color: 'inherit',
                        fontWeight: 500
                      }}>{count}</Avatar>}
                      sx={{ 
                        textTransform: 'capitalize',
                        backgroundColor: '#f1f5f9'
                      }}
                    />
                  ))}
                </Box>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Mascotas recientes:
                </Typography>
                <List sx={{ width: '100%' }}>
                  {stats.pets_collection.pets_summary.map((pet, index) => (
                    <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            backgroundColor: '#e2e8f0',
                            color: '#1e293b'
                          }}>
                            <PetsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight={500}>
                              {pet.nickname || pet.species}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <RarityChip rarity={pet.rarity} /> 
                              <Typography variant="body2" component="span">
                                Nivel {pet.level}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Card>
                  ))}
                </List>
              </Card>
            )}

            {tabValue === 3 && (
              <Card sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#399649',
                  fontWeight: 600
                }}>
                  <BadgesIcon color="inherit" /> Colección de Insignias
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Total: {stats.badges_collection.total_badges}
                </Typography>
                
                {stats.badges_collection.total_badges > 0 ? (
                  <>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {Object.entries(stats.badges_collection.badges_by_tier).map(([tier, count]) => (
                        <Chip
                          key={tier}
                          label={`${tier}: ${count}`}
                          avatar={<Avatar sx={{ 
                            backgroundColor: 'transparent',
                            color: 'inherit',
                            fontWeight: 500
                          }}>{count}</Avatar>}
                          sx={{ 
                            textTransform: 'capitalize',
                            backgroundColor: '#f1f5f9'
                          }}
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                      Insignias recientes:
                    </Typography>
                    <List sx={{ width: '100%' }}>
                      {stats.badges_collection.recent_badges.map((badge, index) => (
                        <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar sx={{ 
                                backgroundColor: '#e2e8f0',
                                color: '#1e293b'
                              }}>
                                <BadgesIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography fontWeight={500}>
                                  {badge.name}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ mt: 0.5 }}>
                                  <TierChip tier={badge.tier} />
                                </Box>
                              }
                            />
                          </ListItem>
                        </Card>
                      ))}
                    </List>
                  </>
                ) : (
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      El usuario no tiene insignias aún.
                    </Typography>
                  </Card>
                )}
              </Card>
            )}

            {tabValue === 4 && (
              <Card sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="h6" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#399649',
                  fontWeight: 600
                }}>
                  <ActivityIcon color="inherit" /> Actividad Reciente
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Actividad de Quiz:
                </Typography>
                <List sx={{ width: '100%', mb: 3 }}>
                  {stats.recent_activity.quiz_activities.map((activity, index) => (
                    <Card key={`quiz-${index}`} variant="outlined" sx={{ mb: 1 }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: activity.points_change >= 0 ? '#4caf50' : '#f44336',
                            color: 'white'
                          }}>
                            {activity.points_change >= 0 ? '+' : ''}{activity.points_change}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight={500}>
                              {activity.description}
                            </Typography>
                          }
                          secondary={new Date(activity.created_at).toLocaleString()}
                        />
                      </ListItem>
                    </Card>
                  ))}
                </List>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Actividad de Retos:
                </Typography>
                {stats.recent_activity.challenge_activities.length > 0 ? (
                  <List sx={{ width: '100%' }}>
                    {stats.recent_activity.challenge_activities.map((activity, index) => (
                      <Card key={`challenge-${index}`} variant="outlined" sx={{ mb: 1 }}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Typography fontWeight={500}>
                                {activity.description}
                              </Typography>
                            }
                            secondary={new Date(activity.created_at).toLocaleString()}
                          />
                        </ListItem>
                      </Card>
                    ))}
                  </List>
                ) : (
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      No hay actividad de retos reciente.
                    </Typography>
                  </Card>
                )}
              </Card>
            )}
          </Box>
        </>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserDashboard;