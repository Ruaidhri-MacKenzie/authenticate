import React from 'react';
import './Header.scss';

const Header = ({ title, subtitle }) => {
	return (
		<header className="header">
			<h1 className="header__title">{title}</h1>
			<h3 className="header__subtitle">{subtitle}</h3>
		</header>
	);
};

export default Header;
