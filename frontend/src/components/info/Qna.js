import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
// Components
import NoContent from '../common/NoContent'
import Error from '../common/Error'
import Loading from '../common/Loading'
// Functions
import { getAllQna, getMyQna } from '../../functions/qna'
import { getIsLoggedIn } from '../../functions/user'
// Settings
import { INITIAL_FETCH_TIME } from '../../settings/settings'

const Qna = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [initialFetch, setInitialFetch] = useState(true)

	const [myQna, setMyQna] = useState(null)
	const [allQnaList, setAllQnaList] = useState([])
	useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, INITIAL_FETCH_TIME)

		Promise.all(
			getAllQna().then((qnaList) => setAllQnaList([...qnaList.content])),
			() => {
				if (getIsLoggedIn) {
					getMyQna().then((myQnaList) => setMyQna(myQnaList))
				}
			}
		).finally(() => {
			setIsLoading(false)
			setInitialFetch(false)
		})
	}, [])

	return (
		<div className='container mt-5 mb-5'>
			{initialFetch ? (
				<></>
			) : isLoading ? (
				<Loading />
			) : (
				<>
					<h3>질문과 답변</h3>

					<h4 className='text-muted mt-5 mb-3'>내가 남긴 질문</h4>
					{!getIsLoggedIn() ? (
						<Error message='내가 남긴 질문을 보려면 로그인 해 주세요' />
					) : myQna == null || myQna.length === 0 ? (
						<NoContent message='내가 남긴 QNA가 없어요' style={{ width: '100px' }} />
					) : (
						<></>
					)}

					<h4 className='text-muted mt-5 mb-3'>다른 사람이 남긴 질문</h4>
					{allQnaList == null ? (
						<Error />
					) : allQnaList.length == 0 ? (
						<NoContent message='QNA가 없어요' style={{ width: '100px' }} />
					) : (
						allQnaList.map((qna) => {
							return (
								<Card className='mt-4'>
									<Card.Header>
										<h5 className='text-center mt-2'>{qna.question}</h5>
									</Card.Header>
									<Card.Body>
										{qna.answer == null ? (
											<div className='mt-3'>
												<NoContent message='아직 답변이 없어요' style={{ width: '100px' }} />
											</div>
										) : (
											parse(qna.answer)
										)}
									</Card.Body>
								</Card>
							)
						})
					)}

					<div className='row justify-content-center mt-5'>
						<div className='col-6 col-lg-4'>
							<a href='/login' className='w-100'>
								<Button className='w-100'>로그인하기</Button>
							</a>
						</div>

						<div className='col-6 col-lg-4'>
							<a href='/join' className='w-100'>
								<Button variant='danger' className='w-100'>
									회원가입하기
								</Button>
							</a>
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Qna
