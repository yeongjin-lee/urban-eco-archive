import { useEffect, useRef } from 'react'
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

// OpenStreetMap + Leaflet 기반 지도 컴포넌트 (API 키 없이 확대/이동 지원)
export function EcoMapView({
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

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19,
      },
    ).addTo(map)

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
