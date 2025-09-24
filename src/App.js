import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Exercises from './components/Exercises';

function Header({ fontSize, increaseFont, decreaseFont, handleFontSizeChange }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">📧 Config</Link>
          </div>

          <div className="header-center">
            <div className="header-nav" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <NavLink to="/" className={({ isActive }) => `nav-link btn-accent ${isActive ? 'active' : ''}`}>
                 Início
              </NavLink>
              <NavLink to="/exercicios" className={({ isActive }) => `nav-link btn-accent ${isActive ? 'active' : ''}`}>
                 Exercícios
              </NavLink>
            </div>
          </div>

          {/* Controles de fonte e tema */}
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={decreaseFont}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                -
              </button>
              <input
                type="range"
                className="form-range"
                style={{ width: '80px' }}
                min="10"
                max="30"
                value={fontSize}
                onChange={handleFontSizeChange}
                aria-label="Ajustar tamanho da fonte"
                title="Ajustar tamanho da fonte"
                aria-valuemin="10"
                aria-valuemax="30"
              />
              <button
                className="btn btn-secondary btn-sm"
                onClick={increaseFont}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                +
              </button>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'} {theme === 'light' ? 'Escuro' : 'Claro'}
            </button>
          </div>
        </div>
      </header>
      
    </>
  );
}

function App() {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? Number(saved) : 16;
  });

  const increaseFont = () => {
    setFontSize(prev => {
      const next = Math.min(prev + 2, 30);
      localStorage.setItem('fontSize', String(next));
      return next;
    });
  };

  const decreaseFont = () => {
    setFontSize(prev => {
      const next = Math.max(prev - 2, 10);
      localStorage.setItem('fontSize', String(next));
      return next;
    });
  };

  const handleFontSizeChange = (e) => {
    const next = Number(e.target.value);
    setFontSize(next);
    localStorage.setItem('fontSize', String(next));
  };

  return (
    <Router>
      <div className="App">
        <div className="main-container">
          <Header
            fontSize={fontSize}
            increaseFont={increaseFont}
            decreaseFont={decreaseFont}
            handleFontSizeChange={handleFontSizeChange}
          />
          <main className="main-content" style={{ fontSize: `${fontSize}px` }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercicios" element={<Exercises />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
