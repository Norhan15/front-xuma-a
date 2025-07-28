import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
  Chip,
  Stack,
  Autocomplete,
  debounce
} from '@mui/material';
import { useTextSuggestions } from '../useTextSuggestions';

export const AddDialog = ({ open, onClose, onSubmit, formData, onFormChange, loading }) => {
  const { 
    suggestions: titleSuggestions, 
    loading: suggestionsLoading, 
    error: suggestionsError,
    isOfflineMode,
    getSuggestions,
    clearSuggestions 
  } = useTextSuggestions();

  const [selectedSuggestion, setSelectedSuggestion] = useState('');

  // Debounced function para obtener sugerencias de título
  const debouncedGetSuggestions = React.useMemo(
    () => debounce((text) => {
      if (text && text.trim().length >= 2) {
        getSuggestions(text);
      } else {
        clearSuggestions();
      }
    }, 800),
    [getSuggestions, clearSuggestions]
  );

  // Función para manejar cambios en el campo nombre
  const handleNameChange = (event) => {
    const value = event.target.value;
    onFormChange(event);
    
    // Obtener sugerencias cuando el usuario escribe
    debouncedGetSuggestions(value);
  };

  // Función para aplicar una sugerencia seleccionada
  const handleSuggestionSelect = (suggestion) => {
    if (suggestion) {
      const syntheticEvent = {
        target: {
          name: 'name',
          value: suggestion
        }
      };
      onFormChange(syntheticEvent);
      setSelectedSuggestion(suggestion);
      clearSuggestions();
    }
  };

  // Limpiar sugerencias cuando se cierra el diálogo
  useEffect(() => {
    if (!open) {
      clearSuggestions();
      setSelectedSuggestion('');
    }
  }, [open, clearSuggestions]);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
        <Typography variant="h6">Nueva Categoría</Typography>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        {/* Campo de nombre con sugerencias */}
        <Box sx={{ mb: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name || ''}
            onChange={handleNameChange}
            InputProps={{
              endAdornment: suggestionsLoading && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
            helperText={isOfflineMode ? 
              "Modo offline activo - Sugerencias generadas localmente" : 
              "Escribe para obtener sugerencias de títulos automáticas"
            }
          />
          
          {/* Mostrar sugerencias */}
          {titleSuggestions.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#399649', fontWeight: 500 }}>
                  💡 Sugerencias de títulos
                </Typography>
                {isOfflineMode && (
                  <Chip 
                    label="Modo offline" 
                    size="small" 
                    sx={{ 
                      ml: 1, 
                      backgroundColor: '#ff9800', 
                      color: 'white',
                      fontSize: '0.7rem'
                    }} 
                  />
                )}
                :
              </Box>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {titleSuggestions.slice(0, 5).map((suggestion, index) => (
                  <Chip
                    key={index}
                    label={suggestion.length > 60 ? `${suggestion.substring(0, 57)}...` : suggestion}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: isOfflineMode ? '#ff9800' : '#399649',
                      color: isOfflineMode ? '#ff9800' : '#399649',
                      '&:hover': {
                        backgroundColor: isOfflineMode ? '#ff9800' : '#399649',
                        color: 'white',
                        cursor: 'pointer'
                      },
                      transition: 'all 0.2s ease',
                      maxWidth: '300px'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Mostrar error de sugerencias */}
          {suggestionsError && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              Error al obtener sugerencias: {suggestionsError}
            </Typography>
          )}
        </Box>
        
        <TextField
          margin="dense"
          name="description"
          label="Descripción"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={formData.description || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="slug"
          label="Slug"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.slug || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="icon_url"
          label="URL del Icono"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.icon_url || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="color_hex"
          label="Color (Hex)"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.color_hex || ''}
          onChange={onFormChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: formData.color_hex || '#FFFFFF',
                    marginRight: 1
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="category"
          label="Categoría"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.category || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="difficulty_level"
          label="Nivel de Dificultad"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.difficulty_level || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="target_age_min"
          label="Edad Mínima"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.target_age_min || ''}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="target_age_max"
          label="Edad Máxima"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.target_age_max || ''}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 3 }}
        />
        
        <TextField
          margin="dense"
          name="prerequisites"
          label="Prerequisitos (separados por comas)"
          type="text"
          fullWidth
          variant="outlined"
          value={Array.isArray(formData.prerequisites) ? formData.prerequisites.join(', ') : formData.prerequisites || ''}
          onChange={onFormChange}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.is_active || false}
              onChange={onFormChange}
              name="is_active"
              sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
            />
          }
          label="Activo"
          sx={{ mb: 3 }}
        />

        <TextField
          margin="dense"
          name="sort_order"
          label="Orden de Clasificación"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.sort_order || 0}
          onChange={onFormChange}
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
        />
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};