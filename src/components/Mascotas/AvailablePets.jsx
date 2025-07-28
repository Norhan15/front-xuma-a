import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Avatar,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Menu,
  MenuItem,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAvailablePets } from './useAvailablePets';
import { useNavigate } from 'react-router-dom';
import { DeleteDialog } from './MascotasModal/DeleteDialog';

const rarityColors = {
  common: '#4caf50',
  rare: '#2196f3',
  epic: '#9c27b0',
  legendary: '#ff9800'
};

const habitatColors = {
  urban: '#9e9e9e',
  forest: '#4caf50',
  freshwater: '#2196f3',
  jungle: '#8bc34a',
  mountain: '#795548'
};

const PetsAdminPanel = () => {
  const navigate = useNavigate();
  
  const { 
    pets, 
    loading, 
    error, 
    pagination,
    fetchPets,
    handleCreatePet,
    handleUpdatePet,
    handleDeletePet,
    handlePageChange
  } = useAvailablePets();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    species_type: '',
    description: '',
    rarity: 'common',
    base_price: 0,
    icon_url: '',
    evolution_stages: 1,
    environmental_preference: 'urban',
    available_in_store: true
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleMenuOpen = (event, pet) => {
    setAnchorEl(event.currentTarget);
    setCurrentPet(pet);
    setFormData({
      name: pet.name,
      species_type: pet.species_type,
      description: pet.description,
      rarity: pet.rarity,
      base_price: pet.base_price || 0,
      icon_url: pet.icon_url || pet.avatar_url || '',
      evolution_stages: pet.evolution_stages || pet.evolution_chain?.length || 1,
      environmental_preference: pet.environmental_preference || pet.base_stats?.environmental_preference || 'urban',
      available_in_store: pet.available_in_store || pet.base_stats?.available_in_store || true
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateModal = () => {
    setCurrentPet(null);
    setFormData({
      name: '',
      species_type: '',
      description: '',
      rarity: 'common',
      base_price: 0,
      icon_url: '',
      evolution_stages: 1,
      environmental_preference: 'urban',
      available_in_store: true
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'available_in_store' ? e.target.checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      const petData = {
        name: formData.name,
        species_type: formData.species_type,
        description: formData.description,
        rarity: formData.rarity,
        base_price: Number(formData.base_price),
        icon_url: formData.icon_url,
        evolution_stages: Number(formData.evolution_stages),
        environmental_preference: formData.environmental_preference,
        available_in_store: formData.available_in_store
      };

      if (currentPet) {
        await handleUpdatePet(currentPet.pet_id, petData);
        setSnackbar({
          open: true,
          message: 'Mascota actualizada correctamente',
          severity: 'success'
        });
      } else {
        await handleCreatePet(petData);
        setSnackbar({
          open: true,
          message: 'Mascota creada correctamente',
          severity: 'success'
        });
      }
      
      setOpenModal(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al guardar la mascota',
        severity: 'error'
      });
    }
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (currentPet) {
        await handleDeletePet(currentPet.pet_id);
        setSnackbar({
          open: true,
          message: 'Mascota eliminada correctamente',
          severity: 'success'
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al eliminar la mascota',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      handleMenuClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const paginatedPets = pets.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  if (loading) {
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
          Mascotas
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Agregar nueva mascota">
            <IconButton
              sx={{
                backgroundColor: '#f1f5f9',
                color: '#1e293b',
                '&:hover': {
                  backgroundColor: '#e2e8f0'
                }
              }}
              onClick={handleOpenCreateModal}
            >
              <AddIcon fontSize="medium" sx={{ color: '#399649' }} />
            </IconButton>
          </Tooltip>
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
      </Box>

      {/* Sección de selección */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#399649',
              fontWeight: 600,
              fontSize: '1.2rem'
            }}
          >
            Mascotas disponibles para editar o eliminar
          </Typography>
        </Box>
      </Box>

      {/* Grid de mascotas */}
      <Grid container spacing={3}>
        {paginatedPets.map((pet) => (
          <Grid item xs={12} sm={6} md={4} key={pet.pet_id}>
            <Card sx={{ 
              width: '400px',
              height: '370px',
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip 
                    label={pet.rarity} 
                    size="small"
                    sx={{ 
                      backgroundColor: rarityColors[pet.rarity] || '#9e9e9e',
                      color: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 600
                    }} 
                  />
                  
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, pet)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                
                {/* Avatar y nombre */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={pet.icon_url || pet.avatar_url}
                    alt={pet.name}
                    sx={{ 
                      width: 100, 
                      height: 100,
                      border: `3px solid ${rarityColors[pet.rarity] || '#9e9e9e'}`,
                      mb: 2
                    }}
                  />
                  
                  <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
                    {pet.name}
                  </Typography>
                  
                  {pet.scientific_name && (
                    <Typography variant="body2" sx={{ color: '#616161', fontStyle: 'italic' }}>
                      {pet.scientific_name}
                    </Typography>
                  )}
                </Box>
                
                {/* Descripción */}
                <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
                  {pet.description}
                </Typography>
                
                {/* Footer */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Tooltip title="Hábitat">
                    <Chip 
                      label={pet.environmental_preference || pet.base_stats?.environmental_preference || 'unknown'} 
                      size="small" 
                      sx={{ 
                        backgroundColor: habitatColors[pet.environmental_preference || pet.base_stats?.environmental_preference] || '#9e9e9e',
                        color: 'white'
                      }} 
                    />
                  </Tooltip>
                  
                  <Chip 
                    label={`${pet.base_price || pet.quiz_points_cost || 0} pts`} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderColor: '#2196f3', color: '#2196f3' }} 
                  />
                  
                  {(pet.is_mexican_native || pet.available_in_store) && (
                    <Chip 
                      label={pet.is_mexican_native ? "Nativo MX" : "En tienda"} 
                      size="small" 
                      sx={{ 
                        backgroundColor: pet.is_mexican_native ? '#4caf50' : '#ff9800',
                        color: 'white'
                      }} 
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      {pets.length > pagination.limit && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(pets.length / pagination.limit)}
            page={pagination.page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Menú de opciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleMenuClose(); setOpenModal(true); }}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          Eliminar
        </MenuItem>
        <MenuItem onClick={() => { 
          handleMenuClose(); 
          navigate(`/admin/pets/evolution/${currentPet.pet_id}`);
        }}>
          <CheckIcon sx={{ mr: 1, color: '#9c27b0' }} />
          Evolucionar
        </MenuItem>
      </Menu>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentPet ? `Editar ${currentPet.name}` : 'Nueva Mascota'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleFormChange}
              fullWidth
              required
            />
            
            <FormControl fullWidth>
              <InputLabel>Especie</InputLabel>
              <Select
                name="species_type"
                value={formData.species_type}
                label="Especie"
                onChange={handleFormChange}
                required
              >
                <MenuItem value="mammal">Mamífero</MenuItem>
                <MenuItem value="bird">Ave</MenuItem>
                <MenuItem value="reptile">Reptil</MenuItem>
                <MenuItem value="amphibian">Anfibio</MenuItem>
                <MenuItem value="fish">Pez</MenuItem>
                <MenuItem value="insect">Insecto</MenuItem>
                <MenuItem value="dragon">Dragón</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleFormChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            
            <FormControl fullWidth>
              <InputLabel>Rareza</InputLabel>
              <Select
                name="rarity"
                value={formData.rarity}
                label="Rareza"
                onChange={handleFormChange}
              >
                <MenuItem value="common">Común</MenuItem>
                <MenuItem value="rare">Raro</MenuItem>
                <MenuItem value="epic">Épico</MenuItem>
                <MenuItem value="legendary">Legendario</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              name="base_price"
              label="Precio/Puntos"
              type="number"
              value={formData.base_price}
              onChange={handleFormChange}
              fullWidth
            />
            
            <TextField
              name="icon_url"
              label="URL de la imagen"
              value={formData.icon_url}
              onChange={handleFormChange}
              fullWidth
            />
            
            <TextField
              name="evolution_stages"
              label="Etapas de evolución"
              type="number"
              value={formData.evolution_stages}
              onChange={handleFormChange}
              fullWidth
              inputProps={{ min: 1, max: 5 }}
            />
            
            <FormControl fullWidth>
              <InputLabel>Preferencia ambiental</InputLabel>
              <Select
                name="environmental_preference"
                value={formData.environmental_preference}
                label="Preferencia ambiental"
                onChange={handleFormChange}
              >
                <MenuItem value="urban">Urbano</MenuItem>
                <MenuItem value="forest">Bosque</MenuItem>
                <MenuItem value="freshwater">Agua dulce</MenuItem>
                <MenuItem value="jungle">Jungla</MenuItem>
                <MenuItem value="mountain">Montaña</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl>
              <FormHelperText>Disponible en tienda</FormHelperText>
              <Select
                name="available_in_store"
                value={formData.available_in_store}
                onChange={handleFormChange}
              >
                <MenuItem value={true}>Sí</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} startIcon={<CloseIcon />}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            startIcon={<CheckIcon />}
            sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        petName={currentPet?.name || ''}
      />

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

export default PetsAdminPanel;