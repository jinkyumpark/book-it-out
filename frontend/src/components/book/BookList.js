import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button, Card, Pagination, Tab, Tabs } from 'react-bootstrap'
// Components
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
import HorizontalBookView from './HorizontalBookView'
// Images
import kimchiImage from '../../resources/images/general/kimchi.png'
import bookShelfImage from '../../resources/images/common/bookshelf.png'
// Functions
import { deleteBook, getBookList, giveUpBook, unGiveUpBook } from '../../functions/book'

const BookList = () => {
	const { range } = useParams()
	const { rangeDetail } = useParams()

	const navigate = useNavigate()
	const location = useLocation()

	const [initalFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	const [bookList, setBookList] = useState(null)

	useEffect(() => {
		setTimeout(() => setInitialFetch(false), 5000)

		getBookList(range === 'not-done' ? (rangeDetail === 'all' ? range : rangeDetail) : range)
			.then((list) => {
				console.log(list)
				if (list == null) {
					setError(true)
				} else {
					setBookList(list)
				}
			})
			.finally(() => {
				setInitialFetch(false)
				setIsLoading(false)
			})
	}, [location.pathname])

	return (
		<div className='container-lg'>
			{initalFetch ? (
				<></>
			) : isLoading ? (
				<Loading message='잠시만 기다려 주세요' />
			) : error || bookList == null ? (
				<Error />
			) : (
				<>
					{range === 'not-done' ? (
						<Tabs
							className='mb-3'
							id='controlled-tab-example'
							fill
							defaultActiveKey={rangeDetail}
							onSelect={(key) => {
								navigate(`/book/not-done/${key}`)
							}}>
							<Tab eventKey='all' title='전체'>
								{bookList.length == 0 ? (
									<NoContent
										message={
											range === 'not-done'
												? `아직 읽지 않은 책이 없어요. 지금 바로 등록해 보세요!`
												: range === 'done'
												? `아직 다 읽은 책이 없어요`
												: range === 'give-up'
												? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
												: `텅 비어 있어요`
										}
										icon={range === 'give-up' ? kimchiImage : bookShelfImage}
									/>
								) : (
									<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
								)}
							</Tab>
							<Tab eventKey='not-started' title='시작 안 함'>
								{bookList.length == 0 ? (
									<NoContent
										message={
											range === 'not-done'
												? rangeDetail === 'all'
													? `등록한 책이 없어요`
													: rangeDetail === 'not-started'
													? `등록한 책을 모두 읽고 있어요`
													: `읽고 있는 책이 없어요`
												: range === 'done'
												? `아직 다 읽은 책이 없어요`
												: range === 'give-up'
												? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
												: `텅 비어 있어요`
										}
										icon={range === 'give-up' ? kimchiImage : bookShelfImage}
									/>
								) : (
									<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
								)}
							</Tab>
							<Tab eventKey='started' title='시작함'>
								{bookList.length == 0 ? (
									<NoContent
										message={
											range === 'not-done'
												? `아직 읽지 않은 책이 없어요. 지금 바로 등록해 보세요!`
												: range === 'done'
												? `아직 다 읽은 책이 없어요`
												: range === 'give-up'
												? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
												: `텅 비어 있어요`
										}
										icon={range === 'give-up' ? kimchiImage : bookShelfImage}
									/>
								) : (
									<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
								)}
							</Tab>
						</Tabs>
					) : bookList.length === 0 ? (
						<NoContent
							message={
								range === 'not-done'
									? `아직 읽지 않은 책이 없어요. 지금 바로 등록해 보세요!`
									: range === 'done'
									? `아직 다 읽은 책이 없어요`
									: range === 'give-up'
									? `내 사전에 포기란 없다! ${localStorage.getItem('user-name')}님은 포기를 모르시는 분이네요`
									: `텅 비어 있어요`
							}
							icon={range === 'give-up' ? kimchiImage : bookShelfImage}
						/>
					) : (
						<BookCardList bookList={bookList} range={range} setBookList={setBookList} />
					)}

					{bookList.length !== 0 && (
						<Pagination className='pagination justify-content-center mb-5'>
							<Pagination.Item key={1} active={true}>
								1
							</Pagination.Item>
						</Pagination>
					)}
				</>
			)}
		</div>
	)
}

const BookCardList = ({ bookList, range, setBookList }) => {
	const navigate = useNavigate()

	return (
		<div className='row row-eq-height'>
			{bookList.map((book) => {
				return (
					<div className='col-12 col-md-6 mb-5'>
						<Card className='h-100'>
							<Card.Body>
								<>
									{range === 'done' ? (
										<HorizontalBookView book={book} link={`/book/detail/${book.bookId}`} />
									) : range === 'give-up' ? (
										<HorizontalBookView
											book={book}
											firstButton={
												<Button
													variant='success'
													className='w-100'
													onClick={() => {
														const confirm = window.confirm('책을 다시 읽을까요?')

														if (confirm) {
															unGiveUpBook(book.bookId).then((success) => {
																if (success) {
																	toast.success('이제 책을 다시 읽을 수 있어요')
																	navigate(`/book/detail/${book.bookId}`)
																} else {
																	toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
																}
															})
														}
													}}>
													다시 읽기
												</Button>
											}
											secondButton={
												<Button
													variant='danger'
													className='w-100'
													onClick={() => {
														const confirm = window.confirm('정말 이 책을 삭제할까요?')

														if (confirm) {
															deleteBook(book.bookId).then((success) => {
																if (success) {
																	toast.success('책을 삭제했어요')
																	setBookList(bookList.filter((b) => b.bookId != book.bookId))
																} else {
																	toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
																}
															})
														}
													}}>
													삭제하기
												</Button>
											}
											link={`/book/detail/${book.bookId}`}
										/>
									) : (
										<HorizontalBookView
											book={book}
											link={`/book/detail/${book.bookId}`}
											firstButton={
												<a href={`/reading/${book.bookId}`} className='btn btn-primary w-100'>
													이어서 읽기
												</a>
											}
											secondButton={
												<Button
													variant='danger'
													className='w-100'
													onClick={() => {
														const confirm = window.confirm('책을 포기할까요?')

														if (confirm) {
															giveUpBook(book.bookId).then((success) => {
																if (success) {
																	toast.success('책을 포기했어요. 마음이 언제든지 다시 시작하실 수 있어요!')
																	setBookList(bookList.filter((b) => b.bookId != book.bookId))
																} else {
																	toast.error('오류가 났어요 다시 시도해 주세요')
																}
															})
														}
													}}>
													이 책 포기하기
												</Button>
											}
										/>
									)}
								</>
							</Card.Body>
						</Card>
					</div>
				)
			})}
		</div>
	)
}

export default BookList
