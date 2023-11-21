import React, { useState, useEffect } from 'react';
import axios from '../config/axios'; // Assuming axios.js holds the Axios instance with baseURL set to http://localhost:5000
import './GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/api/game_list')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  }, []);

  const joinLobby = (gameId) => {
    axios.post(`/api/join-lobby/${gameId}`)
      .then(response => {
        // Handle successful lobby join
        console.log(response.data.message);
        // Redirect to the lobby page after successful join (Modify this part based on your routing system)
        window.location.href = `/lobby/${gameId}`; // Redirect to the lobby page for the specific game
      })
      .catch(error => {
        console.error('Error joining lobby:', error);
      });
  };

  return (
    <div className="game-list">
      <h2>Game List</h2>
      <div className="card-container">
        {games.map(game => (
          <div className="card" key={game.id}>
            <div className="card-header">{game.name}</div>
            <div className="card-body">
              <p>Players in game: {game.playersInGame}</p>
              <p>Lobby players: {game.playersInLobby}</p>
              <button onClick={() => joinLobby(game.id)}>Join Lobby</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
