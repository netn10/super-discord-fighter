import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes

import GameList from './components/GameList';
import Lobby from './components/Lobby';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Super Discord Fighter</h1>
        </header>
        <main>
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<GameList />} /> {/* Use "element" instead of "component" */}
            <Route path="/lobby/:gameId" element={<Lobby />} />
          </Routes>
        </main>
        <footer>
          {/* Footer content */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
