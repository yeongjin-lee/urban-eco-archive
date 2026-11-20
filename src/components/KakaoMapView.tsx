import { useEffect, useRef, useState } from 'react'
import styles from './KakaoMapView.module.css'

export interface MapPin {
  id: string
  number: number
  title: string
  address: string
  lat: number
  lng: number
}

interface KakaoMapViewProps {
  pins: MapPin[]
  selectedPinId: string | null
  onSelectPin: (id: string) => void
  accentColor?: string
}

// Kakao 지도 SDK를 동적으로 불러오고 번호 핀을 올리는 전용 컴포넌트
// (지도 관련 코드는 여기에만 모아두어 나중에 다른 지도로 바꾸기 쉽습니다)
export function KakaoMapView({
  pins,
  selectedPinId,
  onSelectPin,
  accentColor = '#0097b2',
}: KakaoMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<InstanceType<
    NonNullable<Window['kakao']>['maps']['Map']
  > | null>(null)
  const overlaysRef = useRef<
    Array<InstanceType<NonNullable<Window['kakao']>['maps']['CustomOverlay']>>
  >([])

  const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY
  const [sdkStatus, setSdkStatus] = useState<'idle' | 'ready' | 'error'>(
    appKey ? 'idle' : 'error',
  )

  // 1) Kakao 지도 스크립트 로드 & 지도 최초 생성
  useEffect(() => {
    if (!appKey) return

    const initMap = () => {
      if (!window.kakao?.maps || !containerRef.current) return
      window.kakao.maps.load(() => {
        if (!window.kakao?.maps || !containerRef.current) return
        const center = new window.kakao.maps.LatLng(37.6281, 127.0904) // 서울여대 / 공릉동 중심
        const map = new window.kakao.maps.Map(containerRef.current, {
          center,
          level: 5,
        })
        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
        mapRef.current = map
        setSdkStatus('ready')
      })
    }

    if (window.kakao?.maps) {
      initMap()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-map-sdk]',
    )
    if (existing) {
      existing.addEventListener('load', initMap)
      return () => existing.removeEventListener('load', initMap)
    }

    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`
    script.async = true
    script.dataset.kakaoMapSdk = 'true'
    script.onload = initMap
    script.onerror = () => setSdkStatus('error')
    document.head.appendChild(script)
  }, [appKey])

  // 2) 핀 목록이나 선택된 핀이 바뀔 때마다 지도 위 마커 다시 그리기
  useEffect(() => {
    const kakao = window.kakao
    const map = mapRef.current
    if (sdkStatus !== 'ready' || !kakao?.maps || !map) return

    // 기존 핀 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    overlaysRef.current = []

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId
      const el = document.createElement('button')
      el.type = 'button'
      el.title = pin.title
      el.textContent = String(pin.number)
      Object.assign(el.style, {
        width: isSelected ? '38px' : '28px',
        height: isSelected ? '38px' : '28px',
        borderRadius: '50%',
        backgroundColor: accentColor,
        color: '#ffffff',
        border: isSelected ? '3px solid #000000' : '2px solid #ffffff',
        fontWeight: '700',
        fontSize: isSelected ? '16px' : '13px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.28)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.15s ease',
      })
      el.onclick = () => onSelectPin(pin.id)

      const position = new kakao.maps.LatLng(pin.lat, pin.lng)
      const overlay = new kakao.maps.CustomOverlay({
        position,
        content: el,
        yAnchor: 0.5,
      })
      overlay.setMap(map)
      overlaysRef.current.push(overlay)

      if (isSelected) {
        map.panTo(position)
      }
    })
  }, [pins, selectedPinId, sdkStatus, accentColor, onSelectPin])

  // API 키가 없거나 도메인 등록 전일 때 보여주는 클릭 가능한 임시 지도
  if (sdkStatus === 'error') {
    return (
      <div className={styles.fallback}>
        <div className={styles.fallbackBanner}>
          <strong>Kakao 지도 연결 대기 중</strong>
          <br />
          <code>.env</code> 파일에 <code>VITE_KAKAO_MAP_APP_KEY</code>를
          넣으면 실제 카카오맵(확대/이동)이 표시됩니다.
          <br />
          아래 번호 핀을 눌러 목록과 연동을 먼저 테스트해 보세요.
        </div>

        <div className={styles.fallbackPins}>
          {pins.map((pin) => {
            const isSelected = pin.id === selectedPinId
            return (
              <button
                key={pin.id}
                type="button"
                className={styles.fallbackPinBtn}
                style={{
                  borderColor: isSelected ? '#000000' : '#a6a6a6',
                  backgroundColor: isSelected ? '#dfe9ce' : '#ffffff',
                }}
                onClick={() => onSelectPin(pin.id)}
              >
                <span
                  className={styles.fallbackPinBadge}
                  style={{ backgroundColor: accentColor }}
                >
                  {pin.number}
                </span>
                <span>{pin.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div ref={containerRef} className={styles.mapCanvas} />
    </div>
  )
}
