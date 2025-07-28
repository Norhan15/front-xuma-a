import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

export const DeleteOptionDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  optionText 
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar la opción "{optionText}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};