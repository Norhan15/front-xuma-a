import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

export const DeleteQuestionDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  questionText 
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar la pregunta "{questionText}"? 
          Esta acción también eliminará todas sus opciones de respuesta.
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