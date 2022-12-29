import { API_BASE_URL } from '../settings/urls/apiUrl'
import { getToken } from './user'
import toast from 'react-hot-toast'

// Messages
const GOAL_ADD_SUCCESS_MESSAGE = `목표를 추가했어요`
const GOAL_ADD_FAIL_MESSAGE = `오류가 났어요. 잠시 후 다시 시도해 주세요`
const GOAL_DELETE_SUCCESS_MESSAGE = `목표를 지웠어요`
const GOAL_DELETE_FAIL_MESSAGE = `오류가 났어요. 잠시 후 다시 시도해 주세요`

const getGoalList = () => {
	const GOAL_LIST_API_URL = `${API_BASE_URL}/v1/goal`
	const token = getToken()

	return fetch(GOAL_LIST_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				return []
			}

			return res.json()
		})
		.then((goalList) => {
			return goalList
		})
}

const getGoal = (year) => {
	const GOAL_API_URL = `${API_BASE_URL}/v1/goal/${year}`
	const token = localStorage.getItem('login-token')

	return fetch(GOAL_API_URL, {
		method: 'GET',
		headers: { Authorization: token },
	})
		.then((res) => {
			if (!res.status.toString().startsWith(2)) {
				throw new Error()
			}

			return res.json()
		})
		.then((goal) => {
			return goal
		})
		.catch(() => {
			return null
		})
}

const addGoal = (year, goal) => {
	const ADD_GOAL_API_URL = `${API_BASE_URL}/v1/goal?year=${year}&goal=${goal}`
	const token = getToken()

	return fetch(ADD_GOAL_API_URL, {
		method: 'POST',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()

		if (status.startsWith(2)) {
			toast.success(GOAL_ADD_SUCCESS_MESSAGE)
			return true
		} else {
			toast.error(GOAL_ADD_FAIL_MESSAGE)
			return false
		}
	})
}

const deleteGoal = (year) => {
	const DELETE_GOAL_API_URL = `${API_BASE_URL}/v1/goal/${year}`
	const token = getToken()

	return fetch(DELETE_GOAL_API_URL, {
		method: 'DELETE',
		headers: { Authorization: token },
	}).then((res) => {
		const status = res.status.toString()

		if (status.startsWith(2)) {
			toast.success(GOAL_DELETE_SUCCESS_MESSAGE)
			return true
		} else {
			toast.error(GOAL_DELETE_FAIL_MESSAGE)
			return false
		}
	})
}

export { getGoal, addGoal, deleteGoal, getGoalList }
