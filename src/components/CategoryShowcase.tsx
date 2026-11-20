import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './CategoryShowcase.module.css'

export interface CategoryItem {
  id: string
  title: string
  description: string
  image: string
  to: string
}

interface CategoryShowcaseProps {
  badge: string
  headlineLines: string[]
  items: CategoryItem[]
  backTo?: { to: string; label: string }
}

// 매거진 & 오늘의쉼터가 함께 사용하는 원형 카테고리 슬라이더 컴포넌트
export function CategoryShowcase({
  badge,
  headlineLines,
  items,
  backTo,
}: CategoryShowcaseProps) {
  // 가로 스크롤 영역을 직접 가리키기 위한 ref (좌우 화살표 버튼 클릭 시 이동)
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return
    const offset = direction === 'next' ? 360 : -360
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}
        >
          {backTo && (
            <Link
              to={backTo.to}
              className={styles.badge}
              style={{
                marginBottom: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ArrowLeft size={14} />
              <span>{backTo.label}</span>
            </Link>
          )}
          <span className={styles.badge} style={{ marginBottom: 0 }}>
            {badge}
          </span>
        </div>
        <h1 className={styles.headline}>
          {headlineLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < headlineLines.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </div>

      <div className={styles.carouselWrap}>
        <button
          type="button"
          className={`${styles.arrowBtn} ${styles.arrowPrev}`}
          aria-label="이전 카테고리"
          onClick={() => scrollByCard('prev')}
        >
          <ChevronLeft size={20} />
        </button>

        <div ref={trackRef} className={styles.track}>
          {items.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.circle}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.circleImg}
                />
              </div>
              <div className={styles.infoBox}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDesc}>{item.description}</p>
                <Link to={item.to} className={styles.detailBtn}>
                  자세히 보기
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrowBtn} ${styles.arrowNext}`}
          aria-label="다음 카테고리"
          onClick={() => scrollByCard('next')}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
