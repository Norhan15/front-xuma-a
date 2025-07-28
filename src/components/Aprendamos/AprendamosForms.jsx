import { Box, Typography, Card, TextField, Button, MenuItem, InputLabel, FormControl, Select, Grid, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AprendamosForms = () => {
  const [files, setFiles] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    URL.revokeObjectURL(files[index].preview);
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ minHeight: '100vh', backgroundColor: '#E9F1F2', p: 3 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
          <Typography variant="h4" sx={{ color: '#0B2023', fontWeight: 600 }}>
            Aprendamos
          </Typography>
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <NotificationsIcon fontSize="large" sx={{ color: '#399649' }} />
          </IconButton>
        </Box>

        {/* Formulario */}
        <Card sx={{ maxWidth: 1200, mx: 'auto', p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            {/* Columna izquierda */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Título"
                fullWidth
                sx={{ mb: 3 }} // Keep consistent margin-bottom
              />

              <DatePicker
                label="Fecha"
                renderInput={(params) => <TextField {...params} fullWidth />}
                sx={{ mb: 4 }} // Increased margin-bottom here for more space
              />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>Subir imágenes</Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Seleccionar imágenes
                  <input type="file" hidden multiple accept="image/*" onChange={handleFileChange} />
                </Button>

                {/* Previsualización de imágenes */}
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  maxHeight: 300,
                  overflowY: 'auto',
                  p: 1
                }}>
                  {files.map((file, index) => (
                    <Box key={index} sx={{ position: 'relative' }}>
                      <Avatar
                        variant="rounded"
                        src={file.preview}
                        sx={{
                          width: 120,
                          height: 120,
                          border: '1px solid #ddd'
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)'
                          }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Descripción"
                multiline
                // Adjusted rows to help align with content in the left column
                rows={9} // Adjusted from 10 to 9 for better alignment with the DatePicker + upload section
                fullWidth
                sx={{ mb: 3 }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Tipo de contenido</InputLabel>
                <Select label="Tipo de contenido">
                  <MenuItem value="infografia">Infografía</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="URL del video"
                fullWidth
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" sx={{ px: 4, bgcolor: '#399649' }}>
              Guardar
            </Button>
          </Box>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default AprendamosForms;