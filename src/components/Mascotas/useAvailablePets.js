import { useState, useEffect } from 'react';
import { getAvailablePets, createPet, updatePet, deletePet } from '../../services/Mascotas/petsService';

export const useAvailablePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0
  });

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getAvailablePets();
      setPets(data);
      setPagination(prev => ({ ...prev, total: data.length }));
    } catch (err) {
      setError(err.message || 'Error al cargar las mascotas');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePet = async (petData) => {
    try {
      const newPet = await createPet(petData);
      await fetchPets();
      return newPet;
    } catch (err) {
      setError(err.message || 'Error al crear la mascota');
      throw err;
    }
  };

  const handleUpdatePet = async (petId, petData) => {
    try {
      const updatedPet = await updatePet(petId, petData);
      await fetchPets();
      return updatedPet;
    } catch (err) {
      setError(err.message || 'Error al actualizar la mascota');
      throw err;
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      await deletePet(petId);
      await fetchPets();
      return true;
    } catch (err) {
      setError(err.message || 'Error al eliminar la mascota');
      throw err;
    }
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return { 
    pets, 
    loading, 
    error, 
    pagination,
    fetchPets,
    handleCreatePet,
    handleUpdatePet,
    handleDeletePet,
    handlePageChange
  };
};