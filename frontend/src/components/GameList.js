import React, { useState, useEffect } from 'react';
import axios from '../config/axios'; // Assuming axios.js holds the Axios instance with baseURL set to http://localhost:5000

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
    <div>
      <h2>Game List</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <div>{game.name}</div>
            <div>Players in game: {game.playersInGame}</div>
            <div>Lobby players: {game.playersInLobby}</div>
            <button onClick={() => joinLobby(game.id)}>Join Lobby</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
