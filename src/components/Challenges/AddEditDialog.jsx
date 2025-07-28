import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';

export const AddEditDialog = ({
  open,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  onAddStep,
  onRemoveStep,
  onAddEvidence,
  onRemoveEvidence,
  challenge,
  difficultyOptions,
  validationTypeOptions,
  categoryOptions
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>
      {challenge ? `Editar ${challenge.title}` : 'Nuevo Desafío'}
    </DialogTitle>
    <DialogContent dividers>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
        <TextField
          name="title"
          label="Título"
          value={formData.title}
          onChange={onFormChange}
          fullWidth
          required
        />
        
        <TextField
          name="description"
          label="Descripción"
          value={formData.description}
          onChange={onFormChange}
          fullWidth
          multiline
          rows={3}
          required
        />
        
        <Typography variant="subtitle1">Instrucciones</Typography>
        {formData.instructions.steps.map((step, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              name={`instructions.steps.${index}`}
              label={`Paso ${index + 1}`}
              value={step}
              onChange={onFormChange}
              fullWidth
            />
            <IconButton onClick={() => onRemoveStep(index)} color="error">
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={onAddStep} startIcon={<AddIcon />}>
          Agregar Paso
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Categoría</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Categoría"
              onChange={onFormChange}
            >
              {categoryOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Dificultad</InputLabel>
            <Select
              name="difficulty"
              value={formData.difficulty}
              label="Dificultad"
              onChange={onFormChange}
            >
              {difficultyOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="pointsReward"
            label="Puntos de Recompensa"
            type="number"
            value={formData.pointsReward}
            onChange={onFormChange}
            fullWidth
          />
          
          <TextField
            name="estimatedDurationDays"
            label="Duración Estimada (días)"
            type="number"
            value={formData.estimatedDurationDays}
            onChange={onFormChange}
            fullWidth
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Tipo de Validación</InputLabel>
            <Select
              name="validationType"
              value={formData.validationType}
              label="Tipo de Validación"
              onChange={onFormChange}
            >
              {validationTypeOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            name="maxParticipants"
            label="Máx. Participantes"
            type="number"
            value={formData.maxParticipants}
            onChange={onFormChange}
            fullWidth
          />
        </Box>
        
        <Typography variant="subtitle1">Evidencia Requerida</Typography>
        {formData.validationCriteria.requiredEvidence.map((evidence, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              name={`validationCriteria.requiredEvidence.${index}`}
              label={`Evidencia ${index + 1}`}
              value={evidence}
              onChange={onFormChange}
              fullWidth
            />
            <IconButton onClick={() => onRemoveEvidence(index)} color="error">
              <CloseIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={onAddEvidence} startIcon={<AddIcon />}>
          Agregar Evidencia
        </Button>
        
        <Typography variant="subtitle1">Fechas</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="startDate"
            label="Fecha de Inicio"
            type="date"
            value={formData.startDate}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            name="endDate"
            label="Fecha de Fin"
            type="date"
            value={formData.endDate}
            onChange={onFormChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        
        <Typography variant="subtitle1">Restricciones de Edad</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            name="ageRestrictions.minAge"
            label="Edad Mínima"
            type="number"
            value={formData.ageRestrictions.minAge}
            onChange={onFormChange}
            fullWidth
          />
          
          <TextField
            name="ageRestrictions.maxAge"
            label="Edad Máxima"
            type="number"
            value={formData.ageRestrictions.maxAge}
            onChange={onFormChange}
            fullWidth
          />
        </Box>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} startIcon={<CloseIcon />}>
        Cancelar
      </Button>
      <Button 
        onClick={onSubmit} 
        variant="contained" 
        startIcon={<CheckIcon />}
        sx={{ backgroundColor: '#399649', '&:hover': { backgroundColor: '#2e7d32' } }}
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
);