import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import InfoIcon from '@mui/icons-material/AutoGraph';
import TipsIcon from '@mui/icons-material/TipsAndUpdates';
import PetsIcon from '@mui/icons-material/Pets';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/userService';
import { AuthContext } from '../../services/Auth/AuthContext';
import logoXumaa from '../../assets/Xumaa-Photoroom.png';

const drawerWidth = 240;
const primaryColor = '#399649';

// Datos de las categorías con sus rutas correspondientes
const categories = [
  { name: 'Inicio', icon: <HomeIcon />, path: '/home' },
  { name: 'Media', icon: <ArticleIcon />, path: '/media' },
  { name: 'Aprendamos', icon: <SchoolIcon />, path: '/aprendamos' },
  { name: 'Estadísticas', icon: <InfoIcon />, path: '/estadisticas-completas' },
  { name: 'Desafíos', icon: <EmojiEventsIcon />, path: '/challenges' },
  { name: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios' },
  { name: 'Trivias', icon: <QuizIcon />, path: '/trivias' },
  { name: 'Mascotas', icon: <PetsIcon />, path: '/mascotas' },
  { name: 'Consejos del día', icon: <TipsIcon/>, path: '/consejos-diarios' },
  { name: 'Rankings combinados', icon: <LeaderboardIcon />, path: '/rankings-combinados' },
  { name: 'Ranking de Desafíos', icon: <MilitaryTechIcon />, path: '/rankings/challenges/global' },
  { name: 'Ranking de Trivias', icon: <QuizIcon />, path: '/rankings/quizzes' },
  { name: 'Administración de Insignias', icon: <WorkspacePremiumIcon />, path: '/badges' },
  { name: 'Análisis de Churn', icon: <InfoIcon />, path: '/analytics' }
];

const UserAvatar = ({ src, alt }) => {
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    setImgError(true);
  };

  return (
    <Avatar
      src={imgError ? '/default_avatar.png' : src}
      alt={alt}
      onError={handleError}
      sx={{ width: 40, height: 40 }}
    />
  );
};

function LeftVar(props) {
  const { window, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose, isClosing } = props;
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: 'Cargando...',
    role: 'user', // Default to 'user' which matches API response
    avatar: '/default_avatar.png'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.userId) {
          const data = await getUserProfile(user.userId);
          setUserData({
            name: `${data.firstName} ${data.lastName}` || user.name || 'Usuario',
            role: data.role || user.role || 'user', // Now using role from API
            avatar: '/default_avatar.png' // Still using default avatar
          });
        } else if (user) {
          // If no userId but user exists in context
          setUserData({
            name: user.name || 'Usuario',
            role: user.role || 'user',
            avatar: user.avatar || '/default_avatar.png'
          });
        } else {
          // Default values if no user
          setUserData({
            name: 'Usuario',
            role: 'user',
            avatar: '/default_avatar.png'
          });
        }
      } catch (err) {
        console.error('Error al cargar datos del usuario:', err);
        setError(err.message);
        // Fallback to context data
        if (user) {
          setUserData({
            name: user.name || 'Usuario',
            role: user.role || 'user',
            avatar: user.avatar || '/default_avatar.png'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Function to translate role for display
  const getDisplayRole = (role) => {
    const roleTranslations = {
      'user': 'Usuario',
      'admin': 'Administrador',
      'moderator': 'Moderador'
    };
    return roleTranslations[role] || role;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (mobileOpen) {
      handleDrawerClose();
    }
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 2,
        height: 100,
        borderBottom: `1px solid ${primaryColor}`
      }}>
        <Avatar
          src={logoXumaa}
          alt="XUMAA Logo"
          sx={{ width: 100, height: 90 }}
          variant="square"
        />
      </Box>
      
      {/* Navigation Items */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List>
          {categories.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(category.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(57, 150, 73, 0.08)'
                  }
                }}
              >
                <ListItemIcon sx={{ color: primaryColor }}>
                  {category.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={category.name} 
                  primaryTypographyProps={{ 
                    style: { color: primaryColor } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      
      {/* User Profile & Logout Section */}
      <Box sx={{ 
        p: 2,
        borderTop: `1px solid ${primaryColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* User Profile */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2,
        }}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <UserAvatar src={userData.avatar} alt={userData.name} />
          )}
          <Box>
            <Typography 
              variant="subtitle2" 
              noWrap
              sx={{ color: primaryColor }}
            >
              {loading ? 'Cargando...' : userData.name}
            </Typography>
            <Typography 
              variant="caption" 
              noWrap
              sx={{ color: primaryColor, textTransform: 'capitalize' }}
            >
              {loading ? 'Cargando...' : getDisplayRole(userData.role)}
            </Typography>
          </Box>
        </Box>
        
        {/* Logout Button */}
        <Tooltip title="Cerrar sesión">
          <IconButton 
            sx={{ color: primaryColor }}
            onClick={handleLogout}
            disabled={loading}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: '#ffffff'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: '#ffffff'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

LeftVar.propTypes = {
  window: PropTypes.func,
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  handleDrawerTransitionEnd: PropTypes.func,
  handleDrawerClose: PropTypes.func,
  isClosing: PropTypes.bool,
};

export default LeftVar;