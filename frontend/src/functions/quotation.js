import toast from 'react-hot-toast'
import { API_BASE_URL } from '../settings/urls/apiUrl'
import { getToken } from './user'

const QUOTATION_API_URL = `${API_BASE_URL}/v1/quotation/`
const QUOTATION_ALL_API_URL = `${API_BASE_URL}/v1/quotation/all/`

const getQuotationListOfBook = (bookId) => {
	const token = localStorage.getItem('login-token')

	return fetch(QUOTATION_ALL_API_URL + bookId, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((quotationList) => {
			return quotationList
		})
}

const addQuotation = (bookId, quotation) => {
	const token = getToken()

	return fetch(QUOTATION_API_URL + bookId, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify(quotation),
	}).then((res) => {
		if (res.status.toString().startsWith(2)) {
			toast.success('인용을 추가했어요')
			return true
		} else {
			toast.error('오류가 났어요 잠시후 다시 시도해 주세요')
			return false
		}
	})
}

const editQuotation = (editedQuotation) => {
	const QUOTATION_EDIT_API_URL = `${API_BASE_URL}/v1/quotation/${editedQuotation.quotationId}`
	const token = getToken()

	return fetch(QUOTATION_EDIT_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			page: editedQuotation.page,
			content: editedQuotation.content,
			fromWho: editedQuotation.fromWho,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const deleteQuotation = (quotationId) => {
	const token = getToken()
	const DELETE_QUOTATION_API_URL = `${API_BASE_URL}/v1/quotation/${quotationId}`

	return fetch(DELETE_QUOTATION_API_URL, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

export { getQuotationListOfBook, addQuotation, editQuotation, deleteQuotation }
