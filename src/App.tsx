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
  miniBoss?: { description: string };
};

function App() {
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [points, setPoints] = useState(0);

  const handleModuleComplete = (moduleId: number, earnedPoints: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      setPoints(points + earnedPoints);
    }
  };

  const modules: ModuleType[] = [
    {
      id: 1,
      title: 'Module 1: Sample PDF',
      content: <PdfViewer file="/vite.svg" />, // replace with actual PDF later
      challenges: [
        { type: 'quiz', question: '2+2?', options: ['3','4'], answer: '4' },
        { type: 'dragdrop', labels: ['A','B'], dropzones: ['B','A'] }
      ],
      miniBoss: { description: 'Mini-Boss: Combine previous tasks!' }
    },
    {
      id: 2,
      title: 'Module 2: Next Section',
      content: <PdfViewer file="/vite.svg" />,
      challenges: [
        { type: 'quiz', question: 'Sky color?', options: ['Blue','Red'], answer: 'Blue' }
      ]
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gamified PDF Learning App</h1>
      <p>Points: {points}</p>
      {modules.map((mod, index) => (
        <div key={mod.id}>
          <Module
            module={mod}
            isUnlocked={index === 0 || completedModules.includes(modules[index - 1].id)}
            onComplete={(earnedPoints: number) => handleModuleComplete(mod.id, earnedPoints)}
          />
          {mod.miniBoss && completedModules.includes(mod.id) && (
            <MiniBossChallenge
              description={mod.miniBoss.description}
              onComplete={(earnedPoints) => setPoints(points + earnedPoints)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
