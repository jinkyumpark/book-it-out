import React from 'react'
import errorImage from '../../resources/images/common/error.png'

const NoContent = ({ message = '텅 비어 있어요', icon = errorImage, style = { width: '250px' } }) => {
	return (
		<div>
			<div className='row justify-content-center'>
				<img src={icon} alt='' className='img-fluid mxt-5' style={style} />

				<h2 className='text-center mt-4'>{message}</h2>
			</div>
		</div>
	)
}

export default NoContent
