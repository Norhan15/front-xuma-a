import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';
import LeftBar from '../components/Leftvar/leftvar';
import { Outlet } from 'react-router-dom';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AppBar solo para móvil */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${240}px)` },
            ml: { sm: `${240}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              XUMA´A
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      
      {/* LeftBar con props para control móvil */}
      <LeftBar 
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
        isClosing={isClosing}
      />
      
      {/* Contenido principal */}
          <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          minHeight: '100vh', // aseguras que llene toda la pantalla
          width: { sm: `calc(100% - ${240}px)` },
          mt: { xs: '56px', sm: 0 },
          p: 0, // evita margen interno innecesario
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;