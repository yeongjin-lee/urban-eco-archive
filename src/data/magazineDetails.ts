import c1Icon from '../assets/courses/c1-icon.png'
import c1Left from '../assets/courses/c1-left.png'
import c1Right from '../assets/courses/c1-right.png'
import c2Icon from '../assets/courses/c2-icon.png'
import c2Left from '../assets/courses/c2-left.png'
import c2Right from '../assets/courses/c2-right.png'
import c3Icon from '../assets/courses/c3-icon.png'
import c3Left from '../assets/courses/c3-left.png'
import c3Right from '../assets/courses/c3-right.png'
import c4Icon from '../assets/courses/c4-icon.png'
import c4Left from '../assets/courses/c4-left.png'
import c4Right from '../assets/courses/c4-right.png'
import c5Icon from '../assets/courses/c5-icon.png'
import c5Left from '../assets/courses/c5-left.png'
import c5Right from '../assets/courses/c5-right.png'
import c6Icon from '../assets/courses/c6-icon.png'
import c6Left from '../assets/courses/c6-left.png'
import c6Right from '../assets/courses/c6-right.png'
import arc1Img from '../assets/images/arc-1.jpg'
import arc2Img from '../assets/images/arc-2.jpg'
import arc3Img from '../assets/images/arc-3.jpg'
import eco1Img from '../assets/images/eco-1.jpg'
import eco2Img from '../assets/images/eco-2.jpg'
import eco3Img from '../assets/images/eco-3.jpg'
import eco4Img from '../assets/images/eco-4.jpg'
import eco5Img from '../assets/images/eco-5.jpg'
import eco6Img from '../assets/images/eco-6.jpg'
import eco7Img from '../assets/images/eco-7.jpg'
import eco8Img from '../assets/images/eco-8.jpg'
import eco9Img from '../assets/images/eco-9.jpg'
import hist1Img from '../assets/images/hist-1.jpg'
import hist2Img from '../assets/images/hist-2.jpg'
import hist3Img from '../assets/images/hist-3.jpg'
import hist4Img from '../assets/images/hist-4.jpg'
import hist5Img from '../assets/images/hist-5.jpg'
import hist6Img from '../assets/images/hist-6.jpg'

export interface WalkingCourse {
  id: string
  number: number
  title: string
  start: string
  end: string
  distance: string
  duration: string
  description: string
  lat: number
  lng: number
  address: string
  iconImg: string
  leftPhoto: string
  rightPhoto: string
}

export const WALKING_COURSES: WalkingCourse[] = [
  {
    id: 'course-1',
    number: 1,
    title: '서울여대 산책 코스',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '캠퍼스 안쪽 푸른 소나무 숲과 잔디광장을 따라 천천히 걸으며 사계절 변화를 느끼는 코스입니다.',
    lat: 37.6281,
    lng: 127.0904,
    address: '서울 노원구 화랑로 621',
    iconImg: c1Icon,
    leftPhoto: c1Left,
    rightPhoto: c1Right,
  },
  {
    id: 'course-2',
    number: 2,
    title: '아이와 함께 하는 산책 코스',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '경사가 완만하고 벤치가 많아 아이와 함께 꽃과 나무를 관찰하며 안전하게 걷기 좋습니다.',
    lat: 37.6232,
    lng: 127.0928,
    address: '서울 노원구 화랑로 608',
    iconImg: c2Icon,
    leftPhoto: c2Left,
    rightPhoto: c2Right,
  },
  {
    id: 'course-3',
    number: 3,
    title: '녹색 공간',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '주택가와 상점 앞 골목 모퉁이에 주민들이 가꾼 작은 화단과 가로수 그늘을 만나는 길입니다.',
    lat: 37.6256,
    lng: 127.0731,
    address: '서울 노원구 공릉로',
    iconImg: c3Icon,
    leftPhoto: c3Left,
    rightPhoto: c3Right,
  },
  {
    id: 'course-4',
    number: 4,
    title: '공원',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '옛 철길을 따라 이어지는 도심 선형 공원으로, 초록 나무와 휴게 공간이 조화를 이룹니다.',
    lat: 37.6248,
    lng: 127.0815,
    address: '서울 노원구 공릉동 126',
    iconImg: c4Icon,
    leftPhoto: c4Left,
    rightPhoto: c4Right,
  },
  {
    id: 'course-5',
    number: 5,
    title: '계절 스팟',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '봄의 벚꽃, 여름의 짙은 녹음, 가을 단풍과 겨울 설경까지 계절마다 다른 풍경을 선사합니다.',
    lat: 37.6309,
    lng: 127.0956,
    address: '서울 노원구 공릉동 223-19',
    iconImg: c5Icon,
    leftPhoto: c5Left,
    rightPhoto: c5Right,
  },
  {
    id: 'course-6',
    number: 6,
    title: '러닝 코스',
    start: '',
    end: '',
    distance: '',
    duration: '',
    description:
      '탁 트인 하천 바람을 맞으며 일정한 페이스로 달리기 좋은 중랑천 대표 수변 러닝 코스입니다.',
    lat: 37.6224,
    lng: 127.0689,
    address: '서울 노원구 중랑천 산책로',
    iconImg: c6Icon,
    leftPhoto: c6Left,
    rightPhoto: c6Right,
  },
]

