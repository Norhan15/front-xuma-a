import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox
} from '@mui/material';

export const AddOptionDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  formData, 
  onFormChange 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Agregar Nueva Opción</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Texto de la opción"
              name="optionText"
              value={formData.optionText}
              onChange={onFormChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isCorrect"
                  checked={formData.isCorrect}
                  onChange={onFormChange}
                />
              }
              label="Es la respuesta correcta"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Explicación (opcional)"
              name="explanation"
              value={formData.explanation}
              onChange={onFormChange}
              margin="normal"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Orden"
              name="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Agregar Opción
        </Button>
      </DialogActions>
    </Dialog>
  );
};