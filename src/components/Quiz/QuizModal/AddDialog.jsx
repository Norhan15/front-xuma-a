import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid
} from '@mui/material';

export const AddDialog = ({ open, onClose, onSubmit, formData, onFormChange }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Nuevo Quiz</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título"
              name="title"
              value={formData.title}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              value={formData.description}
              onChange={onFormChange}
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Dificultad"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={onFormChange}
              margin="normal"
            >
              <MenuItem value="easy">Fácil</MenuItem>
              <MenuItem value="medium">Medio</MenuItem>
              <MenuItem value="hard">Difícil</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tiempo límite (min)"
              name="timeLimitMinutes"
              type="number"
              value={formData.timeLimitMinutes}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Edad mínima"
              name="targetAgeMin"
              type="number"
              value={formData.targetAgeMin}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Edad máxima"
              name="targetAgeMax"
              type="number"
              value={formData.targetAgeMax}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Número de preguntas"
              name="questionsCount"
              type="number"
              value={formData.questionsCount}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Porcentaje para aprobar"
              name="passPercentage"
              type="number"
              value={formData.passPercentage}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Intentos máximos"
              name="maxAttempts"
              type="number"
              value={formData.maxAttempts}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Puntos de recompensa"
              name="pointsReward"
              type="number"
              value={formData.pointsReward}
              onChange={onFormChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="requiresContentCompletion"
                  checked={formData.requiresContentCompletion}
                  onChange={onFormChange}
                />
              }
              label="Requiere completar contenido previo"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={onFormChange}
                />
              }
              label="Publicado"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};