import '../../../resources/css/input.css'

import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { addMemo } from '../../../functions/memo'

const AddMemoModal = ({ isModalOpen, setIsModalOpen, book, memoList, setMemoList }) => {
	const [page, setPage] = useState(null)
	const [content, setContent] = useState(null)

	const handleAddMemo = (e) => {
		e.preventDefault()

		if (page == null) {
			toast.error('페이지를 입력해 주세요')
			return
		}

		if (page < 0) {
			toast.error('페이지는 0보다 작을 수 없어요')
			return
		}

		if (page > book.endPage) {
			toast.error('메모의 페이지가 책의 마지막 페이지보다 커요')
			return
		}

		if (content == null || content == '') {
			toast.error('내용을 입력해 주세요')
			return
		}

		const newMemo = {
			page: page,
			content: content,
		}

		addMemo(newMemo, book.bookId).then((success) => {
			if (success) {
				setMemoList([...memoList, newMemo])
				setPage(null)
				setContent(null)
				setIsModalOpen(false)
			} else {
			}
		})
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>📋 메모 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddMemo(e)}>
					<Form.Label>페이지</Form.Label>
					<Form.Control type='number' onChange={(e) => setPage(e.target.value)} />

					<Form.Label className='mt-2'>내용</Form.Label>
					<Form.Control onChange={(e) => setContent(e.target.value)} />

					<Button variant='success' type='submit' className='w-100 mt-3'>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddMemoModal
