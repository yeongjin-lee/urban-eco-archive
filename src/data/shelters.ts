import shelterBreathImg from '../assets/images/shelter-breath.jpg'
import shelterQuietImg from '../assets/images/shelter-quiet.jpg'
import shelterRestImg from '../assets/images/shelter-rest.jpg'
import shelterWalkImg from '../assets/images/shelter-walk.jpg'

export interface ShelterMetric {
  label: string
  value: string
}

export interface ShelterSpot {
  id: string
  pinNumber: number
  category: 'breath' | 'rest' | 'quiet' | 'walk'
  categoryLabel: string
  title: string
  date: string
  subtitle: string
  address: string
  lat: number
  lng: number
  image: string
  metrics: ShelterMetric[]
}

export const SHELTER_SPOTS: ShelterSpot[] = [
  {
    id: 'shelter-1',
    pinNumber: 1,
    category: 'breath',
    categoryLabel: '숨 쉬기 좋은 곳',
    title: '경춘선숲길',
    date: '2026.11.14.',
    subtitle: '철길을 따라 초록이 이어지는 산책길',
    address: '서울 노원구 공릉동 126 (서울여자대학교 인근)',
    lat: 37.6248,
    lng: 127.0815,
    image: shelterBreathImg,
    metrics: [
      { label: '초미세먼지 (PM2.5)', value: '12㎍/㎥' },
      { label: '미세먼지 (PM10)', value: '28㎍/㎥' },
      { label: '경관점수', value: '85 / 100' },
    ],
  },
  {
    id: 'shelter-2',
    pinNumber: 2,
    category: 'walk',
    categoryLabel: '걷기 좋은 곳',
    title: '태릉 백세길',
    date: '2026.11.10.',
    subtitle: '나무 사이로 이어지는 고요한 산책길',
    address: '서울 노원구 공릉동 223-19 (태릉 입구)',
    lat: 37.6309,
    lng: 127.0956,
    image: shelterWalkImg,
    metrics: [
      { label: '평균 경사도', value: '3.2°' },
      { label: '녹지 피복률', value: '78.5%' },
      { label: '경관점수', value: '89 / 100' },
    ],
  },
  {
    id: 'shelter-3',
    pinNumber: 3,
    category: 'quiet',
    categoryLabel: '조용히 머물 곳',
    title: '서울여대 만주벌판 숲길',
    date: '2026.11.05.',
    subtitle: '캠퍼스 안쪽 조용히 사색하기 좋은 녹지',
    address: '서울 노원구 화랑로 621 (서울여자대학교)',
    lat: 37.6281,
    lng: 127.0904,
    image: shelterQuietImg,
    metrics: [
      { label: '소음 수준', value: '42 dB (조용)' },
      { label: '그늘 비율', value: '82%' },
      { label: '경관점수', value: '87 / 100' },
    ],
  },
  {
    id: 'shelter-4',
    pinNumber: 4,
    category: 'rest',
    categoryLabel: '쉬어가기 좋은 곳',
    title: '화랑대 철도공원 쉼터',
    date: '2026.10.29.',
    subtitle: '벤치와 나무 그늘이 어우러진 휴식 공간',
    address: '서울 노원구 화랑로 608 (화랑대 철도공원)',
    lat: 37.6232,
    lng: 127.0928,
    image: shelterRestImg,
    metrics: [
      { label: '벤치 수', value: '18개' },
      { label: '녹지 피복률', value: '71.0%' },
      { label: '경관점수', value: '84 / 100' },
    ],
  },
]
