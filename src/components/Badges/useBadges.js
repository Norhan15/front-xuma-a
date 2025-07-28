import { useState, useEffect } from 'react';
import { 
  getAllBadges, 
  getBadgeById, 
  createBadge, 
  updateBadge, 
  deleteBadge 
} from '../../services/Badges/badgesService';

export const useBadges = () => {
  const [badges, setBadges] = useState([]);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const data = await getAllBadges();
      setBadges(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchBadge = async (badgeId) => {
    try {
      setLoading(true);
      const data = await getBadgeById(badgeId);
      setCurrentBadge(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBadge = async (badgeData) => {
    try {
      setLoading(true);
      const newBadge = await createBadge(badgeData);
      setBadges(prev => [...prev, newBadge]);
      return newBadge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editBadge = async (badgeId, badgeData) => {
    try {
      setLoading(true);
      const updatedBadge = await updateBadge(badgeId, badgeData);
      setBadges(prev => 
        prev.map(badge => badge.id === badgeId ? updatedBadge : badge)
      );
      return updatedBadge;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeBadge = async (badgeId) => {
    try {
      setLoading(true);
      await deleteBadge(badgeId);
      setBadges(prev => prev.filter(badge => badge.id !== badgeId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  return {
    badges,
    currentBadge,
    loading,
    error,
    fetchBadge,
    addBadge,
    editBadge,
    removeBadge,
    fetchBadges
  };
};