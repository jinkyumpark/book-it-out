import React from 'react'
import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
// Images
import startIcon from '../../resources/images/introduction/start.png'
import forgetIcon from '../../resources/images/introduction/forget.png'
import serachIcon from '../../resources/images/introduction/search.png'
import shareIcon from '../../resources/images/introduction/share.png'

const Introduction = () => {
	const data = [
		{
			id: 1,
			image: startIcon,
			title: '나의 독서활동을 기록할 수 있어요',
			description: `책을 읽을 때 마다 시작을 눌러주세요. <br/>내 독서활동의 통계를 볼 수 있어요`,
		},
		{
			id: 2,
			image: forgetIcon,
			title: '책을 읽어도 기억이 잘 안 나면?',
			description: `독서중에 내 생각이나 책의 내용을 메모할 수 있어요<br/>책을 다 읽고 나서는 평점과 리뷰를 남길 수 있어요`,
		},
		{
			id: 3,
			image: serachIcon,
			title: '이 책, 도서관에 있나? 중고서점에는 없나?',
			description: `
            너무 느린 공공 도서관 사이트 지치셨나요?
            <br/>
            책이 어디에 있는지 찾기 너무 힘들지 않나요?
            <br/>
            책 이름만 검색하면 도서관, 서점, 중고서점, 구독 서비스 등 모든 곳에서 찾아 드릴게요
            `,
		},
		{
			id: 4,
			image: shareIcon,
			title: '내 독서활동, 나누고 싶지 않으세요?',
			description: `
            뭔든지 공유하면 재밌는 법이죠!
            <br/>
            내가 읽은 재밌는 책을 추천하세요
            <br/>
            언제 어떤 책을 읽었는지 공유할 수 있어요
            `,
		},
	]

	return (
		<div className='container'>
			<h1 className='text-center'>책에 관한 모든 것, 📗 책-it-out!</h1>

			<div className='row justify-content-center mt-4 mb-5'>
				<div className='col-12 col-md-6 mb-5'>
					<div className='row'>
						<div className='col-6'>
							<a href='/login' className='w-100'>
								<Button variant='success' className='w-100'>
									로그인
								</Button>
							</a>
						</div>
						<div className='col-6'>
							<a className='w-100' href='/join'>
								<Button variant='danger' className='w-100'>
									회원가입
								</Button>
							</a>
						</div>
					</div>
				</div>

				{data.map((intro) => {
					return (
						<Card className='mb-4'>
							<Card.Body>
								<div className='row'>
									{intro.id % 2 === 0 ? (
										<div className='col-10'>
											<h3>{intro.title}</h3>
											<h5 className='text-muted'>{parse(intro.description)}</h5>
										</div>
									) : (
										<div className='col-2'>
											<img src={intro.image} alt='' className='img-fluid' />
										</div>
									)}
									{intro.id % 2 === 1 ? (
										<div className='col-10'>
											<h3>{intro.title}</h3>
											<h5 className='text-muted'>{parse(intro.description)}</h5>
										</div>
									) : (
										<div className='col-2'>
											<img src={intro.image} alt='' className='img-fluid' />
										</div>
									)}
								</div>
							</Card.Body>
						</Card>
					)
				})}
			</div>
		</div>
	)
}

export default Introduction
