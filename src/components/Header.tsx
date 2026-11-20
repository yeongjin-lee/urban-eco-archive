import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MapPin, Menu, User, X } from 'lucide-react'
import { UetLogo } from './UetLogo'
import styles from './Header.module.css'

// 상단 메뉴 목록: 배열로 관리하면 나중에 메뉴 추가/수정이 쉬워집니다.
const NAV_ITEMS = [
  { to: '/', label: '홈' },
  { to: '/about', label: '서비스소개' },
  { to: '/magazine', label: '매거진' },
  { to: '/shelter', label: '오늘의쉼터' },
  { to: '/proposals', label: '녹색제안' },
]

export function Header() {
  // 모바일 햄버거 메뉴가 열렸는지(true) 닫혔는지(false) 기억하는 상태(state)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 로고 + 서비스명 */}
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <UetLogo size={42} />
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>도시생태기록소</span>
            <span className={styles.brandSub}>Urban Ecology Telescope</span>
          </div>
        </Link>

        {/* PC 상단 알약 메뉴 */}
        <nav className={styles.nav} aria-label="주 메뉴">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${styles.navPill} ${isActive ? styles.navPillActive : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 오른쪽 아이콘 + 햄버거 버튼 */}
        <div className={styles.actions}>
          <span className={styles.divider} aria-hidden="true" />
          <Link to="/mypage" className={styles.iconBtn} aria-label="마이페이지">
            <User size={22} strokeWidth={1.8} />
          </Link>
          <Link to="/shelter" className={styles.iconBtn} aria-label="오늘의쉼터 지도">
            <MapPin size={22} strokeWidth={1.8} />
          </Link>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className={styles.iconBtn}
            aria-label="인스타그램"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 햄버거 버튼 클릭 시 펼쳐지는 메뉴 (모바일 & 빠른 이동) */}
      {menuOpen && (
        <div className={styles.drawer}>
          <nav className={styles.drawerNav} aria-label="모바일 메뉴">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/mypage"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ''}`
              }
            >
              마이페이지
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
