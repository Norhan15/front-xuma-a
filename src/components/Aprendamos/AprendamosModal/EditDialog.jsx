import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

export const EditDialog = ({ open, onClose, onSubmit, formData, onFormChange, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
        <Typography variant="h6">Editar Categoría</Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="description"
          label="Descripción"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={formData.description || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="slug"
          label="Slug"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.slug || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="icon_url"
          label="URL del Icono"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.icon_url || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="color_hex"
          label="Color (Hex)"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.color_hex || ''}
          onChange={onFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: formData.color_hex || '#FFFFFF',
                    marginRight: 1
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="category"
          label="Categoría"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.category || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="difficulty_level"
          label="Nivel de Dificultad"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.difficulty_level || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="target_age_min"
          label="Edad Mínima"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.target_age_min || ''}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="target_age_max"
          label="Edad Máxima"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.target_age_max || ''}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="prerequisites"
          label="Prerequisitos (separados por comas)"
          type="text"
          fullWidth
          variant="outlined"
          value={Array.isArray(formData.prerequisites) ? formData.prerequisites.join(', ') : formData.prerequisites || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.is_active || false}
              onChange={onFormChange}
              name="is_active"
              sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
            />
          }
          label="Activo"
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="sort_order"
          label="Orden de Clasificación"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.sort_order || 0}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#666' }}>
          Cancelar
        </Button>
        <Button 
          onClick={onSubmit} 
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};