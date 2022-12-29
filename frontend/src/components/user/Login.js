import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Button } from 'react-bootstrap'
// Functions
import { login } from '../../functions/user'
// Urls
import { INTRODUCTION_URL, FAQ_URL, QNA_URL } from '../../settings/urls/localUrl'
// Messages
import {
	EMAIL_PLACEHOLDER_MESSAGE,
	PASSWORD_PLACEHOLDER_MESSAGE,
	INTRODUCTION_TITLE,
	FAQ_TITLE,
	FAQ_CONTENT,
	QNA_TITLE,
	QNA_CONTENT,
	FAQ_QNA_TITLE,
} from '../../messages/userMessage'

const Login = ({ setToken }) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [stayLogin, setStayLogin] = useState(true)

	return (
		<div className='container mt-5'>
			<div className='row row-eq-height justify-content-center'>
				<div className='col-12 col-lg-7 mb-5'>
					<Card className='text-center'>
						<Card.Body>
							<h1>📗 로그인</h1>

							<Form onSubmit={(e) => login(e, navigate, setToken, email, password, stayLogin)}>
								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='col-form-label text-start'>이메일</label>
									</div>

									<div class='col-9 col-lg-10'>
										<input
											type='text'
											class='form-control'
											placeholder={EMAIL_PLACEHOLDER_MESSAGE}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</Form.Group>

								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='text-start'>비밀번호</label>
									</div>

									<div class='col-9 col-lg-10'>
										<input
											type='password'
											class='form-control'
											placeholder={PASSWORD_PLACEHOLDER_MESSAGE}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</Form.Group>

								<div class='form-check mt-3 ms-3 text-start'>
									<label
										onClick={() => {
											setStayLogin(!stayLogin)
										}}>
										<label class='form-check-label' for='stay-login'>
											로그인 유지하기
										</label>

										<input type='checkbox' class='form-check-input' checked={stayLogin} value={stayLogin} />
									</label>
								</div>

								<div className='row justify-content-center mt-3'>
									<div className='col-6 col-lg-4'>
										<Button variant='success' type='submit' className='w-100'>
											로그인
										</Button>
									</div>

									<div className='col-6 col-lg-4'>
										<Button variant='danger' className='w-100' href='join'>
											회원가입
										</Button>
									</div>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<a href={INTRODUCTION_URL} className='text-decoration-none text-black h-100'>
						<Card className='h-100'>
							<Card.Body className='text-center'>
								<h4>{INTRODUCTION_TITLE}</h4>

								<h6 className='mt-5 mb-4'>책 읽는 모든 이들을 위한 곳, 책-it-out을 더 알고 싶으면 여기를 클릭해 주세요</h6>
							</Card.Body>
						</Card>
					</a>
				</div>

				<div className='col-12 col-lg-6 mb-5'>
					<Card className='h-100'>
						<Card.Body className='text-center'>
							<h4 className='text-center'>{FAQ_QNA_TITLE}</h4>

							<div className='row row-eq-height mt-3'>
								<div className='col-12 col-md-6'>
									<a href={FAQ_URL} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{FAQ_TITLE}</Card.Header>
											<Card.Body>{FAQ_CONTENT}</Card.Body>
										</Card>
									</a>
								</div>

								<div className='col-12 col-md-6'>
									<a href={QNA_URL} className='text-decoration-none text-black'>
										<Card className='mb-3'>
											<Card.Header>{QNA_TITLE}</Card.Header>
											<Card.Body>{QNA_CONTENT}</Card.Body>
										</Card>
									</a>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Login