export interface HistoryTimelineItem {
  era: string
  subtitle: string
  body: string
  image: string
}

export const GONGNEUNG_HISTORY: HistoryTimelineItem[] = [
  {
    era: '지명의 유래',
    subtitle: 'The Origin of the Name',
    image: hist1Img,
    body: '옛 자연마을인 공덕리(孔德里)의 ‘공(孔)’과 문정왕후의 능인 태릉(泰陵)의 ‘릉(陵)’ 두 지명이 결합되면서 오늘날의 공릉동이라는 이름이 탄생했다.',
  },
  {
    era: '1914년',
    subtitle: 'Administrative Reorganization',
    image: hist2Img,
    body: '1914년 행정구역 개편으로 양주군 노원면과 해등촌면이 통합되어 노해면이 만들어졌다. 과정에서 기존의 여러 자연마을이 공덕리로 통합되면서 공릉동 지역의 행정적 기반이 형성되었다.',
  },
  {
    era: '왕릉과 능행로',
    subtitle: 'Royal Tombs and the Royal Processional Route',
    image: hist3Img,
    body: '공릉동에는 조선 제11대 중종의 계비 문정왕후의 능인 태릉과 제13대 명종과 인순왕후의 능인 강릉이 자리하고 있다.',
  },
  {
    era: '1962~1963년',
    subtitle: 'Incorporation into Seoul',
    image: hist4Img,
    body: '1962년 말 행정구역 개편을 거쳐 1963년 1월 1일, 경기도 양주군 노해면 공덕리가 서울특별시에 편입되었다. 이 시기를 전후해 공릉동이라는 행정지명이 정착하면서 서울의 도시 공간으로 편입되기 시작했다.',
  },
  {
    era: '일제강점기 이후',
    subtitle: 'After the Japanese Colonial Period',
    image: hist5Img,
    body: '일제강점기에는 제생원 양육부와 1939년 개통된 경춘철도 등 새로운 시설과 교통 기반이 들어서면서 지역의 변화가 시작되었다. 해방 이후에는 교육기관과 군사·체육시설 등이 들어섰고, 1970년대부터 도로 개통과 주거지 개발을 거치며 도시화가 진행되었다.',
  },
  {
    era: '현재의 모습',
    subtitle: 'Gongneung-dong Today',
    image: hist6Img,
    body: '오늘날 공릉동은 주거지역과 대학가, 전통시장, 생활문화 공간이 어우러진 지역으로 자리 잡았다. 태릉과 강릉의 역사적 경관, 경춘선숲길과 같은 녹지 공간이 공존하며 과거와 현재의 도시 풍경을 함께 보여준다.',
  },
]

export interface EcologyStory {
  id: string
  title: string
  englishTitle: string
  paragraphs: string[]
  image: string
}

