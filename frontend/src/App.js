import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GameList from './components/GameList';
import Lobby from './components/Lobby';
import About from './components/About';
import Register from './components/Register'; // Import the Register component
import Login from './components/Login'; // Import the Login component

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
                {/* Separate links for Register and Login */}
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/lobby/:gameId" element={<Lobby />} />
            <Route path="/about" element={<About />} />
            {/* Route for the Register component */}
            <Route path="/register" element={<Register />} />
            {/* Route for the Login component */}
            <Route path="/login" element={<Login />} />
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
