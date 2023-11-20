import requests
from flask_socketio import SocketIO


def fetch_players_in_game(steam_api_key: str, steam_game_id: str) -> int:
    """
    Fetches the number of players in a specific game using the Steam API.

    Args:
    - steam_api_key (str): The API key for Steam.
    - steam_game_id (str): The ID of the game for which player count is to be fetched.

    Returns:
    - player_count (int): The number of players in the game. Returns 0 if unable to fetch player count.
    """

    # Make a GET request to the Steam API to get the number of current players for the specified game ID
    response = requests.get(
        f"https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid={steam_game_id}&key={steam_api_key}"
    )

    if response.status_code == 200:
        # Extract the player count from the API response
        return response.json().get("response", {}).get("player_count", 0)

    return 0  # Return 0 if unable to fetch player count


def get_online_players(socketio: SocketIO, room: str):
    """
    Retrieves the count of online players in a specific game lobby.

    Args:
    - socketio (SocketIO): The SocketIO instance.
    - room (str): The identifier for the lobby room.

    Returns:
    - int: The count of online players in the specified lobby room.
    """

    # Logic to obtain the number of online players in the designated game lobby.
    # Please replace this section with your actual implementation to fetch online players.
    # The current implementation retrieves the count using the provided SocketIO's server manager.
    return len(socketio.server.manager.rooms[room])
