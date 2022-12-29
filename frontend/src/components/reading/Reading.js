import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import Timer from './Timer'
import MemoCard from './MemoCard'
import QuotationCard from './QuotationCard'
import EndReadingSessionModal from './EndReadingSessionModal'
import PageProgressBar from '../common/PageProgressBar'
import MemoDetailModal from '../book/book-detail/MemoDetailModal'
import QuotationDetailModal from '../book/book-detail/QuotationDetailModal'
// Functions
import { getBookOfCurrentReadingSession, startReadingSession } from '../../functions/reading'
import { getIsTimerOn, turnOffTimer, turnOnTimer } from '../../functions/timer'
import { ERROR_MESSAGE } from '../../messages/commonMessages'
import { getMemoListOfBook } from '../../functions/memo'
import { getQuotationListOfBook } from '../../functions/quotation'
// Settings
import { INITIAL_FETCH_TIME } from '../../settings/settings'

const Reading = ({ readingSessionTime, setReadingSessionTime }) => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [initialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)

	const [book, setBook] = useState(null)

	const [isTimerOn, setIsTimerOn] = useState(getIsTimerOn())
	const toggleTimer = (state = !getIsTimerOn()) => {
		if (state) {
			setIsTimerOn(true)
			turnOnTimer()
		} else {
			setIsTimerOn(false)
			turnOffTimer()
		}
	}

	const [isEndReadingSessionModalOpen, setIsEndReadingSessionModalOpen] = useState(false)
	const showEndReadingSessionModal = () => {
		setIsEndReadingSessionModalOpen(true)
		toggleTimer(false)
	}

	const [memoList, setMemoList] = useState(null)
	const [isMemoDetailModalOpen, setIsMemoDetailModalOpen] = useState(false)
	const [selectedMemo, setSelectedMemo] = useState(null)

	const [quotationList, setQuotationList] = useState(null)
	const [isQuotationDetailModalOpen, setIsQuotationDetailModalOpen] = useState(false)
	const [selectedQuotation, setSelectedQuotation] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		getBookOfCurrentReadingSession()
			.then((book) => {
				if (book == null) {
					getMemoListOfBook(id).then((memos) => setMemoList(memos))
					getQuotationListOfBook(id).then((quotes) => setQuotationList(quotes))
					startReadingSession(id).then((res) => {
						if (res[0]) {
							toggleTimer(true)
							setBook(res[1])
						} else {
							setIsError(true)
							toast.error(ERROR_MESSAGE)
						}
					})
				} else {
					if (id != book.bookId) {
						toast.error('진행중인 독서활동이 있어요')
						navigate(`/reading/${book.bookId}`)
					}

					getMemoListOfBook(book.bookId).then((memos) => setMemoList(memos))
					getQuotationListOfBook(book.bookId).then((quotes) => setQuotationList(quotes))
					setBook(book)
				}
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='container' style={{ marginBottom: '100px' }}>
			<EndReadingSessionModal
				isShowingModal={isEndReadingSessionModalOpen}
				setIsShowingModal={setIsEndReadingSessionModalOpen}
				toggleTimer={toggleTimer}
				setTime={setReadingSessionTime}
				book={book}
			/>
			<MemoDetailModal
				isModalOpen={isMemoDetailModalOpen}
				setIsModalOpen={setIsMemoDetailModalOpen}
				memo={selectedMemo}
				setMemo={setSelectedMemo}
				memoList={memoList}
				setMemoList={setMemoList}
			/>
			<QuotationDetailModal
				isModalOpen={isQuotationDetailModalOpen}
				setIsModalOpen={setIsQuotationDetailModalOpen}
				quotation={selectedQuotation}
				setQuotation={setSelectedQuotation}
				quotationList={quotationList}
				setQuotationList={setQuotationList}
			/>

			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : isError ? (
				<Error />
			) : (
				book != null && (
					<div className='row justify-content-center text-center'>
						<div className='col-8 col-lg-6 col-xl-4'>
							<img src={book.cover} alt='' className='img-fluid rounded w-100 border' />
						</div>

						<div className='col-12 col-lg-12 col-xl-8 mt-5 mb-5'>
							<div className='mb-5'>
								<h2>{book.title}</h2>
								<h4 className='text-muted'>{book.author}</h4>

								<div className='row justify-content-center'>
									<div className='col-11 col-md-9'>
										<PageProgressBar book={book} />
									</div>
								</div>
							</div>

							<Timer time={readingSessionTime} />

							<div className='row justify-content-center mb-4 mt-4'>
								<div className='col-6 col-lg-4'>
									<Button variant='primary' className='w-100' onClick={() => showEndReadingSessionModal()}>
										독서 끝내기
									</Button>
								</div>

								<div className='col-6 col-lg-4'>
									<Button variant={isTimerOn ? 'danger' : 'success'} className='w-100' onClick={() => toggleTimer(!isTimerOn)}>
										{isTimerOn ? '잠시 정지' : '다시 시작'}
									</Button>
								</div>
							</div>

							<div className='row justify-content-center mb-4'>
								<div className='col-12 col-lg-10 mt-3'>
									<MemoCard
										book={book}
										memoList={memoList}
										setMemoList={setMemoList}
										setSelectedMemo={setSelectedMemo}
										setIsModalOpen={setIsMemoDetailModalOpen}
									/>
								</div>

								<div className='col-12 col-lg-10 mt-3'>
									<QuotationCard
										book={book}
										quotationList={quotationList}
										setQuotationList={setQuotationList}
										setSelectedQuotation={setSelectedQuotation}
										setIsModalOpen={setIsQuotationDetailModalOpen}
									/>
								</div>
							</div>
						</div>
					</div>
				)
			)}
		</div>
	)
}

export default Reading
