import { useState, useEffect } from 'react';
import { 
  getGlobalChallengeRankings, 
  getEnvironmentalImpactRankings,
  getUserChallengeRanking
} from '../../services/Rankings/challengeRankingsService';

export const useChallengeRankings = (userId, rankingType = 'global') => {
  const [rankings, setRankings] = useState([]);
  const [userRanking, setUserRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const data = rankingType === 'environmental' 
        ? await getEnvironmentalImpactRankings() 
        : await getGlobalChallengeRankings();
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
      const data = await getUserChallengeRanking(userId);
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
  }, [userId, rankingType]);

  return {
    rankings,
    userRanking,
    loading,
    error,
    refreshRankings: fetchRankings,
    refreshUserRanking: fetchUserRanking
  };
};