import React from 'react';
import './SpritePreview.scss';

const SpritePreview = ({ children, sprite = 1, spritesheet = './assets/sprites.png', tileSize = 32, className = ""}) => {
	const styleSprite = {
		width: tileSize + "px",
		height: tileSize + "px",
		backgroundPositionY: (-1 * (sprite - 1) * tileSize) + "px",
		backgroundImage: `url(${spritesheet})`,
	};

	return (
		<div style={styleSprite} className={"sprite-preview " + className}>
			{children}
		</div>
	);
};

export default SpritePreview;
