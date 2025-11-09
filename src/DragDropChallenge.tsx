import React, { useState } from 'react';

type DragDropChallengeProps = {
  labels: string[];
  dropzones: string[];
  onComplete: (points: number) => void;
};

const DragDropChallenge: React.FC<DragDropChallengeProps> = ({ labels, dropzones, onComplete }) => {
  const [dropped, setDropped] = useState<string[]>(Array(dropzones.length).fill(''));

  const handleDrop = (index: number, label: string) => {
    const newDropped = [...dropped];
    newDropped[index] = label;
    setDropped(newDropped);
  };

  const handleComplete = () => {
    const correct = dropped.every((val, idx) => val === dropzones[idx]);
    if (correct) {
      alert('Correct! +5 points');
      onComplete(5);
    } else {
      alert('Try again!');
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <p>Drag & Drop Challenge:</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {labels.map((label) => (
          <div
            key={label}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text', label)}
            style={{ border: '1px solid black', padding: '5px', cursor: 'grab' }}
          >
            {label}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {dropzones.map((zone, idx) => (
          <div
            key={zone}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(idx, e.dataTransfer.getData('text'))}
            style={{
              border: '1px solid gray',
              padding: '10px',
              minWidth: '50px',
              minHeight: '30px',
            }}
          >
            {dropped[idx]}
          </div>
        ))}
      </div>
      <button onClick={handleComplete}>Check</button>
    </div>
  );
};

export default DragDropChallenge;
