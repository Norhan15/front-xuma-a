import { useState, useEffect } from 'react';
import { 
  getPetEvolutionCosts, 
  createEvolutionCost, 
  updateEvolutionCost, 
  deleteEvolutionCost 
} from '../../services/Mascotas/petsEvolutionService';

export const usePetEvolution = (petId) => {
  const [evolutionCosts, setEvolutionCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [petInfo, setPetInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [formData, setFormData] = useState({
    stage: '',
    cost: 0
  });

  const fetchEvolutionCosts = async () => {
    try {
      setLoading(true);
      const data = await getPetEvolutionCosts(petId);
      setEvolutionCosts(data);
      setPetInfo({
        id: petId,
        name: "Nombre de la mascota"
      });
    } catch (err) {
      setError(err.message || 'Error al cargar los costos de evolución');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCost = async (requestData) => {
  try {
    // Validamos que los datos requeridos estén presentes
    if (!requestData?.petId || !requestData?.stage || !requestData?.cost) {
      throw new Error('Faltan datos requeridos para crear el costo de evolución');
    }

    await createEvolutionCost({
      petId: requestData.petId,
      stage: Number(requestData.stage),
      cost: Number(requestData.cost)
    });
    await fetchEvolutionCosts();
  } catch (err) {
    console.error('Error en handleCreateCost:', err);
    setError(err.message || 'Error al crear el costo de evolución');
  }
};

const handleSubmit = async () => {
  try {
    // Validamos el formulario antes de enviar
    if (!formData.stage || !formData.cost) {
      throw new Error('Por favor completa todos los campos requeridos');
    }

    const requestData = {
      petId: petId,
      stage: Number(formData.stage),
      cost: Number(formData.cost)
    };

    if (currentStage) {
      await handleUpdateCost(currentStage.stage, { cost: Number(formData.cost) });
    } else {
      await handleCreateCost(requestData);
    }
    
    setOpenModal(false);
  } catch (err) {
    console.error('Error en handleSubmit:', err);
    setError(err.message || 'Error al guardar los datos de evolución');
  }
};

  const handleUpdateCost = async (stage, costData) => {
    try {
      await updateEvolutionCost(petId, stage, costData);
      await fetchEvolutionCosts();
    } catch (err) {
      setError(err.message || 'Error al actualizar el costo de evolución');
    }
  };

  const handleDeleteCost = async (stage) => {
    try {
      await deleteEvolutionCost(petId, stage);
      await fetchEvolutionCosts();
    } catch (err) {
      setError(err.message || 'Error al eliminar el costo de evolución');
    }
  };

  const handleOpenCreateModal = () => {
    setCurrentStage(null);
    setFormData({
      stage: '',
      cost: 0
    });
    setOpenModal(true);
  };

  const handleOpenEditModal = (stageCost) => {
    setCurrentStage(stageCost);
    setFormData({
      stage: stageCost.stage,
      cost: stageCost.cost
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  useEffect(() => {
    if (petId) {
      fetchEvolutionCosts();
    }
  }, [petId]);

  return { 
    petInfo,
    evolutionCosts, 
    loading, 
    error,
    openModal,
    formData,
    fetchEvolutionCosts,
    handleCreateCost,
    handleUpdateCost,
    handleDeleteCost,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleFormChange,
    handleSubmit
  };
};