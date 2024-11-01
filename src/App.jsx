import { useState } from 'react';
import { GameProvider } from './context/GameContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChessHome from './pages/home/index.jsx';
import './App.css';
import Game from './pages/Game/Index.jsx';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<ChessHome />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
// ishan bokachoda