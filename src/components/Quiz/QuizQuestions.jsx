import {
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  CircularProgress,
  Button,
  Divider
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizQuestions } from '../Quiz/useQuizQuestions';
import { AddQuestionDialog } from './QuizQuestionsModal/AddQuestionDialog';
import { EditQuestionDialog } from './QuizQuestionsModal/EditQuestionDialog';
import { DeleteQuestionDialog } from './QuizQuestionsModal/DeleteQuestionDialog';
import { AddOptionDialog } from './QuizOptionsModal/AddOptionDialog';
import { EditOptionDialog } from './QuizOptionsModal/EditOptionDialog';
import { DeleteOptionDialog } from './QuizOptionsModal/DeleteOptionDialog';

const QuizQuestions = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useQuizQuestions(quizId);

  const handleBackClick = () => {
    navigate(-1); // Navegar a la página anterior
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Error al cargar las preguntas: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: '#fffffff1',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
        justifyContent: 'center',
        marginTop: { xs: '10px', sm: 0 },
        px: { xs: 2, md: 14 }
      }}
    >
      {/* Header section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleBackClick} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              color: '#1e293b',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              fontSize: { xs: '1.8rem', sm: '2.2rem' }
            }}
          >
            Preguntas del Quiz
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleAddQuestionClick}
          sx={{
            backgroundColor: '#399649',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2e7d32'
            }
          }}
        >
          Nueva Pregunta
        </Button>
      </Box>

      {/* Questions section */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {questions.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            py: 4,
            textAlign: 'center'
          }}>
            <Typography variant="h6" sx={{ color: '#64748b', mb: 1 }}>
              No hay preguntas disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
              Agrega la primera pregunta para este quiz
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ width: '100%' }}>
            {questions.map((question) => (
              <Grid item xs={12} key={question.id}>
                <Card
                  sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#1e293b',
                            fontWeight: 600,
                            mb: 1
                          }}
                        >
                          {question.questionText}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Chip 
                            label={question.questionType === 'multiple_choice' ? 'Opción múltiple' : 'Texto libre'} 
                            size="small" 
                            sx={{ backgroundColor: '#e2f3e5', color: '#399649' }} 
                          />
                          <Chip 
                            label={`${question.pointsValue} pts`} 
                            size="small" 
                            sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }} 
                          />
                          <Chip 
                            label={`${question.timeLimitSeconds} seg`} 
                            size="small" 
                            sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }} 
                          />
                        </Box>
                        {question.explanation && (
                          <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                            <strong>Explicación:</strong> {question.explanation}
                          </Typography>
                        )}
                      </Box>
                      <IconButton
                        aria-label="question-menu"
                        onClick={(e) => handleQuestionMenuOpen(e, question)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Typography variant="subtitle2" sx={{ color: '#64748b' }}>
                          Opciones de respuesta
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<AddCircleIcon fontSize="small" />}
                          onClick={() => handleAddOptionClick(question)}
                        >
                          Agregar opción
                        </Button>
                      </Box>

                      {question.options?.length > 0 ? (
                        <Grid container spacing={1}>
                          {question.options.map((option) => (
                            <Grid item xs={12} sm={6} key={option.id}>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderLeft: `4px solid ${option.isCorrect ? '#4caf50' : '#e0e0e0'}`,
                                  backgroundColor: option.isCorrect ? '#f5faf5' : '#fafafa'
                                }}
                              >
                                <CardContent sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  py: 1,
                                  '&:last-child': { py: 1 }
                                }}>
                                  <Box>
                                    <Typography sx={{ 
                                      fontWeight: option.isCorrect ? 600 : 400,
                                      color: option.isCorrect ? '#2e7d32' : '#1e293b'
                                    }}>
                                      {option.optionText}
                                    </Typography>
                                    {option.explanation && (
                                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                                        {option.explanation}
                                      </Typography>
                                    )}
                                  </Box>
                                  <Box>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditOptionClick(option, question);
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteOptionClick(option, question);
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      ) : (
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                          No hay opciones definidas para esta pregunta
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Question Menu */}
      <Menu
        id="question-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleQuestionMenuClose}
      >
        <MenuItem onClick={handleEditQuestionClick}>
          <EditIcon sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={handleDeleteQuestionClick}>
          <DeleteIcon sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      {/* Question Dialogs */}
      {isEditing ? (
        <EditQuestionDialog
          open={openQuestionDialog}
          onClose={() => setOpenQuestionDialog(false)}
          onSubmit={handleQuestionSubmit}
          formData={questionForm}
          onFormChange={handleQuestionFormChange}
        />
      ) : (
        <AddQuestionDialog
          open={openQuestionDialog}
          onClose={() => setOpenQuestionDialog(false)}
          onSubmit={handleQuestionSubmit}
          formData={questionForm}
          onFormChange={handleQuestionFormChange}
        />
      )}

      <DeleteQuestionDialog
        open={openDeleteQuestionDialog}
        onClose={() => setOpenDeleteQuestionDialog(false)}
        onConfirm={handleQuestionDeleteConfirm}
        questionText={currentQuestion?.questionText}
      />

      {/* Option Dialogs */}
      {isEditing ? (
        <EditOptionDialog
          open={openOptionDialog}
          onClose={() => setOpenOptionDialog(false)}
          onSubmit={handleOptionSubmit}
          formData={optionForm}
          onFormChange={handleOptionFormChange}
        />
      ) : (
        <AddOptionDialog
          open={openOptionDialog}
          onClose={() => setOpenOptionDialog(false)}
          onSubmit={handleOptionSubmit}
          formData={optionForm}
          onFormChange={handleOptionFormChange}
        />
      )}

      <DeleteOptionDialog
        open={openDeleteOptionDialog}
        onClose={() => setOpenDeleteOptionDialog(false)}
        onConfirm={handleOptionDeleteConfirm}
        optionText={currentOption?.optionText}
      />
    </Box>
  );
};

export default QuizQuestions;