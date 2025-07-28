import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Pagination,
  Menu,
  MenuItem,
  Button
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Añade este import
import { useParams } from 'react-router-dom';
import { useMediaByCategory } from './useMediaByCategory';
import { DeleteDialog } from './MediaModal/DeleteDialog';
import { UploadDialog } from './MediaModal/UploadDialog'; // Ensure this path is correct



const MediaByCategory = () => {
  const { category } = useParams();
  const {
    media,
    loading,
    error,
    successMessage,
    pagination,
    anchorEl,
    currentMedia,
    openDeleteDialog,
    openUploadDialog,
    handlePageChange,
    handleMenuOpen,
    handleMenuClose,
    handleDeleteClick,
    handleDeleteDialogClose,
    handleDeleteConfirm,
    handleOpenUploadDialog,
    handleCloseUploadDialog,
    handleCopyUrl,
    fetchMedia,
    userId // Get userId from the hook
  } = useMediaByCategory(category);

  const categoryData = {
    video: { color: '#3f51b5', title: "Videos" },
    image: { color: '#e91e63', title: "Imágenes" },
    document: { color: '#4caf50', title: "Documentos" },
    audio: { color: '#ff9800', title: "Audios" },
    other: { color: '#9e9e9e', title: "Otros archivos" }
  };

  // Add icons to categoryData for display
  categoryData.video.icon = <VideocamIcon fontSize="large" />;
  categoryData.image.icon = <ImageIcon fontSize="large" />;
  categoryData.document.icon = <DescriptionIcon fontSize="large" />;
  categoryData.audio.icon = <AudiotrackIcon fontSize="large" />;
  categoryData.other.icon = <MoreHorizIcon fontSize="large" />;

  // Verificar si la categoría existe
  const currentCategory = categoryData[category];
  if (!currentCategory) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Categoría no válida: {category}</Typography>
      </Box>
    );
  }

  if (loading && !media.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      backgroundColor: '#fffffff1',
      width: '100%',
      minHeight: '100vh',
      paddingTop: '20px',
      px: { xs: 2, md: 14 }
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        maxWidth: '1200px',
        mx: 'auto'
      }}>
        <Typography variant="h4" sx={{
          color: '#1e293b',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          fontSize: { xs: '1.8rem', sm: '2.2rem' }
        }}>
          Biblioteca de Medios
        </Typography>
        <IconButton sx={{ backgroundColor: '#f1f5f9', '&:hover': { backgroundColor: '#e2e8f0' } }}>
          <NotificationsIcon fontSize="medium" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Media section */}
      <Box sx={{
        maxWidth: '1200px',
        mb: 5,
        mx: 'auto'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h2" sx={{ fontSize: '2rem', color: currentCategory.color }}>
              {currentCategory.icon}
            </Typography>
            <Typography variant="h5" sx={{
              color: currentCategory.color,
              fontWeight: 600,
              fontSize: '1.4rem'
            }}>
              {currentCategory.title}
            </Typography>
            <Chip
            label={
              loading ? 'Cargando...' : 
              `${pagination.total} ${pagination.total === 1 ? 'archivo' : 'archivos'}`
            }
            size="small"
            sx={{
              backgroundColor: '#e2f3e5',
              color: '#399649',
              fontWeight: 500
            }}
          />
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenUploadDialog}
            sx={{ backgroundColor: currentCategory.color }}
          >
            Subir archivo
          </Button>
        </Box>

        {/* Grid de archivos */}
        {media.length === 0 && !loading ? ( // Only show "No hay archivos" if not loading and empty
          <Typography sx={{ color: '#64748b', mt: 4, textAlign: 'center' }}>
            No hay archivos en esta categoría
          </Typography>
        ) : (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {media.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    },
                    borderLeft: `4px solid ${currentCategory.color}`
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{
                          fontWeight: 600,
                          mb: 1,
                          wordBreak: 'break-word'
                        }}>
                          {item.originalName}
                        </Typography>
                        <IconButton
                          aria-label="more"
                          onClick={(e) => handleMenuOpen(e, item)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={item.fileType}
                          size="small"
                          sx={{ backgroundColor: '#f1f5f9' }}
                        />
                        <Chip
                          label={`${(item.fileSize / 1024).toFixed(1)} KB`}
                          size="small"
                          sx={{ backgroundColor: '#f1f5f9' }}
                        />
                        <Chip
                          label={item.isPublic ? 'Público' : 'Privado'}
                          size="small"
                          color={item.isPublic ? 'success' : 'default'}
                        />
                      </Box>

                      {item.publicUrl && (
                        <Typography variant="body2" sx={{
                          color: '#399649',
                          wordBreak: 'break-all',
                          mt: 1
                        }}>
                          <a
                            href={item.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'inherit' }}
                          >
                            Ver archivo
                          </a>
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {pagination.total > pagination.limit && (
              <Pagination
                count={Math.ceil(pagination.total / pagination.limit)}
                page={pagination.page}
                onChange={handlePageChange}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            )}
          </>
        )}

        {/* Menú de acciones */}
              <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }}
        >
        <MenuItem 
          onClick={handleCopyUrl}
          disabled={!currentMedia?.publicUrl}
          sx={{
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <ContentCopyIcon sx={{ mr: 1, fontSize: '20px' }} />
          <Typography variant="body2">Copiar URL</Typography>
        </MenuItem>
        <MenuItem 
          onClick={() => {
            if (currentMedia?.id) {
              navigator.clipboard.writeText(currentMedia.id);
              // Opcional: mostrar mensaje de confirmación
              console.log('ID copiado:', currentMedia.id);
            }
            handleMenuClose();
          }}
          disabled={!currentMedia?.id}
          sx={{
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <ContentCopyIcon sx={{ mr: 1, fontSize: '20px' }} />
          <Typography variant="body2">Copiar ID</Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleDeleteClick}
          sx={{
            '&:hover': {
              backgroundColor: '#fff0f0'
            }
          }}
        >
          <DeleteIcon sx={{ mr: 1, color: '#ef4444', fontSize: '20px' }} />
          <Typography variant="body2" color="error">Eliminar</Typography>
        </MenuItem>
      </Menu>

        {/* Mensajes de notificación */}
        {error && (
          <Box sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#f44336',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 9999
          }}>
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

        {successMessage && (
          <Box sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: '#4CAF50',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 9999
          }}>
            <Typography variant="body2">{successMessage}</Typography>
          </Box>
        )}


        {/* Diálogos */}
       <DeleteDialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm} // Ya no necesitas pasar user.userId aquí
        fileName={currentMedia?.originalName}
      />

        <UploadDialog
          open={openUploadDialog}
          onClose={handleCloseUploadDialog}
          category={category}  // ← categoría de la URL
          onUploadSuccess={fetchMedia}
          userId={userId}      // ← del hook useMediaByCategory
        />
      </Box>
    </Box>
  );
};

export default MediaByCategory;
