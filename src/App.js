import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player/Player.jsx";
import { getTokenFromUrl } from "./spotify";
import "./App.css";
import Login from "./Login/Login.jsx";
import { useDataLayerValue } from "./DataLayer/DataLayer";

const spotify = new SpotifyWebApi();

function App() {
	const [{ token }, dispatch] = useDataLayerValue();

	useEffect(() => {
		// Set token
		const hash = getTokenFromUrl();
		window.location.hash = "";
		let _token = hash.access_token;

		if (_token) {
			spotify.setAccessToken(_token);

			dispatch({
				type: "SET_TOKEN",
				token: _token,
			});

			spotify.getPlaylist("7iI50Q47nXB8MHWG98eJRr").then((response) =>
				dispatch({
					type: "SET_DISCOVER_WEEKLY",
					discover_weekly: response,
				}),
			);

			spotify.getMyTopArtists().then((response) =>
				dispatch({
					type: "SET_TOP_ARTISTS",
					top_artists: response,
				}),
			);

			dispatch({
				type: "SET_SPOTIFY",
				spotify: spotify,
			});

			spotify.getMe().then((user) => {
				dispatch({
					type: "SET_USER",
					user: user,
				});
			});

			spotify.getUserPlaylists().then((playlists) => {
				dispatch({
					type: "SET_PLAYLISTS",
					playlists: playlists,
				});
			});
		}
	}, [token, dispatch]);

	return (
		<div className="app">
			{!token && <Login />}
			{token && <Player spotify={spotify} />}
		</div>
	);
}

export default App;
