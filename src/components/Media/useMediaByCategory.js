import { useState, useEffect, useContext, useCallback } from 'react';
import { getMediaByCategory, deleteMedia } from '../../services/Media/mediaService';
import { AuthContext } from '../../services/Auth/AuthContext';

export const useMediaByCategory = (category) => {
  const { user } = useContext(AuthContext);
  const [allMedia, setAllMedia] = useState([]); // Todos los medios
  const [media, setMedia] = useState([]); // Medios de la página actual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const result = await getMediaByCategory(category);
      
      console.log('API Response:', result);
      
      setAllMedia(result.items || []);
      setPagination(prev => ({
        ...prev,
        total: result.items?.length || 0
      }));
      
      // Actualizar los medios de la página actual
      updateCurrentPageMedia(result.items || [], 1);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error loading media');
      setAllMedia([]);
      setMedia([]);
      setPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar los medios de la página actual
  const updateCurrentPageMedia = (allItems, page) => {
    const startIndex = (page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    setMedia(allItems.slice(startIndex, endIndex));
  };

  const handlePageChange = (event, newPage) => {
    updateCurrentPageMedia(allMedia, newPage);
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    if (category) {
      fetchMedia();
    }
  }, [category]);

  const handleMenuOpen = (event, mediaItem) => {
    setAnchorEl(event.currentTarget);
    setCurrentMedia(mediaItem);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!currentMedia || !user?.userId) {
        throw new Error('Missing required data for deletion');
      }
      
      await deleteMedia(user.userId, currentMedia.id);
      await fetchMedia(); // Re-fetch media after deletion
      
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting media:', error);
      setError(error.message || 'Error al eliminar el archivo');
    }
  };

  const handleOpenUploadDialog = () => {
    setOpenUploadDialog(true);
  };

  const handleCloseUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleCopyUrl = useCallback(() => {
    if (!currentMedia?.publicUrl) {
      setError('No hay URL pública disponible');
      return;
    }

    navigator.clipboard.writeText(currentMedia.publicUrl)
      .then(() => {
        setSuccessMessage('URL copiada al portapapeles!');
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(err => {
        console.error('Error al copiar:', err);
        setError('Error al copiar la URL');
      });
    
    handleMenuClose();
  }, [currentMedia]);

  return {
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
    fetchMedia,
    handleCopyUrl,
    userId: user?.userId 
  };
};