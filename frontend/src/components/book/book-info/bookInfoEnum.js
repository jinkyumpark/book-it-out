import { getCategoryIcon, getCategoryKoreanDisplayName } from '../../../functions/category'
import { getFormImage, getFormKoreanLabel } from '../../../functions/formFunction'
import { getLangaugeImage, getLanguageKoreanLabel } from '../../../functions/language'
import { getSourceImage, getSourceKoreanLabel } from '../../../functions/sourceFunction'

const CATEGORY_INFO = { imageFunction: getCategoryIcon, textFunction: getCategoryKoreanDisplayName }
const FORM_INFO = { imageFunction: getFormImage, textFunction: getFormKoreanLabel }
const LANGUAGE_INFO = { imageFunction: getLangaugeImage, textFunction: getLanguageKoreanLabel }
const SOURCE_INFO = { imageFunction: getSourceImage, textFunction: getSourceKoreanLabel }

export { CATEGORY_INFO, FORM_INFO, LANGUAGE_INFO, SOURCE_INFO }
