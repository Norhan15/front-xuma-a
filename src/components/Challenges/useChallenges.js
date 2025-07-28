import { useState, useEffect, useContext } from 'react';
import { 
  getAllChallenges, 
  getChallengeById, 
  createChallenge, 
  updateChallenge, 
  deleteChallenge,
  getPendingValidations,
  validateSubmission
} from '../../services/Challenges/challengesService';
import { AuthContext } from '../../services/Auth/AuthContext';

export const useChallenges = () => {
  const { user } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [pendingValidations, setPendingValidations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      const data = await getAllChallenges();
      setChallenges(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchChallenge = async (challengeId) => {
    try {
      setLoading(true);
      const data = await getChallengeById(challengeId);
      setCurrentChallenge(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addChallenge = async (challengeData) => {
    try {
      setLoading(true);
      const newChallenge = await createChallenge(challengeData);
      setChallenges(prev => [...prev, newChallenge]);
      return newChallenge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editChallenge = async (challengeId, challengeData) => {
    try {
      setLoading(true);
      const updatedChallenge = await updateChallenge(challengeId, challengeData);
      setChallenges(prev => 
        prev.map(challenge => challenge.id === challengeId ? updatedChallenge : challenge)
      );
      return updatedChallenge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeChallenge = async (challengeId) => {
    try {
      setLoading(true);
      await deleteChallenge(challengeId);
      setChallenges(prev => prev.filter(challenge => challenge.id !== challengeId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

   const fetchPendingValidations = async () => {
    try {
      setLoading(true);
      const data = await getPendingValidations();
      setPendingValidations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitValidation = async (submissionId, validationData) => {
    try {
      setLoading(true);
      // Usar el userId del usuario autenticado actual
      const result = await validateSubmission(submissionId, validationData);
      await fetchPendingValidations();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchChallenges();
    fetchPendingValidations();

  }, []);

  return {
    challenges,
    currentChallenge,
    pendingValidations,
    loading,
    error,
    fetchChallenge,
    addChallenge,
    editChallenge,
    removeChallenge,
    fetchChallenges,
    fetchPendingValidations,
    submitValidation
  };
};