import React from 'react'
import { Card } from 'react-bootstrap'

const BookInfoIcon = ({ infoType, infoData, responsiveImageStyle = 'col-9 col-md-8', responsiveTextStyle = 'col-12 col-md-12' }) => {
	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className={responsiveImageStyle}>
						<img src={infoType.imageFunction(infoData)} alt='' className='img-fluid mb-2' />
					</div>

					<div className={responsiveTextStyle}>
						<h5 className='text-center'>{infoType.textFunction(infoData)}</h5>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default BookInfoIcon
