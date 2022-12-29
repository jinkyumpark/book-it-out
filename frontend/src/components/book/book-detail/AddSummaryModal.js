import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { addSummary } from '../../../functions/book'

const AddSummaryModal = ({ isModalOpen, setIsModalOpen, book, setBook }) => {
	const [summary, setSummary] = useState('')

	const handleAddSummary = (e) => {
		e.preventDefault()

		if (summary == '') {
			toast.error('요약을 입력해 주세요')
		}

		addSummary(book.bookId, summary).then((success) => {
			if (success) {
				setBook({
					...book,
					summary: summary,
				})
				setIsModalOpen(false)
				toast.success('요약을 추가했어요')
			}
		})
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' onHide={() => setIsModalOpen(false)} backdrop='static'>
			<Modal.Header closeButton onHide={() => setIsModalOpen(false)} className='text-center'>
				<h4 className='w-100'>요약 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddSummary(e)}>
					<Form.Control as='textarea' onChange={(e) => setSummary(e.target.value)} placeholder='여기에 요약을 입력해 주세요' autoFocus />

					<Button type='submit' variant='success' className='w-100 mt-3'>
						요약 추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddSummaryModal
