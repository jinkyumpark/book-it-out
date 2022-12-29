import React, { useState, useEffect } from 'react'
import { Card, Alert } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'

import HorizontalBookView from '../book/HorizontalBookView'
import DateLineChart from './DateLineChart'
import SummaryTable from './SummaryTable'
import GoalView from './goal/GoalView'
// Functions
import { getLastBook } from '../../functions/book'
import { getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'
import { getAlertMessage, getIsAlertShowing, updateAlertCloseTime } from '../../functions/alert'
// Settings
import { INITIAL_FETCH_TIME } from '../../settings/settings'
import { LAST_BOOK_EMPTY } from '../../messages/statisticsMessages'

const Main = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)
	const [showAlert, setShowAlert] = useState(getIsAlertShowing())

	const [lastBook, setLastBook] = useState(null)
	const [readTime, setReadTime] = useState(null)
	const [goal, setGoal] = useState(null)
	const [statistics, setStatistics] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		Promise.all([
			getLastBook().then((book) => setLastBook(book)),
			getReadTime(7).then((readTime) => setReadTime(readTime)),
			getGoal(new Date().getFullYear()).then((res) => setGoal(res)),
			getStatisticsSummary().then((stats) => setStatistics(stats)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	const closeAlert = () => {
		setShowAlert(false)
		updateAlertCloseTime()
	}

	const componentList = [
		<Card>
			<Card.Body>
				<h3>마지막으로 읽은 책</h3>

				{lastBook == null ? (
					<NoContent message={LAST_BOOK_EMPTY} />
				) : (
					<HorizontalBookView
						book={lastBook}
						firstButton={
							<a href={`/reading/${lastBook.bookId}`} className='btn btn-primary w-100'>
								이어서 읽기
							</a>
						}
						secondButton={
							<a href='/book/all' className='btn btn-warning w-100'>
								다른 책 읽기
							</a>
						}
						link={lastBook == null ? `/book/not-done` : `/book/detail/${lastBook != null && lastBook.bookId}`}
					/>
				)}
			</Card.Body>
		</Card>,
		<Card className='h-100'>
			<a href='/statistics' className='text-decoration-none text-black h-100'>
				<Card.Body className='h-100'>
					<h3 className='mb-4 mb-md-5 mb-lg-4'>최근 1주일 독서시간</h3>

					{readTime == null ? (
						<Error message='오류가 났어요' />
					) : (
						<DateLineChart startDate={new Date().setDate(new Date().getDate() - 7)} data={readTime} duration={7} />
					)}
				</Card.Body>
			</a>
		</Card>,
		<Card className='h-100'>
			<Card.Body>
				<a href='/statistics/goal' className='text-decoration-none text-black'>
					<h3>2022년 목표</h3>

					{statistics == null ? <Error message='오류가 났어요' /> : <GoalView goal={goal} />}
				</a>
			</Card.Body>
		</Card>,
		<Card>
			<Card.Body>
				<a href='/statistics' className='text-decoration-none text-black'>
					<h4>2022년 독서 요약</h4>

					{statistics == null ? <Error message='오류가 났어요' /> : <SummaryTable statistics={statistics} />}
				</a>
			</Card.Body>
		</Card>,
	]

	return (
		<div className='container-lg'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height mt-5 mb-5'>
					{showAlert && (
						<div className='container'>
							<Alert variant='success' dismissible onClose={() => closeAlert()}>
								{getAlertMessage()}
							</Alert>
						</div>
					)}

					{componentList.map((component) => {
						return <div className='col-12 col-md-6 mb-4'>{component}</div>
					})}
				</div>
			)}
		</div>
	)
}

export default Main
