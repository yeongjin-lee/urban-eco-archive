/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_APP_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void
        LatLng: new (lat: number, lng: number) => unknown
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number },
        ) => {
          setCenter: (latlng: unknown) => void
          panTo: (latlng: unknown) => void
          addControl: (control: unknown, position: unknown) => void
        }
        ZoomControl: new () => unknown
        ControlPosition: { RIGHT: unknown }
        CustomOverlay: new (options: {
          position: unknown
          content: HTMLElement
          yAnchor?: number
        }) => {
          setMap: (map: unknown) => void
        }
      }
    }
  }
}

export {}

