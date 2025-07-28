import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

export const AddDialog = ({
  open,
  onClose,
  onSubmit,
  formData,
  onFormChange
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Agregar Nuevo Consejo</DialogTitle>
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
        sx={{ mb: 2 }} // Agrega un margen inferior para el nuevo campo
      />
      {/* Nuevo campo para tip_type */}
      <TextField
        margin="dense"
        name="tip_type" // Asegúrate de que el nombre coincida con la propiedad en formData
        label="Tipo de Consejo"
        type="text"
        fullWidth
        variant="outlined"
        value={formData.tip_type}
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
        Agregar
      </Button>
    </DialogActions>
  </Dialog>
);