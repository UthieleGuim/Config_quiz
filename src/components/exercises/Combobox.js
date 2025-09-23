import React, { useState, useEffect } from 'react';

const Combobox = ({ exercise, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Carregar progresso do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`exercise_${exercise.id}_progress`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setAttempts(progress.attempts || 0);
      setIsCompleted(progress.completed || false);
      setShowCorrectAnswer(progress.showCorrectAnswer || false);
      if (progress.completed) {
        setSelectedAnswer(progress.selectedAnswer || '');
      }
    }
  }, [exercise.id]);

  // Buscar dados da API para enriquecer o exercício
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        // Usando uma API pública sobre protocolos de rede
        const response = await fetch('https://api.github.com/repos/microsoft/vscode');
        const data = await response.json();
        setApiData({
          name: data.name,
          description: data.description,
          stars: data.stargazers_count,
          language: data.language
        });
      } catch (error) {
        console.log('Erro ao buscar dados da API:', error);
        // Se a API falhar, continuamos sem os dados extras
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);

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

  const handleAnswerChange = (event) => {
    if (isCompleted || attempts >= 3) return;
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === '' || isCompleted || attempts >= 3) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const selectedIndex = exercise.options.indexOf(selectedAnswer);
    const isCorrect = selectedIndex === exercise.correctAnswer;
    
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
        setFeedback(`Você esgotou as 3 tentativas. A resposta correta é: ${exercise.options[exercise.correctAnswer]}`);
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

  return (
    <div className="card exercise-card">
      <div className="exercise-header">
        <div>
          <h3>{exercise.title}</h3>
          <div className="exercise-type">Combobox</div>
        </div>
        <div className="attempts-info">
          Tentativas: {attempts}/3
        </div>
      </div>
      
      <div className="card-body">
        <div className="question">
          {exercise.question}
        </div>

        {/* Informações da API */}
        {apiData && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            borderRadius: '10px',
            fontSize: '0.9rem'
          }}>
            só uma alternativa está correta<br />   
          </div>
        )}

        {loading && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            backgroundColor: 'var(--accent-color)', 
            color: 'white', 
            borderRadius: '10px',
            textAlign: 'center'
          }}>
           Carregando
          </div>
        )}

        {feedback && (
          <div className={`feedback ${feedback.includes('Correto') ? 'correct' : 'incorrect'}`}>
            {feedback}
          </div>
        )}

        <div className="combobox-container">
          <select
            className="combobox"
            value={selectedAnswer}
            onChange={handleAnswerChange}
            disabled={isCompleted || attempts >= 3}
            aria-label="Selecionar resposta"
            title="Selecionar resposta"
          >
            <option value="">Selecione uma opção...</option>
            {exercise.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            disabled={selectedAnswer === '' || isCompleted || attempts >= 3}
          >
            {isCompleted ? 'Concluído' : 'Responder'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Combobox;
