import React from 'react';

type MiniBossChallengeProps = {
  description: string;
  onComplete: (points: number) => void;
};

const MiniBossChallenge: React.FC<MiniBossChallengeProps> = ({ description, onComplete }) => {
  return (
    <div style={{ border: '2px solid red', padding: '10px', margin: '10px 0' }}>
      <h3>Mini-Boss Challenge</h3>
      <p>{description}</p>
      <button onClick={() => onComplete(20)}>Complete Mini-Boss (+20 points)</button>
    </div>
  );
};

export default MiniBossChallenge;
