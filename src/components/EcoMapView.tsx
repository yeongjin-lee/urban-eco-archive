import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './EcoMapView.module.css'

export interface MapPin {
  id: string
  number: number
  title: string
  address: string
  lat: number
  lng: number
}

interface EcoMapViewProps {
  pins: MapPin[]
  selectedPinId: string | null
  onSelectPin: (id: string) => void
  accentColor?: string
}

// OpenStreetMap(Leaflet) 지도 — API 키가 없을 때 기본/대체 지도로 사용
function LeafletMap({
  pins,
  selectedPinId,
  onSelectPin,
  accentColor = '#0097b2',
}: EcoMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersLayerRef = useRef<L.LayerGroup | null>(null)
  const onSelectRef = useRef(onSelectPin)

  useEffect(() => {
    onSelectRef.current = onSelectPin
  }, [onSelectPin])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [37.6281, 127.0904],
      zoom: 15,
      zoomControl: true,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    const layerGroup = L.layerGroup().addTo(map)
    mapRef.current = map
    markersLayerRef.current = layerGroup

    return () => {
      map.remove()
      mapRef.current = null
      markersLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layerGroup = markersLayerRef.current
    if (!map || !layerGroup) return

    layerGroup.clearLayers()

    pins.forEach((pin) => {
      const isSelected = pin.id === selectedPinId
      const size = isSelected ? 38 : 28

      const icon = L.divIcon({
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        html: `<div class="${styles.pin}" style="
          width:${size}px;
          height:${size}px;
          background:${accentColor};
          border:${isSelected ? '3px solid #000' : '2px solid #fff'};
          font-size:${isSelected ? 16 : 13}px;
        ">${pin.number}</div>`,
      })

      const marker = L.marker([pin.lat, pin.lng], { icon })
      marker.bindTooltip(pin.title, { direction: 'top', offset: [0, -14] })
      marker.on('click', () => onSelectRef.current(pin.id))
      marker.addTo(layerGroup)

      if (isSelected) {
        map.panTo([pin.lat, pin.lng], { animate: true })
      }
    })
  }, [pins, selectedPinId, accentColor])

  return (
    <div className={styles.wrap}>
      <div ref={containerRef} className={styles.mapCanvas} />
    </div>
  )
}

// Kakao 지도 — VITE_KAKAO_MAP_APP_KEY가 있을 때 사용
function KakaoMap({
  appKey,
  pins,
  selectedPinId,
  onSelectPin,
  accentColor = '#0097b2',
  onFallback,
}: EcoMapViewProps & { appKey: string; onFallback: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<InstanceType<
    NonNullable<Window['kakao']>['maps']['Map']
  > | null>(null)
  const overlaysRef = useRef<
    Array<InstanceType<NonNullable<Window['kakao']>['maps']['CustomOverlay']>>
  >([])
  const [ready, setReady] = useState(false)
  const onSelectRef = useRef(onSelectPin)

  useEffect(() => {
    onSelectRef.current = onSelectPin
  }, [onSelectPin])

  useEffect(() => {
    const initMap = () => {
      if (!window.kakao?.maps || !containerRef.current) return
      window.kakao.maps.load(() => {
        if (!window.kakao?.maps || !containerRef.current) return
        const center = new window.kakao.maps.LatLng(37.6281, 127.0904)
        const map = new window.kakao.maps.Map(containerRef.current, {
          center,
          level: 5,
        })
        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)
        mapRef.current = map
        setReady(true)
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
    script.onerror = onFallback
    document.head.appendChild(script)
  }, [appKey, onFallback])

  useEffect(() => {
    const kakao = window.kakao
    const map = mapRef.current
    if (!ready || !kakao?.maps || !map) return

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
      })
      el.onclick = () => onSelectRef.current(pin.id)

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
  }, [pins, selectedPinId, ready, accentColor])

  return (
    <div className={styles.wrap}>
      <div ref={containerRef} className={styles.mapCanvas} />
    </div>
  )
}

// 환경변수(VITE_KAKAO_MAP_APP_KEY) 유무에 따라 카카오맵 ↔ OpenStreetMap 자동 선택
export function EcoMapView(props: EcoMapViewProps) {
  const appKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY?.trim()
  const [useFallback, setUseFallback] = useState(false)

  if (appKey && !useFallback) {
    return (
      <KakaoMap
        {...props}
        appKey={appKey}
        onFallback={() => setUseFallback(true)}
      />
    )
  }

  return <LeafletMap {...props} />
}
