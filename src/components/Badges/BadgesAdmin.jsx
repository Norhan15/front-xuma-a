import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { Add, Edit, Delete, MoreVert, Close, Check } from '@mui/icons-material';
import { useBadges } from './useBadges';
import { useNavigate } from 'react-router-dom';

const rarityOptions = ['common', 'rare', 'epic', 'legendary'];
const badgeTierOptions = ['bronze', 'silver', 'gold', 'platinum'];
const categoryOptions = ['quiz', 'challenge', 'special', 'achievement'];

const BadgesAdmin = () => {
  const navigate = useNavigate();
  const { 
    badges, 
    currentBadge,
    loading, 
    error,
    addBadge, 
    editBadge, 
    removeBadge,
    fetchBadge
  } = useBadges();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon_url: '',
    category: 'quiz',
    rarity: 'common',
    badge_tier: 'bronze',
    unlock_criteria: {
      quizzes_completed: 0
    }
  });

  const handleMenuOpen = (event, badge) => {
    setAnchorEl(event.currentTarget);
    setSelectedBadge(badge);
    setFormData({
      name: badge.badge.name,
      description: badge.badge.description,
      icon_url: badge.badge.icon_url,
      category: badge.badge.category,
      rarity: badge.badge.rarity,
      badge_tier: badge.badge.badge_tier,
      unlock_criteria: badge.badge.unlock_criteria
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setSelectedBadge(null);
    setFormData({
      name: '',
      description: '',
      icon_url: '',
      category: 'quiz',
      rarity: 'common',
      badge_tier: 'bronze',
      unlock_criteria: {
        quizzes_completed: 0
      }
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('unlock_criteria.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        unlock_criteria: {
          ...prev.unlock_criteria,
          [field]: value ? parseInt(value) : 0
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (selectedBadge) {
        await editBadge(selectedBadge.id, formData);
        setSnackbar({
          open: true,
          message: 'Insignia actualizada correctamente',
          severity: 'success'
        });
      } else {
        await addBadge(formData);
        setSnackbar({
          open: true,
          message: 'Insignia creada correctamente',
          severity: 'success'
        });
      }
      setOpenDialog(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al guardar la insignia',
        severity: 'error'
      });
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeBadge(selectedBadge.id);
      setSnackbar({
        open: true,
        message: 'Insignia eliminada correctamente',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al eliminar la insignia',
        severity: 'error'
      });
    } finally {
      setOpenDeleteDialog(false);
      handleMenuClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading && !badges.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
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
            color: '#1e293b',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}>
            Gestión de Insignias
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Agregar nueva insignia">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenCreateDialog}
                sx={{
                  backgroundColor: '#399649',
                  '&:hover': { backgroundColor: '#2e7d32' }
                }}
              >
                Nueva Insignia
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Lista de Insignias */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 5 }}>
        <Grid container spacing={3}>
          {badges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} key={badge.id}>
              <Card sx={{ 
                height: '100%',
                width: 279,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Chip 
                      label={badge.badge.rarity} 
                      size="small"
                      color={
                        badge.badge.rarity === 'legendary' ? 'secondary' :
                        badge.badge.rarity === 'epic' ? 'primary' :
                        'default'
                      }
                    />
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, badge)}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                    <Avatar
                      src={badge.badge.icon_url}
                      alt={badge.badge.name}
                      sx={{ 
                        width: 80, 
                        height: 80,
                        mb: 2,
                        border: `3px solid ${
                          badge.badge.badge_tier === 'gold' ? '#FFD700' :
                          badge.badge.badge_tier === 'silver' ? '#C0C0C0' :
                          badge.badge.badge_tier === 'platinum' ? '#E5E4E2' : '#CD7F32'
                        }`
                      }}
                    />
                    
                    <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
                      {badge.badge.name}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                      {badge.badge.description}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Categoría:</strong> {badge.badge.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Nivel:</strong> {badge.badge.badge_tier}
                    </Typography>
                    {badge.badge.unlock_criteria && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Requisitos:</strong> {Object.entries(badge.badge.unlock_criteria)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(', ')}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Diálogo para crear/editar */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedBadge ? `Editar ${selectedBadge.badge.name}` : 'Nueva Insignia'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
              required
            />
            
            <TextField
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleFormChange}
              fullWidth
              multiline
              rows={3}
              required
            />
            
            <TextField
              name="icon_url"
              label="URL del Icono"
              value={formData.icon_url}
              onChange={handleFormChange}
              fullWidth
              required
            />
            
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Categoría"
                onChange={handleFormChange}
              >
                {categoryOptions.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Rareza</InputLabel>
              <Select
                name="rarity"
                value={formData.rarity}
                label="Rareza"
                onChange={handleFormChange}
              >
                {rarityOptions.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Nivel de Insignia</InputLabel>
              <Select
                name="badge_tier"
                value={formData.badge_tier}
                label="Nivel de Insignia"
                onChange={handleFormChange}
              >
                {badgeTierOptions.map(option => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Criterios de Desbloqueo</Typography>
            
            <TextField
              name="unlock_criteria.quizzes_completed"
              label="Quizzes Completados"
              type="number"
              value={formData.unlock_criteria.quizzes_completed}
              onChange={handleFormChange}
              fullWidth
            />
            
            {/* Puedes añadir más campos de criterios según sea necesario */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} startIcon={<Close />}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            startIcon={<Check />}
            sx={{ backgroundColor: '#399649', '&:hover': { backgroundColor: '#2e7d32' } }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleMenuClose(); setOpenDialog(true); }}>
          <Edit sx={{ mr: 1, color: '#2196f3' }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <Delete sx={{ mr: 1, color: '#f44336' }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la insignia "{selectedBadge?.badge.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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

export default BadgesAdmin;