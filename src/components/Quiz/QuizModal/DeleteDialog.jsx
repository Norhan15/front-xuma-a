import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export const DeleteDialog = ({ open, onClose, onConfirm, quizTitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar el quiz "{quizTitle}"? Esta acción no se puede deshacer.
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