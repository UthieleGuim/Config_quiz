import React, { useState, useEffect } from 'react';
import SingleChoice from './exercises/SingleChoice';
import MultipleChoice from './exercises/MultipleChoice';
import Combobox from './exercises/Combobox';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // Carregar exercícios e progresso do localStorage
  useEffect(() => {
    const savedExercises = localStorage.getItem('emailExercises');
    const existsResults = Object.keys(localStorage).some(key => key.startsWith('exercise_'));
    const savedProgress = localStorage.getItem('exerciseProgress');
   
    if(existsResults) {
      setShowResults(true)
    }


    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    } else {
      // Exercícios iniciais
      const initialExercises = [
        {
          id: 1,
          type: 'single',
          title: 'Escolha Única',
          question: 'Qual é o protocolo mais seguro para receber e-mails?',
          options: ['POP3', 'IMAP', 'SMTP', 'HTTP'],
          correctAnswer: 1, // IMAP
          explanation: 'IMAP é mais seguro que POP3 pois mantém os e-mails no servidor e permite sincronização entre dispositivos.'
        },
        {
          id: 2,
          type: 'multiple',
          title: 'Múltipla Escolha',
          question: 'Quais são características importantes de uma senha segura para e-mail profissional?',
          options: [
            'Ter pelo menos 8 caracteres',
            'Incluir números e símbolos',
            'Usar informações pessoais',
            'Ser diferente de outras contas',
            'Conter apenas letras minúsculas'
          ],
          correctAnswers: [0, 1, 3], // Pelo menos 8 caracteres, números/símbolos, diferente de outras contas
          explanation: 'Uma senha segura deve ter pelo menos 8 caracteres, incluir números e símbolos, e ser única para cada conta.'
        },
        {
          id: 3,
          type: 'combobox',
          title: 'Combobox',
          question: 'Qual é a porta padrão para o protocolo SMTP com SSL?',
          options: ['25', '110', '143', '465', '587', '993'],
          correctAnswer: 3, // 465
          explanation: 'A porta 465 é a porta padrão para SMTP com SSL/TLS, oferecendo conexão segura para envio de e-mails.'
        }
      ];
      setExercises(initialExercises);
      localStorage.setItem('emailExercises', JSON.stringify(initialExercises));
    }

    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCompletedExercises(progress.completed || []);
      setCurrentExerciseIndex(progress.currentIndex || 0);
      setTotalScore(progress.totalScore || 0);
    }
  }, []);

  // Salvar progresso no localStorage
  const saveProgress = (newCompleted, newIndex, newScore) => {
    const progress = {
      completed: newCompleted,
      currentIndex: newIndex,
      totalScore: newScore,
      timestamp: Date.now()
    };
    localStorage.setItem('exerciseProgress', JSON.stringify(progress));
  };

  const handleExerciseComplete = (exerciseId, score, attempts) => {
    const newCompleted = [...completedExercises, { exerciseId, score, attempts }];
    const newTotalScore = totalScore + score;
    
    setCompletedExercises(newCompleted);
    setTotalScore(newTotalScore);
    
    saveProgress(newCompleted, currentExerciseIndex + 1, newTotalScore);

    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCompletedExercises([]);
    setCurrentExerciseIndex(0);
    setTotalScore(0);
    setShowResults(false);
    localStorage.removeItem('exerciseProgress');
    Object.keys(localStorage)
    .filter(key => key.startsWith('exercise_') && key.endsWith('_progress'))
    .forEach(key => localStorage.removeItem(key));
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  if (exercises.length === 0) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <h3>Carregando exercícios...</h3>
        </div>
      </div>
    );
  }

  if (showResults) {
    const maxScore = exercises.length * 3; // Máximo de 3 pontos por exercício
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    return (
      <div className="result-card">
        <h2>🎉 Exercícios Concluídos!</h2>
        <div className="score-display">{totalScore}/{maxScore}</div>
        <h3>{percentage}% de aproveitamento</h3>
        
        <div style={{ marginTop: '2rem' }}>
          <h4>📊 Resumo dos Exercícios:</h4>
          {completedExercises.map((exercise, index) => {
            const exerciseData = exercises.find(ex => ex.id === exercise.exerciseId);
            return (
              <div key={index} style={{ 
                margin: '1rem 0', 
                padding: '1rem', 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                borderRadius: '10px' 
              }}>
                <strong>{exerciseData?.title}:</strong> {exercise.score}/3 pontos 
                ({exercise.attempts} tentativa{exercise.attempts > 1 ? 's' : ''})
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button
            className="btn-accent"
            onClick={handleRestart}
            style={{
              marginRight: '1rem',
              backgroundColor: '#1E3A8A',
              borderColor: '#1E3A8A',
              color: 'white'
            }}
          >
            🔄 Refazer Exercícios
          </button>
          <button className="btn-accent" onClick={handleGoHome}>
            🏠 Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  return (
    <div>
      {/* Barra de Progresso */}
      <div className="progress-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>Exercício {currentExerciseIndex + 1} de {exercises.length}</span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Exercício Atual */}
      {currentExercise.type === 'single' && (
        <SingleChoice
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
        />
      )}
      
      {currentExercise.type === 'multiple' && (
        <MultipleChoice
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
        />
      )}
      
      {currentExercise.type === 'combobox' && (
        <Combobox
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
        />
      )}
    </div>
  );
};

export default Exercises;
