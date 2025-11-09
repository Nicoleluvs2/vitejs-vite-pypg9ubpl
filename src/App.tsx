      import React, { useState } from 'react';
import Module from './Module';
import PdfViewer from './PdfViewer';
import MiniBossChallenge from './MiniBossChallenge';

type Challenge = { type: string; [key: string]: any };
type ModuleType = {
  id: number;
  title: string;
  content: React.ReactNode;
  challenges: Challenge[];
  miniBoss?: { description: string };
};

const App: React.FC = () => {
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [points, setPoints] = useState(0);

  const handleModuleComplete = (moduleId: number, earnedPoints: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
      setPoints(points + earnedPoints);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newModule: ModuleType = {
        id: modules.length + 1,
        title: `Module ${modules.length + 1}: ${file.name}`,
        content: <PdfViewer file={url} />,
        challenges: [
          { type: 'quiz', question: 'Sample Quiz: 2+2?', options: ['3', '4'], answer: '4' },
          { type: 'dragdrop', labels: ['A', 'B'], dropzones: ['B', 'A'] }
        ],
        miniBoss: { description: 'Mini-Boss: Combine previous tasks!' }
      };
      setModules([...modules, newModule]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gamified PDF Learning App</h1>
      <p>Points: {points}</p>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />

      {modules.map((mod, index) => (
        <div key={mod.id}>
          <Module
            module={mod}
            isUnlocked={index === 0 || completedModules.includes(modules[index - 1].id)}
            onComplete={(earnedPoints) => handleModuleComplete(mod.id, earnedPoints)}
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
};

export default App;
