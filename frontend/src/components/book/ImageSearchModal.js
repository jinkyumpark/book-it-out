import React, { useEffect, useState } from 'react'
import { Modal, Card, Button } from 'react-bootstrap'
import { GOOGLE_URL, GOOGLE_CX, GOOGLE_API_KEY } from '../../settings/googleSearch'
// Resources
import Error from '../common/Error'
import Loading from '../common/Loading'
import checkIcon from '../../resources/images/general/check.png'

const ImageSearchModal = ({ showModal, setShowModal, setCover, title, author }) => {
	const coverImageStyle = { maxHeight: '300px', width: '100%', objectPosition: 'center' }
	const coverSelectedStyle = { opacity: 0.4, maxHeight: '300px', width: '100%', objectPosition: 'center' }
	const [selectedImageIndex, setSelectedImageIndex] = useState(-1)
	const [imageSearchResult, setImageSearchResult] = useState([])

	const closeModal = () => {
		setSelectedImageIndex(-1)
		setShowModal(false)
	}
	const closeModalSuccess = () => {
		setCover(imageSearchResult[selectedImageIndex].image)
		setSelectedImageIndex(-1)
		setShowModal(false)
	}

	const [initialFetch, setInitialFetch] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!showModal) return

		setTimeout(() => {
			setInitialFetch(false)
		}, 3000)

		if (showModal) {
			fetch(`${GOOGLE_URL}?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX}&q=${title}%20${author}&searchType=image&num=8`)
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					const imageLink = data.items.map((item, index) => {
						return { id: index, image: item.link }
					})

					setImageSearchResult(imageLink)
				})
				.finally(() => {
					setIsLoading(false)
					setInitialFetch(false)
				})
		}
	}, [showModal])

	return (
		<Modal show={showModal} onHide={closeModal} backdrop='static' size='xl' fullscreen='md-down'>
			<Modal.Header closeButton>
				<Modal.Title>이미지 검색</Modal.Title>
				<span className='text-secondary ms-5'>책 제목이 흔하면 저자도 입력하면 더 정확하게 나와요</span>
			</Modal.Header>

			<Modal.Body>
				{initialFetch ? (
					<></>
				) : isLoading ? (
					<Loading />
				) : imageSearchResult == null || imageSearchResult === undefined || imageSearchResult.length == 0 ? (
					<Error message='검색 결과가 없어요' />
				) : (
					<div className='row'>
						{imageSearchResult.map((link) => {
							return (
								<div className='col-6 col-xl-3'>
									<Card className='mb-4' onClick={() => setSelectedImageIndex(link.id)}>
										<Card.Body>
											{link.id == selectedImageIndex && (
												<img
													src={checkIcon}
													alt='selected'
													className='img-fluid'
													style={{
														widht: '50px',
														height: '50px',
														position: 'absolute',
														top: '-20px',
														right: '-10px',
														zIndex: 100,
													}}
												/>
											)}

											<img
												src={link.image}
												alt=''
												className='img-fluid'
												style={link.id == selectedImageIndex ? coverSelectedStyle : coverImageStyle}
											/>
										</Card.Body>
									</Card>
								</div>
							)
						})}
					</div>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Button variant='danger' onClick={closeModal}>
					취소
				</Button>
				<Button variant='primary' onClick={closeModalSuccess} disabled={selectedImageIndex == -1}>
					선택한 이미지로 결정하기
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImageSearchModal
