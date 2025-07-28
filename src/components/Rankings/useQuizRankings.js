import { useState, useEffect } from 'react';
import { 
  getGlobalQuizRankings, 
  getWeeklyQuizRankings,
  getAgeGroupQuizRankings,
  getUserQuizRanking
} from '../../services/Rankings/quizRankingsService';

export const useQuizRankings = (userId, rankingType = 'global', ageGroup) => {
  const [rankings, setRankings] = useState([]);
  const [userRanking, setUserRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      let data;
      
      switch(rankingType) {
        case 'weekly':
          data = await getWeeklyQuizRankings();
          break;
        case 'age':
          if (!ageGroup) return; // No hacer fetch si no hay ageGroup
          data = await getAgeGroupQuizRankings(ageGroup);
          break;
        default:
          data = await getGlobalQuizRankings();
      }
      
      if (data) {
        setRankings(data);
      }
    } catch (err) {
      setError(err.message);
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRanking = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await getUserQuizRanking(userId);
      setUserRanking(data);
    } catch (err) {
      setError(err.message);
      setUserRanking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
    fetchUserRanking();
  }, [userId, rankingType, ageGroup]);

  return {
    rankings,
    userRanking,
    loading,
    error,
    refreshRankings: fetchRankings,
    refreshUserRanking: fetchUserRanking
  };
};