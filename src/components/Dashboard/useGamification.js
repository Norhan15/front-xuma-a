import { useState, useEffect } from 'react';
import { getCombinedRankings, getUserRanking } from '../../services/Dashboard/gamificationService';

export const useGamification = (userId) => {
  const [rankings, setRankings] = useState([]);
  const [userRanking, setUserRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const data = await getCombinedRankings();
      setRankings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRanking = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await getUserRanking(userId);
      setUserRanking(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
    if (userId) {
      fetchUserRanking();
    }
  }, [userId]);

  return {
    rankings,
    userRanking,
    loading,
    error,
    refreshRankings: fetchRankings,
    refreshUserRanking: fetchUserRanking
  };
};