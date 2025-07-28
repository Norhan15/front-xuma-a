import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  tipTitle 
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirmar Eliminación</DialogTitle>
    <DialogContent>
      <Typography>
        ¿Estás seguro que deseas eliminar el consejo "{tipTitle}"?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        onClick={onConfirm}
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
      >
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);