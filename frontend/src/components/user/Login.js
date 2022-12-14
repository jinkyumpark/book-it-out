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
							<h1>๐ ๋ก๊ทธ์ธ</h1>

							<Form onSubmit={(e) => login(e, navigate, setToken, email, password, stayLogin)}>
								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='col-form-label text-start'>์ด๋ฉ์ผ</label>
									</div>

									<div class='col-9 col-lg-10'>
										<input
											maxlength='30'
											type='email'
											class='form-control'
											placeholder={EMAIL_PLACEHOLDER_MESSAGE}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</Form.Group>

								<Form.Group class='row mt-3'>
									<div className='col-3 col-lg-2'>
										<label class='text-start'>๋น๋ฐ๋ฒํธ</label>
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
											๋ก๊ทธ์ธ ์?์งํ๊ธฐ
										</label>

										<input type='checkbox' class='form-check-input' checked={stayLogin} value={stayLogin} />
									</label>
								</div>

								<div className='row justify-content-center mt-3'>
									<div className='col-6 col-lg-4'>
										<Button variant='success' type='submit' className='w-100'>
											๋ก๊ทธ์ธ
										</Button>
									</div>

									<div className='col-6 col-lg-4'>
										<Button variant='danger' className='w-100' href='join'>
											ํ์๊ฐ์
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

								<h6 className='mt-5 mb-4'>์ฑ ์ฝ๋ ๋ชจ๋? ์ด๋ค์ ์ํ ๊ณณ, ์ฑ-it-out์ ๋ ์๊ณ? ์ถ์ผ๋ฉด ์ฌ๊ธฐ๋ฅผ ํด๋ฆญํด ์ฃผ์ธ์</h6>
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
