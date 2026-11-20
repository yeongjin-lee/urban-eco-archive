import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { signIn, signUp, isConfigured } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  // 유저플로우 기반 약관 동의 체크박스
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeLocation, setAgreeLocation] = useState(false)

  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setNoticeMsg(null)

    if (mode === 'signup' && (!agreeTerms || !agreePrivacy)) {
      setErrorMsg('필수 약관(이용약관 및 개인정보처리방침)에 동의해 주세요.')
      return
    }

    setSubmitting(true)
    if (mode === 'login') {
      const err = await signIn(email, password)
      setSubmitting(false)
      if (err) {
        setErrorMsg(err)
      } else {
        navigate('/mypage')
      }
    } else {
      const err = await signUp(
        email,
        password,
        nickname || '시민 기록자',
        agreeLocation,
      )
      setSubmitting(false)
      if (err) {
        setErrorMsg(err)
      } else {
        setNoticeMsg(
          '가입 신청이 완료되었습니다! 이메일 인증 설정이 켜져 있다면 메일함을 확인해 주세요.',
        )
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.modeTabs}>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'login' ? styles.modeBtnActive : ''}`}
          onClick={() => {
            setMode('login')
            setErrorMsg(null)
          }}
        >
          로그인
        </button>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'signup' ? styles.modeBtnActive : ''}`}
          onClick={() => {
            setMode('signup')
            setErrorMsg(null)
          }}
        >
          회원가입
        </button>
      </div>

      <h1 className={styles.title}>
        {mode === 'login' ? '다시 오셨네요 🌿' : '도시생태기록소 시작하기'}
      </h1>
      <p className={styles.desc}>
        {isConfigured
          ? '로그인하면 내 생태 기록과 녹색제안을 저장하고 관리할 수 있습니다.'
          : '아직 Supabase 키가 연결되지 않았습니다. 연결 후 실제 로그인이 작동합니다.'}
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <label className={styles.label}>
            닉네임
            <input
              type="text"
              className={styles.input}
              placeholder="예: 김슈니"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </label>
        )}

        <label className={styles.label}>
          이메일
          <input
            type="email"
            className={styles.input}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          비밀번호 (6자 이상)
          <input
            type="password"
            className={styles.input}
            minLength={6}
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {mode === 'signup' && (
          <div className={styles.consents}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
              />
              <span>[필수] 이용약관 동의</span>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
              />
              <span>[필수] 개인정보 수집·이용 동의</span>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={agreeLocation}
                onChange={(e) => setAgreeLocation(e.target.checked)}
              />
              <span>[선택] 위치 기반 정보 활용 동의</span>
            </label>
          </div>
        )}

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}
        {noticeMsg && <p className={styles.notice}>{noticeMsg}</p>}

        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {submitting
            ? '처리 중...'
            : mode === 'login'
              ? '로그인'
              : '회원가입 완료'}
        </button>
      </form>

      <p className={styles.guestNote}>
        비회원으로도 둘러볼 수 있어요 → <Link to="/shelter">오늘의쉼터 보기</Link>
      </p>
    </section>
  )
}
