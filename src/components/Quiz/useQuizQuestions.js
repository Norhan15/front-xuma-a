import { useState, useEffect } from 'react';
import { 
  getQuizQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createQuestionOption,
  updateQuestionOption,
  deleteQuestionOption
} from '../../services/Quiz/QuizQuestionService';

export const useQuizQuestions = (quizId) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const [openQuestionDialog, setOpenQuestionDialog] = useState(false);
  const [openDeleteQuestionDialog, setOpenDeleteQuestionDialog] = useState(false);
  const [openOptionDialog, setOpenOptionDialog] = useState(false);
  const [openDeleteOptionDialog, setOpenDeleteOptionDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [questionForm, setQuestionForm] = useState({
    quizId: quizId,
    questionText: '',
    questionType: 'multiple_choice',
    explanation: '',
    pointsValue: 10,
    timeLimitSeconds: 30,
    imageUrl: '',
    audioUrl: '',
    sortOrder: 0,
    difficultyWeight: '1.0'
  });

  const [optionForm, setOptionForm] = useState({
    questionId: '',
    optionText: '',
    isCorrect: false,
    sortOrder: 0,
    explanation: ''
  });

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getQuizQuestions(quizId);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizId) {
      fetchQuestions();
    }
  }, [quizId]);

  // Question handlers
  const handleQuestionMenuOpen = (event, question) => {
    setAnchorEl(event.currentTarget);
    setCurrentQuestion(question);
  };

  const handleQuestionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddQuestionClick = () => {
    setQuestionForm({
      quizId: quizId,
      questionText: '',
      questionType: 'multiple_choice',
      explanation: '',
      pointsValue: 10,
      timeLimitSeconds: 30,
      imageUrl: '',
      audioUrl: '',
      sortOrder: questions.length + 1,
      difficultyWeight: '1.0'
    });
    setIsEditing(false);
    setOpenQuestionDialog(true);
  };

  const handleEditQuestionClick = () => {
    if (currentQuestion) {
      setQuestionForm({
        quizId: currentQuestion.quizId,
        questionText: currentQuestion.questionText,
        questionType: currentQuestion.questionType,
        explanation: currentQuestion.explanation || '',
        pointsValue: currentQuestion.pointsValue,
        timeLimitSeconds: currentQuestion.timeLimitSeconds,
        imageUrl: currentQuestion.imageUrl || '',
        audioUrl: currentQuestion.audioUrl || '',
        sortOrder: currentQuestion.sortOrder,
        difficultyWeight: currentQuestion.difficultyWeight
      });
      setIsEditing(true);
      setOpenQuestionDialog(true);
    }
    handleQuestionMenuClose();
  };

  const handleDeleteQuestionClick = () => {
    setOpenDeleteQuestionDialog(true);
    handleQuestionMenuClose();
  };

  const handleQuestionSubmit = async () => {
    try {
      if (isEditing) {
        await updateQuestion(currentQuestion.id, questionForm);
      } else {
        await createQuestion(questionForm);
      }
      await fetchQuestions();
      setOpenQuestionDialog(false);
    } catch (error) {
      console.error("Error saving question:", error);
      setError(error);
    }
  };

  const handleQuestionDeleteConfirm = async () => {
    try {
      await deleteQuestion(currentQuestion.id);
      await fetchQuestions();
      setOpenDeleteQuestionDialog(false);
    } catch (error) {
      console.error("Error deleting question:", error);
      setError(error);
    }
  };

  const handleOptionSubmit = async () => {
    try {
      if (isEditing) {
        await updateQuestionOption(currentOption.id, {
          optionText: optionForm.optionText,
          isCorrect: optionForm.isCorrect,
          explanation: optionForm.explanation,
          sortOrder: optionForm.sortOrder
        });
      } else {
        await createQuestionOption(optionForm.questionId, {
          optionText: optionForm.optionText,
          isCorrect: optionForm.isCorrect,
          explanation: optionForm.explanation,
          sortOrder: optionForm.sortOrder
        });
      }
      await fetchQuestions();
      setOpenOptionDialog(false);
    } catch (error) {
      console.error("Error saving option:", error);
      setError(error);
    }
  };

  const handleOptionDeleteConfirm = async () => {
    try {
      await deleteQuestionOption(currentOption.id);
      await fetchQuestions();
      setOpenDeleteOptionDialog(false);
    } catch (error) {
      console.error("Error deleting option:", error);
      setError(error);
    }
  };

  // Option handlers
  const handleOptionMenuOpen = (event, option, question) => {
    setAnchorEl(event.currentTarget);
    setCurrentOption(option);
    setCurrentQuestion(question);
  };

  const handleAddOptionClick = (question) => {
    setOptionForm({
      questionId: question.id,
      optionText: '',
      isCorrect: false,
      sortOrder: question.options ? question.options.length + 1 : 1,
      explanation: ''
    });
    setCurrentQuestion(question);
    setIsEditing(false);
    setOpenOptionDialog(true);
  };

  const handleEditOptionClick = (option, question) => {
    setOptionForm({
      questionId: question.id,
      optionText: option.optionText,
      isCorrect: option.isCorrect,
      sortOrder: option.sortOrder,
      explanation: option.explanation || ''
    });
    setCurrentOption(option);
    setCurrentQuestion(question);
    setIsEditing(true);
    setOpenOptionDialog(true);
  };

  const handleDeleteOptionClick = (option, question) => {
    setCurrentOption(option);
    setCurrentQuestion(question);
    setOpenDeleteOptionDialog(true);
  };

  const handleQuestionFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestionForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOptionFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOptionForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return {
    questions,
    loading,
    error,
    anchorEl,
    currentQuestion,
    currentOption,
    openQuestionDialog,
    openDeleteQuestionDialog,
    openOptionDialog,
    openDeleteOptionDialog,
    questionForm,
    optionForm,
    isEditing,
    fetchQuestions,
    handleQuestionMenuOpen,
    handleQuestionMenuClose,
    handleAddQuestionClick,
    handleEditQuestionClick,
    handleDeleteQuestionClick,
    handleQuestionSubmit,
    handleQuestionDeleteConfirm,
    handleOptionMenuOpen,
    handleAddOptionClick,
    handleEditOptionClick,
    handleDeleteOptionClick,
    handleOptionSubmit,
    handleOptionDeleteConfirm,
    handleQuestionFormChange,
    handleOptionFormChange,
    setOpenQuestionDialog,
    setOpenDeleteQuestionDialog,
    setOpenOptionDialog,
    setOpenDeleteOptionDialog
  };
};