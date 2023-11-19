from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS from flask_cors
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import requests  # Import requests library for making HTTP requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes by attaching CORS to your Flask app
socketio = SocketIO(app, cors_allowed_origins="*")

# Sample data (replace with your actual data storage)
games = [
    {"id": 1, "name": "Street Fighter", "playersInGame": 0, "playersInLobby": 0},
    {"id": 2, "name": "Tekken", "playersInGame": 0, "playersInLobby": 0},
    # Add more game data as needed
]

# Function to fetch players in the game from Steam API
def fetch_players_in_game(game_id):
    # Replace 'your_steam_api_key' and 'your_game_id' with actual values
    steam_api_key = 'your_steam_api_key'
    steam_game_id = 'your_game_id'

    response = requests.get(f'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid={steam_game_id}&key={steam_api_key}')
    if response.status_code == 200:
        players_count = response.json().get('response', {}).get('player_count', 0)
        return players_count
    return 0  # Return 0 if unable to fetch player count

# Flask routes for fetching game data and updating lobby count
@app.route('/api/games', methods=['GET'])
def get_games():
    return jsonify(games)

@app.route('/api/game/<int:game_id>', methods=['GET'])
def get_game_name(game_id):
    # Fetch the game name based on the game ID
    for game in games:
        if game['id'] == game_id:
            return jsonify({"gameName": game['name']})
    return jsonify({"error": "Game not found"})

@app.route('/api/join-lobby/<int:game_id>', methods=['POST'])
def join_lobby(game_id):
    # Logic to join a specific game lobby
    for game in games:
        if game['id'] == game_id:
            game['playersInLobby'] += 1
            break
    return jsonify({"message": "Joined lobby successfully"})

# Endpoint to update playersInGame from Steam API
@app.route('/api/update-players-in-game', methods=['POST'])
def update_players_in_game():
    game_id = request.json.get('game_id')
    players_in_game = fetch_players_in_game(game_id)
    for game in games:
        if game['id'] == game_id:
            game['playersInGame'] = players_in_game
            break
    return jsonify({"message": "Updated players in game"})

# Other necessary routes/endpoints for your application

# Flask-SocketIO event for joining a lobby room
@socketio.on('joinRoom')
def handle_join_room(data):
    room = data['room']
    join_room(room)
    players_in_room = get_online_players(room)
    socketio.emit('updateOnlinePlayers', players_in_room, room=room)

# Flask-SocketIO event for leaving a lobby room
@socketio.on('leaveRoom')
def handle_leave_room(data):
    room = data['room']
    leave_room(room)
    players_in_room = get_online_players(room)
    socketio.emit('updateOnlinePlayers', players_in_room, room=room)

# Flask-SocketIO event for handling chat messages
@socketio.on('chatMessage')
def handle_chat_message(data):
    room = data['room']
    message = data['message']
    send(message, room=room)

def get_online_players(room):
    # Logic to get the number of online players in a specific game lobby
    # Replace this with your actual method to retrieve online players
    return len(socketio.server.manager.rooms[room])

if __name__ == '__main__':
    socketio.run(app=app, host='0.0.0.0', port=5000, debug=True)
