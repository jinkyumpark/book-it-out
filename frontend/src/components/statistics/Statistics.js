import React, { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
// Components
import Error from '../common/Error'
import Loading from '../common/Loading'

import CategoryTable from './CategoryTable'
import LanguageTable from './LanguageTable'
import SummaryTable from './SummaryTable'
import DateLineChart from './DateLineChart'
import GoalView from './goal/GoalView'
// Functions
import { getCategoryStatistics, getLangaugeStatistics, getReadTime, getStatisticsSummary } from '../../functions/statistics'
import { getGoal } from '../../functions/goal'

const Statistics = () => {
	const [initialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const [readTimeList, setReadTimeList] = useState(null)
	const [statisticsData, setStatisticsData] = useState(null)
	const [languageData, setLanguageData] = useState(null)
	const [categoryData, setCategoryData] = useState(null)
	const [goalData, setGoalData] = useState(null)

	const [goalSelectedYear, setGoalSelectedYear] = useState(new Date().getFullYear())

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 3000)

		Promise.all([
			getReadTime(30).then((readTime) => setReadTimeList(readTime)),
			getStatisticsSummary().then((stats) => setStatisticsData(stats)),
			getLangaugeStatistics().then((languageStats) => setLanguageData(languageStats)),
			getCategoryStatistics().then((categoryStats) => setCategoryData(categoryStats)),
			getGoal(goalSelectedYear).then((goal) => setGoalData(goal)),
		]).finally(() => {
			setInitialFetch(false)
			setIsLoading(false)
		})
	}, [])

	return (
		<div className='container'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<div className='row row-eq-height'>
					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>최근 30일 독서시간</h3>
								<DateLineChart startDate={new Date().setDate(new Date().getDate() - 30)} data={readTimeList} duration={30} />
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<div className='row'>
									<div className='col-6'>
										<h3>매년 독서현황</h3>
									</div>

									<div className='col-6'>
										<Form>
											<Form.Select>
												<option>2022년</option>
											</Form.Select>
										</Form>
									</div>
								</div>

								{statisticsData == null ? <Error /> : <SummaryTable statistics={statisticsData} />}
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>언어별 독서현황</h3>

								<LanguageTable languageData={languageData} />
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<Card className='h-100'>
							<Card.Body>
								<h3>장르별 독서현황</h3>

								<CategoryTable categoryData={categoryData} />
							</Card.Body>
						</Card>
					</div>

					<div className='col-12 col-lg-6 mb-4'>
						<a href='/statistics/goal' className='text-decoration-none text-black'>
							<Card className='h-100'>
								<Card.Body>
									<div className='row'>
										<div className='col-6'>
											<h3>목표 달성 현황</h3>
										</div>

										<div className='col-6'>
											<Form>
												<Form.Select>
													<option>2022년</option>
												</Form.Select>
											</Form>
										</div>
									</div>

									<div className='mt-5 mb-5'>
										<GoalView goal={goalData} />
									</div>
								</Card.Body>
							</Card>
						</a>
					</div>
				</div>
			)}
		</div>
	)
}

export default Statistics
