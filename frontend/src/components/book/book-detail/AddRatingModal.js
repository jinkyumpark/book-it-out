import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { AiFillStar as StarFillIcon, AiOutlineStar as StarIcon } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { addRating } from '../../../functions/book'

const AddRatingModal = ({ isModalOpen, setIsModalOpen, book, setBook }) => {
	const [rating, setRating] = useState(0)

	const handleAddRating = () => {
		if (rating === 0) {
			toast.error('별점을 선택해 주세요')
		}

		addRating(book.bookId, rating).then((success) => {
			if (success) {
				setBook({
					...book,
					rating: rating,
				})
				toast.success('별점을 추가했어요')
				setIsModalOpen(false)
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>별점 추가하기</h4>
			</Modal.Header>
			<Modal.Body>
				<div className='row justify-content-center'>
					{[1, 2, 3, 4, 5].map((starCount) => {
						return (
							<div className='col-2 text-center'>
								<h1 onClick={() => setRating(starCount)}>
									{starCount <= rating ? <StarFillIcon className='text-warning' /> : <StarIcon />}
								</h1>
							</div>
						)
					})}

					<div className='col-12 col-md-10'>
						<Button variant='warning' className='w-100 mt-4' onClick={() => handleAddRating()}>
							별점 추가하기
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default AddRatingModal
