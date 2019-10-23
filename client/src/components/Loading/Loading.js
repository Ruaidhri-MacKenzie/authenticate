import React from 'react';
import './Loading.scss';

const Loading = ({ className }) => {
	return (
		<div className={"loading " + className}></div>
	);
};

export default Loading;
