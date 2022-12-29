import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Modal, Button, Card, Form } from 'react-bootstrap'
// Functions
import { deleteQuotation, editQuotation } from '../../../functions/quotation'
// Messages
import { ERROR_MESSAGE } from '../../../messages/commonMessages'

const QuotationDetailModal = ({ isModalOpen, setIsModalOpen, quotation, setQuotation, quotationList, setQuotationList }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const [editedPage, setEditedPage] = useState(null)
	const [editedContent, setEditedContent] = useState(null)
	const [editedFromWho, setEditedFromWho] = useState(null)

	const handleEditQuotation = () => {
		if (
			(editedPage === null && editedContent === null && editedFromWho == null) ||
			(editedPage == quotation.page && editedContent == quotation.content && editedFromWho == quotation.from_who)
		) {
			toast.error('수정사항이 없어요')
			setIsEditMode(false)
			return
		}

		const editedQuotation = {
			quotationId: quotation.quotationId,
			content: editedContent == null ? quotation.content : editedContent,
			page: editedPage == null ? quotation.page : editedPage,
			fromWho: editedFromWho == null ? quotation.from_who : editedFromWho,
		}

		editQuotation(editedQuotation).then((success) => {
			if (success) {
				toast.success('인용을 수정했어요')

				setQuotation(editedQuotation)
				setQuotationList(
					quotationList.map((q) => {
						if (q.quotationId == quotation.quotationId) {
							return editedQuotation
						} else {
							return q
						}
					})
				)
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
	}
	const handleDeleteQuotation = () => {
		const confirm = window.confirm('이 인용을 지울까요?')

		if (confirm) {
			deleteQuotation(quotation.quotationId).then((success) => {
				if (success) {
					setQuotationList(quotationList.filter((q) => q.quotationId !== quotation.quotationId))
					setIsModalOpen(false)
					toast.success('인용을 삭제했어요')
				} else {
					toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
				}
			})
		}
	}

	return (
		<Modal
			show={isModalOpen}
			onHide={() => {
				setIsEditMode(false)
				setIsModalOpen(false)
			}}
			fullscreen='md-down'>
			{quotation != null && (
				<>
					<Modal.Header closeButton className='text-center'>
						<h4 className='w-100'>인용 자세히보기</h4>
					</Modal.Header>

					<Modal.Body>
						{isEditMode ? (
							<Form
								onSubmit={(e) => {
									e.preventDefault()
									handleEditQuotation()
								}}>
								<Card>
									<Card.Header>
										<Form.Control
											type='number'
											onChange={(e) => setEditedPage(e.target.value)}
											defaultValue={quotation.page}
											value={editedPage}
											placeholder='없음'
										/>
									</Card.Header>

									<Card.Body>
										<Form.Control
											as='textarea'
											style={{ height: '200px' }}
											onChange={(e) => setEditedContent(e.target.value)}
											defaultValue={quotation.content}
										/>
									</Card.Body>

									<Card.Footer>
										<Form.Control
											onChange={(e) => setEditedFromWho(e.target.value)}
											defaultValue={quotation.from_who}
											placeholder='없음'
										/>
									</Card.Footer>
								</Card>
							</Form>
						) : (
							<Card className='text-center'>
								<Card.Header>{quotation.page == null ? '-' : quotation.page}</Card.Header>
								<Card.Body>{quotation.content}</Card.Body>
								<Card.Footer>{quotation.from_who == null || quotation.from_who === '' ? '-' : quotation.from_who}</Card.Footer>
							</Card>
						)}

						<div className='row mt-3'>
							<div className='col-6'>
								<Button
									variant={isEditMode ? 'success' : 'warning'}
									className='w-100'
									onClick={() => {
										if (isEditMode) {
											handleEditQuotation()
										}
										setIsEditMode(!isEditMode)
									}}>
									{isEditMode ? '수정 완료' : '메모 수정하기'}
								</Button>
							</div>

							<div className='col-6'>
								<Button variant='danger' className='w-100' onClick={() => handleDeleteQuotation()}>
									삭제하기
								</Button>
							</div>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	)
}

export default QuotationDetailModal
