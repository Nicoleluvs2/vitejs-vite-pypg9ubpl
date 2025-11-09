import React from 'react';

type DragDropChallengeProps = {
  labels: string[];
  dropzones: string[];
  onComplete: (points: number) => void;
};

const DragDropChallenge: React.FC<DragDropChallengeProps> = ({ labels, dropzones, onComplete }) => {
  return (
    <div>
      <p>Drag & Drop Challenge Placeholder</p>
      <p>Labels: {labels.join(', ')}</p>
      <p>Dropzones: {dropzones.join(', ')}</p>
      <button onClick={() => onComplete(5)}>Complete DragDrop (+5 points)</button>
    </div>
  );
};

export default DragDropChallenge;
