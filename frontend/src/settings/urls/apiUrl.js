// const API_BASE_URL = `https://api.jinkyumpark.com`
const API_BASE_URL = `http://localhost`

const LOGIN_API_URL = `${API_BASE_URL}/login`
const JOIN_API_URL = `${API_BASE_URL}/v1/join`

const LAST_BOOK_API_URL = `${API_BASE_URL}/v1/book/last`
const STATISTICS_SUMMARY_URL = `${API_BASE_URL}/v1/statistics/year/2022`

const ADD_BOOK_API_URL = `${API_BASE_URL}/v1/book`
const GIVE_UP_BOOK_API_URL = `${API_BASE_URL}/v1/book/give-up/`
const BOOK_DELETE_API_URL = `${API_BASE_URL}/v1/book/`

const READING_SESSION_CURRENT_API_URL = `${API_BASE_URL}/v1/reading-session/current`

export {
	API_BASE_URL,
	JOIN_API_URL,
	LOGIN_API_URL,
	LAST_BOOK_API_URL,
	STATISTICS_SUMMARY_URL,
	ADD_BOOK_API_URL,
	READING_SESSION_CURRENT_API_URL,
	GIVE_UP_BOOK_API_URL,
	BOOK_DELETE_API_URL,
}
