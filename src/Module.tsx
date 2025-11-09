import React from 'react';

type Challenge = { type: string; [key: string]: any };

type ModuleProps = {
  module: {
    id: number;
    title: string;
    content: React.ReactNode;
    challenges: Challenge[];
    miniBoss?: any;
  };
  isUnlocked: boolean;
  onComplete: (points: number) => void;
};

const Module: React.FC<ModuleProps> = ({ module, isUnlocked, onComplete }) => {
  if (!isUnlocked) return <p>Module "{module.title}" is locked</p>;

  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '10px 0' }}>
      <h2>{module.title}</h2>
      <div>{module.content}</div>
      {module.challenges.map((challenge, idx) => {
        if (challenge.type === 'quiz') return <p key={idx}>Quiz: {challenge.question}</p>;
        if (challenge.type === 'dragdrop') return <p key={idx}>Drag & Drop Challenge</p>;
        return null;
      })}
      <button onClick={() => onComplete(10)}>Complete Module (+10 points)</button>
    </div>
  );
};

export default Module;
