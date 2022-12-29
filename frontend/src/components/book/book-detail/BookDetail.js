import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Button, ProgressBar } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { AiFillStar as StarFillIcon, AiOutlineStar as StarIcon } from 'react-icons/ai'
// Components
import Loading from '../../common/Loading'
import NoContent from '../../common/NoContent'
import BookInfoIcon from '../book-info/BookInfoIcon'
import PageProgressBar from '../../common/PageProgressBar'
import AddRatingModal from './AddRatingModal'
import AddSummaryModal from './AddSummaryModal'
import AddReviewModal from './AddReviewModal'
import AddButton from '../../common/AddButton'
import AddReadingSessionModal from './AddReadingSessionModal'
import ReadingSessionDetailModal from './ReadingSessionDetailModal'
import AddMemoModal from './AddMemoModal'
import AddQuotationModal from './AddQuotationModal'
// Images
import defaultBookCover from '../../../resources/images/common/book.png'
// Functions
import { deleteBook, getBook, giveUpBook, unGiveUpBook } from '../../../functions/book'
import { getToken } from '../../../functions/user'
// Urls
import { getMemoListOfBook } from '../../../functions/memo'
import { getQuotationListOfBook } from '../../../functions/quotation'
import { getAllReadingSessionOfBook } from '../../../functions/reading'
// Settings
import { CATEGORY_INFO, FORM_INFO, LANGUAGE_INFO, SOURCE_INFO } from '../book-info/bookInfoEnum'
import { MEMO_BACKGROUND_COLOR } from '../../../settings/color'
import MemoDetailModal from './MemoDetailModal'
import QuotationDetailModal from './QuotationDetailModal'
import { INITIAL_FETCH_TIME } from '../../../settings/settings'

