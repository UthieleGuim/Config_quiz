import React, { useState, useEffect } from 'react';

const MultipleChoice = ({ exercise, onComplete }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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
        setSelectedAnswers(progress.selectedAnswers || []);
      }
    }
  }, [exercise.id]);

  // Salvar progresso no localStorage
  const saveProgress = (newAttempts, newCompleted, newShowCorrectAnswer, newSelectedAnswers) => {
    const progress = {
      attempts: newAttempts,
      completed: newCompleted,
      showCorrectAnswer: newShowCorrectAnswer,
      selectedAnswers: newSelectedAnswers,
      timestamp: Date.now()
    };
    localStorage.setItem(`exercise_${exercise.id}_progress`, JSON.stringify(progress));
  };

  const handleAnswerToggle = (answerIndex) => {
    if (isCompleted || attempts >= 3) return;
    
    setSelectedAnswers(prev => {
      if (prev.includes(answerIndex)) {
        return prev.filter(index => index !== answerIndex);
      } else {
        return [...prev, answerIndex];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0 || isCompleted || attempts >= 3) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Verificar se todas as respostas corretas estão selecionadas e nenhuma incorreta
    const correctAnswers = exercise.correctAnswers.sort();
    const userAnswers = selectedAnswers.sort();
    const isCorrect = JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
    
    if (isCorrect) {
      setFeedback('Correto! 🎉');
      setIsCompleted(true);
      setShowCorrectAnswer(true);
      saveProgress(newAttempts, true, true, selectedAnswers);
      
      // Calcular pontuação baseada nas tentativas
      const score = Math.max(1, 4 - newAttempts); // 3 pontos na 1ª tentativa, 2 na 2ª, 1 na 3ª
      onComplete(exercise.id, score, newAttempts);
    } else {
      if (newAttempts >= 3) {
        const correctOptions = exercise.correctAnswers.map(index => exercise.options[index]).join(', ');
        setFeedback(`Você esgotou as 3 tentativas. As respostas corretas são: ${correctOptions}`);
        setIsCompleted(true);
        setShowCorrectAnswer(true);
        saveProgress(newAttempts, true, true, selectedAnswers);
        onComplete(exercise.id, 0, newAttempts);
      } else {
        setFeedback('Incorreto. Tente novamente!');
        saveProgress(newAttempts, false, false, selectedAnswers);
      }
    }
  };

  const getOptionClass = (index) => {
    let className = 'option';
    
    if (isCompleted && showCorrectAnswer) {
      if (exercise.correctAnswers.includes(index)) {
        className += ' correct';
      } else if (selectedAnswers.includes(index) && !exercise.correctAnswers.includes(index)) {
        className += ' incorrect';
      }
    } else if (selectedAnswers.includes(index)) {
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
          <div className="exercise-type">Múltipla Escolha</div>
        </div>
        <div className="attempts-info">
          Tentativas: {attempts}/3
        </div>
      </div>
      
      <div className="card-body">
        <div className="question">
          {exercise.question}
        </div>

        <div style={{ 
          marginBottom: '1rem', 
          padding: '0.5rem', 
          backgroundColor: 'var(--primary-color)', 
          color: 'white', 
          borderRadius: '5px',
          fontSize: '0.9rem'
        }}>
          💡 Selecione uma ou mais opções corretas
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
              onClick={() => handleAnswerToggle(index)}
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
            disabled={selectedAnswers.length === 0 || isCompleted || attempts >= 3}
          >
            {isCompleted ? 'Concluído' : 'Responder'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
