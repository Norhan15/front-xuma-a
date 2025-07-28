import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import { Add, MoreVert, Stars, People, Schedule, Event, Task, CheckCircle } from '@mui/icons-material';
import { useChallenges } from './useChallenges';
import { AddEditDialog } from './AddEditDialog';
import { DeleteDialog } from './DeleteDialog';
import { ActionMenu } from './ActionMenu';
import { ValidationDialog } from './ValidationDialog';

const difficultyOptions = ['easy', 'medium', 'hard'];
const validationTypeOptions = ['photo', 'text', 'video', 'location'];
const categoryOptions = ['Ecología', 'Reciclaje', 'Energía', 'Agua', 'Biodiversidad'];

const ChallengesAdmin = () => {
  const { 
    challenges, 
    pendingValidations,
    loading, 
    error,
    addChallenge, 
    editChallenge, 
    removeChallenge,
    fetchPendingValidations,
    submitValidation
  } = useChallenges();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openValidationDialog, setOpenValidationDialog] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: { steps: ['', '', ''] },
    category: 'Ecología',
    difficulty: 'easy',
    pointsReward: 100,
    estimatedDurationDays: 7,
    validationType: 'photo',
    validationCriteria: { requiredEvidence: ['', ''] },
    maxParticipants: 100,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    featuredUntil: new Date().toISOString(),
    isRecurring: false,
    recurrencePattern: {},
    ageRestrictions: { minAge: 8, maxAge: 18 }
  });

  const handleMenuOpen = (event, challenge) => {
    setAnchorEl(event.currentTarget);
    setSelectedChallenge(challenge);
    setFormData({
      ...challenge,
      startDate: challenge.startDate.split('T')[0],
      endDate: challenge.endDate.split('T')[0]
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreateDialog = () => {
    setSelectedChallenge(null);
    setFormData({
      title: '',
      description: '',
      instructions: { steps: ['', '', ''] },
      category: 'Ecología',
      difficulty: 'easy',
      pointsReward: 100,
      estimatedDurationDays: 7,
      validationType: 'photo',
      validationCriteria: { requiredEvidence: ['', ''] },
      maxParticipants: 100,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      featuredUntil: new Date().toISOString(),
      isRecurring: false,
      recurrencePattern: {},
      ageRestrictions: { minAge: 8, maxAge: 18 }
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('instructions.steps.')) {
      const index = parseInt(name.split('.')[2]);
      const newSteps = [...formData.instructions.steps];
      newSteps[index] = value;
      setFormData(prev => ({
        ...prev,
        instructions: { ...prev.instructions, steps: newSteps }
      }));
    } 
    else if (name.startsWith('validationCriteria.requiredEvidence.')) {
      const index = parseInt(name.split('.')[2]);
      const newEvidence = [...formData.validationCriteria.requiredEvidence];
      newEvidence[index] = value;
      setFormData(prev => ({
        ...prev,
        validationCriteria: { ...prev.validationCriteria, requiredEvidence: newEvidence }
      }));
    }
    else if (name.startsWith('ageRestrictions.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ageRestrictions: { ...prev.ageRestrictions, [field]: parseInt(value) || 0 }
      }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddStep = () => {
    setFormData(prev => ({
      ...prev,
      instructions: {
        ...prev.instructions,
        steps: [...prev.instructions.steps, '']
      }
    }));
  };

  const handleRemoveStep = (index) => {
    const newSteps = formData.instructions.steps.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      instructions: { ...prev.instructions, steps: newSteps }
    }));
  };

  const handleAddEvidence = () => {
    setFormData(prev => ({
      ...prev,
      validationCriteria: {
        ...prev.validationCriteria,
        requiredEvidence: [...prev.validationCriteria.requiredEvidence, '']
      }
    }));
  };

  const handleRemoveEvidence = (index) => {
    const newEvidence = formData.validationCriteria.requiredEvidence.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      validationCriteria: { ...prev.validationCriteria, requiredEvidence: newEvidence }
    }));
  };

  const handleSubmit = async () => {
    try {
      const challengeData = {
        ...formData,
        pointsReward: parseInt(formData.pointsReward),
        estimatedDurationDays: parseInt(formData.estimatedDurationDays),
        maxParticipants: parseInt(formData.maxParticipants),
        ageRestrictions: {
          minAge: parseInt(formData.ageRestrictions.minAge),
          maxAge: parseInt(formData.ageRestrictions.maxAge)
        }
      };

      if (selectedChallenge) {
        await editChallenge(selectedChallenge.id, challengeData);
        setSnackbar({
          open: true,
          message: 'Desafío actualizado correctamente',
          severity: 'success'
        });
      } else {
        await addChallenge(challengeData);
        setSnackbar({
          open: true,
          message: 'Desafío creado correctamente',
          severity: 'success'
        });
      }
      setOpenDialog(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al guardar el desafío',
        severity: 'error'
      });
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeChallenge(selectedChallenge.id);
      setSnackbar({
        open: true,
        message: 'Desafío eliminado correctamente',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al eliminar el desafío',
        severity: 'error'
      });
    } finally {
      setOpenDeleteDialog(false);
      handleMenuClose();
    }
  };

  const handleValidateSubmission = (validation) => {
    setSelectedValidation(validation);
    setOpenValidationDialog(true);
  };

  const handleSubmitValidation = async (validationData) => {
    try {
      await submitValidation(selectedValidation.id, validationData);
      setSnackbar({
        open: true,
        message: 'Validación enviada correctamente',
        severity: 'success'
      });
      setOpenValidationDialog(false);
      fetchPendingValidations();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Error al enviar la validación',
        severity: 'error'
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      fetchPendingValidations();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  if (loading && !challenges.length && activeTab === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
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
      <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ 
            color: '#1e293b',
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}>
            Gestión de Desafíos
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Agregar nuevo desafío">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenCreateDialog}
                sx={{
                  backgroundColor: '#399649',
                  '&:hover': { backgroundColor: '#2e7d32' }
                }}
              >
                Nuevo Desafío
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Pestañas */}
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mt: 2 }}>
          <Tab label="Desafíos" icon={<Task />} />
          <Tab 
            label={
              <Badge badgeContent={pendingValidations.length} color="error">
                Validaciones
              </Badge>
            } 
            icon={<CheckCircle />} 
          />
        </Tabs>
      </Box>

      {/* Contenido de las pestañas */}
      {activeTab === 0 ? (
        /* Lista de Desafíos */
        <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 5 }}>
          <Grid container spacing={3}>
            {challenges.map((challenge) => (
              <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Chip 
                        label={challenge.difficulty} 
                        size="small"
                        color={getDifficultyColor(challenge.difficulty)}
                      />
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, challenge)}>
                        <MoreVert />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                      {challenge.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                      {challenge.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Event fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.estimatedDurationDays} días
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <People fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.currentParticipants}/{challenge.maxParticipants} participantes
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Stars fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {challenge.pointsReward} puntos
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Validación: {challenge.validationType}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        /* Lista de Validaciones Pendientes */
        <Box sx={{ maxWidth: '1200px', mx: 'auto', mb: 5 }}>
          {loading && pendingValidations.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : pendingValidations.length === 0 ? (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>No hay validaciones pendientes</Typography>
          ) : (
            <Grid container spacing={3}>
              {pendingValidations.map((validation) => (
                <Grid item xs={12} key={validation.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6">
                            {validation.challenge.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            Enviado por: Usuario {validation.userChallenge.userId}
                          </Typography>
                        </Box>
                        <Button 
                          variant="contained" 
                          onClick={() => handleValidateSubmission(validation)}
                          sx={{
                            backgroundColor: '#399649',
                            '&:hover': { backgroundColor: '#2e7d32' }
                          }}
                        >
                          Validar
                        </Button>
                      </Box>
                      
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Box>
                          <Typography variant="body2">
                            <strong>Tipo:</strong> {validation.submissionType}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Fecha:</strong> {new Date(validation.createdAt).toLocaleString()}
                          </Typography>
                          {validation.locationData && (
                            <Typography variant="body2">
                              <strong>Ubicación:</strong> {validation.locationData.locationName}
                            </Typography>
                          )}
                        </Box>
                        
                        {validation.contentText && (
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2">
                              <strong>Descripción:</strong> {validation.contentText}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                      
                      {validation.mediaUrls.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle2">Evidencia:</Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                            {validation.mediaUrls.map((url, index) => (
                              <img 
                                key={index} 
                                src={url} 
                                alt={`Evidencia ${index + 1}`}
                                style={{ 
                                  maxWidth: '200px', 
                                  maxHeight: '200px', 
                                  objectFit: 'contain',
                                  borderRadius: '4px',
                                  border: '1px solid #e0e0e0'
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* Diálogos */}
      <AddEditDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        formData={formData}
        onFormChange={handleFormChange}
        onAddStep={handleAddStep}
        onRemoveStep={handleRemoveStep}
        onAddEvidence={handleAddEvidence}
        onRemoveEvidence={handleRemoveEvidence}
        challenge={selectedChallenge}
        difficultyOptions={difficultyOptions}
        validationTypeOptions={validationTypeOptions}
        categoryOptions={categoryOptions}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        challengeName={selectedChallenge?.title}
      />

      <ActionMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onEdit={() => { handleMenuClose(); setOpenDialog(true); }}
        onDelete={handleDeleteClick}
      />

      <ValidationDialog
        open={openValidationDialog}
        onClose={() => setOpenValidationDialog(false)}
        onSubmit={handleSubmitValidation}
        validation={selectedValidation}
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChallengesAdmin;