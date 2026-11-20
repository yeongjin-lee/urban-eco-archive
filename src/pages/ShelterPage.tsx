import {
  CategoryShowcase,
  type CategoryItem,
} from '../components/CategoryShowcase'
import aboutForestImg from '../assets/images/about-forest.jpg'
import shelterRestImg from '../assets/images/shelter-rest.jpg'
import shelterQuietImg from '../assets/images/shelter-quiet.jpg'
import shelterWalkImg from '../assets/images/shelter-walk.jpg'

const SHELTER_CATEGORIES: CategoryItem[] = [
  {
    id: 'breath',
    title: '숨 쉬기 좋은 곳',
    description: '푸른 나무와 맑은 공기 속 자연을 가까이 느끼는 공간',
    image: aboutForestImg,
    to: '/shelter/breath',
  },
  {
    id: 'rest',
    title: '쉬어가기 좋은 곳',
    description: '바쁜 일상 속 잠시 멈춰 여유를 되찾을 수 있는 공간',
    image: shelterRestImg,
    to: '/shelter/rest',
  },
  {
    id: 'quiet',
    title: '조용히 머물 곳',
    description: '도시의 소음에서 벗어나 고요한 시간을 보내는 공간',
    image: shelterQuietImg,
    to: '/shelter/quiet',
  },
  {
    id: 'walk',
    title: '걷기 좋은 곳',
    description: '초록빛 풍경을 따라 천천히 걸음을 이어가는 길',
    image: shelterWalkImg,
    to: '/shelter/walk',
  },
]

export function ShelterPage() {
  return (
    <CategoryShowcase
      badge="오늘의쉼터"
      headlineLines={[
        '일상 속 잠시 쉬어갈 수 있는 공간을 발견하고,',
        '바쁜 걸음 사이에 숨겨진 여유와',
        '작은 쉼의 순간들을 소개합니다.',
      ]}
      items={SHELTER_CATEGORIES}
    />
  )
}
