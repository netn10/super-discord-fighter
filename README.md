# Super Discord Fighter

Super Discord Fighter is a web application built using Python Flask for the backend and React for the frontend. It provides a platform where users can view a list of fighting games, join game lobbies, and engage in real-time chat within the lobbies.

## Features

- View a list of fighting games available.
- See the number of players currently in each game.
- Join the lobby of a specific game.
- Real-time chat functionality within each game's lobby.
- Navigate between the main page and different game lobbies.

## Installation

### Backend (Python Flask)

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install the required Python packages using `pip install -r requirements.txt`.
4. Start the Flask server using `python app.py`.

### Frontend (React)

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the React development server using `npm start`.

## Backend API Endpoints

- `GET /api/games`: Get the list of available games.
- `POST /api/join-lobby/<game_id>`: Join the lobby of a specific game by ID.

## Frontend Structure

The frontend uses React and contains components for displaying the list of games, joining lobbies, and chat functionality.

## Dependencies

- Python 3.x
- Flask
- Flask-SocketIO
- Node.js
- React
- react-router-dom

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any enhancements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).
