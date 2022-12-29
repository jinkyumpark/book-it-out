import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Common
import Loading from '../common/Loading'
import Error from '../common/Error'
import NoContent from '../common/NoContent'
// Components
import ImageSearchModal from './ImageSearchModal'
// Resources
import defaultBookCover from '../../resources/images/common/book.png'
// Functions
import { editBook, getBook } from '../../functions/book'
import { API_BASE_URL } from '../../settings/urls/apiUrl'

const BookEditForm = ({ token }) => {
	const { id } = useParams()
	const navigate = useNavigate()
	const BOOK_GET_API_URL = `${API_BASE_URL}/v1/book/${id}`
	const BOOK_EDIT_API_URL = `${API_BASE_URL}/v1/book/${id}`
	const BOOK_DETAIL_URL = `/book/detail/${id}`

	// Messages
	const TITLE_MESSAGE = `책 제목을 알려 주세요`
	const AUTHOR_MESSAGE = `책의 저자를 알려 주세요`
	const PAGE_MESSAGE = `마지막 페이지를 알려 주세요`
	const EDIT_SUCCESS_MESSAGE = `책을 수정했어요`

	const [initalFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)
	const [notFound, setNotFound] = useState(false)
	const [isError, setIsError] = useState(false)

	const [showModal, setShowModal] = useState(false)
	const openModal = () => {
		title !== '' ? setShowModal(true) : alert('표지를 검색하기 위해 책 제목을 입력해 주세요')
	}

	// Book Info
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [endPage, setEndPage] = useState(0)
	const [cover, setCover] = useState('')
	const [language, setLanguage] = useState('KOREAN')
	const [category, setCategory] = useState('LITERATURE')
	const [isSharing, setIsSharing] = useState(false)
	const [form, setForm] = useState('PHYSICAL')
	const [source, setSource] = useState('NOT_PROVIDED')

	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 5000)

		fetch(BOOK_GET_API_URL, {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				if (!res.status.toString().startsWith(2)) {
					setNotFound(true)
					return
				}

				return res.json()
			})
			.then((book) => {
				setTitle(book.title)
				setAuthor(book.author)
				setLanguage(book.language)
				setCategory(book.category)
				setEndPage(book.endPage)
				setForm(book.form)
				setSource(book.source)
				setCover(book.cover)
				setIsSharing(book.isSharing)
			})
			.catch(() => setIsError(true))
			.finally(() => {
				setIsLoading(false)
				setInitialFetch(false)
			})
	}, [])

	const handleEdit = (e) => {
		e.preventDefault()

		const editedBook = {
			bookId: id,
			title: title,
			author: author,
			language: language,
			category: category,
			endPage: endPage,
			form: form,
			soruce: source,
			cover: cover,
			isSharing: isSharing,
		}
		editBook(editedBook).then((result) => {
			if (result) {
				toast.success(EDIT_SUCCESS_MESSAGE)
				navigate(BOOK_DETAIL_URL)
			} else {
				toast.error('책을 수정할 수 없었어요 잠시후 다시 시도해 주세요')
			}
		})
	}

	return (
		<div className='container'>
			{initalFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : isError ? (
				<Error />
			) : notFound ? (
				<NoContent />
			) : (
				<div className='container'>
					<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

					<Form onSubmit={handleEdit}>
						<div className='row row-eq-height text-center'>
							<div className='col-12 col-lg-4 mb-3'>
								<img src={cover === '' ? defaultBookCover : cover} alt='' className='img-fluid rounded' />

								<div className='row mt-5'>
									<div className='col-6'>
										<Button className='w-100' onClick={openModal}>
											책 표지 검색
										</Button>
									</div>
									<div className='col-6'>
										<Button className='w-100' disabled>
											직접 업로드
										</Button>
									</div>
								</div>
							</div>

							<div className='col-12 col-lg-8 mb-3 text-start'>
								<Form.Group className='mb-3'>
									<Form.Label>책 제목</Form.Label>
									<Form.Control
										type='text'
										placeholder={TITLE_MESSAGE}
										required
										onChange={(e) => setTitle(e.target.value)}
										value={title}
									/>
								</Form.Group>

								<Form.Group className='mb-3'>
									<Form.Label>저자</Form.Label>
									<Form.Control
										type='text'
										placeholder={AUTHOR_MESSAGE}
										required
										onChange={(e) => setAuthor(e.target.value)}
										value={author}
									/>
								</Form.Group>

								<div className='row'>
									<div className='col-6 col-md-4'>
										<Form.Group className='mb-3' onChange={(e) => setLanguage(e.target.value)}>
											<Form.Label>책 언어</Form.Label>
											<Form.Select value={language}>
												<option value='KOREAN'>🇰🇷 한국어</option>
												<option value='ENGLISH'>🇺🇸 영어</option>
												<option value='JAPANESE'>🇯🇵 일본어</option>
												<option value='CHINESE'>🇨🇳 중국어</option>

												<option value='FRENCH'>🇫🇷 프랑스어</option>
												<option value='SPANISH'>🇪🇸 스페인어 </option>
											</Form.Select>
										</Form.Group>
									</div>

									<div className='col-6 col-md-4'>
										<Form.Group className='mb-3' onChange={(e) => setEndPage(e.target.value)}>
											<Form.Label>총 페이지 수</Form.Label>
											<Form.Control type='number' placeholder={PAGE_MESSAGE} required value={endPage} />
										</Form.Group>
									</div>

									<div className='col-12 col-md-4'>
										<Form.Group>
											<Form.Label>장르</Form.Label>
											<Form.Select onChange={(e) => setCategory(e.target.value)} value={category}>
												<option value='LITERATURE'>문학</option>

												<option value='NATURAL_SCIENCE'>자연과학</option>
												<option value='SOCIAL_SCIENCE'>사회과학</option>
												<option value='TECHNOLOGY'>기술</option>

												<option value='PHILOSOPHY'>철학</option>
												<option value='LANGUAGE'>언어</option>
												<option value='ART'>예술</option>
												<option value='HISTORY'>역사</option>

												<option value='RELIGION'>종교</option>

												<option value='OTHERS'>기타</option>
											</Form.Select>
										</Form.Group>
									</div>
								</div>

								<div className='row mt-4'>
									<div className='col-6'>
										<Form.Group className='mb-3' onChange={(e) => setForm(e.target.value)}>
											<Form.Label>책 형태</Form.Label>
											<Form.Select value={form}>
												<option value='PHYSICAL'>종이책</option>
												<option value='EBOOK'>전자책</option>
												<option value='AUDIO'>오디오북</option>
											</Form.Select>
										</Form.Group>
									</div>

									<div className='col-6'>
										<Form.Group className='mb-3' onChange={(e) => setSource(e.target.value)}>
											<Form.Label>책은 어디서 얻었나요?</Form.Label>
											<Form.Select value={source}>
												<option value='NOT_PROVIDED'>말하고 싶지 않아요</option>

												<option value='BUY_NEW_OFFLINE'>새 책 - 온라인 서점</option>
												<option value='BIY_NEW_ONLINE'>새 책 - 오프라인 서점</option>
												<option value='BUY_USED_OFFLINE'>중고책 - 오프라인 서점 (알라딘 등)</option>
												<option value='BUY_USED_ONLINE'>중고책 - 온라인 서점</option>

												<option value='LIBRARY'>도서관</option>
												<option value='BORROW_STORE'>돈 주고 빌렸어요</option>
												<option value='BORROW_FRIENDS'>친구에게 빌렸어요</option>

												<option value='SUBSCRIPTION'>구독 (밀리의 서재 등)</option>

												<opton value='OTHERS'>기타</opton>
											</Form.Select>
										</Form.Group>
									</div>
								</div>

								<Form.Group className='mb-3' controlId='formBasicCheckbox'>
									<Form.Check
										type='checkbox'
										label='다른 사람이 내 독서활동을 볼 수 있도록 하기'
										onChange={() => setIsSharing(!isSharing)}
										value={isSharing}
									/>
								</Form.Group>

								<div className='row justify-content-center mt-5'>
									<div className='col-6'>
										<Button variant='danger' onClick={() => navigate(BOOK_DETAIL_URL)} className='w-100'>
											취소
										</Button>
									</div>
									<div className='col-6'>
										<Button variant='warning' type='submit' className='w-100'>
											수정하기
										</Button>
									</div>
								</div>
							</div>
						</div>
					</Form>
				</div>
			)}
		</div>
	)
}

export default BookEditForm
