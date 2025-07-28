// PetEvolutionPanel.jsx
import React from 'react';
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
  Pagination
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { usePetEvolution } from '../../components/Mascotas/usePetEvolution';

const PetEvolutionPanel = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const {
    petInfo,
    evolutionCosts, 
    loading, 
    error,
    openModal,
    formData,
    fetchEvolutionCosts,
    handleDeleteCost,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleFormChange,
    handleSubmit
  } = usePetEvolution(petId);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentCost, setCurrentCost] = React.useState(null);

  const handleMenuOpen = (event, cost) => {
    setAnchorEl(event.currentTarget);
    setCurrentCost(cost);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.8rem', sm: '2.2rem' }
            }}
          >
            Evolución de {petInfo?.name || 'Mascota'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Agregar nueva etapa">
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
            Costos de evolución
          </Typography>
        </Box>
      </Box>

      {/* Grid de etapas de evolución */}
      <Grid container spacing={3}>
        {evolutionCosts.map((cost) => (
          <Grid item xs={12} sm={6} md={4} key={`${cost.petId}-${cost.stage}`}>
            <Card sx={{ 
              width: '400px',
              height: '200px',
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
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Etapa {cost.stage}
                  </Typography>
                  
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, cost)}>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                
                {/* Detalles */}
                <Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Costo: {cost.cost} puntos
                  </Typography>
                </Box>
                
                {/* Footer */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip 
                    label={`ID: ${cost.petId.substring(0, 8)}...`} 
                    size="small" 
                    variant="outlined"
                    sx={{ borderColor: '#2196f3', color: '#2196f3' }} 
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Menú de opciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { 
          handleMenuClose(); 
          handleOpenEditModal(currentCost); 
        }}>
          <EditIcon sx={{ mr: 1, color: '#2196f3' }} />
          Editar
        </MenuItem>
        <MenuItem onClick={() => { 
          handleMenuClose(); 
          handleDeleteCost(currentCost.stage); 
        }}>
          <DeleteIcon sx={{ mr: 1, color: '#f44336' }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Modal para crear/editar */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentCost ? `Editar Etapa ${currentCost.stage}` : 'Nueva Etapa de Evolución'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <TextField
              name="stage"
              label="Etapa"
              type="number"
              value={formData.stage}
              onChange={handleFormChange}
              fullWidth
              required
              disabled={!!currentCost}
              inputProps={{ min: 1 }}
            />
            
            <TextField
              name="cost"
              label="Costo en puntos"
              type="number"
              value={formData.cost}
              onChange={handleFormChange}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
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
    </Box>
  );
};

export default PetEvolutionPanel;