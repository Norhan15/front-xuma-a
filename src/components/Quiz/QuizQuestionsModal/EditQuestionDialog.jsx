import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

export const EditQuestionDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  formData, 
  onFormChange 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Pregunta</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Texto de la pregunta"
              name="questionText"
              value={formData.questionText}
              onChange={onFormChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de pregunta</InputLabel>
              <Select
                label="Tipo de pregunta"
                name="questionType"
                value={formData.questionType}
                onChange={onFormChange}
                required
              >
                <MenuItem value="multiple_choice">Opción múltiple</MenuItem>
                <MenuItem value="true_false">Verdadero/Falso</MenuItem>
                <MenuItem value="short_answer">Respuesta corta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Puntos"
              name="pointsValue"
              type="number"
              value={formData.pointsValue}
              onChange={onFormChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tiempo límite (segundos)"
              name="timeLimitSeconds"
              type="number"
              value={formData.timeLimitSeconds}
              onChange={onFormChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Peso de dificultad"
              name="difficultyWeight"
              value={formData.difficultyWeight}
              onChange={onFormChange}
              margin="normal"
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
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="URL de imagen (opcional)"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="URL de audio (opcional)"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={onFormChange}
              margin="normal"
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
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};