const BookDetail = () => {
	const { id } = useParams()

	const [loading, setLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)

	const [book, setBook] = useState(null)
	const [memo, setMemo] = useState(null)
	const [quotation, setQuotation] = useState(null)
	const [readingSession, setReadingSession] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		Promise.all([
			getBook(id).then((book) => setBook(book)),
			getMemoListOfBook(id).then((memoList) => setMemo(memoList)),
			getQuotationListOfBook(id).then((quotationList) => setQuotation(quotationList)),
			getAllReadingSessionOfBook(id).then((readingSessionList) => setReadingSession(readingSessionList)),
		]).finally(() => {
			setLoading(false)
			setInitialFetch(false)
		})
	}, [])

	const [isRatingModalOpen, setIsRatingModalOpen] = useState(false)
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
	const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false)

	const [isAddReadingSessionModalOpen, setIsAddReadingSessionModalOpen] = useState(false)
	const [isAddMemoModalOpen, setIsAddMemoModalOpen] = useState(false)
	const [isAddQuotationModalOpen, setIsAddQuotationModalOpen] = useState(false)

	const [isReadingSessionDetailModalOpen, setIsReadingSessionDetailModalOpen] = useState(false)
	const [isMemoDetailModalOpen, setIsMemoDetailModalOpen] = useState(false)
	const [isQuotationDetailModalOpen, setIsQuotationDetailModalOpen] = useState(false)

	const [selectedReadingSession, setSelectedReadingSession] = useState(null)
	const [selectedMemo, setSelectedMemo] = useState(null)
	const [seletedQuotation, setSelectedQuotation] = useState(null)

	const getTotalReadTIme = (readingSessionList) => {
		return readingSessionList.map((r) => r.readTime).reduce((pre, cur) => pre + cur, 0)
	}

	const getRemainReadTime = (book, readingSessionList) => {
		const averageReadTimePerPage = Number(getTotalReadTIme(readingSessionList)) / book.currentPage
		const bookRemainPage = book.endPage - book.currentPage

		return Math.round(bookRemainPage * averageReadTimePerPage)
	}

	return (
		<div className='container-xl'>
			{initialFetch ? (
				<></>
			) : loading ? (
				<Loading message='' />
			) : book == null ? (
				<NoContent message='책이 없어요 다시 확인해 주세요' />
			) : (
				<div className='row text-center mt-5' style={{ marginBottom: '150px' }}>
					<AddRatingModal isModalOpen={isRatingModalOpen} setIsModalOpen={setIsRatingModalOpen} book={book} setBook={setBook} />
					<AddReviewModal isModalOpen={isReviewModalOpen} setIsModalOpen={setIsReviewModalOpen} book={book} setBook={setBook} />
					<AddSummaryModal isModalOpen={isSummaryModalOpen} setIsModalOpen={setIsSummaryModalOpen} book={book} setBook={setBook} />
					<AddReadingSessionModal
						isModalOpen={isAddReadingSessionModalOpen}
						setIsModalOpen={setIsAddReadingSessionModalOpen}
						book={book}
						setBook={setBook}
						readingSessionList={readingSession}
						setReadingSessionList={setReadingSession}
					/>
					<AddMemoModal
						isModalOpen={isAddMemoModalOpen}
						setIsModalOpen={setIsAddMemoModalOpen}
						book={book}
						memoList={memo}
						setMemoList={setMemo}
					/>
					<AddQuotationModal
						isModalOpen={isAddQuotationModalOpen}
						setIsModalOpen={setIsAddQuotationModalOpen}
						book={book}
						quotationList={quotation}
						setQuotationList={setQuotation}
					/>
					<ReadingSessionDetailModal
						isModalOpen={isReadingSessionDetailModalOpen}
						setIsModalOpen={setIsReadingSessionDetailModalOpen}
						readingSession={selectedReadingSession}
						setReadingSession={setSelectedReadingSession}
						readingSessionList={readingSession}
						setReadingSessionList={setReadingSession}
						book={book}
						setBook={setBook}
					/>
					<MemoDetailModal
						isModalOpen={isMemoDetailModalOpen}
						setIsModalOpen={setIsMemoDetailModalOpen}
						memo={selectedMemo}
						setMemo={setSelectedMemo}
						memoList={memo}
						setMemoList={setMemo}
					/>
					<QuotationDetailModal
						isModalOpen={isQuotationDetailModalOpen}
						setIsModalOpen={setIsQuotationDetailModalOpen}
						quotation={seletedQuotation}
						setQuotation={setSelectedQuotation}
						quotationList={quotation}
						setQuotationList={setQuotation}
					/>

					<div className='col-12 col-md-4 mb-5'>
						<BookCover book={book} />
						<BookButtons
							book={book}
							setIsRatingModalOpen={setIsRatingModalOpen}
							setIsReviewModalOpen={setIsReviewModalOpen}
							setIsSummaryModalOpen={setIsSummaryModalOpen}
						/>
					</div>

					<div className='col-12 col-md-8 mt-0 mt-md-5'>
						<BookDescription book={book} />

						{book.summary != null && (
							<Card className='mt-2'>
								<Card.Body>
									<h4>✅ 요약</h4>

									{book.summary}
								</Card.Body>
							</Card>
						)}

						{book.review != null && (
							<Card className='mt-2'>
								<Card.Body>
									<h4>💬 감상</h4>

									{book.review}
								</Card.Body>
							</Card>
						)}

						<Card className='mt-3'>
							{book.currentPage !== 0 && (
								<>
									<div
										className='bg-secondary text-white d-none d-xl-block'
										style={{
											left: '2.5%',
											width: `100px`,
											height: `30px`,
											borderRadius: '5px',
											position: 'absolute',
											top: '15px',
										}}>
										총 {getTotalReadTIme(readingSession)}분
									</div>
								</>
							)}

							{book.currentPage !== 0 && book.currentPage !== book.endPage && (
								<>
									<div
										className='bg-secondary text-white d-block d-xl-none'
										style={{
											left: '2.5%',
											width: `100px`,
											height: `30px`,
											borderRadius: '5px',
											position: 'absolute',
											top: '15px',
										}}>
										앞으로 {getRemainReadTime(book, readingSession)}분
									</div>

									<div
										className='bg-secondary text-white d-none d-xl-block'
										style={{
											left: '15%',
											width: `100px`,
											height: `30px`,
											borderRadius: '5px',
											position: 'absolute',
											top: '15px',
										}}>
										앞으로 {getRemainReadTime(book, readingSession)}분
									</div>
								</>
							)}

							<AddButton
								size='30'
								color='success'
								onClick={() => {
									setIsAddReadingSessionModalOpen(true)
								}}
							/>

							<Card.Body>
								<h4>🤓 독서활동</h4>

								<div className='row justify-content-center mt-4'>
									<div className='col-12'>
										{readingSession == null || readingSession.length === 0 ? (
											<NoContent style={{ width: '150px' }} />
										) : (
											<ReadingSessionList
												readingSessionList={readingSession}
												book={book}
												setIsReadingSessionModalOpen={setIsReadingSessionDetailModalOpen}
												setSelectedReadingSession={setSelectedReadingSession}
											/>
										)}
									</div>
								</div>
							</Card.Body>
						</Card>

						<BookRecordCard
							displayLabel='📋 메모'
							record={memo}
							ListComponent={
								<MemoList memoList={memo} setIsMemoDetailModalOpen={setIsMemoDetailModalOpen} setSelectedMemo={setSelectedMemo} />
							}
							setIsAddModalOpen={setIsAddMemoModalOpen}
						/>

						<BookRecordCard
							displayLabel='🗣️ 인용'
							record={quotation}
							ListComponent={
								<QuotationList
									quotationList={quotation}
									setIsQuotationDetailModalOpen={setIsQuotationDetailModalOpen}
									setSelectedQuotation={setSelectedQuotation}
								/>
							}
							setIsAddModalOpen={setIsAddQuotationModalOpen}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

const BookCover = ({ book }) => {
	return (
		<div className='row justify-content-center'>
			<div className='col-8 col-md-12 col-lg-12'>
				<img
					src={book.cover === '' ? defaultBookCover : book.cover}
					alt=''
					className={`img-fluid rounded  ${book.cover !== '' && 'border'}`}
				/>
			</div>
		</div>
	)
}

const BookButtons = ({ book, setIsRatingModalOpen, setIsReviewModalOpen, setIsSummaryModalOpen }) => {
	const navigate = useNavigate()
	const BOOK_EDIT_URL = `/book/edit/${book.bookId}`
	const token = getToken()

	return (
		<div className='row mt-3'>
			<div className='col-6'>
				<Button variant='danger' className='w-100' onClick={() => navigate(BOOK_EDIT_URL)}>
					수정하기
				</Button>
			</div>

			<div className='col-6'>
				<Button
					variant='danger'
					className='w-100'
					onClick={() => {
						const confirm = window.confirm('정말 책을 삭제할까요?')

						if (confirm) {
							deleteBook(book.bookId, token, navigate).then((success) => {
								if (success) {
									toast.success('책을 삭제 했어요')
									navigate('/book/not-done')
								} else {
									toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
								}
							})
						}
					}}>
					삭제하기
				</Button>
			</div>

			{book.currentPage === book.endPage ? (
				<>
					{book.rating == null ? (
						<div className='col-12 mt-3'>
							<Button variant='warning' className='w-100' onClick={() => setIsRatingModalOpen(true)}>
								별점 추가하기
							</Button>
						</div>
					) : (
						<>
							{
								<div className='row justify-content-center mt-4'>
									{[1, 2, 3, 4, 5].map((rate) => {
										return (
											<div className='col-2 text-center text-warning'>
												<h1>{rate <= book.rating ? <StarFillIcon /> : <StarIcon />}</h1>
											</div>
										)
									})}
								</div>
							}
						</>
					)}

					{book.review == null ? (
						<div className='col-12 mt-3'>
							<Button className='w-100' onClick={() => setIsReviewModalOpen(true)}>
								감상 추가하기
							</Button>
						</div>
					) : (
						<></>
					)}

					{book.summary == null ? (
						<div className='col-12 mt-3'>
							<Button className='w-100' onClick={() => setIsSummaryModalOpen(true)}>
								요약 추가하기
							</Button>
						</div>
					) : (
						<></>
					)}
				</>
			) : book.currentPage < book.endPage && !book.isGiveUp ? (
				<>
					<div className='col-12 mt-3'>
						<Button variant='primary' className='w-100' onClick={() => navigate(`/reading/${book.bookId}`)}>
							이어서 읽기
						</Button>
					</div>

					<div className='col-12 mt-3'>
						<Button
							variant='danger'
							className='w-100'
							onClick={() => {
								const confirm = window.confirm('책을 포기할까요?')

								if (confirm) {
									giveUpBook(book.bookId, token, navigate).then((success) => {
										if (success) {
											toast.success('책을 포기했어요. 마음이 언제든지 다시 시작하실 수 있어요!')
											navigate('/book/give-up')
										} else {
											toast.error('오류가 났어요 다시 시도해 주세요')
										}
									})
								}
							}}>
							포기하기
						</Button>
					</div>
				</>
			) : (
				<>
					<div className='col-12 mt-3'>
						<Button
							variant='success'
							className='w-100'
							onClick={() => {
								const confirm = window.confirm('책을 다시 읽을까요?')

								if (confirm) {
									unGiveUpBook(book.bookId).then((success) => {
										if (success) {
											toast.success('책을 다시 읽을 수 있어요')
											navigate('/book/not-done')
										} else {
											toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
										}
									})
								}
							}}>
							다시 읽기 (포기 취소)
						</Button>
					</div>
				</>
			)}
		</div>
	)
}

const BookDescription = ({ book }) => {
	const infoIconStyle = `col-4 col-lg-3 col-xl-6 align-self-center`

	return (
		<>
			<div className='row mb-4'>
				<h2>{book.title}</h2>
				<h4 className='text-muted'>{book.author == null ? '-' : book.author}</h4>

				<div className='row justify-content-center'>
					<div className='col-12 col-lg-11'>
						<PageProgressBar book={book} />
					</div>
				</div>
			</div>

			<div className='row justify-content-center'>
				<div className='col-6 col-xl-2 mb-2'>
					<a href={`/book/all?language=${book.language}`} className='text-decoration-none text-black'>
						<BookInfoIcon infoType={LANGUAGE_INFO} infoData={book.language} responsiveImageStyle={infoIconStyle} />
					</a>
				</div>
				<div className='col-6 col-xl-2 mb-2'>
					<a href={`/book/all?category=${book.category}`} className='text-decoration-none text-black'>
						<BookInfoIcon infoType={CATEGORY_INFO} infoData={book.category} responsiveImageStyle={infoIconStyle} />
					</a>
				</div>
				<div className='col-6 col-xl-2 mb-2'>
					<a href={`/book/all?form=${book.form}`} className='text-decoration-none text-black'>
						<BookInfoIcon infoType={FORM_INFO} infoData={book.form} responsiveImageStyle={infoIconStyle} />
					</a>
				</div>
				<div className='col-6 col-xl-2 mb-2'>
					<a href={`/book/all?source=${book.source}`} className='text-decoration-none text-black'>
						<BookInfoIcon infoType={SOURCE_INFO} infoData={book.source} responsiveImageStyle={infoIconStyle} />
					</a>
				</div>
			</div>
		</>
	)
}

const BookRecordCard = ({ displayLabel, record, ListComponent, setIsAddModalOpen }) => {
	return (
		<Card className='mt-3'>
			<AddButton
				size='30'
				color='success'
				onClick={() => {
					setIsAddModalOpen(true)
				}}
			/>

			<Card.Body>
				<h4>{displayLabel}</h4>

				<div className='row justify-content-center mt-4'>
					<div className='col-12'>{record == null || record.length === 0 ? <NoContent style={{ width: '150px' }} /> : ListComponent}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const MemoList = ({ memoList, setIsMemoDetailModalOpen, setSelectedMemo }) => {
	return (
		<div className='row row-eq-height'>
			{memoList.map((memo) => {
				return (
					<div className='col-12 mb-2'>
						<Card
							style={{ backgroundColor: MEMO_BACKGROUND_COLOR }}
							onClick={() => {
								setIsMemoDetailModalOpen(true)
								setSelectedMemo(memo)
							}}>
							<Card.Header>
								<h6 className='mt-1'>{memo.page}P</h6>
							</Card.Header>

							<Card.Body>
								<div className='row'>
									<div className='text-start'>{memo.content}</div>
								</div>
							</Card.Body>
						</Card>
					</div>
				)
			})}
		</div>
	)
}

const QuotationList = ({ quotationList, setIsQuotationDetailModalOpen, setSelectedQuotation }) => {
	return (
		<>
			{quotationList.map((quotation) => {
				return (
					<Card
						className='mb-3'
						onClick={() => {
							setSelectedQuotation(quotation)
							setIsQuotationDetailModalOpen(true)
						}}>
						<Card.Body>
							<div className='row'>
								<div className='col-3 col-md-2'>{quotation.page == null ? '-' : `${quotation.page} P`}</div>
								<div className='col-9 col-md-10 text-start'>{quotation.content}</div>
							</div>
						</Card.Body>

						<Card.Footer>{quotation.from_who == null || quotation.from_who === '' ? '-' : quotation.from_who}</Card.Footer>
					</Card>
				)
			})}
		</>
	)
}

const ReadingSessionList = ({ readingSessionList, book, setIsReadingSessionModalOpen, setSelectedReadingSession }) => {
	return (
		<div className='row row-eq-height'>
			{readingSessionList
				.filter((r) => r.endPage != null)
				.map((readingSession) => {
					return (
						<div className='col-12 col-lg-6'>
							<Card
								className='mb-2'
								onClick={() => {
									setIsReadingSessionModalOpen(true)
									setSelectedReadingSession(readingSession)
								}}>
								<Card.Body>
									<div className='row justify-content-center'>
										<div className='col-8 col-md-6'>
											🗓️{' '}
											{readingSession.startTime
												.substring(2, readingSession.startTime.indexOf('T'))
												.replace('-', '년 ')
												.replace('-', '월 ')
												.concat('일')}
										</div>
										<div className='col-4 col-lg-6'>⏰ {readingSession.readTime}분</div>
										<div className='col-6 mt-3'>
											📃 {readingSession.startPage}p - {readingSession.endPage}p
										</div>
										<ProgressBar className='p-0'>
											<ProgressBar
												style={{ backgroundColor: 'rgb(234, 236, 239)' }}
												now={(readingSession.startPage / book.endPage) * 100}
											/>
											<ProgressBar
												now={(readingSession.endPage / book.endPage) * 100 - (readingSession.startPage / book.endPage) * 100}
												label={`${Math.round(
													(readingSession.endPage / book.endPage) * 100 - (readingSession.startPage / book.endPage) * 100
												)}%`}
											/>
										</ProgressBar>
									</div>
								</Card.Body>
							</Card>
						</div>
					)
				})}
		</div>
	)
}

export default BookDetail
