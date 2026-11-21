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
    comments: 3,
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
    comments: 2,
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
    comments: 2,
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
    comments: 2,
    createdAt: '2026-10-15',
  },
]

export interface MockComment {
  id: string
  proposalId: string
  authorName: string
  content: string
  createdAt: string
}

export const INITIAL_COMMENTS: Record<string, MockComment[]> = {
  'prop-1': [
    {
      id: 'mock-c-1',
      proposalId: 'prop-1',
      authorName: '이초록',
      content: '맞아요, 여름 낮에 6번 출구 쪽은 그늘이 거의 없어서 꼭 필요해 보여요!',
      createdAt: '2026-11-15',
    },
    {
      id: 'mock-c-2',
      proposalId: 'prop-1',
      authorName: '김자반',
      content: '작은 쉼터 벤치도 같이 놓이면 어르신들이 쉬어가기 좋을 것 같아요.',
      createdAt: '2026-11-16',
    },
    {
      id: 'mock-c-3',
      proposalId: 'prop-1',
      authorName: '박연두',
      content: '공감합니다! 가로수 식재 적극 찬성해요.',
      createdAt: '2026-11-17',
    },
  ],
  'prop-2': [
    {
      id: 'mock-c-4',
      proposalId: 'prop-2',
      authorName: '윤땡미',
      content: '요즘 중랑천에 왜가리랑 오리들이 자주 보여서 보전이 정말 중요해요.',
      createdAt: '2026-11-11',
    },
    {
      id: 'mock-c-5',
      proposalId: 'prop-2',
      authorName: '이초록',
      content: '수변 식물 안내 팻말이 있으면 아이들과 관찰하기 더 좋을 듯합니다.',
      createdAt: '2026-11-12',
    },
  ],
  'prop-3': [
    {
      id: 'mock-c-6',
      proposalId: 'prop-3',
      authorName: '김슈니',
      content: '경춘선숲길 중간 구간에 그늘막 쉼터 생기면 정말 자주 이용할 것 같아요.',
      createdAt: '2026-10-29',
    },
    {
      id: 'mock-c-7',
      proposalId: 'prop-3',
      authorName: '박연두',
      content: '주말에 산책하는 사람이 많아서 벤치 추가가 꼭 필요해요!',
      createdAt: '2026-10-30',
    },
  ],
  'prop-4': [
    {
      id: 'mock-c-8',
      proposalId: 'prop-4',
      authorName: '김자반',
      content: '가을 단풍나무 수종 이름이 궁금했는데 안내판 생기면 좋겠네요.',
      createdAt: '2026-10-16',
    },
    {
      id: 'mock-c-9',
      proposalId: 'prop-4',
      authorName: '윤땡미',
      content: 'QR코드로 생태 설명을 볼 수 있어도 재미있을 것 같아요.',
      createdAt: '2026-10-18',
    },
  ],
}
