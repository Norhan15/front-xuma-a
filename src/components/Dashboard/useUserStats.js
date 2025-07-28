import { useState } from 'react';
import { getUserStats } from '../../services/Dashboard/userStatsService';

export const useUserStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');

  const fetchStats = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserStats(id);
      setStats(data);
      setUserId(id);
    } catch (err) {
      setError(err.message || 'Error al cargar estadísticas');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, userId, fetchStats, setUserId };
};