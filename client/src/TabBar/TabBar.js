import React from 'react';
import './TabBar.scss';

const TabBar = ({ toggleSignUp }) => {
	const handleClick = e => {
		const activeTab = document.querySelector(".tab-bar__tab--active");
		if (e.target === activeTab) return;

		toggleSignUp();
		e.target.classList.add("tab-bar__tab--active");
		activeTab.classList.remove("tab-bar__tab--active");
	};

	return (
		<ul className="tab-bar">
			<li className="tab-bar__tab tab-bar__tab--active" onClick={handleClick}>Sign Up</li>
			<li className="tab-bar__tab" onClick={handleClick}>Sign In</li>
		</ul>
	);
};

export default TabBar;
