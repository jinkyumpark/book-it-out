import React from 'react'
// Components
import Error from '../common/Error'
// Functions
import { getCategoryIcon, getCategoryKoreanDisplayName } from '../..//functions/category'

const CategoryTable = ({ categoryData }) => {
	return (
		<>
			{categoryData == null ? (
				<Error />
			) : (
				<table className='table table-hover mt-3'>
					<thead className='table-dark'>
						<tr>
							<th></th>
							<th>장르</th>
							<th>다 읽은 책</th>
							<th>읽는 중</th>
						</tr>
					</thead>

					<tbody>
						{categoryData.map((category) => {
							return (
								<tr>
									<td className='col-2 col-md-1'>
										<img src={getCategoryIcon(category.category)} alt='' className='img-fluid' style={{ width: '30px' }} />
									</td>

									<td className='col-3'>
										<p>{getCategoryKoreanDisplayName(category.category)}</p>
									</td>

									<td className='col-4'>{category.doneCategory}권</td>

									<td className='col-4'>{category.notDoneCategory}권</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			)}
		</>
	)
}

export default CategoryTable
