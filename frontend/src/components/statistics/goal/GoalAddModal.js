import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Functions
import { addGoal, getGoal } from '../../../functions/goal'
// Messages
import { ERROR_MESSAGE } from '../../../messages/commonMessages'
import {
	GOAL_ADD_ERROR_GOAL_NOT_NUMBER,
	GOAL_ADD_ERROR_GOAL_NULL,
	GOAL_ADD_ERROR_GOAL_SMALL,
	GOAL_ADD_PLACEHOLDER,
} from '../../../messages/statisticsMessages'
// Resources
import '../../../resources/css/input.css'

const GoalAddModal = ({ isModalOpen, setIsModalOpen, setCurrentYearGoal }) => {
	const [goal, setGoal] = useState('')

	const handleAddGoal = (e) => {
		e.preventDefault()

		if (goal === '') {
			toast.error(GOAL_ADD_ERROR_GOAL_NULL)
			return
		}

		if (isNaN(goal)) {
			toast.error(GOAL_ADD_ERROR_GOAL_NOT_NUMBER)
			return
		}

		if (Number(goal) < 2) {
			toast.error(GOAL_ADD_ERROR_GOAL_SMALL)
			return
		}

		addGoal(new Date().getFullYear(), goal).then((success) => {
			if (success) {
				getGoal(new Date().getFullYear()).then((goalData) => {
					setCurrentYearGoal({ goal: goal, current: goalData.current })
					setIsModalOpen(false)
				})
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
	}

	return (
		<Modal show={isModalOpen} fullscreen='md-down' centered onHide={() => setIsModalOpen(false)}>
			<Modal.Header closeButton>
				<h4 className='text-center w-100 mt-1'>{`${new Date().getFullYear()}년 목표 설정하기`}</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddGoal(e)}>
					<Form.Control type='number' placeholder={GOAL_ADD_PLACEHOLDER} onChange={(e) => setGoal(e.target.value)} />

					<div className='row justify-content-center mt-3'>
						<div className='col-12 col-md-5 mt-2'>
							<Button type='submit' variant='success' className='w-100'>
								설정하기
							</Button>
						</div>

						<div className='col-12 col-md-5 mt-2'>
							<Button type='button' variant='danger' className='w-100' onClick={() => setIsModalOpen(false)}>
								취소
							</Button>
						</div>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default GoalAddModal
