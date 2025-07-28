import { useState, useEffect } from 'react';
import { 
  getCategoryContents, 
  createContent, 
  updateContent, 
  deleteContent,
  getCategoryDetails 
} from '../../services/Aprendamos/AprendamosCategoriasService';

export const useAprendamosCategorias = (categoryId) => {
  const [categoryName, setCategoryName] = useState('');
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [editForm, setEditForm] = useState({
  id: '',
  title: '',
  description: '',
  content_type: 'ARTICLE',
  main_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  thumbnail_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  difficulty_level: 'BEGINNER',
  target_age_min: 8,
  target_age_max: 18,
  reading_time_minutes: 1,
  duration_minutes: 1,
  is_downloadable: false,
  is_featured: false,
  is_published: false
});

const [addForm, setAddForm] = useState({
  title: '',
  description: '',
  content_type: 'ARTICLE',
  topic_id: categoryId,  // Asegurar que siempre tenga el categoryId
  main_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Valor por defecto
  thumbnail_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Valor por defecto
  difficulty_level: 'BEGINNER',
  target_age_min: 8,
  target_age_max: 18,
  reading_time_minutes: 1,
  duration_minutes: 1,
  is_downloadable: false,
  is_featured: false,
  is_published: false
});

const handleAddClick = () => {
  setAddForm({
    title: '',
    description: '',
    content_type: 'ARTICLE',
    topic_id: categoryId, // Asegurar que siempre se establezca el topic_id
    main_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    thumbnail_media_id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    difficulty_level: 'BEGINNER',
    target_age_min: 8,
    target_age_max: 18,
    reading_time_minutes: 1,
    duration_minutes: 1,
    is_downloadable: false,
    is_featured: false,
    is_published: false
  });
  setOpenAddDialog(true);
};

 const fetchContents = async () => {
  try {
    setLoading(true);
    const [categoryData, contentsData] = await Promise.all([
      getCategoryDetails(categoryId),
      getCategoryContents(categoryId)
    ]);
    
    setCategoryName(categoryData.name);    
    // Asegurarse de que contentsData es un array
    const validContents = Array.isArray(contentsData) ? contentsData : [];
    setContents(validContents);
    setError(null);
  } catch (err) {
    console.error("Error details:", err.response?.data || err.message);
    setError(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (categoryId) {
      fetchContents();
    }
  }, [categoryId]);

const handleMenuOpen = (event, content) => {
  setAnchorEl(event.currentTarget);
  setCurrentContent(content);
  setEditForm({
    id: content.id,
    title: content.title || '',
    description: content.description || '',
    content_type: content.content_type || 'ARTICLE',
    main_media_id: content.main_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    thumbnail_media_id: content.thumbnail_media_id || '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    difficulty_level: content.difficulty_level || 'BEGINNER',
    target_age_min: content.target_age_min || 8,
    target_age_max: content.target_age_max || 18,
    reading_time_minutes: content.reading_time_minutes || 1,
    duration_minutes: content.duration_minutes || 1,
    is_downloadable: content.is_downloadable || false,
    is_featured: content.is_featured || false,
    is_published: content.is_published || false
  });
};

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

const handleEditSubmit = async () => {
  try {
    const { id, ...restOfData } = editForm;
    
    // Validación básica
    if (!restOfData.title || !restOfData.description) {
      throw new Error('El título y la descripción son requeridos');
    }

    await updateContent(id, restOfData);
    await fetchContents();
    handleEditDialogClose();
  } catch (error) {
    console.error("Error al actualizar contenido:", error);
    setError({
      message: error.message || 'Error al actualizar el contenido',
      details: error.response?.data?.errors || null
    });
  }
};

const handleDeleteConfirm = async () => {
  try {
    if (!currentContent?.id) {
      throw new Error('No se ha seleccionado contenido para eliminar');
    }

    const result = await deleteContent(currentContent.id);
    
    // Verificar si la eliminación fue exitosa
    if (result?.success || result === undefined) {
      await fetchContents();
      handleDeleteDialogClose();
    } else {
      throw new Error('No se pudo confirmar la eliminación');
    }
  } catch (error) {
    console.error("Error al eliminar contenido:", error);
    setError({
      message: error.message || 'Error al eliminar el contenido',
      details: error.response?.data?.errors || null
    });
  }
};

 const handleAddSubmit = async () => {
  try {
    // Validación básica
    if (!addForm.title || !addForm.description) {
      throw new Error('El título y la descripción son requeridos');
    }

    // Asegurar que el topic_id está presente
    if (!addForm.topic_id) {
      throw new Error('No se ha especificado la categoría (topic_id)');
    }
    
    const response = await createContent(addForm);
    
    await fetchContents();
    handleAddDialogClose();
    
  } catch (error) {
    console.error("Error al crear contenido:", error);
    setError({
      message: error.message || 'Error al crear el contenido',
      details: error.response?.data?.errors || null
    });
  }
};

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Aquí podrías implementar filtrado en tiempo real o esperar a que el usuario presione Enter
  };

  return {
    categoryName,
    contents: contents.filter(content => 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    loading,
    error,
    anchorEl,
    currentContent,
    openEditDialog,
    openDeleteDialog,
    openAddDialog,
    editForm,
    addForm,
    searchTerm,
    handleMenuOpen,
    handleMenuClose,
    handleEditClick,
    handleDeleteClick,
    handleAddClick,
    handleEditDialogClose,
    handleDeleteDialogClose,
    handleAddDialogClose,
    handleEditSubmit,
    handleDeleteConfirm,
    handleAddSubmit,
    handleFormChange,
    handleAddFormChange,
    handleSearchChange
  };
};