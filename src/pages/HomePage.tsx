import { Link } from 'react-router-dom'
import homeHeroImg from '../assets/images/home-hero.jpg'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.section}>
      <div className={styles.copy}>
        <h1 className={styles.title}>
          도시의 생태를
          <br />
          기록하고,
          <br />
          함께 지키다
        </h1>
        <p className={styles.subtitle}>
          시민의 참여로 모인 생태 기록이
          <br />더 건강한 도시를 만듭니다
        </p>
        <Link to="/proposals" className={styles.cta}>
          기록 시작하기
        </Link>
      </div>

      <div className={styles.media}>
        <img
          src={homeHeroImg}
          alt="공원에서 산책하고 휴식하는 시민들의 모습"
          className={styles.heroImg}
        />
      </div>
    </section>
  )
}
