import toast from 'react-hot-toast'
import { API_BASE_URL } from '../settings/urls/apiUrl'
import { getToken } from './user'

const MEMO_GET_ALL_API_URL = `${API_BASE_URL}/v1/memo/all/`
const MEMO_API_URL = `${API_BASE_URL}/v1/memo/`

const getMemoListOfBook = (bookId) => {
	const token = localStorage.getItem('login-token')

	return fetch(MEMO_GET_ALL_API_URL + bookId, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => res.json())
		.then((memoList) => {
			return memoList
		})
}

const addMemo = (memo, bookId) => {
	const token = localStorage.getItem('login-token')

	return fetch(MEMO_API_URL + bookId, {
		method: 'POST',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify(memo),
	})
		.then((res) => {
			if (res.status.toString().startsWith(2)) {
				toast.success('메모를 추가했어요')
				return true
			} else {
				throw new Error()
			}
		})
		.catch((e) => {
			toast.error('오류가 났어요 잠시 후 다시 시도해 주세요')
			return false
		})
}

const editMemo = (editedMemo) => {
	const MEMO_EDIT_API_URL = `${API_BASE_URL}/v1/memo/${editedMemo.memoId}`
	const token = getToken()

	return fetch(MEMO_EDIT_API_URL, {
		method: 'PUT',
		headers: { Authorization: token, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			page: editedMemo.page,
			content: editedMemo.content,
		}),
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

const deleteMemo = (memoId) => {
	const token = getToken()
	const DELETE_MEMO_API_URL = `${API_BASE_URL}/v1/memo/${memoId}`

	return fetch(DELETE_MEMO_API_URL, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()
		return status.startsWith(2)
	})
}

export { getMemoListOfBook, addMemo, editMemo, deleteMemo }
