import toast from 'react-hot-toast'

const search = (keyword, e, navigate) => {
	e.preventDefault()

	if (keyword !== '') {
		navigate(`/search/${keyword}`)
	} else {
		toast.error('검색어를 입력해 주세요')
	}
}

export { search }
