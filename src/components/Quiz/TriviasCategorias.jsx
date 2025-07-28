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
  CircularProgress
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from 'react-router-dom';
import { useTriviasCategorias } from './useTriviasCategorias';
import { EditDialog } from './QuizModal/EditDialog';
import { DeleteDialog } from './QuizModal/DeleteDialog';
import { AddDialog } from './QuizModal/AddDialog';

const TriviasCategorias = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const {
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
  } = useTriviasCategorias(categoryId);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz-questions/${quizId}`);
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
        <Typography color="error">Error al cargar los quizzes: {error.message}</Typography>
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
        <Typography
          variant="h4"
          sx={{
            color: '#1e293b',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}
        >
          Trivias
        </Typography>
        <IconButton
          sx={{
            backgroundColor: '#f1f5f9',
            color: '#1e293b',
            '&:hover': {
              backgroundColor: '#e2e8f0'
            }
          }}
          aria-label="notificaciones"
        >
          <NotificationsIcon fontSize="medium" sx={{ color: '#399649' }} />
        </IconButton>
      </Box>

      {/* Quizzes section */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          width: '100%',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h5"
              sx={{
                color: '#399649',
                fontWeight: 600,
                fontSize: '1.4rem'
              }}
            >
              Categoría
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#1e293b',
                fontWeight: 600,
                fontSize: '1.4rem'
              }}
            >
              {categoryName}
            </Typography>
          </Box>
          <Chip
            icon={<AddCircleIcon sx={{ color: '#fff !important' }} />}
            label="Nuevo Quiz"
            sx={{
              backgroundColor: '#399649',
              color: 'white',
              fontWeight: 500,
              px: 1,
              '& .MuiChip-icon': {
                marginLeft: '4px'
              }
            }}
            clickable
            onClick={handleAddClick}
          />
        </Box>

        {/* Contenedor de las cards */}
        <Grid container spacing={3} sx={{ width: '100%' }}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  height: '220px',
                  width: '280px',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    cursor: 'pointer'
                  },
                  borderLeft: '4px solid #399649'
                }}
                onClick={() => handleQuizClick(quiz.id)}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    position: 'relative',
                    padding: '16px',
                    '&:last-child': {
                      paddingBottom: '16px'
                    }
                  }}
                >
                  <IconButton
                    aria-label="more"
                    aria-controls="quiz-menu"
                    aria-haspopup="true"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, quiz);
                    }}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(0,0,0,0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.05)'
                      },
                      zIndex: 1
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '36px',
                    height: '100%',
                    justifyContent: 'space-between',
                    paddingBottom: '28px'
                  }}>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: '#1e293b',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1.1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: '1.3'
                      }}
                    >
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#64748b',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flexGrow: 1,
                        mb: 2
                      }}
                    >
                      {quiz.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={quiz.difficultyLevel}
                        size="small"
                        sx={{
                          backgroundColor: quiz.difficultyLevel === 'easy' ? '#e6f7e6' : 
                                          quiz.difficultyLevel === 'medium' ? '#fff7e6' : '#ffe6e6',
                          color: quiz.difficultyLevel === 'easy' ? '#399649' : 
                                quiz.difficultyLevel === 'medium' ? '#ffa726' : '#f44336',
                          fontWeight: 500
                        }}
                      />
                      <Chip
                        label={`${quiz.questionsCount} preguntas`}
                        size="small"
                        sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
                      />
                      <Chip
                        label={`${quiz.timeLimitMinutes} min`}
                        size="small"
                        sx={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
                      />
                      <Chip
                        label={quiz.isPublished ? 'Publicado' : 'No publicado'}
                        size="small"
                        sx={{
                          backgroundColor: quiz.isPublished ? '#e8f5e8' : '#fff3e0',
                          color: quiz.isPublished ? '#2e7d32' : '#f57c00',
                          fontWeight: 500
                        }}
                      />
                    </Box>
                  </Box>

                  <Chip
                    label={`${quiz.targetAgeMin}-${quiz.targetAgeMax} años`}
                    size="small"
                    sx={{
                      backgroundColor: '#e2f3e5',
                      color: '#399649',
                      fontWeight: 500,
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Menú de opciones */}
          <Menu
        id="quiz-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'quiz-menu',
        }}
        elevation={2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditClick} dense>
          <EditIcon sx={{ mr: 1, fontSize: '20px', color: '#5f6c7b' }} /> Editar
        </MenuItem>
        {currentQuiz?.isPublished ? (
          <MenuItem 
            onClick={() => {
              handleUnpublishQuiz(currentQuiz.id);
              handleMenuClose();
            }} 
            dense
          >
            <VisibilityOffIcon sx={{ mr: 1, fontSize: '20px', color: '#ef6c00' }} /> Despublicar
          </MenuItem>
        ) : (
          <MenuItem 
            onClick={() => {
              handlePublishQuiz(currentQuiz.id);
              handleMenuClose();
            }} 
            dense
          >
            <VisibilityIcon sx={{ mr: 1, fontSize: '20px', color: '#2e7d32' }} /> Publicar
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteClick} dense>
          <DeleteIcon sx={{ mr: 1, fontSize: '20px', color: '#ef4444' }} /> Eliminar
        </MenuItem>
      </Menu>
      </Box>

      {/* Diálogos */}
      <EditDialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        onSubmit={handleEditSubmit}
        formData={editForm}
        onFormChange={handleFormChange}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        quizTitle={currentQuiz?.title}
      />

      <AddDialog
        open={openAddDialog}
        onClose={handleAddDialogClose}
        onSubmit={handleAddSubmit}
        formData={addForm}
        onFormChange={handleAddFormChange}
      />
    </Box>
  );
};

export default TriviasCategorias;