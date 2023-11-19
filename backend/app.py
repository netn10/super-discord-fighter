from flask import Flask, jsonify, request
from flask_socketio import SocketIO, join_room, leave_room, send, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Sample data (replace with your actual data storage)
games = [
    {"id": 1, "name": "Street Fighter", "playersInGame": 0, "playersInLobby": 0},
    {"id": 2, "name": "Tekken", "playersInGame": 0, "playersInLobby": 0},
    # Add more game data as needed
]

@socketio.on('joinRoom')
def handle_join_room(data):
    room = data['room']
    join_room(room)
    emit('updateOnlinePlayers', {'players': get_online_players(room)}, room=room)

@socketio.on('leaveRoom')
def handle_leave_room(data):
    room = data['room']
    leave_room(room)
    emit('updateOnlinePlayers', {'players': get_online_players(room)}, room=room)

@socketio.on('chatMessage')
def handle_chat_message(data):
    room = data['room']
    message = data['message']
    send(message, room=room)

def get_online_players(room):
    # Logic to get the number of online players in a specific game lobby
    # Replace this with your actual method to retrieve online players
    return len(socketio.server.manager.rooms[room])

@app.route('/api/games', methods=['GET'])
def get_games():
    return jsonify(games)

@app.route('/api/join-lobby/<int:game_id>', methods=['POST'])
def join_lobby(game_id):
    # Logic to join a specific game lobby
    # Replace this with your actual implementation
    # For example:
    for game in games:
        if game['id'] == game_id:
            game['playersInLobby'] += 1
            break
    return jsonify({"message": "Joined lobby successfully"})

# Other necessary routes/endpoints for your application

if __name__ == '__main__':
    socketio.run(app)
