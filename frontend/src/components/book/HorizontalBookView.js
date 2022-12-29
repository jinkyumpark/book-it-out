import React from 'react'
// Book Info
import BookInfoIcon from './book-info/BookInfoIcon'
// Images
import defaultBookCover from '../../resources/images/common/book.png'
import { CATEGORY_INFO, FORM_INFO, LANGUAGE_INFO } from './book-info/bookInfoEnum'
import PageProgressBar from '../common/PageProgressBar'

const HorizontalBookView = ({ book, firstButton = <></>, secondButton = <></>, link = '' }) => {
	const bookInfoStyle = 'col-4 mb-2'

	return (
		<div className='row row-eq-height justify-content-center mt-3 text-decoration-none text-black'>
			<a href={link} className='mb-4 col-8 col-lg-4 align-self-center'>
				<img
					className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
					src={book.cover === '' ? defaultBookCover : book.cover}
					alt=''
				/>
			</a>

			<div className='col-12 col-lg-8'>
				<a href={link} className='text-decoration-none text-black'>
					<h4>{book.title}</h4>
					<h6 className='text-muted'>{book.author == null || book.author === '' ? '-' : book.author}</h6>
					<PageProgressBar book={book} />

					<div className='row text-center mt-4 justify-content-center'>
						<div className={bookInfoStyle}>
							<BookInfoIcon infoType={LANGUAGE_INFO} infoData={book.language} />
						</div>

						<div className={bookInfoStyle}>
							<BookInfoIcon infoType={CATEGORY_INFO} infoData={book.category} />
						</div>

						<div className={bookInfoStyle}>
							<BookInfoIcon infoType={FORM_INFO} infoData={book.form} />
						</div>
					</div>
				</a>

				<div className='row mt-4'>
					<div className='col-6' style={{ zIndex: 200 }}>
						{firstButton}
					</div>
					<div className='col-6'>{secondButton}</div>
				</div>
			</div>
		</div>
	)
}

export default HorizontalBookView
