import React from 'react'

const Timer = ({ time }) => {
	return (
		<h1>
			{Math.floor((time / 60 / 60) % (60 * 60))} : {Math.floor(time / 60) % 60} : {time % 60}
		</h1>
	)
}
export default Timer
