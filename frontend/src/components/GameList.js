import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameList = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching game data from backend API
    const mockGameData = [
      { id: 1, name: 'Game 1', playersInGame: 3, playersInLobby: 5 },
      { id: 2, name: 'Game 2', playersInGame: 2, playersInLobby: 4 },
      // Add other mock games as needed
    ];

    setGames([...mockGameData]);
  }, []);

  const joinLobby = (gameId, gameName) => {
    // Redirect to the lobby page with game ID and game name
    navigate(`/lobby/${gameId}`, { state: { gameName } });
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
            {/* Use a button for Join Lobby */}
            <button onClick={() => joinLobby(game.id, game.name)}>Join Lobby</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;