import '../../../resources/css/input.css'

import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { addQuotation } from '../../../functions/quotation'

const AddQuotationModal = ({ isModalOpen, setIsModalOpen, book, quotationList, setQuotationList }) => {
	const [page, setPage] = useState(null)
	const [content, setContent] = useState(null)
	const [fromWho, setFromWho] = useState(null)

	const handleAddQuotation = (e) => {
		e.preventDefault()

		if (page == null) {
			toast.error('페이지를 입력해 주세요')
			return
		}

		if (page < 0) {
			toast.error('')
			return
		}

		if (page > book.endPage) {
			toast.error('페이지가 책의 마지막 페이지보다 커요')
			return
		}

		if (content == null) {
			toast.error('내용을 입력해 주세요')
			return
		}

		if (fromWho == null) {
			toast.error('말한 사람을 입력해 주세요')
			return
		}

		const newQuotation = {
			page: page,
			content: content,
			fromWho: fromWho,
		}

		addQuotation(book.bookId, newQuotation).then((success) => {
			if (success) {
				setQuotationList([...quotationList, newQuotation])
				setIsModalOpen(false)
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Modal
			show={isModalOpen}
			onHide={() => {
				setIsModalOpen(false)
			}}
			fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>🗣️ 인용 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddQuotation(e)}>
					<Form.Label>페이지</Form.Label>
					<Form.Control type='number' onChange={(e) => setPage(e.target.value)} />

					<Form.Label className='mt-2'>인용 내용</Form.Label>
					<Form.Control onChange={(e) => setContent(e.target.value)} />

					<Form.Label className='mt-2'>말한 사람</Form.Label>
					<Form.Control onChange={(e) => setFromWho(e.target.value)} />

					<Button variant='success' type='submit' className='w-100 mt-3'>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddQuotationModal
