import subscriptionIcon from '../resources/images/source/subscription.png'
import notProvidedIcon from '../resources/images/source/not-provided.png'
import friendIcon from '../resources/images/source/friend.png'
import libraryIcon from '../resources/images/source/library.png'
import onlineIcon from '../resources/images/source/online.png'
import buyNewOfflineIcon from '../resources/images/source/book-shop.png'
import bookStoreIcon from '../resources/images/source/book-store.png'
import borrowIcon from '../resources/images/source/borrow.png'
import othersIcon from '../resources/images/source/others.png'

const sourceKoreanLabelMap = new Map([
	['BUY_NEW_OFFLINE', '서점'],
	['BUY_NEW_ONLINE', '온라인'],
	['BUY_USED_OFFLINE', '중고서점'],
	['BUY_USED_ONLINE', '중고'],

	['LIBRARY', '도서관'],
	[('BORROW_STORE', '유료 책방')],
	['BORROW_FRIENDS', '지인'],

	['SUBSCRIPTION', '구독'],

	['OTHERS', '기타'],
	['NOT_PROVIDED', '모름'],
])
const sourceIconMap = new Map([
	['BUY_NEW_OFFLINE', buyNewOfflineIcon],
	['BUY_NEW_ONLINE', onlineIcon],
	['BUY_USED_OFFLINE', bookStoreIcon],
	['BUY_USED_ONLINE', bookStoreIcon],

	['LIBRARY', libraryIcon],
	['BORROW_STORE', borrowIcon],
	['BORROW_FRIENDS', friendIcon],

	['SUBSCRIPTION', subscriptionIcon],

	['OTHERS', othersIcon],
	['NOT_PROVIDED', notProvidedIcon],
])

const getSourceImage = (source) => {
	return sourceIconMap.get(source)
}

const getSourceKoreanLabel = (source) => {
	return sourceKoreanLabelMap.get(source)
}

export { getSourceImage, getSourceKoreanLabel }
