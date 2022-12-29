// Join Placeholder
const EMAIL_MESSAGE = `ID로 사용하실 이메일을 입력해 주세요`
const EMAIL_VERIFICATION_MESSAGE = `이메일로 온 인증번호를 입력해 주세요`
const PASSWORD_MESSAGE = `비밀번호를 입력해 주세요`
const NAME_MESSAGE = `이름을 알려주세요`

// Verifiy Email
const VERIFY_FAIL_ALREADY_REGISTRED = `이미 가입된 이메일이에요`
const VERIFY_SUCCESS_SENT = `인증번호를 보냈어요. 메일을 확인해 주세요`
const VERIFY_SUCCESS_ALREADY_SENT = `가입중인 이메일이에요. 메일함에 있는 인증번호를 입력해 주세요`

// Join
const JOIN_ERROR_ID_NULL = `아이디로 사용하실 이메일을 입력해 주세요`
const JOIN_ERROR_EMAIL_FORMAT_INVALID = `올바른 이메일 형식이 아니에요`
const JOIN_ERROR_EMAIL_NOT_VERIFIED = `이메일 인증을 진행해 주세요`
const JOIN_ERROR_NAME_NULL = `이름을 입력해 주세요`
const JOIN_ERROR_PW_NULL = `비밀번호를 입력해 주세요`
const JOIN_ERROR_PW_SHORT = `6자리 이상의 비밀번호를 입력해 주세요`
const JOIN_LOADING = `가입하고 있어요`
const JOIN_ERROR_EMAIL_CODE_INCORRECT = `이메일 인증번호가 일치하지 않아요. 다시 확인해 주세요`

// Login Placeholder
const EMAIL_PLACEHOLDER_MESSAGE = `이메일을 입력해 주세요`
const PASSWORD_PLACEHOLDER_MESSAGE = `비밀번호를 입력해 주세요`
const INTRODUCTION_TITLE = `책-it-out이 뭐 하는 곳인지 궁금하신가요? 🧐`
const FAQ_TITLE = `FAQ`
const FAQ_CONTENT = `자주 하시는 질문을 모아 봤어요`
const QNA_TITLE = `QNA`
const QNA_CONTENT = `직접 질문하실 수 있어요`
const FAQ_QNA_TITLE = `책-it-out에 관한 질문 한 스푼 🥄`

export {
	// Join Placeholder
	EMAIL_MESSAGE,
	EMAIL_VERIFICATION_MESSAGE,
	PASSWORD_MESSAGE,
	NAME_MESSAGE,

	// Verify Email
	VERIFY_FAIL_ALREADY_REGISTRED,
	VERIFY_SUCCESS_SENT,
	VERIFY_SUCCESS_ALREADY_SENT,

	// Join
	JOIN_ERROR_ID_NULL,
	JOIN_ERROR_EMAIL_FORMAT_INVALID,
	JOIN_ERROR_EMAIL_NOT_VERIFIED,
	JOIN_ERROR_NAME_NULL,
	JOIN_ERROR_PW_NULL,
	JOIN_ERROR_PW_SHORT,
	JOIN_LOADING,
	JOIN_ERROR_EMAIL_CODE_INCORRECT,

	// Login
	EMAIL_PLACEHOLDER_MESSAGE,
	PASSWORD_PLACEHOLDER_MESSAGE,
	INTRODUCTION_TITLE,
	FAQ_TITLE,
	FAQ_CONTENT,
	QNA_TITLE,
	QNA_CONTENT,
	FAQ_QNA_TITLE,
}
