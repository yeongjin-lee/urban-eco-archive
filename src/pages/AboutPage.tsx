import aboutBookIcon from '../assets/icons/about-book.png'
import aboutForestImg from '../assets/images/about-forest.jpg'
import aboutMapIcon from '../assets/icons/about-map.png'
import aboutDocIcon from '../assets/icons/about-doc.png'
import aboutPeopleIcon from '../assets/icons/about-people.png'
import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <section className={styles.section}>
      <div className={styles.hero}>
        <div>
          <h1 className={styles.title}>서비스 소개</h1>
          <p className={styles.desc}>
            SI-프론티어 「도시생태기록소」 팀이 개발하는
            <br />
            시민 참여형 플랫폼입니다.
            <br />
            도시의 다양한 생태 정보를 기록하고, 공유하며,
            <br />
            시민의 제안을 통해 더 건강한 도시 환경을 만들어갑니다.
          </p>
        </div>

        <div className={styles.imageBox}>
          <img
            src={aboutForestImg}
            alt="초록빛 숲속 풍경"
            className={styles.forestImg}
          />
        </div>
      </div>

      <div className={styles.features}>
        <article className={styles.featureCard}>
          <div className={styles.featureHead}>
            <img src={aboutBookIcon} alt="" className={styles.featureIcon} />
            <h2 className={styles.featureTitle}>데이터 기록</h2>
          </div>
          <p className={styles.featureDesc}>
            직접 관찰한 생태 정보를
            <br />
            사진, 위치와 함께 기록합니다.
          </p>
        </article>

        <article className={styles.featureCard}>
          <div className={styles.featureHead}>
            <img src={aboutMapIcon} alt="" className={styles.featureIcon} />
            <h2 className={styles.featureTitle}>지도 기반 확인</h2>
          </div>
          <p className={styles.featureDesc}>
            기록된 내용을 지도에서 확인하고
            <br />
            다양한 기록을 살펴봅니다.
          </p>
        </article>

        <article className={styles.featureCard}>
          <div className={styles.featureHead}>
            <img src={aboutDocIcon} alt="" className={styles.featureIcon} />
            <h2 className={styles.featureTitle}>제안 및 개선</h2>
          </div>
          <p className={styles.featureDesc}>
            도시 환경 개선을 위한 아이디어를
            <br />
            제안하고 반영합니다.
          </p>
        </article>

        <article className={styles.featureCard}>
          <div className={styles.featureHead}>
            <img src={aboutPeopleIcon} alt="" className={styles.featureIcon} />
            <h2 className={styles.featureTitle}>기록하기</h2>
          </div>
          <p className={styles.featureDesc}>
            직접 경험한 공간과 순간을
            <br />
            글로 남기고 함께 나눕니다.
          </p>
        </article>
      </div>
    </section>
  )
}
