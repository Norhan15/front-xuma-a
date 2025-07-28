import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

export const EditDialog = ({ open, onClose, onSubmit, formData, onFormChange, loading }) => {
  const contentTypes = [
    { value: 'ARTICLE', label: 'Artículo' },
    { value: 'VIDEO', label: 'Video' },
    { value: 'QUIZ', label: 'Quiz' },
    { value: 'INTERACTIVE', label: 'Interactivo' }
  ];

  const difficultyLevels = [
    { value: 'BEGINNER', label: 'Principiante' },
    { value: 'INTERMEDIATE', label: 'Intermedio' },
    { value: 'ADVANCED', label: 'Avanzado' }
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
        <Typography variant="h6">Editar Contenido</Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            autoFocus
            name="title"
            label="Título"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title || ''}
            onChange={onFormChange}
          />
          
          <TextField
            name="description"
            label="Descripción"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.description || ''}
            onChange={onFormChange}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              name="content_type"
              label="Tipo de Contenido"
              fullWidth
              variant="outlined"
              value={formData.content_type || 'ARTICLE'}
              onChange={onFormChange}
            >
              {contentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              select
              name="difficulty_level"
              label="Nivel de Dificultad"
              fullWidth
              variant="outlined"
              value={formData.difficulty_level || 'BEGINNER'}
              onChange={onFormChange}
            >
              {difficultyLevels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              name="main_media_id"
              label="ID Media Principal"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.main_media_id || ''}
              onChange={onFormChange}
              helperText="UUID del media principal"
            />
            
            <TextField
              name="thumbnail_media_id"
              label="ID Thumbnail"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.thumbnail_media_id || ''}
              onChange={onFormChange}
              helperText="UUID del thumbnail"
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              name="target_age_min"
              label="Edad Mínima"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.target_age_min || 8}
              onChange={onFormChange}
              inputProps={{ min: 0 }}
            />
            
            <TextField
              name="target_age_max"
              label="Edad Máxima"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.target_age_max || 18}
              onChange={onFormChange}
              inputProps={{ min: 0 }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              name="reading_time_minutes"
              label="Minutos de lectura"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.reading_time_minutes || 0}
              onChange={onFormChange}
              inputProps={{ min: 0 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">min</InputAdornment>,
              }}
            />
            
            <TextField
              name="duration_minutes"
              label="Duración"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.duration_minutes || 0}
              onChange={onFormChange}
              inputProps={{ min: 0 }}
              InputProps={{
                endAdornment: <InputAdornment position="end">min</InputAdornment>,
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_downloadable || false}
                  onChange={onFormChange}
                  name="is_downloadable"
                  sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
                />
              }
              label="Descargable"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_featured || false}
                  onChange={onFormChange}
                  name="is_featured"
                  sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
                />
              }
              label="Destacado"
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_published || false}
                  onChange={onFormChange}
                  name="is_published"
                  sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
                />
              }
              label="Publicado"
            />
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#666' }}>
          Cancelar
        </Button>
        <Button 
          onClick={onSubmit} 
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar Cambios'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};