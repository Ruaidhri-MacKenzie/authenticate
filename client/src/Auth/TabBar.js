import React from 'react';

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
			<li className="tab-bar__tab tab-bar__tab--active" onClick={handleClick}>Sign In</li>
			<li className="tab-bar__tab" onClick={handleClick}>Sign Up</li>
		</ul>
	);
};

export default TabBar;
