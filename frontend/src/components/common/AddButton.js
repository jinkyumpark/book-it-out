import React from 'react'
import { AiFillPlusCircle as AddIcon } from 'react-icons/ai'
import '../../resources/css/button.css'

const AddButton = ({ size, color = 'primary', onClick, right = '2.5%' }) => {
	const addButtonStyle = {
		right: right,
		width: `${size}px`,
		height: `${size}px`,
		borderRadius: '50px',
		position: 'absolute',
		top: '20px',
	}

	return <AddIcon id='addButton' className={`text-${color} p-0`} style={addButtonStyle} onClick={() => onClick()} />
}

export default AddButton
