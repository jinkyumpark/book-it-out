import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { deleteReadingSession, editReadingSession } from '../../../functions/reading'
import toast from 'react-hot-toast'
// Resources
import '../../../resources/css/input.css'
import { getDayCountOfMonth } from '../../../functions/date'
import { ERROR_MESSAGE } from '../../../messages/commonMessages'
// Functions

const ReadingSessionDetailModal = ({
	isModalOpen,
	setIsModalOpen,
	readingSession,
	setReadingSession,
	readingSessionList,
	setReadingSessionList,
	book,
	setBook,
}) => {
	const isReadingSessionManuallyAdded = (time) => {
		if (time.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null) {
			return false
		} else {
			return true
		}
	}
	const getDate = (time) => {
		const timeString = time.substring(0, time.indexOf('T'))
		const year = timeString.substring(0, timeString.indexOf('-'))
		const month = timeString.substring(timeString.indexOf('-') + 1, timeString.lastIndexOf('-'))
		const day = timeString.substring(timeString.lastIndexOf('-') + 1)

		return [year, month, day]
	}

	const [isEditMode, setIsEditMode] = useState(false)
	const [year, setYear] = useState(null)
	const [month, setMonth] = useState(null)
	const [day, setDay] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [endPage, setEndPage] = useState(null)

	const handleEditReadingSession = () => {
		if (
			(year == null && month == null && day == null && readTime == null && endPage == null) ||
			(readTime == readingSession.readTime && endPage == readingSession.endPage)
		) {
			toast.error('수정사항이 없어요')
			setIsEditMode(false)
			return
		}

		const editedReadingSession = {
			readingSessionId: readingSession.readingSessionId,
			startTime: readingSession.startTime,
			endTime: readingSession.endTime,
			readTime: readTime == readingSession.readTime ? null : readTime,
			endPage: endPage == readingSession.endPage ? null : endPage,
		}

		editReadingSession(editedReadingSession).then((success) => {
			if (success) {
				toast.success('독서활동을 수정했어요')
				setReadingSession(editedReadingSession)
				setReadingSessionList(
					readingSessionList.map((r) => {
						if (r.readingSessionId == readingSession.readingSessionId) {
							return editedReadingSession
						} else {
							return r
						}
					})
				)
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
	}

	const handleDeleteReadingSession = () => {
		if (book.currentPage !== readingSession.endPage) {
			toast.error('가장 최근의 독서활동만 지울 수 있어요')
			return
		}

		const confirm = window.confirm('이 독서활동을 지울까요?')

		if (confirm) {
			deleteReadingSession(readingSession.readingSessionId).then((success) => {
				if (success) {
					toast.success('독서활동을 지웠어요')
					setReadingSessionList(readingSessionList.filter((reading) => reading.readingSessionId !== readingSession.readingSessionId))
					setBook({ ...book, currentPage: readingSession.startPage - 1 })
					setIsModalOpen(false)
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
				setIsModalOpen(false)
				setIsEditMode(false)
			}}
			fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>독서활동 자세히 보기</h4>
			</Modal.Header>

			{readingSession != null && (
				<Modal.Body>
					<div className='row'>
						{isEditMode ? (
							<>
								<Form>
									{isReadingSessionManuallyAdded(readingSession.endTime) ? (
										<div className='row text-center'>
											<div className='col-3 mt-1'>🗓️ 독서날짜</div>
											<div className='col-9'>
												<div className='row'>
													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setYear(e.target.value)}>
															{Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear() - 9)
																.reverse()
																.map((year) => {
																	return (
																		<option value={year} selected={year == getDate(readingSession.startTime)[0]}>
																			{year}년
																		</option>
																	)
																})}
														</Form.Select>
													</div>

													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setMonth(e.target.value)}>
															{Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
																return (
																	<option
																		value={month}
																		selected={
																			month == getDate(readingSession.startTime)[1]
																		}>{`${month}월`}</option>
																)
															})}
														</Form.Select>
													</div>

													<div className='col-4'>
														<Form.Select className='mb-2' onChange={(e) => setDay(e.target.value)}>
															{Array.from(
																{
																	length: getDayCountOfMonth(
																		getDate(readingSession.startTime)[0],
																		getDate(readingSession.startTime)[1]
																	),
																},
																(_, i) => i + 1
															).map((day) => {
																return (
																	<option
																		value={day}
																		selected={getDate(readingSession.startTime)[2] == day}>{`${day}일`}</option>
																)
															})}
														</Form.Select>
													</div>
												</div>
											</div>
										</div>
									) : (
										<>
											<div className='row text-center'>
												<div className='col-3 mt-1'>🗓️ 시작시간</div>
												<div className='col-9'>
													<Form.Control className='mb-2' type='number' defaultValue={readingSession.readTime} />
												</div>
											</div>

											<div className='row text-center'>
												<div className='col-3 mt-1'>🗓️ 종료시간</div>
												<div className='col-9'>
													<Form.Control className='mb-2' type='number' defaultValue={readingSession.readTime} />
												</div>
											</div>
										</>
									)}

									<div className='row text-center'>
										<div className='col-3 mt-1'>⏰ 독서시간</div>
										<div className='col-9'>
											<Form.Control
												className='mb-2'
												type='number'
												defaultValue={readingSession.readTime}
												onChange={(e) => setReadTime(e.target.value)}
											/>
										</div>
									</div>

									<div className='row text-center'>
										<div className='col-3 mt-1'>📃 시작 페이지</div>
										<div className='col-9'>
											<Form.Control className='mb-2' type='number' disabled defaultValue={readingSession.startPage} />
										</div>
									</div>

									<div className='row text-center'>
										<div className='col-3 mt-1'>📃 끝 페이지</div>
										<div className='col-9'>
											<Form.Control
												className='mb-2'
												type='number'
												defaultValue={readingSession.endPage}
												onChange={(e) => setEndPage(e.target.value)}
											/>
										</div>
									</div>
								</Form>
							</>
						) : (
							<ReadingSessionInfo readingSession={readingSession} />
						)}
					</div>

					<div className='row'>
						<div className='col-6'>
							<Button
								disabled
								variant={isEditMode ? 'success' : 'warning'}
								className='w-100'
								onClick={() => {
									if (isEditMode) {
										handleEditReadingSession()
									}
									setIsEditMode(!isEditMode)
								}}>
								{isEditMode ? '수정완료' : '수정하기'}
							</Button>
						</div>

						<div className='col-6' onClick={() => handleDeleteReadingSession()}>
							<Button variant='danger' className='w-100'>
								삭제하기
							</Button>
						</div>
					</div>
				</Modal.Body>
			)}
		</Modal>
	)
}

