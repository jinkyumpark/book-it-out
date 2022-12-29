import { API_BASE_URL, GIVE_UP_BOOK_API_URL, ADD_BOOK_API_URL, BOOK_DELETE_API_URL, LAST_BOOK_API_URL } from '../settings/urls/apiUrl'
import toast from 'react-hot-toast'
import { getToken } from './user'

const getBookList = (range) => {
	const token = getToken()

	return fetch(`${API_BASE_URL}/v1/book/all/${range}`, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				return null
			}
			return res.json()
		})
		.then((bookList) => {
			return bookList
		})
}

const getBook = (bookId) => {
	const BOOK_DETAIL_API_URL = `${API_BASE_URL}/v1/book/${bookId}`
	const token = getToken()

	return fetch(BOOK_DETAIL_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				return null
			}
			return res.json()
		})
		.then((book) => {
			return book
		})
}

const getLastBook = () => {
	const token = localStorage.getItem('login-token')

	return fetch(LAST_BOOK_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((book) => {
			return book
		})
		.catch(() => {
			return null
		})
}

const addBook = (e, token, navigate, title, author, cover, language, endPage, category, form, source, isSharing) => {
	e.preventDefault()

	if (endPage == 0) {
		toast.error('0은 페이지로 입력할 수 없어요')
		return
	}

	fetch(ADD_BOOK_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			title: title,
			author: author,
			cover: cover,
			language: language,

			endPage: endPage,
			category: category,

			form: form,
			source: source,

			isSharing: isSharing,
		}),
	})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			if (data.status.toString().startsWith(2)) {
				toast.success(data.message)
				navigate('/book/not-done/all')
			}
		})
		.catch((e) => {
			console.log(e)
		})
}

const editBook = (book) => {
	const BOOK_EDIT_API_URL = `${API_BASE_URL}/v1/book/${book.bookId}`
	const token = getToken()

	return fetch(BOOK_EDIT_API_URL, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify({
			title: book.title,
			author: book.author,
			language: book.language,
			category: book.category,
			endPage: book.endPage,
			form: book.form,
			soruce: book.source,
			cover: book.cover,
			isSharing: book.isSharing,
		}),
	}).then((res) => {
		if (res.status.toString().startsWith(2)) {
			return true
		} else {
			return false
		}
	})
}

const giveUpBook = (bookId) => {
	const token = getToken()

	return fetch(GIVE_UP_BOOK_API_URL + bookId, {
		method: 'PUT',
		headers: { Authorization: token },
	}).then((res) => {
		if (res.status.toString().startsWith(2)) {
			toast.success('책을 포기했어요. 마음이 언제든지 다시 시작하실 수 있어요!')
			return true
		} else {
			return false
		}
	})
}

const unGiveUpBook = (bookId) => {
	const token = getToken()
	const UN_GIVEUP_BOOK_API_URL = `${API_BASE_URL}/v1/book/un-give-up/${bookId}`

	return fetch(UN_GIVEUP_BOOK_API_URL, {
		method: 'PUT',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()

		if (status.startsWith(2)) {
			return true
		} else {
			return false
		}
	})
}

const deleteBook = (bookId, token, navigate) => {
	return fetch(BOOK_DELETE_API_URL + bookId, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		return res.status.toString().startsWith(2)
	})
}

const addRating = (bookId, rating) => {
	const token = getToken()
	const ADD_RATING_API_URL = `${API_BASE_URL}/v1/book/${bookId}`

	return fetch(ADD_RATING_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			rating: rating,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const addReview = (bookId, review) => {
	const token = getToken()
	const ADD_REVIEW_API_URL = `${API_BASE_URL}/v1/book/${bookId}`

	return fetch(ADD_REVIEW_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			review: review,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const addSummary = (bookId, summary) => {
	const token = getToken()
	const ADD_SUMMARY_API_URL = `${API_BASE_URL}/v1/book/${bookId}`

	return fetch(ADD_SUMMARY_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			summary: summary,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

export { giveUpBook, getLastBook, getBookList, addBook, deleteBook, getBook, editBook, unGiveUpBook, addRating, addReview, addSummary }
