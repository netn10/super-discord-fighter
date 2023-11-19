# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS from flask_cors
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from functions import fetch_players_in_game, get_online_players

from game_list import game_list  # Import game list

app = Flask(__name__)  # Initialize a Flask app
CORS(app)  # Enable CORS for all routes by attaching CORS to your Flask app
socketio = SocketIO(app, cors_allowed_origins="*") # Initialize a SocketIO app

# Flask routes for fetching game data and updating lobby count
@app.route('/api/game_list', methods=['GET'])
def get_game_list():
    return jsonify(game_list)

@app.route('/api/game/<int:game_id>', methods=['GET'])
def get_game_name(game_id):
    # Fetch the game name based on the game ID
    for game in game_list:
        if game['id'] == game_id:
            return jsonify({"gameName": game['name']})
    return jsonify({"error": "Game not found"})

@app.route('/api/join-lobby/<int:game_id>', methods=['POST'])
def join_lobby(game_id):
    # Logic to join a specific game lobby
    for game in game_list:
        if game['id'] == game_id:
            game['playersInLobby'] += 1
            break
    return jsonify({"message": "Joined lobby successfully"})

# Endpoint to update playersInGame from Steam API
@app.route('/api/update-players-in-game', methods=['POST'])
def update_players_in_game():
    game_id = request.json.get('game_id')
    players_in_game = fetch_players_in_game(game_id)
    for game in game_list:
        if game['id'] == game_id:
            game['playersInGame'] = players_in_game
            break
    return jsonify({"message": "Updated players in game"})

# Other necessary routes/endpoints for your application
@socketio.on('joinRoom')
def handle_join_room(data):
    room = data['room']
    join_room(room)
    players_in_room = get_online_players(room)
    socketio.emit('updateOnlinePlayers', players_in_room, room=room)

@socketio.on('leaveRoom')
def handle_leave_room(data):
    room = data['room']
    leave_room(room)
    players_in_room = get_online_players(room)
    socketio.emit('updateOnlinePlayers', players_in_room, room=room)

@socketio.on('chatMessage')
def handle_chat_message(data):
    room = data['room']
    message = data['message']
    print(message)
    send(message, room=room)

if __name__ == '__main__':
    socketio.run(app=app, host='0.0.0.0', port=5000, debug=True)
