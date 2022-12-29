import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import NoContent from '../common/NoContent'
// Functions
import { addQuotation } from '../../functions/quotation'
// Messages
import {
	QUOTATION_ADD_ERROR_CONTENT_NULL,
	QUOTATION_CONTENT_PLACEHOLDER,
	QUOTATION_EMPTY,
	QUOTATION_FROM_WHO_PLACEHOLDER,
} from '../../messages/readingMessages'

const QuotationCard = ({ book, quotationList, setQuotationList, setSelectedQuotation, setIsModalOpen }) => {
	const [page, setPage] = useState(book.currentPage)
	const [content, setContent] = useState('')
	const [fromWho, setFromWho] = useState('')

	const handleAdd = (e) => {
		e.preventDefault()

		if (content === '') {
			toast.error(QUOTATION_ADD_ERROR_CONTENT_NULL)
			return
		}

		const quotation = {
			page: page,
			content: content,
			fromWho: fromWho,
		}

		addQuotation(book.bookId, quotation).then((isSuccess) => {
			if (isSuccess) {
				setQuotationList([...quotationList, quotation])
				setContent('')
				setFromWho('')
			}
		})
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>인용</h4>

				<div className='row row-eq-height'>
					{quotationList == null || quotationList.length === 0 ? (
						<NoContent message={QUOTATION_EMPTY} style={{ width: '100px' }} />
					) : (
						quotationList.map((quotation) => {
							return (
								<div className='col-12 col-md-6 mb-3'>
									<Card
										className='h-100'
										onClick={() => {
											setIsModalOpen(true)
											setSelectedQuotation(quotation)
										}}>
										<Card.Header>{quotation.page}</Card.Header>

										<Card.Body className='d-flex align-items-center justify-content-center'>{quotation.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={(e) => handleAdd(e)}>
					<div className='row'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='Page'
								className='h-100'
								onChange={(e) => setPage(e.target.value)}
								value={page}
								required
							/>
						</div>

						<div className='col-9 col-sm-5'>
							<Form.Control
								type='text'
								placeholder={QUOTATION_CONTENT_PLACEHOLDER}
								required
								onChange={(e) => setContent(e.target.value)}
								value={content}
							/>
						</div>

						<div className='col-8 col-sm-3 mt-2 mt-sm-0'>
							<Form.Control
								type='text'
								placeholder={QUOTATION_FROM_WHO_PLACEHOLDER}
								onChange={(e) => setFromWho(e.target.value)}
								value={fromWho}
							/>
						</div>

						<div className='col-4 col-sm-2 mt-2 mt-sm-0'>
							<Button type='submit' variant='success' className='w-100 h-100'>
								등록
							</Button>
						</div>
					</div>
				</Form>
			</Card.Footer>
		</Card>
	)
}

export default QuotationCard
