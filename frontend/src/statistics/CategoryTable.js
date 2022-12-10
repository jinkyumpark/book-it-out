import React from 'react'
import Error from '../common/Error'
import { getCategoryIcon, getCategoryKoreanDisplayName } from '../resources/functions/category'

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
							<th>아직 못 읽은 책</th>
						</tr>
					</thead>

					<tbody>
						{categoryData.map((category) => {
							return (
								<tr>
									<td className='col-1'>
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
