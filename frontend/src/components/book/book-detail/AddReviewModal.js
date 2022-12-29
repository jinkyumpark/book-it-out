import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { addReview } from '../../../functions/book'

const AddReviewModal = ({ isModalOpen, setIsModalOpen, book, setBook }) => {
	const [review, setReview] = useState('')

	const handleAddReview = (e) => {
		e.preventDefault()

		if (review === '') {
			toast.dismiss()
			toast.error('감상을 입력해 주세요')
			return
		}

		addReview(book.bookId, review).then((success) => {
			if (success) {
				setBook({
					...book,
					review: review,
				})
				setIsModalOpen(false)
				toast.success('감상을 추가했어요')
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' onHide={() => setIsModalOpen(false)} backdrop='static'>
			<Modal.Header closeButton className='text-center' onHide={() => setIsModalOpen(false)}>
				<h4 className='w-100'>책 감상 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddReview(e)}>
					<Form.Control as='textarea' placeholder='여기에 감상을 입력해 주세요' onChange={(e) => setReview(e.target.value)} autoFocus />

					<Button variant='success' type='submit' className='mt-3 w-100'>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddReviewModal
