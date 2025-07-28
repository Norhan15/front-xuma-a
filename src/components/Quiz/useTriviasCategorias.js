import { useState, useEffect } from 'react';
import { 
  getQuizzesByTopic, 
  createQuiz, 
  updateQuiz, 
  deleteQuiz,
  getTopicDetails,
  publishQuiz,
  unpublishQuiz
} from '../../services/Quiz/QuizService'; // Asegúrate de crear este archivo

export const useTriviasCategorias = (categoryId) => {
  const [categoryName, setCategoryName] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [editForm, setEditForm] = useState({
    id: '',
    title: '',
    description: '',
    difficultyLevel: 'easy',
    targetAgeMin: 8,
    targetAgeMax: 12,
    timeLimitMinutes: 15,
    questionsCount: 5,
    passPercentage: 70,
    maxAttempts: 3,
    pointsReward: 50,
    requiresContentCompletion: false,
    requiredContentIds: [],
    isPublished: true
  });

  const [addForm, setAddForm] = useState({
    title: '',
    description: '',
    difficultyLevel: 'easy',
    targetAgeMin: 8,
    targetAgeMax: 12,
    timeLimitMinutes: 15,
    questionsCount: 5,
    passPercentage: 70,
    maxAttempts: 3,
    pointsReward: 50,
    requiresContentCompletion: false,
    requiredContentIds: [],
    isPublished: true,
    topicId: categoryId
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Obtener detalles de la categoría y quizzes en paralelo
      const [categoryData, quizzesData] = await Promise.all([
        getTopicDetails(categoryId),
        getQuizzesByTopic(categoryId)
      ]);
      
      setCategoryName(categoryData.name);
      setQuizzes(quizzesData);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

const handleMenuOpen = (event, quiz) => {
    setAnchorEl(event.currentTarget);
    setCurrentQuiz(quiz);
    setEditForm({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      difficultyLevel: quiz.difficultyLevel,
      targetAgeMin: quiz.targetAgeMin,
      targetAgeMax: quiz.targetAgeMax,
      timeLimitMinutes: quiz.timeLimitMinutes,
      questionsCount: quiz.questionsCount,
      passPercentage: quiz.passPercentage,
      maxAttempts: quiz.maxAttempts,
      pointsReward: quiz.pointsReward,
      requiresContentCompletion: quiz.requiresContentCompletion,
      requiredContentIds: quiz.requiredContentIds,
      isPublished: quiz.isPublished
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
    setAddForm({
      title: '',
      description: '',
      difficultyLevel: 'easy',
      targetAgeMin: 8,
      targetAgeMax: 12,
      timeLimitMinutes: 15,
      questionsCount: 5,
      passPercentage: 70,
      maxAttempts: 3,
      pointsReward: 50,
      requiresContentCompletion: false,
      requiredContentIds: [],
      isPublished: true,
      topicId: categoryId
    });
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
  };

  const handleEditSubmit = async () => {
    try {
      const { id, ...formData } = editForm;
      
      // Transformar los datos del formulario al formato que espera la API
      const transformedData = {
        title: formData.title,
        description: formData.description,
        difficultyLevel: formData.difficultyLevel,
        targetAgeMin: parseInt(formData.targetAgeMin),
        targetAgeMax: parseInt(formData.targetAgeMax),
        timeLimitMinutes: parseInt(formData.timeLimitMinutes),
        questionsCount: parseInt(formData.questionsCount),
        passPercentage: parseInt(formData.passPercentage),
        maxAttempts: parseInt(formData.maxAttempts),
        pointsReward: parseInt(formData.pointsReward),
        requiresContentCompletion: Boolean(formData.requiresContentCompletion),
        requiredContentIds: formData.requiredContentIds || [],
        isPublished: Boolean(formData.isPublished)
      };

      console.log('Transformed edit data:', transformedData);
      await updateQuiz(id, transformedData);
      await fetchData();
      handleEditDialogClose();
    } catch (error) {
      console.error("Error updating quiz:", error);
      setError(error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteQuiz(currentQuiz.id);
      await fetchData();
      handleDeleteDialogClose();
    } catch (error) {
      console.error("Error deleting quiz:", error);
      setError(error);
    }
  };

  const handleAddSubmit = async () => {
    try {
      // Transformar los datos del formulario al formato que espera la API
      const transformedData = {
        title: addForm.title,
        description: addForm.description,
        difficultyLevel: addForm.difficultyLevel,
        targetAgeMin: parseInt(addForm.targetAgeMin),
        targetAgeMax: parseInt(addForm.targetAgeMax),
        timeLimitMinutes: parseInt(addForm.timeLimitMinutes),
        questionsCount: parseInt(addForm.questionsCount),
        passPercentage: parseInt(addForm.passPercentage),
        maxAttempts: parseInt(addForm.maxAttempts),
        pointsReward: parseInt(addForm.pointsReward),
        requiresContentCompletion: Boolean(addForm.requiresContentCompletion),
        requiredContentIds: addForm.requiredContentIds || [],
        isPublished: Boolean(addForm.isPublished),
        topicId: addForm.topicId
      };

      console.log('Transformed quiz data:', transformedData);
      await createQuiz(transformedData);
      await fetchData();
      handleAddDialogClose();
    } catch (error) {
      console.error("Error adding quiz:", error);
      setError(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
   const handlePublishQuiz = async (quizId) => {
    try {
      setLoading(true);
      await publishQuiz(quizId);
      await fetchData();
    } catch (error) {
      console.error("Error publishing quiz:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublishQuiz = async (quizId) => {
    try {
      setLoading(true);
      await unpublishQuiz(quizId);
      await fetchData();
    } catch (error) {
      console.error("Error unpublishing quiz:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  return {
    categoryName,
    quizzes,
    loading,
    error,
    anchorEl,
    currentQuiz,
    openEditDialog,
    openDeleteDialog,
    openAddDialog,
    editForm,
    addForm,
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
    handlePublishQuiz,
    handleUnpublishQuiz
  };
};