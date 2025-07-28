import { useState, useEffect, useContext, useCallback } from 'react'; // Import useContext
import { getMediaByCategory, deleteMedia } from '../../services/Media/mediaService';
import { AuthContext } from '../../services/Auth/AuthContext'; // Import AuthContext

export const useMediaByCategory = (category) => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [media, setMedia] = useState([]);
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
      const result = await getMediaByCategory(category, pagination.page, pagination.limit);
      
      console.log('API Response:', result); // Para depuración
      
      setMedia(result.items);
      
      // Si el total de la API es 0 pero hay elementos, significa que la API no está devolviendo el total correctamente
      // En este caso, estimamos que hay más páginas si tenemos exactamente el límite de elementos
      const estimatedTotal = result.total || (result.items.length === pagination.limit ? result.items.length + 1 : result.items.length);
      
      setPagination(prev => ({
        ...prev,
        total: estimatedTotal,
        page: result.page,
        limit: result.limit
      }));
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error loading media');
      setMedia([]);
      setPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchMedia();
    }
  }, [category, pagination.page]); // Depend on category and page for re-fetching

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

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
      // Mostrar mensaje de éxito
      setSuccessMessage('URL copiada al portapapeles!');
      setTimeout(() => setSuccessMessage(null), 3000); // Limpia el mensaje después de 3 segundos
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
