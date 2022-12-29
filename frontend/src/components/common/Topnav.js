import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Container, Form, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
// React Icons
import { HiOutlineUserAdd as JoinIcon } from 'react-icons/hi'
import { FiLogIn as LoginIcon, FiSettings as SettingIcon } from 'react-icons/fi'
// Functions
import { logout } from '../../functions/user'
import { search } from '../../functions/search'
// Images
import userIcon from '../../resources/images/common/user.png'

const Topnav = ({ token, setToken }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const expand = 'lg'

	const urlList = [
		{
			id: 1,
			url: '/book/not-done/all',
			title: '읽고 있는 책',
		},
		{
			id: 2,
			url: '/book/done',
			title: '다 읽은 책',
		},
		{
			id: 3,
			url: '/book/give-up',
			title: '포기한 책',
		},
		{
			id: 4,
			url: '/statistics',
			title: '독서통계',
		},
	]

	return (
		<Navbar key={expand} expand={expand} fixed='top' bg='light' collapseOnSelect>
			<Container fluid>
				<Navbar.Brand href={token === '' ? '/login' : '/'}>📗 책-it-out</Navbar.Brand>
				<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}></Navbar.Toggle>

				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto text-center'>
						{urlList.map((url) => (
							<Nav.Link
								href={token !== '' && url.url}
								active={location.pathname.startsWith(url.url)}
								onClick={() => {
									token == '' && toast.error('로그인 해 주세요')
								}}>
								{url.title}
							</Nav.Link>
						))}
					</Nav>

					<Nav className={`d-inline d-${expand}-none text-center`}>
						<Nav.Link href='/login'>
							<div className='row justify-content-center'>
								<div className='col-4 col-md-2'>
									<div className='row'>
										<div className='col-4'>
											<LoginIcon className='me-2 ' />
										</div>

										{token === '' || token == null ? (
											<div className='col-xs-10 col-8'>로그인</div>
										) : (
											<div className='col-xs-10 col-8' onClick={(e) => logout(e, setToken, navigate)}>
												로그아웃
											</div>
										)}
									</div>
								</div>
							</div>
						</Nav.Link>

						{(token === '' || token == null) && (
							<Nav.Link href='/join'>
								<div className='row justify-content-center'>
									<div className='col-4  col-md-2'>
										<div className='row'>
											<div className='col-4'>
												<JoinIcon className='me-2 ' />
											</div>
											<div className='col-xs-10 col-8'>회원가입</div>
										</div>
									</div>
								</div>
							</Nav.Link>
						)}

						{(token !== '' || token == null) && (
							<Nav.Link href='/settings'>
								<div className='row justify-content-center'>
									<div className='col-3 col-md-2'>
										<div className='row'>
											<div className='col-4'>
												<SettingIcon className='me-2' />
											</div>
											<div className='col-xs-10 col-8'>설정</div>
										</div>
									</div>
								</div>
							</Nav.Link>
						)}
					</Nav>

					{token !== '' && token != null && <SearchBar />}

					<Nav>
						<NavDropdown
							id='user-dropdown'
							title={<img src={userIcon} alt='' className='img-fluid' style={{ width: '30px' }} />}
							align='end'
							size='xl'
							className={`d-none d-${expand}-inline`}>
							{token === '' || token == null ? (
								<>
									<NavDropdown.Item href='/login'>로그인</NavDropdown.Item>
									<NavDropdown.Item href='/join'>회원가입</NavDropdown.Item>
								</>
							) : (
								<>
									<NavDropdown.Item onClick={(e) => logout(e, setToken, navigate)}>로그아웃</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate('/qna')}>QNA</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate('/faq')}>FAQ</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href='/settings'>설정</NavDropdown.Item>
								</>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

const SearchBar = ({ expand = 'lg' }) => {
	const navigate = useNavigate()
	const [keyword, setKeyword] = useState('')

	return (
		<Form className='d-flex' onSubmit={(e) => search(keyword, e, navigate)}>
			<Form.Control
				type='search'
				placeholder='책 검색'
				className='me-2'
				aria-label='Search'
				onChange={(e) => {
					setKeyword(e.target.value)
				}}
			/>
			<Button type='submit' variant={`outline-success col-${expand}-3 col-2`}>
				검색
			</Button>
		</Form>
	)
}

export default Topnav
