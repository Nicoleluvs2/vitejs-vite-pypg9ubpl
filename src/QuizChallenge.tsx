import React, { useState } from 'react';

type QuizChallengeProps = {
  question: string;
  options: string[];
  answer: string;
  onComplete: (points: number) => void;
};

const QuizChallenge: React.FC<QuizChallengeProps> = ({ question, options, answer, onComplete }) => {
  const [selected, setSelected] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    if (!selected) return alert('Select an option!');
    if (selected === answer) {
      setCompleted(true);
      onComplete(5);
    } else {
      alert('Wrong! Try again.');
    }
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <p>{question}</p>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => setSelected(opt)}
          style={{ margin: '0 5px', backgroundColor: selected === opt ? 'lightblue' : 'white' }}
        >
          {opt}
        </button>
      ))}
      <button onClick={handleSubmit} disabled={completed}>Submit</button>
      {completed && <p style={{ color: 'green' }}>Correct! +5 points</p>}
    </div>
  );
};

export default QuizChallenge;
