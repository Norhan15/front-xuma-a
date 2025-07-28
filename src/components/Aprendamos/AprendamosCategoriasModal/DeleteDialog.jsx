import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';

export const DeleteDialog = ({ open, onClose, onConfirm, contentTitle, error, loading }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: '#f44336', color: 'white' }}>
        <Typography variant="h6">Confirmar Eliminación</Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography>{error.message}</Typography>
            {error.details && (
              <Typography variant="body2">
                {JSON.stringify(error.details)}
              </Typography>
            )}
          </Alert>
        )}
        
        <Typography>
          ¿Estás seguro que deseas eliminar el contenido "{contentTitle}"? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#666' }} disabled={loading}>
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