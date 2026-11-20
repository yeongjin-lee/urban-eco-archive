import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EcoMapView, type MapPin } from '../components/EcoMapView'
import { SHELTER_SPOTS } from '../data/shelters'
import styles from './MapSplitPage.module.css'

export function ShelterMapPage() {
  const { category } = useParams<{ category?: string }>()
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'default' | 'score'>('default')

  // 카테고리 주소(/shelter/breath 등)에 맞게 필터링 (없으면 전체 표시)
  const spots =
    category && category !== 'all'
      ? SHELTER_SPOTS.filter((s) => s.category === category)
      : SHELTER_SPOTS

  const baseSpots = spots.length > 0 ? spots : SHELTER_SPOTS
  const displaySpots =
    sortBy === 'score'
      ? [...baseSpots].sort((a, b) => {
          const scoreA = parseInt(
            a.metrics.find((m) => m.label === '경관점수')?.value ?? '0',
            10,
          )
          const scoreB = parseInt(
            b.metrics.find((m) => m.label === '경관점수')?.value ?? '0',
            10,
          )
          return scoreB - scoreA
        })
      : baseSpots
  const [selectedId, setSelectedId] = useState<string>(displaySpots[0]?.id ?? '')

  const selectedSpot =
    displaySpots.find((s) => s.id === selectedId) ?? displaySpots[0]

  const pins: MapPin[] = displaySpots.map((s) => ({
    id: s.id,
    number: s.pinNumber,
    title: s.title,
    address: s.address,
    lat: s.lat,
    lng: s.lng,
  }))

  return (
    <div className={styles.page}>
      <div className={styles.mobileTabs}>
        <button
          type="button"
          className={`${styles.mobileTabBtn} ${mobileTab === 'list' ? styles.mobileTabActive : ''}`}
          onClick={() => setMobileTab('list')}
        >
          목록 보기
        </button>
        <button
          type="button"
          className={`${styles.mobileTabBtn} ${mobileTab === 'map' ? styles.mobileTabActive : ''}`}
          onClick={() => setMobileTab('map')}
        >
          지도 보기
        </button>
      </div>

      <section
        className={`${styles.leftPane} ${mobileTab === 'map' ? styles.hiddenMobile : ''}`}
      >
        <div className={styles.topBar}>
          <h1 className={styles.boxTitle}>오늘의쉼터</h1>
          <div className={styles.topActions}>
            <select
              aria-label="정렬 기준"
              className={styles.pillAction}
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'default' | 'score')
              }
            >
              <option value="default">기본순</option>
              <option value="score">추천 점수순</option>
            </select>
            <Link to="/shelter" className={styles.pillAction}>
              카테고리
            </Link>
            <Link to="/shelter/all" className={styles.pillAction}>
              전체 보기
            </Link>
          </div>
        </div>

        <p className={styles.selectedLocation}>
          선택한 위치: {selectedSpot?.address ?? '위치를 선택하세요'}
        </p>
        <hr className={styles.dottedRule} />

        <div className={styles.cardList}>
          {displaySpots.map((spot) => {
            const isSelected = spot.id === selectedSpot?.id
            return (
              <article
                key={spot.id}
                className={`${styles.spotCard} ${isSelected ? styles.spotCardActive : ''}`}
                onClick={() => setSelectedId(spot.id)}
              >
                <img
                  src={spot.image}
                  alt={spot.title}
                  className={styles.spotImg}
                />
                <div>
                  <div className={styles.spotHead}>
                    <div>
                      <span className={styles.spotTitle}>
                        {spot.pinNumber}. {spot.title}
                      </span>
                      <span className={styles.spotDate}>{spot.date}</span>
                    </div>
                    <span className={styles.spotCategory}>
                      {spot.categoryLabel}
                    </span>
                  </div>
                  <p className={styles.spotSubtitle}>{spot.subtitle}</p>

                  <table className={styles.metricTable}>
                    <tbody>
                      {spot.metrics.map((m) => (
                        <tr key={m.label}>
                          <td>{m.label}</td>
                          <td>{m.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <aside
        className={`${styles.rightPane} ${mobileTab === 'list' ? styles.hiddenMobile : ''}`}
      >
        <EcoMapView
          pins={pins}
          selectedPinId={selectedSpot?.id ?? null}
          onSelectPin={(id) => {
            setSelectedId(id)
            setMobileTab('list')
          }}
          accentColor="#0097b2"
        />
      </aside>
    </div>
  )
}
