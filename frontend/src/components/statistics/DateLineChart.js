import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

const DateLineChart = ({ startDate, endDate = Date.now(), data, duration = 14 }) => {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

	const getDifferenceBetweenDatesInDays = (date1, date2) => {
		const differenceInTime = Math.abs(date2 - date1)
		const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 60 * 24))
		return differenceInDays
	}

	return (
		<Line
			options={{
				plugins: { legend: { display: false } },
				scales: { y: { min: 0 } },
			}}
			data={{
				labels: [
					...Array.from({ length: duration }, (_, i) => {
						let day = new Date(startDate).setDate(new Date(startDate).getDate() + i + 1)
						return new Date(day).getDate() + '일'
					}),
				],

				datasets: [
					{
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: data,
					},
				],
			}}
		/>
	)
}

export default DateLineChart
