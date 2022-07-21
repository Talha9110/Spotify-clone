import React from "react";
import { useDataLayerValue } from "../DataLayer/DataLayer";
import "./Body.css";
import Header from "./Header/Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow/SongRow";

function Body({ spotify, id }) {
	const [{ discover_weekly }, dispatch] = useDataLayerValue();

	const playPlaylist = (id) => {
		spotify.play({ context_uri: `spotify:playlist:7iI50Q47nXB8MHWG98eJRr` }).then((res) => {
			spotify.getMyCurrentPlayingTrack().then((r) => {
				dispatch({
					type: "SET_ITEM",
					item: r.item,
				});
				dispatch({
					type: "SET_PLAYING",
					playing: true,
				});
			});
		});
	};

	const playSong = (id) => {
		spotify.play({ uris: [`spotify:track:${id}`] }).then((res) => {
			spotify.getMyCurrentPlayingTrack().then((r) => {
				dispatch({
					type: "SET_ITEM",
					item: r.item,
				});
				dispatch({
					type: "SET_PLAYING",
					playing: true,
				});
			});
		});
	};

	return (
		<div className="body">
			<Header spotify={spotify} />

			<div className="body__info">
				<img src={discover_weekly?.images[0].url} alt="" />
				<div className="body__infoText">
					<strong>PLAYLIST</strong>
					<h2>Discover Weekly</h2>
					<p>{discover_weekly?.description}</p>
				</div>
			</div>

			<div className="body__songs">
				<div className="body__icons">
					<PlayCircleFilledIcon className="body__shuffle" onClick={playPlaylist} />
					<FavoriteIcon fontSize="large" />
					<MoreHorizIcon />
				</div>

				{discover_weekly?.tracks.items.map((item) => (
					<SongRow playSong={playSong} track={item.track} />
				))}
			</div>
		</div>
	);
}

export default Body;
