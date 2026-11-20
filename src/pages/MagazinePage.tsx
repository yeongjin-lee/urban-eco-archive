import {
  CategoryShowcase,
  type CategoryItem,
} from '../components/CategoryShowcase'
import magMemoryImg from '../assets/images/mag-memory.jpg'
import magArchivingImg from '../assets/images/mag-archiving.jpg'
import magEcologyImg from '../assets/images/mag-ecology.jpg'
import shelterWalkImg from '../assets/images/shelter-walk.jpg'

const MAGAZINE_CATEGORIES: CategoryItem[] = [
  {
    id: 'walking',
    title: '산책 코스',
    description: '공릉동의 산책길들 들러볼 만한 곳',
    image: shelterWalkImg,
    to: '/magazine/walking',
  },
  {
    id: 'memory',
    title: '공간의 기억',
    description: '장소에 남겨진 추억과 사는 사람들 이야기',
    image: magMemoryImg,
    to: '/magazine/memory',
  },
  {
    id: 'archiving',
    title: '녹색 아카이빙',
    description: '직접 발견한 장소와 경험을 기록하기',
    image: magArchivingImg,
    to: '/magazine/archiving',
  },
  {
    id: 'ecology',
    title: '생태이야기',
    description: '공릉동의 자연과 생태 기록, 함께하는 존재들',
    image: magEcologyImg,
    to: '/magazine/ecology',
  },
]

export function MagazinePage() {
  return (
    <CategoryShowcase
      badge="매거진"
      backTo={{ to: '/magazine', label: '뒤로가기' }}
      headlineLines={[
        '동네의 일상적인 장소를 관찰하고,',
        '장소에 담긴 사람과',
        '자연의 이야기를 수집합니다.',
      ]}
      items={MAGAZINE_CATEGORIES}
    />
  )
}