const ReadingSessionInfo = ({ readingSession }) => {
	return (
		<>
			<h5 className='mb-3'>
				🗓️{' '}
				{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null
					? readingSession.startTime
							.replace('-', '년 ')
							.replace('-', '월 ')
							.replace('T', '일 ')
							.replace(':', '시 ')
							.replace(':', '분 ')
							.substring(0, 21)
					: readingSession.startTime
							.replace('-', '년 ')
							.replace('-', '월 ')
							.replace('T', '일 ')
							.replace(':', '시 ')
							.replace(':', '분 ')
							.substring(0, 14)}
				{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null ? ' 부터' : ''}
			</h5>
			{readingSession.endTime.substring(readingSession.endTime.indexOf('T') + 1).match('00:00:00') == null && (
				<h5 className='mb-3'>
					🗓️{' '}
					{readingSession.endTime
						.replace('-', '년 ')
						.replace('-', '월 ')
						.replace('T', '일 ')
						.replace(':', '시 ')
						.replace(':', '분 ')
						.substring(0, 21)}{' '}
					까지
				</h5>
			)}

			<h5 className='mb-3'>⏰ {readingSession.readTime}분 동안</h5>
			<h5 className='mb-3'>
				📃 {readingSession.startPage}P 부터 {readingSession.endPage}P 까지
			</h5>
			<h5 className='mb-3'>📃 {readingSession.endPage - readingSession.startPage + 1}P 읽었어요</h5>
		</>
	)
}

export default ReadingSessionDetailModal
