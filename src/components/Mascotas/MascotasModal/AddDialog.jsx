import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

export const AddDialog = ({
  open,
  onClose,
  onSubmit,
  formData,
  onFormChange
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Agregar Nueva Mascota</DialogTitle>
    <DialogContent dividers>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
        <TextField
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={onFormChange}
          fullWidth
          required
        />
        
        <FormControl fullWidth>
          <InputLabel>Especie</InputLabel>
          <Select
            name="species_type"
            value={formData.species_type}
            label="Especie"
            onChange={onFormChange}
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
          onChange={onFormChange}
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
            onChange={onFormChange}
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
          onChange={onFormChange}
          fullWidth
        />
        
        <TextField
          name="icon_url"
          label="URL de la imagen"
          value={formData.icon_url}
          onChange={onFormChange}
          fullWidth
        />
        
        <TextField
          name="evolution_stages"
          label="Etapas de evolución"
          type="number"
          value={formData.evolution_stages}
          onChange={onFormChange}
          fullWidth
          inputProps={{ min: 1, max: 5 }}
        />
        
        <FormControl fullWidth>
          <InputLabel>Preferencia ambiental</InputLabel>
          <Select
            name="environmental_preference"
            value={formData.environmental_preference}
            label="Preferencia ambiental"
            onChange={onFormChange}
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
            onChange={onFormChange}
          >
            <MenuItem value={true}>Sí</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} startIcon={<CloseIcon />}>
        Cancelar
      </Button>
      <Button 
        onClick={onSubmit} 
        variant="contained" 
        startIcon={<CheckIcon />}
        sx={{ backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
      >
        Agregar
      </Button>
    </DialogActions>
  </Dialog>
);