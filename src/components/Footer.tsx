import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>@2026 도시생태기록소, All rights reserved</span>
        <span>본 웹사이트는 서울여자대학교 SI 교육센터의 지원을 받아 제작되었습니다.</span>
        <div className={styles.links}>
          <Link to="/privacy">개인정보처리방침</Link>
          <span className={styles.sep}>|</span>
          <Link to="/contact">문의하기</Link>
          <span className={styles.sep}>|</span>
          <Link to="/terms">이용약관</Link>
        </div>
      </div>
    </footer>
  )
}
