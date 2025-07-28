import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  fileName
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmar Eliminación</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ¿Estás seguro que deseas eliminar el archivo "{fileName}"? Esta acción no se puede deshacer.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} startIcon={<CloseIcon />}>
        Cancelar
      </Button>
      <Button 
        onClick={onConfirm} 
        variant="contained" 
        color="error"
        startIcon={<DeleteIcon />}
      >
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);