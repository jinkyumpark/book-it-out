import React from 'react'
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi'

const Error = ({ message = '오류가 났어요' }) => {
	const iconStyle = {
		width: '100px',
		height: '100px',
	}

	return (
		<div className='row justify-content-center mt-5 mb-5'>
			<div className='col-8 text-center'>
				<ErrorIcon className='text-danger' style={iconStyle} />

				<h3 className='mt-3'>{message}</h3>
			</div>
		</div>
	)
}

export default Error
