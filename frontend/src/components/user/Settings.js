import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import ChangePasswordModal from './ChangePasswordModal'
import ChangeNameModal from './ChageNameModal'

const Settings = () => {
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
	const [isNameModalOpen, setIsNameModalOpen] = useState(false)

	return (
		<div className='container'>
			<ChangePasswordModal isModalOpen={isPasswordModalOpen} setIsModalOpen={setIsPasswordModalOpen} />
			<ChangeNameModal isModalOpen={isNameModalOpen} setIsModalOpen={setIsNameModalOpen} />

			<div className='row row-eq-height justify-content-center'>
				<div className='col-12 col-md-6'>
					<Card>
						<Card.Body className='text-center'>
							<h3 className='mb-4'>개인 정보 수정</h3>
							<div className='row'>
								<div className='col-12 col-md-4 mt-2'>
									<Button variant='danger' className='w-100' disabled>
										이메일 변경
									</Button>
								</div>

								<div className='col-12 col-md-4 mt-2'>
									<Button className='w-100' onClick={() => setIsPasswordModalOpen(true)}>
										비밀번호 변경
									</Button>
								</div>

								<div className='col-12 col-md-4 mt-2'>
									<Button className='w-100' onClick={() => setIsNameModalOpen(true)}>
										이름 변경
									</Button>
								</div>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Settings
