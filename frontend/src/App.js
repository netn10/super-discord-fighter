import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GameList from './components/GameList';
import Lobby from './components/Lobby';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="fixed-menu"> {/* Use a fixed menu */}
          <div className="menu-content">
            <h2>Super Discord Fighter</h2>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li> {/* Add About link */}
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/lobby/:gameId" element={<Lobby />} />
            <Route path="/about" element={<About />} />
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
