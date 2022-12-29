import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Loading from '../common/Loading'
// Functions
import { getToken } from '../../functions/user'
// Settings
import { API_BASE_URL } from '../../settings/urls/apiUrl'

const ReadingNoId = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const BOOK_CURRENT_READING_SESSION_API_URL = `${API_BASE_URL}/v1/book/current-reading-session`

		fetch(BOOK_CURRENT_READING_SESSION_API_URL, {
			method: 'GET',
			headers: { Authorization: getToken() },
		})
			.then((res) => {
				if (res.status.toString().startsWith(2)) {
					return res.json()
				} else {
					navigate('/book/not-done/all')
				}
			})
			.then((book) => {
				navigate(`/reading/${book.bookId}`)
			})
	}, [])

	return (
		<div className='container'>
			<Loading />
		</div>
	)
}

export default ReadingNoId
