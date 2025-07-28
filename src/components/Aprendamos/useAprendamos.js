import { useState, useEffect } from 'react';
import { getTopics, createTopic, updateTopic, deleteTopic } from '../../services/Aprendamos/AprendamosService';

export const useAprendamos = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [editForm, setEditForm] = useState({
    id: '', // Debe incluir el ID para la actualización
    name: '',
    description: '',
    slug: '',
    icon_url: '',
    color_hex: '',
    category: '',
    difficulty_level: '',
    target_age_min: '',
    target_age_max: '',
    prerequisites: '', // Inicializar como cadena para el input
    is_active: true,
    sort_order: ''
  });

  const [addForm, setAddForm] = useState({
    name: '',
    description: '',
    slug: '',
    icon_url: '',
    color_hex: '#399649',
    category: '',
    difficulty_level: 'BEGINNER',
    target_age_min: 8,
    target_age_max: 18,
    prerequisites: '',
    is_active: true,
    sort_order: 0
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getTopics();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleMenuOpen = (event, category) => {
    setAnchorEl(event.currentTarget);
    setCurrentCategory(category);
    // Cuando se abre el diálogo de edición, poblar editForm con todos los datos de la categoría
    setEditForm({
      id: category.id,
      name: category.name || '',
      description: category.description || '',
      slug: category.slug || '',
      icon_url: category.icon_url || '',
      color_hex: category.color_hex || '',
      category: category.category || '',
      difficulty_level: category.difficulty_level || '',
      target_age_min: category.target_age_min || '',
      target_age_max: category.target_age_max || '',
      // Convierte el array de prerequisitos a una cadena para mostrarlo en el TextField
      prerequisites: Array.isArray(category.prerequisites) ? category.prerequisites.join(', ') : category.prerequisites || '',
      is_active: category.is_active,
      sort_order: category.sort_order || ''
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

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setAddForm({
      name: '',
      description: '',
      slug: '',
      icon_url: '',
      color_hex: '#399649',
      category: '',
      difficulty_level: 'BEGINNER',
      target_age_min: 8,
      target_age_max: 18,
      prerequisites: '',
      is_active: true,
      sort_order: 0
    });
  };

  const handleEditSubmit = async () => {
    try {
      // Prepara los datos para enviar, asegurando los tipos correctos
      const dataToSend = {
        ...editForm,
        target_age_min: parseInt(editForm.target_age_min, 10) || 0, // Asegura que sea número, o 0 si está vacío
        target_age_max: parseInt(editForm.target_age_max, 10) || 0,
        sort_order: parseInt(editForm.sort_order, 10) || 0,
        prerequisites: editForm.prerequisites ? editForm.prerequisites.split(',').map(p => p.trim()) : []
      };
      // Elimina el ID del objeto que se envía al backend si la API no lo espera en el body
      const { id, ...restOfData } = dataToSend;

      await updateTopic(id, restOfData); // Pasa el ID por separado y el resto de los datos
      await fetchCategories();
      handleEditDialogClose();
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTopic(currentCategory.id);
      await fetchCategories();
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      const dataToSend = {
        ...addForm,
        target_age_min: parseInt(addForm.target_age_min, 10) || 0,
        target_age_max: parseInt(addForm.target_age_max, 10) || 0,
        sort_order: parseInt(addForm.sort_order, 10) || 0,
        prerequisites: addForm.prerequisites ? addForm.prerequisites.split(',').map(p => p.trim()) : []
      };
      await createTopic(dataToSend);
      await fetchCategories();
      handleAddDialogClose();
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setEditForm(prev => {
      let newValue = value;
      if (type === 'checkbox') {
        newValue = checked;
      } else if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleAddFormChange = (e) => {
    const { name, value, checked, type } = e.target;
    setAddForm(prev => {
      let newValue = value;
      if (type === 'checkbox') {
        newValue = checked;
      } else if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      }
      return { ...prev, [name]: newValue };
    });
  };

  return {
    categories,
    loading,
    error,
    anchorEl,
    currentCategory,
    openEditDialog,
    openDeleteDialog,
    openAddDialog,
    editForm,
    addForm,
    fetchCategories,
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
    handleAddFormChange
  };
};
