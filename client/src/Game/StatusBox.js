import React from 'react';
import useGlobalState from '../App/state';

const Statbar = ({ className, colour, percentage }) => {
	return (
		<div className={"status-box__statbar-empty " + className + "-empty"}>
			<div style={{backgroundColor: colour, width: percentage + "%"}} className={"status-box__statbar " + className}></div>
		</div>
	);
};

const SpellCooldown = ({ className }) => {
	return (
		<div className={"status-box__spell-cooldown " + className}></div>
	);
};

const StatusBox = () => {
	const [{ player }] = useGlobalState();
	player.current = { health: 80, energy: 20, mana: 50}; // dummy stats
	player.max = {health: 100, energy: 100, mana: 100}; // dummy stats

	return (
		<section className="status-box">
			<div className="status-box__statbars">
				<Statbar colour="#ff0000" percentage={player.current.health / player.max.health * 100} />
				<Statbar colour="#00ff00" percentage={player.current.energy / player.max.energy * 100} />
				<Statbar colour="#0000ff" percentage={player.current.mana / player.max.mana * 100} />
			</div>
			<div className="status-box__spell-cooldowns">
				<SpellCooldown />
				<SpellCooldown />
				<SpellCooldown />
			</div>
		</section>
	);
};

export default StatusBox;
