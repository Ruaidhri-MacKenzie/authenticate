import React from 'react';
import './Footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<p className="footer__copyright"><a className="footer__link" href="mailto:rmackenzie88@protonmail.com" target="_blank" rel="noopener noreferrer">Ruaidhri MacKenzie</a> - &copy; {new Date().getFullYear()} - <a className="footer__link" href="https://nescol.ac.uk" target="_blank" rel="noopener noreferrer">North East Scotland College</a></p>
		</footer>
	);
};

export default Footer;
