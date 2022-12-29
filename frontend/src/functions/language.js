import koreanIcon from '../resources/images/language/korea.png'
import englishIcon from '../resources/images/language/usa.png'
import japaneseIcon from '../resources/images/language/japan.png'
import chineseIcon from '../resources/images/language/china.png'
import frenchIcon from '../resources/images/language/france.png'
import spanishIcon from '../resources/images/language/spain.png'

const languageTextKoreanMap = new Map([
	['ENGLISH', '영어'],
	['KOREAN', '한국어'],
	['JAPANESE', '일본어'],
	['CHINESE', '중국어'],
	['FRENCH', '프랑스어'],
	['SPANISH', '스페인어'],
])
const languageImageMap = new Map([
	['ENGLISH', englishIcon],
	['KOREAN', koreanIcon],
	['JAPANESE', japaneseIcon],
	['CHINESE', chineseIcon],
	['FRENCH', frenchIcon],
	['SPANISH', spanishIcon],
])

const getLanguageKoreanLabel = (language) => {
	return languageTextKoreanMap.get(language)
}

const getLangaugeImage = (language) => {
	return languageImageMap.get(language)
}

export { getLangaugeImage, getLanguageKoreanLabel }
