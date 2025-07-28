import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  challengeName,
  loading = false
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmar Eliminación</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro de que deseas eliminar el desafío "{challengeName}"?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button 
        onClick={onClose} 
        startIcon={<CloseIcon />}
        disabled={loading}
      >
        Cancelar
      </Button>
      <Button 
        onClick={onConfirm} 
        variant="contained" 
        color="error"
        startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
        disabled={loading}
      >
        {loading ? 'Eliminando...' : 'Eliminar'}
      </Button>
    </DialogActions>
  </Dialog>
);