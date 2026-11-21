import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { signIn, signUp, resendConfirmation, isConfigured } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState<'login' | 'signup' | 'guest'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  // 회원가입 약관 동의 체크박스 (유저플로우 기준)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeDataUse, setAgreeDataUse] = useState(false)
  const [agreeLocation, setAgreeLocation] = useState(false)
  const [agreeMailing, setAgreeMailing] = useState(false)

  // 비회원 이용 약관 동의 체크박스 (유저플로우 기준)
  const [guestSave, setGuestSave] = useState(false)
  const [guestManage, setGuestManage] = useState(false)
  const [guestMailing, setGuestMailing] = useState(false)

  const [pendingVerifyEmail, setPendingVerifyEmail] = useState<string | null>(
    null,
  )
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const allSignupChecked =
    agreeTerms && agreeDataUse && agreeLocation && agreeMailing

  const handleToggleAllSignup = (checked: boolean) => {
    setAgreeTerms(checked)
    setAgreeDataUse(checked)
    setAgreeLocation(checked)
    setAgreeMailing(checked)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setNoticeMsg(null)

    if (mode === 'signup' && (!agreeTerms || !agreeDataUse)) {
      setErrorMsg('필수 약관(이용약관 및 정보 활용 동의)에 동의해 주세요.')
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
      return
    }

    const { error, needsEmailConfirm } = await signUp(
      email,
      password,
      nickname || '시민 기록자',
      agreeLocation,
    )
    setSubmitting(false)

    if (error) {
      setErrorMsg(error)
    } else if (needsEmailConfirm) {
      setPendingVerifyEmail(email)
      setNoticeMsg(
        '인증 메일을 발송했습니다. 메일함의 인증 링크를 누른 뒤 로그인해 주세요.',
      )
    } else {
      navigate('/mypage')
    }
  }

  const handleResend = async () => {
    if (!pendingVerifyEmail) return
    setErrorMsg(null)
    const err = await resendConfirmation(pendingVerifyEmail)
    if (err) {
      setErrorMsg(err)
    } else {
      setNoticeMsg('인증 메일을 다시 보냈습니다. 스팸함도 확인해 주세요!')
    }
  }

  const handleGuestStart = (e: FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    if (!guestSave || !guestManage) {
      setErrorMsg('필수 비회원 이용약관(정보 저장 · 게시글 관리 동의)에 동의해 주세요.')
      return
    }
    localStorage.setItem('uet_guest_consent', 'true')
    navigate('/shelter')
  }

  return (
    <section className={styles.section}>
      <div className={styles.modeTabs} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'login' ? styles.modeBtnActive : ''}`}
          onClick={() => {
            setMode('login')
            setPendingVerifyEmail(null)
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
            setPendingVerifyEmail(null)
            setErrorMsg(null)
          }}
        >
          회원가입
        </button>
        <button
          type="button"
          className={`${styles.modeBtn} ${mode === 'guest' ? styles.modeBtnActive : ''}`}
          onClick={() => {
            setMode('guest')
            setPendingVerifyEmail(null)
            setErrorMsg(null)
          }}
        >
          비회원 이용
        </button>
      </div>

      {mode === 'guest' ? (
        <form className={styles.form} onSubmit={handleGuestStart}>
          <h1 className={styles.title}>비회원 이용 약관 동의</h1>
          <p className={styles.desc}>
            비회원도 매거진, 오늘의쉼터, 녹색제안을 둘러볼 수 있습니다. (글 작성·내
            기록 저장은 로그인 후 가능)
          </p>

          <div className={styles.consents}>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={guestSave}
                onChange={(e) => setGuestSave(e.target.checked)}
              />
              <span>[필수] 정보 저장 및 이용약관 동의</span>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={guestManage}
                onChange={(e) => setGuestManage(e.target.checked)}
              />
              <span>[필수] 게시글 관리 및 운영정책 동의</span>
            </label>
            <label className={styles.checkRow}>
              <input
                type="checkbox"
                checked={guestMailing}
                onChange={(e) => setGuestMailing(e.target.checked)}
              />
              <span>[선택] 메일링 서비스 동의</span>
            </label>
          </div>

          {errorMsg && <p className={styles.error}>{errorMsg}</p>}

          <button type="submit" className={styles.submitBtn}>
            동의하고 시작하기
          </button>
        </form>
      ) : pendingVerifyEmail ? (
        <div className={styles.form}>
          <h1 className={styles.title}>이메일 인증 대기 중</h1>
          <p className={styles.desc}>
            <strong>{pendingVerifyEmail}</strong> 로 인증 링크를 보냈습니다.
            이메일 인증을 완료하면 프로필 설정 및 기록 작성이 가능합니다.
          </p>
          {noticeMsg && <p className={styles.notice}>{noticeMsg}</p>}
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleResend}
          >
            인증 메일 다시 보내기
          </button>
          <button
            type="button"
            className={styles.modeBtn}
            onClick={() => {
              setPendingVerifyEmail(null)
              setMode('login')
            }}
          >
            인증 완료 후 로그인하기
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>
            {mode === 'login' ? '다시 오셨네요 🌿' : '도시생태기록소 회원가입'}
          </h1>
          <p className={styles.desc}>
            {isConfigured
              ? '로그인하면 내 생태 기록과 녹색제안을 저장하고 관리할 수 있습니다.'
              : '아직 Supabase 키가 연결되지 않았습니다. 연결 후 실제 로그인이 작동합니다.'}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className={styles.label}>
                프로필 닉네임
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
              이메일 (인증 및 로그인용)
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
                <label className={styles.checkRow} style={{ fontWeight: 700 }}>
                  <input
                    type="checkbox"
                    checked={allSignupChecked}
                    onChange={(e) => handleToggleAllSignup(e.target.checked)}
                  />
                  <span>전체 약관에 모두 동의합니다</span>
                </label>
                <hr
                  style={{
                    border: 'none',
                    borderTop: '1px solid var(--color-border-muted)',
                  }}
                />
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    [필수]{' '}
                    <Link to="/terms" style={{ textDecoration: 'underline' }}>
                      이용약관
                    </Link>{' '}
                    동의
                  </span>
                </label>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={agreeDataUse}
                    onChange={(e) => setAgreeDataUse(e.target.checked)}
                  />
                  <span>
                    [필수]{' '}
                    <Link to="/privacy" style={{ textDecoration: 'underline' }}>
                      정보 활용 및 개인정보
                    </Link>{' '}
                    동의
                  </span>
                </label>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={agreeLocation}
                    onChange={(e) => setAgreeLocation(e.target.checked)}
                  />
                  <span>[선택] 위치기반 정보 동의</span>
                </label>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    checked={agreeMailing}
                    onChange={(e) => setAgreeMailing(e.target.checked)}
                  />
                  <span>[선택] 메일링 서비스 동의</span>
                </label>
              </div>
            )}

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
            {noticeMsg && <p className={styles.notice}>{noticeMsg}</p>}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting
                ? '처리 중...'
                : mode === 'login'
                  ? '로그인'
                  : '회원가입 및 이메일 인증'}
            </button>
          </form>
        </>
      )}
    </section>
  )
}
