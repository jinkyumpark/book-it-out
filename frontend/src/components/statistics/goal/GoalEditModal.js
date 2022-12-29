import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Functions
import { addGoal } from '../../../functions/goal'
// Resources
import '../../../resources/css/input.css'

const GoalEditModal = ({ isModalOpen, setIsModalOpen, setCurrentYearGoal, currentBook, previousGoal }) => {
	const [goal, setGoal] = useState(0)
	const handleEditGoal = (e) => {
		e.preventDefault()

		if (goal === '') {
			toast.error('목표를 입력해 주세요')
			return
		}

		if (isNaN(goal)) {
			toast.error('목표는 숫자만 입력할 수 있어요')
			return
		}

		if (Number(goal) < 2) {
			toast.error('2권 이상의 목표를 입력해 주세요')
			return
		}

		addGoal(new Date().getFullYear(), goal).then((success) => {
			if (success) {
				setCurrentYearGoal({ goal: goal, current: currentBook })
				setIsModalOpen(false)
			} else {
			}
		})
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' centered onHide={() => setIsModalOpen(false)}>
			<Modal.Header closeButton>
				<h4 className='text-center w-100 mt-1'>{`${new Date().getFullYear()}년 목표 수정하기`}</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleEditGoal(e)}>
					<Form.Control
						type='number'
						placeholder={`수정할 목표 (그 전 목표 : ${previousGoal})`}
						onChange={(e) => setGoal(e.target.value)}
					/>

					<div className='row justify-content-center mt-3'>
						<div className='col-12 col-md-5 mt-2'>
							<Button type='submit' variant='success' className='w-100'>
								수정하기
							</Button>
						</div>

						<div className='col-12 col-md-5 mt-2'>
							<Button variant='danger' className='w-100' onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default GoalEditModal
