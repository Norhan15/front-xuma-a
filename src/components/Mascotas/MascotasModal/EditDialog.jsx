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

export const EditDialog = ({
  open,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  petName
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Editar Mascota: {petName}</DialogTitle>
    <DialogContent dividers>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
        {/* Mismo contenido que AddDialog.jsx */}
        <TextField
          name="name"
          label="Nombre"
          value={formData.name}
          onChange={onFormChange}
          fullWidth
          required
        />
        
        {/* Resto de campos igual que en AddDialog */}
        {/* ... */}
        
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
        sx={{ backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1976d2' } }}
      >
        Guardar Cambios
      </Button>
    </DialogActions>
  </Dialog>
);