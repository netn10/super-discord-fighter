import React, { useState, useEffect } from 'react';
import axios from '../config/axios'; // Assuming axios.js holds the Axios instance with baseURL set to http://localhost:5000
import './GameList.css'; // Import your CSS file for styling

const GameList = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the games based on search term
  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    axios.get('/api/game_list')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error fetching games:', error);
      });
  }, []);

    // Function to handle joining a random lobby
    const joinRandomLobby = () => {
      // Logic to join a random lobby goes here
      const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
      console.log(randomGame);
      if (randomGame) {
        // Join the lobby of the randomly selected game
        joinLobby(randomGame.id); // Replace with your joinLobby function
      }
    };

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
      <input
        type="text"
        placeholder="Search games..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={joinRandomLobby}>Join Random</button>
      <ul>
      <div className="card-container"> {/* Maintain the card-container */}
        {filteredGames.map((game) => (
          <li key={game.id} className="card"> {/* Add back the card class */}
            <div className="card-header">{game.name}</div>
            <div className="card-body">
              <div>Players in game: {game.playersInGame}</div>
              <div>Lobby players: {game.playersInLobby}</div>
              <button onClick={() => joinLobby(game.id)}>Join Lobby</button>
            </div>
          </li>
        ))}
        </div> {/* Maintain the card-container */}
      </ul>
    </div>
  );
};


export default GameList;
