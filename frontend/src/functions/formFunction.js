import physicalBookIcon from '../resources/images/book-form/physical-book.png'
import ebookBookIcon from '../resources/images/book-form/ebook.png'
import audioBookIcon from '../resources/images/book-form/audio-book.png'

const formKoreanLabelMap = new Map([
	['PHYSICAL', '종이책'],
	['EBOOK', '이북'],
	['AUDIO', '오디오북'],
])
const formIconMap = new Map([
	['PHYSICAL', physicalBookIcon],
	['EBOOK', ebookBookIcon],
	['AUDIO', audioBookIcon],
])

const getFormImage = (form) => {
	return formIconMap.get(form)
}
const getFormKoreanLabel = (form) => {
	return formKoreanLabelMap.get(form)
}

export { getFormImage, getFormKoreanLabel }
