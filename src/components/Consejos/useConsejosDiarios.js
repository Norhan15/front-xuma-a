import { useState, useEffect } from 'react';
import { getDailyTips, updateTip, deleteTip, createTip  } from '../../services/Consejos/consejosService';

export const useConsejosDiarios = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTip, setCurrentTip] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedTipDetail, setSelectedTipDetail] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: ''
  });

const [openAddDialog, setOpenAddDialog] = useState(false);
const [addForm, setAddForm] = useState({
  title: '',
  description: '',
  tip_type: 'GENERAL'
});



  const fetchTips = async () => {
    try {
      setLoading(true);
      const { items, total } = await getDailyTips(pagination.page, pagination.limit);
      setTips(items);
      setPagination(prev => ({ ...prev, total }));
    } catch (error) {
      console.error('Error loading tips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, [pagination.page]);

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleMenuOpen = (event, tip) => {
    setAnchorEl(event.currentTarget);
    setCurrentTip(tip);
    setEditForm({
      title: tip.title,
      description: tip.description
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

  const handleEditSubmit = async () => {
    try {
      await updateTip(currentTip.id, editForm);
      fetchTips();
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating tip:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteTip(currentTip.id);
      fetchTips();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting tip:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClickOpenDetail = (tip) => {
    setSelectedTipDetail(tip);
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedTipDetail(null);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setAddForm({ title: '', description: '' });
  };

  const handleAddSubmit = async () => {
    try {
      await createTip(addForm);
      fetchTips();
      handleAddDialogClose();
    } catch (error) {
      console.error('Error adding tip:', error);
    }
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return {
    tips,
    loading,
    pagination,
    anchorEl,
    currentTip,
    openEditDialog,
    openDeleteDialog,
    openDetailDialog,
    selectedTipDetail,
    editForm,
    openAddDialog,
    addForm,
    handlePageChange,
    handleMenuOpen,
    handleMenuClose,
    handleEditClick,
    handleDeleteClick,
    handleEditDialogClose,
    handleDeleteDialogClose,
    handleEditSubmit,
    handleDeleteConfirm,
    handleFormChange,
    handleClickOpenDetail,
    handleCloseDetailDialog,
    handleAddClick,
    handleAddDialogClose,
    handleAddSubmit,
    handleAddFormChange,
    fetchTips
  };
};