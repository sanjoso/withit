export const YouTubePlayer = (props) => {
	const videoId = props.videoId;
	const title = props.title;

	return (
		<div id="youtubeplayer">
			<div id="youtubeplayer__video">
				<iframe
					//width="700"
					//height="393"
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
					title={title}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};
