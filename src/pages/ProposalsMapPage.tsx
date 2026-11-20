import { useState } from 'react'
import { MapPin as MapPinIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EcoMapView, type MapPin } from '../components/EcoMapView'
import { INITIAL_PROPOSALS } from '../data/proposals'
import styles from './MapSplitPage.module.css'

const PROPOSAL_COORDS: Record<string, { lat: number; lng: number }> = {
  'prop-1': { lat: 37.6256, lng: 127.0731 },
  'prop-2': { lat: 37.6224, lng: 127.0689 },
  'prop-3': { lat: 37.6272, lng: 127.0846 },
  'prop-4': { lat: 37.6461, lng: 127.0785 },
}

export function ProposalsMapPage() {
  const [mobileTab, setMobileTab] = useState<'map' | 'list'>('list')
  const [selectedId, setSelectedId] = useState<string>(
    INITIAL_PROPOSALS[0]?.id ?? '',
  )

  const selectedProposal =
    INITIAL_PROPOSALS.find((p) => p.id === selectedId) ?? INITIAL_PROPOSALS[0]

  const pins: MapPin[] = INITIAL_PROPOSALS.map((p, index) => ({
    id: p.id,
    number: index + 1,
    title: p.title,
    address: p.location,
    lat: PROPOSAL_COORDS[p.id]?.lat ?? 37.6281,
    lng: PROPOSAL_COORDS[p.id]?.lng ?? 127.0904,
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
          <h1 className={styles.boxTitle}>녹색제안</h1>
          <div className={styles.topActions}>
            <Link to="/proposals" className={styles.pillAction}>
              전체 글 보기
            </Link>
          </div>
        </div>

        <p className={styles.selectedLocation}>
          선택한 위치: {selectedProposal?.location ?? '위치를 선택하세요'}
        </p>
        <hr className={styles.dottedRule} />

        <div className={styles.cardList}>
          {INITIAL_PROPOSALS.map((item, index) => {
            const isSelected = item.id === selectedProposal?.id
            return (
              <article
                key={item.id}
                className={`${styles.spotCard} ${isSelected ? styles.spotCardActive : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.spotImg}
                />
                <div>
                  <span className={styles.proposalTag}>{item.tag}</span>
                  <h2 className={styles.spotTitle}>
                    {index + 1}. {item.title}
                  </h2>
                  <p className={styles.spotSubtitle}>{item.description}</p>
                  <p className={styles.proposalLocation}>
                    <MapPinIcon size={14} />
                    <span>{item.location}</span>
                  </p>
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
          selectedPinId={selectedProposal?.id ?? null}
          onSelectPin={(id) => {
            setSelectedId(id)
            setMobileTab('list')
          }}
          accentColor="#5e7a2d"
        />
      </aside>
    </div>
  )
}
