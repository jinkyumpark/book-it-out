import toast from 'react-hot-toast'
import { API_BASE_URL } from '../settings/urls/apiUrl'
import { getToken } from './user'

const getBookOfCurrentReadingSession = () => {
	const BOOK_CURRENT_READING_SESSION_API_URL = `${API_BASE_URL}/v1/book/current-reading-session`

	return fetch(BOOK_CURRENT_READING_SESSION_API_URL, {
		method: 'GET',
		headers: { Authorization: getToken() },
	})
		.then((res) => {
			if (res.status.toString().startsWith(2)) {
				return res.json()
			} else {
				return null
			}
		})
		.then((book) => {
			return book
		})
}

const startReadingSession = (bookId) => {
	const token = getToken()
	const START_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}/start`

	return fetch(START_READING_SESSION_API_URL, {
		method: 'POST',
		headers: { Authorization: token },
	})
		.then((res) => {
			const status = res.status.toString()
			if (!status.startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((book) => {
			if (book == null) {
				return [false, null]
			} else {
				return [true, book]
			}
		})
		.catch(() => {
			return [false, null]
		})
}

const endReadingSessionWithoutSaving = () => {
	const token = getToken()

	return fetch(`${API_BASE_URL}/v1/reading-session/not-saving`, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const endReadingSession = (book, endPage) => {
	const token = localStorage.getItem('login-token')
	const readingTime = Math.round(localStorage.getItem('reading-session-time'))
	const READING_SESSION_END_API_URL = `${API_BASE_URL}/v1/reading-session/${book.bookId}/end?page=${endPage}&time=${readingTime}`

	return fetch(encodeURI(READING_SESSION_END_API_URL), {
		method: 'PUT',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.status.toString().startsWith(2)) {
				localStorage.removeItem('reading-session-time')

				if (book.endPage == endPage) {
					toast.success('책을 다 읽으셨어요! 별점, 감상, 요약을 추가해 보세요!')
				} else {
					toast.success(data.message)
				}

				return true
			} else {
				toast.error(data.message)
				return false
			}
		})
}

const getAllReadingSessionOfBook = (bookId) => {
	const token = getToken()
	const ALL_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}`

	return fetch(ALL_READING_SESSION_API_URL, { method: 'GET', headers: { Authorization: token } })
		.then((res) => res.json())
		.then((readingSessionList) => {
			return readingSessionList
		})
}

const addReadingSession = (bookId, year, month, day, startPage, endPage, readTime) => {
	const token = getToken()
	const ADD_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${bookId}`

	return fetch(ADD_READING_SESSION_API_URL, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			startDate: `${year}-${month}-${day}`,
			startPage: startPage,
			endPage: endPage,
			readTime: readTime,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const editReadingSession = (editedReadingSession) => {
	const EDIT_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${editedReadingSession.readingSessionId}/all`
	const token = getToken()

	return fetch(EDIT_READING_SESSION_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const deleteReadingSession = (readingSessionId) => {
	const token = getToken()
	const DELETE_READING_SESSION_API_URL = `${API_BASE_URL}/v1/reading-session/${readingSessionId}`

	return fetch(DELETE_READING_SESSION_API_URL, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

export {
	startReadingSession,
	endReadingSession,
	endReadingSessionWithoutSaving,
	getAllReadingSessionOfBook,
	addReadingSession,
	deleteReadingSession,
	editReadingSession,
	getBookOfCurrentReadingSession,
}
