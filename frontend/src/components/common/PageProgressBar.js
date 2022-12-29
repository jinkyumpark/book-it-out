import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const PageProgressBar = ({ book }) => {
	return (
		<div className='row align-items-center'>
			<div className='col-8 col-md-9'>
				<ProgressBar
					className='mt-3 mb-3'
					now={((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100}
					label={`${Math.round(((book.currentPage == null ? 0 : book.currentPage) / book.endPage) * 100)}%`}
				/>
			</div>

			<div className='col-4 col-md-3 text-end'>
				<span className='align-middle' style={{ whiteSpace: 'nowrap' }}>{`${book.currentPage == null ? 0 : book.currentPage} / ${
					book.endPage
				}`}</span>
			</div>
		</div>
	)
}

export default PageProgressBar
