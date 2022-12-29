import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Toaster, useToasterStore, toast } from 'react-hot-toast'
// Components
import Topnav from './components/common/Topnav'
import ReadingButton from './components/common/ReadingButton'
import FloatingAddButton from './components/common/FloatingAddButton'
import Login from './components/user/Login'
import Join from './components/user/Join'
import Settings from './components/user/Settings'
import Main from './components/statistics/Main'
import BookList from './components/book/BookList'
import BookDetail from './components/book/book-detail/BookDetail'
import BookAddForm from './components/book/BookAddForm'
import BookEditForm from './components/book/BookEditForm'
import Reading from './components/reading/Reading'
import ReadingNoId from './components/reading/ReadingNoId'
import Statistics from './components/statistics/Statistics'
import Introduction from './components/info/Introduction'
import Faq from './components/info/Faq'
import Qna from './components/info/Qna'
import Search from './components/search/Search'
import Goal from './components/statistics/goal/Goal'
// Functions
import { getToken } from './functions/user'
import { getTimerSecond, getIsTimerOn, updateTimerSecond, updateReadingTimeDate } from './functions/timer'
// Settings
import { REDIRECT_EXCLUDE_URL } from './settings/urls/localUrl'
import { TOAST_LIMIT } from './settings/settings'

function App() {
	const location = useLocation()
	const navigate = useNavigate()
	const [token, setToken] = useState(getToken())

	const [readingSessionTime, setReadingSessionTime] = useState(Math.round(getTimerSecond()))
	useEffect(() => {
		const interval = setInterval(() => {
			if (getIsTimerOn()) {
				const currentTime = getTimerSecond()
				updateTimerSecond(currentTime == null ? 0 : Number(currentTime) + 1)
				setReadingSessionTime(Math.round(Number(currentTime)))
			} else {
				updateReadingTimeDate()
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		if (token === '' || token == null) {
			!REDIRECT_EXCLUDE_URL.some((url) => location.pathname.includes(url)) && navigate('/login')
		} else {
			if (location.pathname.startsWith('/login') || location.pathname.startsWith('/join')) {
				navigate('/')
			}
		}
	}, [location.pathname])

	const { toasts } = useToasterStore()
	useEffect(() => {
		toasts
			.filter((t) => t.visible)
			.filter((_, i) => i >= TOAST_LIMIT)
			.forEach((t) => toast.dismiss(t.id))
	}, [toasts])

	return (
		<div className='App'>
			<div>
				<Toaster />
			</div>

			<Topnav token={token} setToken={setToken} />

			<div style={{ marginBottom: '80px' }} />

			<Routes>
				<Route path='/introduction' element={<Introduction />} />
				<Route path='/qna' element={<Qna />} />
				<Route path='/faq' element={<Faq />} />

				<Route path='/login' element={<Login setToken={setToken} />} />
				<Route path='/join' element={<Join />} />
				<Route path='/settings' element={<Settings />} />

				<Route path='/' element={<Main token={token} />} />
				<Route path='/book/:range' element={<BookList />} />
				<Route path='/book/:range/:rangeDetail' element={<BookList />} />
				<Route path='/book/detail/:id' element={<BookDetail />} />
				<Route path='book/add' element={<BookAddForm token={token} />} />
				<Route path='/book/edit/:id' element={<BookEditForm token={token} />} />

				<Route path='/reading' element={<ReadingNoId />} />
				<Route
					path='/reading/:id'
					element={<Reading readingSessionTime={readingSessionTime} setReadingSessionTime={setReadingSessionTime} />}
				/>

				<Route path='/statistics' element={<Statistics />} />
				<Route path='/statistics/goal' element={<Goal />} />

				<Route path='/search/:key' element={<Search />} />
			</Routes>

			{token !== '' && (
				<>
					{!location.pathname.startsWith('/book/add') && <FloatingAddButton />}
					<ReadingButton time={readingSessionTime} />
				</>
			)}
		</div>
	)
}

export default App
