import React, { useState, useContext, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { uploadMedia } from '../../../services/Media/mediaService';
import { AuthContext } from '../../../services/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UploadDialog = ({ open, onClose, category, onUploadSuccess }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleIsPublicChange = (event) => {
    setIsPublic(event.target.checked);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setUploadError('');
    setUploadSuccess(false);

    // Validación mejorada del usuario
    if (!user) {
      setUploadError('Debes iniciar sesión para subir archivos');
      setTimeout(() => navigate('/login'), 2000);
      setLoading(false);
      return;
    }

    if (!user.userId) {
      setUploadError('Error en la información de usuario. Por favor, vuelve a iniciar sesión.');
      setLoading(false);
      return;
    }

    if (!file) {
      setUploadError('Por favor, selecciona un archivo para subir.');
      setLoading(false);
      return;
    }

    const fileData = {
      file: file,
      category: category, // Usamos la categoría de las props
      isPublic: isPublic,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
    };

    try {
      await uploadMedia(fileData, user.userId);
      setUploadSuccess(true);
      if (onUploadSuccess) onUploadSuccess();
      
      // Cierre automático después de éxito
      setTimeout(() => {
        onClose();
        setFile(null);
        setTags('');
      }, 1500);
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploadError(error.message || 'Error al subir el archivo');
    } finally {
      setLoading(false);
    }
  };

  // Reset al abrir el diálogo
  useEffect(() => {
    if (open) {
      setFile(null);
      setIsPublic(true);
      setTags('');
      setUploadError('');
      setUploadSuccess(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <CloudUploadIcon />
          <Typography variant="h6">Subir Archivo ({category})</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        {uploadError && <Alert severity="error" sx={{ mb: 2 }}>{uploadError}</Alert>}
        {uploadSuccess && <Alert severity="success" sx={{ mb: 2 }}>¡Archivo subido con éxito!</Alert>}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Seleccionar Archivo
          </Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              py: 1.5,
              borderColor: '#4CAF50',
              color: '#4CAF50',
              '&:hover': { borderColor: '#45a049' },
              textTransform: 'none'
            }}
          >
            {file ? file.name : 'Elegir archivo'}
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Etiquetas (separadas por comas)"
          value={tags}
          onChange={handleTagsChange}
          sx={{ mb: 3 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isPublic}
              onChange={handleIsPublicChange}
              sx={{ '&.Mui-checked': { color: '#4CAF50' } }}
            />
          }
          label="Hacer público"
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: '#666' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{ bgcolor: '#4CAF50', '&:hover': { bgcolor: '#45a049' } }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Subir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};