import React, { useState } from 'react';
import Module from './Module';
import PdfViewer from './PdfViewer';
import QuizChallenge from './QuizChallenge';
import DragDropChallenge from './DragDropChallenge';
import MiniBossChallenge from './MiniBossChallenge';

type Challenge = { type: string; [key: string]: any };
type ModuleType = {
  id: number;
  title: string;
  content: React.ReactNode;
  challenges: Challenge[];
  miniBoss?: any;
};

function App() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [points, setPoints] = useState(0);

  const modules: ModuleType[] = [
    {
      id: 1,
      title: 'Module 1: Sample PDF',
      content: <PdfViewer file="/vite.svg" />, // replace with your PDF
      challenges: [
        { type: 'quiz', question: '2+2?', options: ['3','4'], answer: '4' },
        { type: 'dragdrop', labels: ['A','B'], dropzones: ['B','A'] }
      ]
    },
    {
      id: 2,
      title: 'Module 2: Next Section',
      content: <PdfViewer file="/vite.svg" />, // replace with your PDF
      challenges: [
        { type: 'quiz', question: 'Sky color?', options: ['Blue','Red'], answer: 'Blue' }
      ]
    }
  ];

  const handleModuleComplete = (moduleId: number, earnedPoints: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      setPoints(points + earnedPoints);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gamified PDF Learning App</h1>
      <p>Points: {points}</p>
      {modules.map((mod, index) => (
        <Module
          key={mod.id}
          module={mod}
          isUnlocked={index === 0 || completedModules.includes(modules[index - 1].id)}
          onComplete={(earnedPoints: number) => handleModuleComplete(mod.id, earnedPoints)}
        />
      ))}
    </div>
  );
}

export default App;
