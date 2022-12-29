import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
// Images
import defaultBookCover from '../../resources/images/common/book.png'
import ImageSearchModal from './ImageSearchModal'
// Functions
import { addBook } from '../..//functions/book'
// Messages
import { TITLE_MESSAGE, AUTHOR_MESSAGE, PAGE_MESSAGE } from '../../messages/bookAddFormMessages'

const BookAddForm = ({ token }) => {
	const navigate = useNavigate()

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

	const [showModal, setShowModal] = useState(false)
	const openModal = () => {
		if (title !== '') {
			setShowModal(true)
		} else {
			toast.error('표지를 검색하기 위해 책 제목을 입력해 주세요')
		}
	}

	return (
		<div className='container mb-5'>
			<ImageSearchModal showModal={showModal} setShowModal={setShowModal} setCover={setCover} title={title} author={author} />

			<Form onSubmit={(e) => addBook(e, token, navigate, title, author, cover, language, endPage, category, form, source, isSharing)}>
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
							<Form.Control type='text' placeholder={TITLE_MESSAGE} required onChange={(e) => setTitle(e.target.value)} />
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>저자</Form.Label>
							<Form.Control type='text' placeholder={AUTHOR_MESSAGE} required onChange={(e) => setAuthor(e.target.value)} />
						</Form.Group>

						<div className='row'>
							<div className='col-6 col-md-4'>
								<Form.Group className='mb-3' onChange={(e) => setLanguage(e.target.value)}>
									<Form.Label>책 언어</Form.Label>
									<Form.Select>
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
								<Form.Group>
									<Form.Label>장르</Form.Label>
									<Form.Select onChange={(e) => setCategory(e.target.value)}>
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

							<div className='col-6 col-md-4'>
								<Form.Group className='mb-3' onChange={(e) => setEndPage(e.target.value)}>
									<Form.Label>총 페이지 수</Form.Label>
									<Form.Control type='number' placeholder={PAGE_MESSAGE} required />
								</Form.Group>
							</div>

							<div className='col-6'>
								<Form.Group className='mb-3' onChange={(e) => setForm(e.target.value)}>
									<Form.Label>책 형태</Form.Label>
									<Form.Select>
										<option value='PHYSICAL'>📄 종이책</option>
										<option value='EBOOK'>🔋 전자책</option>
										<option value='AUDIO'>🎧 오디오북</option>
									</Form.Select>
								</Form.Group>
							</div>

							<div className='col-12 col-md-6'>
								<Form.Group className='mb-3' onChange={(e) => setSource(e.target.value)}>
									<Form.Label>책은 어디서 얻었나요?</Form.Label>
									<Form.Select>
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
							/>
						</Form.Group>

						<div className='row justify-content-center mt-5'>
							<div className='col-12'>
								<Button variant='success' type='submit' className='w-100'>
									등록하기
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default BookAddForm
