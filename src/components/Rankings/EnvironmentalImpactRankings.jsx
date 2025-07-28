import React from 'react';
import GlobalChallengeRankings from './GlobalChallengeRankings';

const EnvironmentalImpactRankings = ({ userId }) => {
  return <GlobalChallengeRankings userId={userId} defaultTab="environmental" />;
};

export default EnvironmentalImpactRankings;