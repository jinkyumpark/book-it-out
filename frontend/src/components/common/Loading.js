import React from 'react'

const Loading = () => {
	const spinnerStyle = {
		width: '100px',
		height: '100px',
	}

	return (
		<div>
			<div className='row justify-content-center text-center align-items-center'>
				<div className='col-12 col-md-6'>
					<div className='spinner-border text-success' role='status' style={spinnerStyle} />
					<h1 className='mt-4'>잠시만 기다려 주세요</h1>
				</div>
			</div>
		</div>
	)
}

export default Loading
