import React from 'react'
// Icons
import timeIcon from '../../resources/images/statistics/time.png'
import bookIcon from '../../resources/images/statistics/book.png'
import averageIcon from '../../resources/images/statistics/average.png'
import starIcon from '../../resources/images/statistics/star.png'
import longestDayIcon from '../../resources/images/statistics/bookworm.png'
import pageIcon from '../../resources/images/statistics/page.png'

const SummaryTable = ({ statistics }) => {
	const statisticsData = [
		{
			id: 1,
			icon: timeIcon,
			name: '총 독서시간',
			value: `${statistics.yearStatistics.totalReadTime != null && Math.round(statistics.yearStatistics.totalReadTime / 60, 2)}시간`,
		},
		{
			id: 2,
			icon: averageIcon,
			name: '하루 평균 독서시간',
			value: `${statistics.dayStatistics.averageReadTime != null && statistics.dayStatistics.averageReadTime}분`,
		},
		{
			id: 3,
			icon: bookIcon,
			name: '읽은 책',
			value: `${statistics.yearStatistics.totalReadBookCount != null && statistics.yearStatistics.totalReadBookCount}권`,
		},
		{
			id: 4,
			icon: starIcon,
			name: '평균별점',
			value: `${statistics.yearStatistics.averageStar != null && statistics.yearStatistics.averageStar}`,
		},
		{
			id: 2,
			icon: longestDayIcon,
			name: '가장 많이 읽은 날',
			value: `${statistics.dayStatistics.mostReadTime != null && statistics.dayStatistics.mostReadTime}분`,
		},
		{
			id: 2,
			icon: pageIcon,
			name: '총 읽은 페이지 수',
			value: `${statistics.yearStatistics.totalReadPage != null && statistics.yearStatistics.totalReadPage} P`,
		},
	]

	return (
		<table class='table table-hover mt-3'>
			<tbody>
				{statisticsData.map((stat) => {
					return (
						<tr>
							<th className='col-8 h5'>
								<img
									src={stat.icon}
									alt=''
									className='img-fluid me-3'
									style={{
										width: '30px',
										height: '30px',
										whiteSpace: 'nowrap',
									}}
								/>
								{stat.name}
							</th>

							<td className='col-4 h5'>{stat.value}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default SummaryTable
