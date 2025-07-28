import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

export const EditDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  formData, 
  onFormChange 
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Editar Consejo</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Título"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.title}
        onChange={onFormChange}
        sx={{ mb: 2 }}
      />
      <TextField
        margin="dense"
        name="description"
        label="Descripción"
        type="text"
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        value={formData.description}
        onChange={onFormChange}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button
        onClick={onSubmit}
        color="primary"
        variant="contained"
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
);