export const ECOLOGY_STORIES: EcologyStory[] = [
  {
    id: 'eco-1',
    title: '길에 만나는 식물',
    englishTitle: 'Plants Found in Gongneung',
    image: eco1Img,
    paragraphs: [
      '공릉동의 가로수와 공원, 골목길 화단에서 다양한 나무와 식물을 만날 수 있다.',
      '일상적인 산책길에서 발견할 수 있는 지역의 식물과 녹지 공간을 살펴본다.',
    ],
  },
  {
    id: 'eco-2',
    title: '계절마다 달라지는 풍경',
    englishTitle: 'Seasonal Changes in the Neighborhood',
    image: eco2Img,
    paragraphs: [
      '봄에는 꽃이 피고 여름에는 짙은 녹음이 동네를 채운다.',
      '가을의 단풍과 겨울의 나뭇가지까지 계절에 따라 변화하는 공릉동의 풍경을 기록한다.',
    ],
  },
  {
    id: 'eco-3',
    title: '골목길의 작은 정원',
    englishTitle: 'Street Gardens and Urban Planting',
    image: eco3Img,
    paragraphs: [
      '주택가와 상점 앞, 골목 모퉁이에 자리한 작은 화단은 동네에 생기를 더한다.',
      '다양한 식재 방식과 주민들이 가꾸는 식물 공간을 관찰한다.',
    ],
  },
  {
    id: 'eco-4',
    title: '도시를 지키는 나무와 녹지',
    englishTitle: 'The Role of Urban Trees and Green Spaces',
    image: eco4Img,
    paragraphs: [
      '나무와 녹지는 그늘을 만들고 빗물을 흡수하며 도시의 열기를 완화하는 역할을 한다.',
      '도시 생태계의 건강과 쾌적한 생활환경을 위해 녹지가 왜 필요한지 알아본다.',
    ],
  },
  {
    id: 'eco-5',
    title: '일상에 스며든 작은 녹지',
    englishTitle: 'The Meaning of Everyday Green Spaces',
    image: eco5Img,
    paragraphs: [
      '집 앞 화단과 가로수, 작은 공터의 녹지는 바쁜 일상 속에서 자연을 만나는 기회를 제공한다.',
      '가까이에 있는 녹지가 주민들의 생활과 정서에 어떤 의미를 주는지 살펴본다.',
    ],
  },
  {
    id: 'eco-6',
    title: '걷고 머무는 공릉동',
    englishTitle: 'Walking and Resting in Gongneung-dong',
    image: eco6Img,
    paragraphs: [
      '경춘선숲길을 비롯한 공릉동의 산책 공간은 걷고 쉬며 주변 풍경을 즐길 수 있는 장소다.',
      '주민들이 자주 찾는 산책길과 휴식 공간의 특징을 소개한다.',
    ],
  },
  {
    id: 'eco-7',
    title: '도시의 열기와 그늘',
    englishTitle: 'Urban Heat and Shaded Spaces',
    image: eco7Img,
    paragraphs: [
      '건물과 도로가 밀집한 도시 공간은 여름철 열기가 쉽게 쌓인다.',
      '가로수와 녹지의 그늘이 보행 환경과 체감온도에 미치는 영향을 살펴본다.',
    ],
  },
  {
    id: 'eco-8',
    title: '동네에서 만나는 생명들',
    englishTitle: 'Birds and Insects in the Neighborhood',
    image: eco8Img,
    paragraphs: [
      '공원과 가로수, 화단은 새와 곤충에게 먹이와 서식 환경을 제공한다.',
      '산책길에서 만나는 새와 나비, 벌 등 작은 생명들을 관찰하며 도시 생태의 다양성을 알아본다.',
    ],
  },
  {
    id: 'eco-9',
    title: '우리 동네 생태 관찰하기',
    englishTitle: 'Observing Urban Ecology',
    image: eco9Img,
    paragraphs: [
      '산책하면서 식물의 이름과 개화 시기, 새와 곤충의 출현 장소 등을 기록할 수 있다.',
      '사진과 지도, 관찰 일지를 활용해 공릉동의 자연환경을 꾸준히 아카이빙하는 사람들의 이야기를 들어보자.',
    ],
  },
]

export const ARCHIVING_HIGHLIGHTS = [
  {
    id: 'arc-1',
    title: '주민 인터뷰: 공릉동 숲길의 사계절',
    author: '김슈니 · 주민 기록자',
    date: '2026.11.02',
    excerpt:
      '매일 아침 경춘선숲길을 걸으며 계절마다 달라지는 새소리와 꽃의 변화를 사진으로 남기고 있습니다.',
    image: arc1Img,
  },
  {
    id: 'arc-2',
    title: '중랑천 물억새와 철새 관찰 일지',
    author: '이초록 · 대학생 참여자',
    date: '2026.10.19',
    excerpt:
      '가을이 깊어지면 중랑천 수변을 따라 억새가 피어나고 청둥오리 가족들이 찾아옵니다.',
    image: arc2Img,
  },
  {
    id: 'arc-3',
    title: '태릉 솔밭길의 오후 그늘 기록',
    author: '박연두 · 지역 활동가',
    date: '2026.10.04',
    excerpt:
      '오래된 소나무들이 만들어 주는 시원한 그늘과 흙길의 감촉이 도심 속 가장 큰 쉼을 줍니다.',
    image: arc3Img,
  },
]
