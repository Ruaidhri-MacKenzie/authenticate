import React, { useState } from 'react';
import useGlobalState from '../App/state';

const Slot = ({ index, className, item, selectedSlot, setSelectedSlot }) => {
	const clickHandler = e => {
		if (index != null) setSelectedSlot(index);
	};
	
	const renderItem = () => {
		return (
			<div className="inventory__item">

			</div>
		);
	};

	className = (selectedSlot != null && selectedSlot === index) ? className + " " + className + "--selected" : className;

	return (
		<div className={className} onClick={clickHandler}>
			{item && renderItem()}
		</div>
	);
};

const Inventory = () => {
	const [{ player }] = useGlobalState();
	const [selectedSlot, setSelectedSlot] = useState(null);

	const renderSlots = () => {
		const slots = [];
		for (let i = 0; i < 20; i++) {
			slots.push(<Slot key={"slot" + i} index={i} className="inventory__slot" item={player.inventory[i]} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />);
		}
		return (
			<div className="inventory__slots">
				{slots}
			</div>
		);
	};
	const renderEquipmentSlots = () => {
		const equipmentSlots = [];
		for (let i = 20; i < 25; i++) {
			equipmentSlots.push(<Slot key={"slot" + i} index={i} className="inventory__slot" item={player.inventory[i]} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />);
		}
		return (
			<div className="inventory__equipment">
				{equipmentSlots}
			</div>
		);
	};
	const renderPreview = () => {
		return (
			<div className="inventory__preview">
				<Slot className="inventory__preview-slot" item={{}} setSelectedSlot={setSelectedSlot} />
				<h3 className="inventory__preview-name">Name</h3>
				<p className="inventory__preview-description">Description</p>
			</div>
		);
	};

	return (
		<section className="inventory">
			{renderSlots()}
			{renderEquipmentSlots()}
			{renderPreview()}
		</section>
	);
};

export default Inventory;
