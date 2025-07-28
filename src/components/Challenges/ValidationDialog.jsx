import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Slider,
  Typography,
  Box,
  Grid,
  Divider
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

export const ValidationDialog = ({ open, onClose, onSubmit, validation }) => {
  const [validationData, setValidationData] = useState({
    validationScore: 50,
    validationNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValidationData(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (event, newValue) => {
    setValidationData(prev => ({ ...prev, validationScore: newValue }));
  };

  const handleSubmit = () => {
    onSubmit(validationData);
  };

  if (!validation) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Validar Desafío: {validation.challenge.title}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Evidencia enviada</Typography>
            
            {validation.contentText && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Descripción:</Typography>
                <Typography variant="body1" sx={{ p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  {validation.contentText}
                </Typography>
              </Box>
            )}
            
            {validation.mediaUrls.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Medios:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {validation.mediaUrls.map((url, index) => (
                    <Box key={index} sx={{ 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={url} 
                        alt={`Evidencia ${index + 1}`} 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '300px', 
                          display: 'block' 
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            {validation.locationData && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Ubicación:</Typography>
                <Typography variant="body1">
                  {validation.locationData.locationName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({validation.locationData.latitude}, {validation.locationData.longitude})
                </Typography>
              </Box>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Validación</Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ mb: 1 }}>
                Puntuación: <strong>{validationData.validationScore}/100</strong>
              </Typography>
              <Slider
                value={validationData.validationScore}
                onChange={handleScoreChange}
                aria-labelledby="validation-score-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
                sx={{ width: '95%' }}
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                name="validationNotes"
                label="Notas de Validación"
                value={validationData.validationNotes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                placeholder="Ej: Buena evidencia, pero falta una foto del centro de reciclaje"
              />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>Información del Envío:</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Tipo:</strong> {validation.submissionType}
                </Typography>
                <Typography variant="body2">
                  <strong>Fecha:</strong> {new Date(validation.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Número de envío:</strong> {validation.submissionNumber}
                </Typography>
                <Typography variant="body2">
                  <strong>Dispositivo:</strong> {validation.metadata.device}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          startIcon={<CloseIcon />}
          sx={{ color: 'text.secondary' }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          startIcon={<CheckIcon />}
          sx={{ 
            backgroundColor: '#399649',
            '&:hover': { backgroundColor: '#2e7d32' }
          }}
        >
          Enviar Validación
        </Button>
      </DialogActions>
    </Dialog>
  );
};