import { useState } from 'react'
import { Link } from 'react-router-dom'
import magArchivingImg from '../assets/images/mag-archiving.jpg'
import magEcologyImg from '../assets/images/mag-ecology.jpg'
import magMemoryImg from '../assets/images/mag-memory.jpg'
import { EcoMapView, type MapPin } from '../components/EcoMapView'
import introStyles from './MagazineMapHomePage.module.css'
import splitStyles from './MapSplitPage.module.css'

interface MagazineSpot {
  id: string
  pinNumber: number
  title: string
  categoryLabel: string
  categoryTo: string
  address: string
  description: string
  image: string
  lat: number
  lng: number
}

const MAGAZINE_SPOTS: MagazineSpot[] = [
  {
    id: 'mag-pin-1',
    pinNumber: 1,
    title: '서울여대 & 태릉 숲길 산책 코스',
    categoryLabel: '산책 코스',
    categoryTo: '/magazine/walking',
    address: '서울 노원구 화랑로 621 (서울여자대학교)',
    description:
      '캠퍼스 안쪽 솔밭길과 공릉동의 산책길들을 따라 걸으며 만나는 일상 속 쉼터 이야기.',
    image: magEcologyImg,
    lat: 37.6281,
    lng: 127.0904,
  },
  {
    id: 'mag-pin-2',
    pinNumber: 2,
    title: '공릉동의 역사와 주민들의 기억',
    categoryLabel: '공간의 기억',
    categoryTo: '/magazine/memory',
    address: '서울 노원구 공릉동 경춘선숲길 인근',
    description:
      '옛 공덕리와 태릉 능행로부터 오늘날의 공릉동까지, 장소에 남겨진 사람들의 기억.',
    image: magMemoryImg,
    lat: 37.6248,
    lng: 127.0815,
  },
  {
    id: 'mag-pin-3',
    pinNumber: 3,
    title: '우리 동네 식물과 생명들',
    categoryLabel: '생태이야기',
    categoryTo: '/magazine/ecology',
    address: '서울 노원구 화랑로 608 (화랑대 인근)',
    description:
      '길에서 만나는 식물, 골목길의 작은 정원, 계절마다 달라지는 공릉동의 생태 기록.',
    image: magArchivingImg,
    lat: 37.6232,
    lng: 127.0928,
  },
]

export function MagazineMapHomePage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState('서울 노원구 공릉동')

  const selectedSpot =
    MAGAZINE_SPOTS.find((s) => s.id === selectedId) ?? MAGAZINE_SPOTS[0]

  const pins: MapPin[] = MAGAZINE_SPOTS.map((s) => ({
    id: s.id,
    number: s.pinNumber,
    title: s.title,
    address: s.address,
    lat: s.lat,
    lng: s.lng,
  }))

  return (
    <div className={introStyles.page}>
      {selectedId === null ? (
        <section className={introStyles.introPane}>
          <span className={introStyles.badge}>매거진</span>
          <h1 className={introStyles.headline}>
            동네의 일상적인 장소를 관찰하고,
            <br />
            장소에 담긴 사람과
            <br />
            자연의 이야기를 수집합니다.
          </h1>
          <div className={introStyles.btnStack}>
            <button
              type="button"
              className={introStyles.outlineBtn}
              onClick={() => setSelectedId(MAGAZINE_SPOTS[0].id)}
            >
              점을 눌러 글을 확인해보세요!
            </button>
            <Link to="/magazine/categories" className={introStyles.outlineBtn}>
              카테고리별 글 보기
            </Link>
          </div>
        </section>
      ) : (
        <section className={splitStyles.leftPane}>
          <div className={splitStyles.topBar}>
            <h1 className={splitStyles.boxTitle}>매거진</h1>
            <div className={splitStyles.topActions}>
              <select
                aria-label="도시 선택"
                className={splitStyles.pillAction}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="서울 노원구 공릉동">서울 노원구 공릉동</option>
                <option value="서울 전체">서울 전체</option>
              </select>
              <Link to="/magazine/categories" className={splitStyles.pillAction}>
                카테고리별 글 보기
              </Link>
            </div>
          </div>

          <p className={splitStyles.selectedLocation}>
            선택한 위치 ({selectedCity}): {selectedSpot.address}
          </p>
          <hr className={splitStyles.dottedRule} />

          <div className={splitStyles.cardList}>
            {MAGAZINE_SPOTS.map((spot) => {
              const isSelected = spot.id === selectedSpot.id
              return (
                <article
                  key={spot.id}
                  className={`${splitStyles.spotCard} ${isSelected ? splitStyles.spotCardActive : ''}`}
                  onClick={() => setSelectedId(spot.id)}
                >
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className={splitStyles.spotImg}
                  />
                  <div>
                    <div className={splitStyles.spotHead}>
                      <span className={splitStyles.spotTitle}>
                        {spot.pinNumber}. {spot.title}
                      </span>
                      <Link
                        to={spot.categoryTo}
                        className={splitStyles.spotCategory}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {spot.categoryLabel}
                      </Link>
                    </div>
                    <p className={splitStyles.spotSubtitle}>
                      {spot.description}
                    </p>
                    <Link
                      to={spot.categoryTo}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-block',
                        marginTop: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'underline',
                      }}
                    >
                      이야기 읽기 →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      <aside className={introStyles.rightPane}>
        <EcoMapView
          pins={pins}
          selectedPinId={selectedId}
          onSelectPin={(id) => setSelectedId(id)}
          accentColor="#ff3131"
        />
      </aside>
    </div>
  )
}
