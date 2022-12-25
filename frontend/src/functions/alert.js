import { getDateDifferenceInDays } from './date'
const getAlertMessage = () => {
	const name = localStorage.getItem('user-name')

	const year = new Date().getFullYear()
	const month = (new Date().getMonth() % 12) + 1
	const day = new Date().getDate()
	const date = `${month} ${day}`

	const dateToMessageMap = new Map([
		// 법정 공휴일
		[`1, 1`, `새해가 밝았네요! 이번년도는 어떤 책을 읽을 예정이신가요? 아직 설정 안 하셨다면 ${year}년도 목표를 설정해 보세요!`],
		[`3 3`, ``],
		[`4 7`, ``],
		[`5 5`, `오늘은 어린이날이에요!`],
		[`6 6`, `오늘은 현충일이에요. 우리가 평화롭게 책을 읽을 수 있는것도 누군가가 대한민국의 자유민주주의를 위해 싸웠기 때`],
		[`8 15`, ``],
		[`10 3`, `오늘은 대한민국의 헌법이 만들어진 개천절이에요. 🇰🇷`],
		[`10 9`, `오늘은 한글날이에요! 🇰🇷 한글 덕분에 우리가 한자를 배우지 않고도 편하게 책을 읽을 수 있어서 정말 감사하지 않나요? ☺️`],
		[`12 25`, `크리스마스에도 독서하러 오시다니, ${name}님은 진정한 책벌래시네요! 재밌는 책 읽으시고 즐거운 크리스마스 보내세요! 🎄🎅`],

		// 과거 법정 공휴일
		[`4 5`, `오늘은 식목일이에요! 🌳 책벌래들의 상징인 나무님께 감사를...`],

		// 잘 알려진 기념일
		[`5 8`, `오늘은 어버이의 날이에요. 👨‍👨‍👧‍👦 `],
		[`5 23`, `오늘은 스승의 날이에요! 👩‍🏫👨‍🏫`],
		[`6 25`, `오늘은 625 전쟁일이에요. 대한민국을 지키기 위해 희생하신 모든 분들께 잠깐 묵념 어떠신가요?`],

		// 재미있는 기념일
		[`10 31`, `해피 할로윈! 🎃 할로윈인 오늘, 오싹한 소설 어떠신가요? 👻`],
		[`11 11`, `해피 빼빼로 데이! 빼빼로는 많이 받으셨나요?`],

		// 생소한 기념일
		[
			`9 7`,
			`오늘은 푸른 하늘의 날이라고 해요! 🌥️ 미세먼지로 어느세 푸른하늘이 낯설어 졌지만, 푸른 하늘 들판에 앉아 하는 독서가 최곤데, 책벌래인 ${name}님도 아시겠죠? 😉`,
		],
		[`10 2`, `오늘은 노인의 날이에요! 👴🧓 나이들어서도 독서를 놓치 않으시고 지식을 쌓는 어르신들을 보면 너무 멋있는거 같아요`],
	])

	if (dateToMessageMap.has(date)) {
		return dateToMessageMap.get(date)
	} else {
		return `어서오세요, ${name != null ? `${name}님!` : ''} 오늘도 마음의 양식을 섭취하러 오셨군요 😉`
	}
}

const getIsAlertShowing = () => {
	return getDateDifferenceInDays(new Date(), new Date(localStorage.getItem('main-alert'))) < 1 ? false : true
}

const updateAlertCloseTime = () => {
	localStorage.setItem('main-alert', new Date())
}

export { getAlertMessage, getIsAlertShowing, updateAlertCloseTime }
