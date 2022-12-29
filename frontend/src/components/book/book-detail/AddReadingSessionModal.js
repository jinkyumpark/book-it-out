import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { addReadingSession } from '../../../functions/reading'
import { getDayCountOfMonth } from '../../../functions/date'
import '../../../resources/css/input.css'

const AddReadingSessionModal = ({ isModalOpen, setIsModalOpen, book, setBook, readingSessionList, setReadingSessionList }) => {
	const [endPage, setEndPage] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [year, setYear] = useState(new Date().getFullYear())
	const [month, setMonth] = useState(new Date().getMonth() + (1 % 12))
	const [day, setDay] = useState(new Date().getDate())

	const getStartPage = () => {
		return book.currentPage === 0 ? 0 : Number(book.currentPage) + 1
	}

	const handleAddReadingSession = (e) => {
		e.preventDefault()

		if (endPage == null || endPage === '') {
			toast.error('끝 페이지를 입력해 주세요')
			return
		}

		if (readTime == null || readTime === '' || readTime == 0) {
			toast.error('독서 활동 시간을 입력해 주세요')
			return
		}

		addReadingSession(
			book.bookId,
			year,
			(month.length === 1 ? '0' : '') + month,
			(day.length === 1 ? '0' : '') + day,
			getStartPage(),
			endPage,
			readTime
		).then((success) => {
			if (success) {
				setReadingSessionList([
					...readingSessionList,
					{
						startPage: getStartPage(),
						endPage: endPage,
						startTime: `${year}-${month}-${day}T`,
						endTime: `${year}-${month}-${day}T`,
						readTime: readTime,
					},
				])

				setBook({
					...book,
					currentPage: endPage,
				})
				setIsModalOpen(false)
				toast.success('독서활동을 직접 추가했어요')
			} else {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			}
		})
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} fullscreen='md-down'>
			<Modal.Header closeButton className='text-center'>
				<h4 className='w-100'>독서 활동 직접 추가하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleAddReadingSession(e)}>
					<Form.Label>🗓️ 날짜</Form.Label>
					<div className='row'>
						<div className='col-4'>
							<Form.Select className='mb-2' value={year} onChange={(e) => setYear(e.target.value)}>
								{Array.from({ length: 5 }, (_, i) => i + (new Date().getFullYear() - 5 + 1))
									.reverse()
									.map((yearValue) => {
										return <option value={yearValue}>{yearValue.toString().substring(2)}년</option>
									})}
							</Form.Select>
						</div>

						<div className='col-4'>
							<Form.Select className='mb-2' value={month} onChange={(e) => setMonth(e.target.value)}>
								{Array.from({ length: 12 }, (_, i) => i + 1).map((monthValue) => {
									return <option value={monthValue}>{monthValue}월</option>
								})}
							</Form.Select>
						</div>

						<div className='col-4'>
							<Form.Select className='mb-2' value={day} onChange={(e) => setDay(e.target.value)}>
								{Array.from({ length: getDayCountOfMonth(year, month) }, (_, i) => i + 1).map((dayValue) => {
									return <option value={dayValue}>{dayValue}일</option>
								})}
							</Form.Select>
						</div>
					</div>

					<Form.Label>시작 페이지</Form.Label>
					<Form.Control className='mb-2' type='number' value={getStartPage()} disabled />

					<Form.Label>끝 페이지</Form.Label>
					<Form.Control className='mb-2' type='number' onChange={(e) => setEndPage(e.target.value)} />

					<Form.Label>⏰ 시간 (분)</Form.Label>
					<Form.Control className='mb-2' type='number' value={readTime} onChange={(e) => setReadTime(e.target.value)} />

					<Button variant='success' type='submit' className='w-100 mt-2'>
						추가하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default AddReadingSessionModal
