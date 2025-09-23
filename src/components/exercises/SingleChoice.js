import React, { useState, useEffect } from 'react';

const SingleChoice = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`exercise_${exercise.id}_progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setAttempts(progress.attempts || 0);
      setIsCompleted(progress.completed || false);
      setShowCorrectAnswer(progress.showCorrectAnswer || false);
      if (progress.completed) {
        setSelectedAnswer(progress.selectedAnswer);
      }
    }
  }, [exercise.id]);

  // Salvar progresso no localStorage
  const saveProgress = (newAttempts, newCompleted, newShowCorrectAnswer, newSelectedAnswer) => {
    const progress = {
      attempts: newAttempts,
      completed: newCompleted,
      showCorrectAnswer: newShowCorrectAnswer,
      selectedAnswer: newSelectedAnswer,
      timestamp: Date.now()
    };
    localStorage.setItem(`exercise_${exercise.id}_progress`, JSON.stringify(progress));
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isCompleted || attempts >= 3) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isCompleted || attempts >= 3) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const isCorrect = selectedAnswer === exercise.correctAnswer;
    
    if (isCorrect) {
      setFeedback('Correto! 🎉');
      setIsCompleted(true);
      setShowCorrectAnswer(true);
      saveProgress(newAttempts, true, true, selectedAnswer);
      
      // Calcular pontuação baseada nas tentativas
      const score = Math.max(1, 4 - newAttempts); // 3 pontos na 1ª tentativa, 2 na 2ª, 1 na 3ª
      onComplete(exercise.id, score, newAttempts);
    } else {
      if (newAttempts >= 3) {
        setFeedback('Você esgotou as 3 tentativas. A resposta correta é: ' + exercise.options[exercise.correctAnswer]);
        setIsCompleted(true);
        setShowCorrectAnswer(true);
        saveProgress(newAttempts, true, true, selectedAnswer);
        onComplete(exercise.id, 0, newAttempts);
      } else {
        setFeedback('Incorreto. Tente novamente!');
        saveProgress(newAttempts, false, false, selectedAnswer);
      }
    }
  };

  const getOptionClass = (index) => {
    let className = 'option';
    
    if (isCompleted && showCorrectAnswer) {
      if (index === exercise.correctAnswer) {
        className += ' correct';
      } else if (index === selectedAnswer && index !== exercise.correctAnswer) {
        className += ' incorrect';
      }
    } else if (selectedAnswer === index) {
      className += ' selected';
    }
    
    if (isCompleted || attempts >= 3) {
      className += ' disabled';
    }
    
    return className;
  };

  return (
    <div className="card exercise-card">
      <div className="exercise-header">
        <div>
          <h3>{exercise.title}</h3>
          <div className="exercise-type">só uma alternativa está correta</div>
        </div>
        <div className="attempts-info">
          Tentativas: {attempts}/3
        </div>
      </div>
      
      <div className="card-body">
        <div className="question">
          {exercise.question}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.includes('Correto') ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
        )}

        <div className="options-container">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleAnswerSelect(index)}
              disabled={isCompleted || attempts >= 3}
            >
              <strong>{String.fromCharCode(65 + index)}.</strong> {option}
            </button>
          ))}
        </div>

        {exercise.explanation && showCorrectAnswer && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'var(--accent-color)', 
            color: 'white', 
            borderRadius: '10px' 
          }}>
            <strong>💡 Explicação:</strong> {exercise.explanation}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null || isCompleted || attempts >= 3}
          >
            {isCompleted ? 'Concluído' : 'Responder'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleChoice;
