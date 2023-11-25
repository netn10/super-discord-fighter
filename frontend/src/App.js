import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GameList from './components/GameList';
import Lobby from './components/Lobby';
import About from './components/About';
import RegisterLogin from './components/RegisterLogin'; // Import the RegisterLogin component

function App() {
  return (
    <Router>
      <div className="App">
        <header className="fixed-menu">
          <div className="menu-content">
            <h2>Super Discord Fighter</h2>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {/* Update the link to point to the RegisterLogin component */}
                <li><Link to="/registerlogin">Register / Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/lobby/:gameId" element={<Lobby />} />
            <Route path="/about" element={<About />} />
            {/* Use the RegisterLogin component for both registration and login */}
            <Route path="/registerlogin" element={<RegisterLogin />} />
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
