import React from 'react';
import gameConfig from './game-config';

const Canvas = () => {
	const { tileSize, columns, rows } = gameConfig;
	
	const width = tileSize * columns;
	const height = tileSize * rows;

	return (
		<canvas className="canvas" width={width} height={height}></canvas>
	);
};

export default Canvas;
