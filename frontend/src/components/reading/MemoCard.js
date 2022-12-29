import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
// Components
import NoContent from '../common/NoContent'
// Functions
import { addMemo } from '../../functions/memo'
import { MEMO_CONTENT_PLACEHOLDER, MEMO_EMPTY } from '../../messages/readingMessages'

const MemoCard = ({ book, memoList, setMemoList, setSelectedMemo, setIsModalOpen }) => {
	const [page, setPage] = useState(book.currentPage)
	const [content, setContent] = useState('')

	const addMemoFunction = (e) => {
		e.preventDefault()

		const memo = {
			content: content,
			page: page === 0 || page === '' ? null : page,
		}

		addMemo(memo, book.bookId).then((isSuccess) => {
			if (isSuccess) {
				setMemoList([...memoList, memo])
				setContent('')
			}
		})
	}

	return (
		<Card>
			<Card.Body>
				<h4 className='mb-4'>메모</h4>

				<div className='row row-eq-height'>
					{memoList == null || memoList.length === 0 ? (
						<NoContent message={MEMO_EMPTY} style={{ width: '100px' }} />
					) : (
						memoList.map((memo) => {
							return (
								<div className='col-12 col-md-6 mb-3'>
									<Card
										className='h-100'
										onClick={() => {
											setIsModalOpen(true)
											setSelectedMemo(memo)
										}}>
										<Card.Header>{memo.page}</Card.Header>
										<Card.Body className='d-flex align-items-center justify-content-center'>{memo.content}</Card.Body>
									</Card>
								</div>
							)
						})
					)}
				</div>
			</Card.Body>

			<Card.Footer>
				<Form onSubmit={addMemoFunction}>
					<div className='row justify-content-end'>
						<div className='col-3 col-sm-2'>
							<Form.Control
								type='text'
								placeholder='Page'
								className='h-100'
								required
								onChange={(e) => setPage(e.target.value)}
								value={page}
							/>
						</div>

						<div className='col-9 col-sm-8'>
							<Form.Control
								type='text'
								placeholder={MEMO_CONTENT_PLACEHOLDER}
								required
								onChange={(e) => setContent(e.target.value)}
								value={content}
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

export default MemoCard
