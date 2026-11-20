import propParkImg from '../assets/images/prop-park.jpg'
import propShadeImg from '../assets/images/prop-shade.jpg'
import propStreamImg from '../assets/images/prop-stream.jpg'
import propStreetImg from '../assets/images/prop-street.jpg'

// TypeScript 인터페이스: 제안 글 1개의 데이터 모양(타입)을 미리 정해둡니다.
export interface Proposal {
  id: string
  tag: string
  title: string
  description: string
  location: string
  image: string
  likes: number
  comments: number
  createdAt: string
}

// 1단계용 가짜(더미) 데이터 — 2단계에서 Supabase DB 데이터로 교체합니다.
export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'prop-1',
    tag: '그늘',
    title: '공릉역 인근 보행로에 가로수 그늘을 더해요',
    description:
      '여름에 공릉역에서 주민센터로 가는 길이 너무 더워요. 가로수 보완 식재나 그늘 쉼터를 마련하면 좋겠습니다.',
    location: '서울 노원구 공릉역 6번 출구',
    image: propShadeImg,
    likes: 31,
    comments: 9,
    createdAt: '2026-11-14',
  },
  {
    id: 'prop-2',
    tag: '생태',
    title: '중랑천 생태환경을 더 건강하게 지켜요',
    description:
      '중랑천 주변 식물과 생물들이 더 잘 자랄 수 있도록 정비와 하천 관리가 이루어지면 좋겠습니다.',
    location: '서울 노원구 중랑천 산책로',
    image: propStreamImg,
    likes: 24,
    comments: 5,
    createdAt: '2026-11-10',
  },
  {
    id: 'prop-3',
    tag: '휴식·쉼터',
    title: '경춘선숲길 작은 쉼터 제안',
    description:
      '경춘선숲길 산책로 중간중간에 벤치와 그늘 공간을 더 두어, 산책하며 잠시 쉬어갈 수 있는 작은 쉼터를 만들면 좋겠어요.',
    location: '서울 노원구 공릉동 2,3동',
    image: propStreetImg,
    likes: 42,
    comments: 8,
    createdAt: '2026-10-28',
  },
  {
    id: 'prop-4',
    tag: '공원',
    title: '중계근린공원 산책길 안내판 보완',
    description:
      '단풍이 물드는 시기에 꼭 들르는 곳이에요. 나무 수종과 생태 설명 안내판이 더 있으면 산책이 즐거울 것 같아요.',
    location: '서울 노원구 중계근린공원',
    image: propParkImg,
    likes: 57,
    comments: 13,
    createdAt: '2026-10-15',
  },
]
