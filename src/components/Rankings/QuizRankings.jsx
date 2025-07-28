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
  Divider,
  Chip,
  CircularProgress,
  Grid,
  Tooltip,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useQuizRankings } from './useQuizRankings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TimelineIcon from '@mui/icons-material/Timeline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate, useParams } from 'react-router-dom';

// Paleta de colores verde
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

const ageGroups = [
  '18-25',
  '26-35',
  '36-45',
  '46-55',
  '56+'
];

const QuizRankings = ({ userId }) => {
  const navigate = useNavigate();
  const { type = 'global', ageGroup = '18-25' } = useParams();
  const [tabValue, setTabValue] = React.useState(type);
  const [selectedAgeGroup, setSelectedAgeGroup] = React.useState(ageGroup);
  
  const { rankings, userRanking, loading, error } = useQuizRankings(
    userId, 
    tabValue, 
    tabValue === 'age' ? selectedAgeGroup : undefined
  );

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1: return greenTheme.medal.gold;
      case 2: return greenTheme.medal.silver;
      case 3: return greenTheme.medal.bronze;
      default: return greenTheme.secondary;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 'age') {
      navigate(`/rankings/quizzes/age/${selectedAgeGroup}`);
    } else {
      navigate(`/rankings/quizzes/${newValue}`);
    }
  };

  const handleAgeGroupChange = (event) => {
    const newAgeGroup = event.target.value;
    setSelectedAgeGroup(newAgeGroup);
    navigate(`/rankings/quizzes/age/${newAgeGroup}`);
  };

  const renderRankingItem = (user, index) => {
    const rank = tabValue === 'global' ? user.global_quiz_rank : 
                tabValue === 'weekly' ? user.weekly_quiz_rank : 
                user.age_group_quiz_rank;
                
    return (
      <React.Fragment key={user.user_id}>
        <ListItem sx={{ 
          py: 2,
          px: { xs: 0, sm: 2 },
          '&:hover': { backgroundColor: greenTheme.light }
        }}>
          <ListItemAvatar>
            <Avatar sx={{ 
              bgcolor: getMedalColor(rank),
              width: 48, 
              height: 48,
              fontSize: '1.25rem',
              color: '#fff'
            }}>
              {rank <= 3 ? <EmojiEventsIcon /> : <PersonIcon />}
            </Avatar>
          </ListItemAvatar>
          
          <Box sx={{ flex: '1 1 auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography component="span" variant="body1" fontWeight="medium" color={greenTheme.dark}>
                {user.username || `Usuario ${user.user_id}`}
              </Typography>
              {rank <= 3 && (
                <Chip 
                  label={rank === 1 ? 'Oro' : rank === 2 ? 'Plata' : 'Bronce'} 
                  size="small" 
                  sx={{ 
                    ml: 1,
                    backgroundColor: getMedalColor(rank),
                    color: '#fff',
                    fontWeight: 'bold'
                  }} 
                />
              )}
            </Box>
            <Typography component="div" variant="body2" color={greenTheme.primary}>
              Puntos: {user.total_quiz_score} | 
              Precisión: {user.quiz_accuracy_percentage}% | 
              Quizzes: {user.total_quizzes_completed}
              {tabValue === 'weekly' && ` | Semanales: ${user.weekly_quiz_score}`}
              {tabValue === 'global' && ` | Mensuales: ${user.monthly_quiz_score}`}
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end', 
            ml: 2 
          }}>
            <Chip 
              label={`#${rank}`} 
              sx={{ 
                fontWeight: 600, 
                mb: 0.5,
                backgroundColor: getMedalColor(rank),
                color: '#fff'
              }} 
            />
          </Box>
        </ListItem>
        {index < rankings.length - 1 && (
          <Divider variant="inset" component="li" sx={{ ml: 7, borderColor: greenTheme.light }} />
        )}
      </React.Fragment>
    );
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
    <Box sx={{
      backgroundColor: '#fffffff1',
      width: '100%',
      minHeight: '100vh',
      paddingTop: '20px',
      px: { xs: 2, md: 14 }
    }}>
      {/* Header */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ 
            color: greenTheme.dark,
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}>
            Rankings de Quizzes
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Ayuda">
              <IconButton sx={{ 
                backgroundColor: greenTheme.light, 
                '&:hover': { backgroundColor: '#c8e6c9' } 
              }}>
                <HelpOutlineIcon sx={{ color: greenTheme.primary }} />
              </IconButton>
            </Tooltip>
            <IconButton sx={{ 
              backgroundColor: greenTheme.light, 
              '&:hover': { backgroundColor: '#c8e6c9' } 
            }}>
              <NotificationsIcon sx={{ color: greenTheme.primary }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Tabs y Selector de Edad */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ 
              flexGrow: 1,
              '& .MuiTabs-indicator': { 
                backgroundColor: greenTheme.primary, 
                height: 3 
              } 
            }}
          >
            <Tab 
              value="global" 
              label="Global" 
              icon={<TimelineIcon />} 
              iconPosition="start" 
              sx={{
                color: tabValue === 'global' ? greenTheme.primary : greenTheme.text,
                '&.Mui-selected': { color: greenTheme.primary }
              }}
            />
            <Tab 
              value="weekly" 
              label="Semanal" 
              icon={<CalendarTodayIcon />} 
              iconPosition="start" 
              sx={{
                color: tabValue === 'weekly' ? greenTheme.primary : greenTheme.text,
                '&.Mui-selected': { color: greenTheme.primary }
              }}
            />
            <Tab 
              value="age" 
              label="Por Edad" 
              icon={<PeopleIcon />} 
              iconPosition="start" 
              sx={{
                color: tabValue === 'age' ? greenTheme.primary : greenTheme.text,
                '&.Mui-selected': { color: greenTheme.primary }
              }}
            />
          </Tabs>
          
          {tabValue === 'age' && (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: greenTheme.primary }}>Grupo de Edad</InputLabel>
              <Select
                value={selectedAgeGroup}
                onChange={handleAgeGroupChange}
                label="Grupo de Edad"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: greenTheme.secondary
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: greenTheme.primary
                  }
                }}
              >
                {ageGroups.map(group => (
                  <MenuItem key={group} value={group}>{group}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>

      {/* Contenido */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 5 }}>
        <Typography variant="h5" sx={{ 
          color: greenTheme.primary, 
          fontWeight: 600, 
          mb: 3 
        }}>
          {tabValue === 'global' ? 'Clasificación Global' : 
           tabValue === 'weekly' ? 'Clasificación Semanal' : 
           `Clasificación por Edad (${selectedAgeGroup})`}
        </Typography>

        {/* Ranking del usuario */}
        {userRanking && (
          <Card sx={{ 
            mb: 3, 
            borderLeft: `4px solid ${greenTheme.primary}`, 
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
            backgroundColor: greenTheme.light
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: greenTheme.dark }}>
                Tu Posición
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: getMedalColor(
                        tabValue === 'global' ? userRanking.global_quiz_rank :
                        tabValue === 'weekly' ? userRanking.weekly_quiz_rank :
                        userRanking.age_group_quiz_rank
                      ), 
                      mr: 2,
                      width: 56, 
                      height: 56,
                      fontSize: '1.5rem',
                      color: '#fff'
                    }}>
                      {tabValue === 'global' ? userRanking.global_quiz_rank :
                       tabValue === 'weekly' ? userRanking.weekly_quiz_rank :
                       userRanking.age_group_quiz_rank}
                    </Avatar>
                    <Box>
                      <Typography component="div" variant="body1" fontWeight="bold" color={greenTheme.dark}>
                        Tu Progreso
                      </Typography>
                      <Typography component="div" variant="body2" color={greenTheme.primary}>
                        Puntos: {userRanking.total_quiz_score} | Precisión: {userRanking.quiz_accuracy_percentage}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      label={`#${tabValue === 'global' ? userRanking.global_quiz_rank :
                             tabValue === 'weekly' ? userRanking.weekly_quiz_rank :
                             userRanking.age_group_quiz_rank}`} 
                      size="medium"
                      sx={{ 
                        fontWeight: 600,
                        backgroundColor: greenTheme.primary,
                        color: '#fff'
                      }}
                    />
                    <Chip 
                      label={`${userRanking.total_quizzes_completed} quizzes`} 
                      variant="outlined"
                      sx={{
                        color: greenTheme.primary,
                        borderColor: greenTheme.secondary
                      }}
                    />
                    {tabValue === 'weekly' && (
                      <Chip 
                        label={`${userRanking.weekly_quiz_score} pts semanales`} 
                        variant="outlined"
                        sx={{
                          color: greenTheme.primary,
                          borderColor: greenTheme.secondary
                        }}
                      />
                    )}
                    {tabValue === 'global' && (
                      <Chip 
                        label={`${userRanking.monthly_quiz_score} pts mensuales`} 
                        variant="outlined"
                        sx={{
                          color: greenTheme.primary,
                          borderColor: greenTheme.secondary
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Lista de rankings */}
        <Card sx={{ 
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          backgroundColor: greenTheme.light
        }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: greenTheme.dark }}>
              Top Jugadores
            </Typography>
            <List sx={{ py: 0 }}>
              {rankings.length > 0
                ? rankings.map((user, index) => renderRankingItem(user, index))
                : (
                  <ListItem>
                    <Typography sx={{ 
                      p: 2, 
                      textAlign: 'center', 
                      width: '100%',
                      color: greenTheme.primary
                    }}>
                      No hay datos disponibles para este ranking
                    </Typography>
                  </ListItem>
                )
              }
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default QuizRankings;