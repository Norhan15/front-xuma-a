import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

export const DeleteDialog = ({ open, onClose, onConfirm, categoryName, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#f44336', color: 'white' }}>
        <Typography variant="h6">Confirmar Eliminación</Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        <Typography>
          ¿Estás seguro que deseas eliminar la categoría "{categoryName}"? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#666' }}>
          Cancelar
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Eliminar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};