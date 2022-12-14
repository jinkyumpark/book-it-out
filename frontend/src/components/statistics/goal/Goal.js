import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
// Components
import NoContent from '../../common/NoContent'
import Loading from '../../common/Loading'
import GoalView from './GoalView'
import GoalAddModal from './GoalAddModal'
import GoalEditModal from './GoalEditModal'
import AddButton from '../../common/AddButton'
// Functions
import { getGoalList, deleteGoal } from '../../../functions/goal'
// Settings
import { INITIAL_FETCH_TIME } from '../../../settings/settings'
import { GOAL_DELETE_CONFIRM } from '../../../messages/statisticsMessages'
// Resources
import goalIcon from '../../../resources/images/general/goal.png'
import GoalPastAddModal from './GoalPastAddModal'
import GoalPastEditModal from './GoalPastEditModal'

const Goal = () => {
	const [intialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
	const [isGoalEditModalOpen, setIsGoalEditModalOpen] = useState(false)
	const [isPastGoalAddModalOpen, setIsPastGoalAddModalOpen] = useState(false)
	const [isPastGoalEditModalOpen, setIsPastGoalEditModalOpen] = useState(false)

	const [selectedEditGoal, setSelectedEditGoal] = useState(null)

	const currentYear = new Date().getFullYear()

	const [goalList, setGoalList] = useState([])
	const [currentYearGoal, setCurrentYearGoal] = useState(null)
	const [highlightBookList, setHighlightBookList] = useState([])

	const handleDeleteGoal = () => {
		const confirm = window.confirm(GOAL_DELETE_CONFIRM)

		if (confirm) {
			deleteGoal(currentYear).then((success) => success && setCurrentYearGoal(null))
		}
	}

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		getGoalList(6)
			.then((goalListData) => {
				setGoalList(goalListData)

				const currentYearGoalOptional = goalListData.find((goal) => goal.year == currentYear)
				if (typeof currentYearGoalOptional != 'undefined') {
					setCurrentYearGoal(currentYearGoalOptional)
				}
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='container'>
			{intialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					<GoalAddModal isModalOpen={isGoalModalOpen} setIsModalOpen={setIsGoalModalOpen} setCurrentYearGoal={setCurrentYearGoal} />
					{currentYearGoal != null && (
						<GoalEditModal
							isModalOpen={isGoalEditModalOpen}
							setIsModalOpen={setIsGoalEditModalOpen}
							setCurrentYearGoal={setCurrentYearGoal}
							currentBook={currentYearGoal.current}
							previousGoal={currentYearGoal.goal}
						/>
					)}
					<GoalPastAddModal
						isModalOpen={isPastGoalAddModalOpen}
						setIsModalOpen={setIsPastGoalAddModalOpen}
						goalList={goalList}
						setGoalList={setGoalList}
					/>
					{selectedEditGoal != null && (
						<GoalPastEditModal
							isModalOpen={isPastGoalEditModalOpen}
							setIsModalOpen={setIsPastGoalEditModalOpen}
							selectedGoal={selectedEditGoal}
							goalList={goalList}
							setGoalList={setGoalList}
						/>
					)}

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h2>{currentYear}???</h2>

								<div className={currentYearGoal != null && 'mb-5'}>
									{currentYearGoal == null ? (
										<NoContent message={`${currentYear}??? ????????? ?????????`} style={{ width: '150px' }} />
									) : (
										<GoalView goal={currentYearGoal} />
									)}
								</div>

								<div className='row justify-content-center'>
									{currentYearGoal == null ? (
										<div className='col-12 col-lg-8'>
											<Button className='w-100 mt-3' onClick={() => setIsGoalModalOpen(true)}>
												?????? ????????????
											</Button>
										</div>
									) : (
										<>
											<div className='col-6'>
												<Button variant='warning' className='w-100' onClick={() => setIsGoalEditModalOpen(true)}>
													?????? ????????????
												</Button>
											</div>

											<div className='col-6'>
												<Button variant='danger' className='w-100' onClick={() => handleDeleteGoal()}>
													?????? ????????????
												</Button>
											</div>
										</>
									)}
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h2>{new Date().getFullYear()}??? ????????? ???</h2>

								{highlightBookList.length === 0 ? (
									<NoContent message={`${currentYear}?????? ?????? ????????? ?????? ?????????`} style={{ width: '150px' }} />
								) : (
									<></>
								)}

								<div className='row justify-content-center'>
									<div className='col-12 col-lg-8'>
										<Button className='mt-3 w-100' disabled>
											????????? ??? ?????? ????????????
										</Button>
									</div>
								</div>
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 mb-5'>
						<Card>
							<Card.Body>
								<h2 className='mb-4'>?????? ??????</h2>

								<AddButton
									size='30'
									color='success'
									onClick={() => {
										setIsPastGoalAddModalOpen(true)
									}}
									right='2%'
								/>

								{goalList.filter((g) => g.year != new Date().getFullYear()).length === 0 ? (
									<NoContent message='?????? ????????? ?????????' />
								) : (
									<div className='row text-center'>
										{goalList
											.filter((goal) => goal.year != new Date().getFullYear())
											.sort((a, b) => b.year - a.year)
											.map((goal) => {
												return (
													<div
														onClick={() => {
															setSelectedEditGoal(goal)
															setIsPastGoalEditModalOpen(true)
														}}
														className='col-6 col-sm-4 col-md-3 col-lg-2 mb-4'
														style={{ opacity: goal.year === new Date().getFullYear() ? '1' : '0.5' }}>
														<h3 className='mb-0'>{`${goal.year}???`}</h3>

														<img
															src={goalIcon}
															alt=''
															className='img-fluid align-middle'
															style={{
																width: '150px',
																height: '150px',
															}}
														/>

														<h4 className='mt-3'>{`${goal.current}??? / ${goal.goal}???`}</h4>
													</div>
												)
											})}
									</div>
								)}
							</Card.Body>
						</Card>
					</div>
				</div>
			)}
		</div>
	)
}

export default Goal
