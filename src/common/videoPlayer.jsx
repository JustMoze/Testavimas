import React, { useRef } from 'react';
import { Player, BigPlayButton, LoadingSpinner, PlaybackRateMenuButton, ControlBar } from 'video-react';

export default function VideoPlayer(props) {
	let {image, url} = props;
	let playbackButton = useRef(1);
	return (
		<Player
			ref={playbackButton}
			playsInline
			src={url}
			poster={image}
		>
			<LoadingSpinner />
			<BigPlayButton position="center" />
			<ControlBar>
				<PlaybackRateMenuButton rates={[ 5, 2, 1, 0.5, 0.25 ]} />
			</ControlBar>
		</Player>
	);
}
