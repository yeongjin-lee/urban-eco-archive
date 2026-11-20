import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'
import aboutForestImg from '../assets/images/about-forest.jpg'
import homeHeroImg from '../assets/images/home-hero.jpg'
import magArchivingImg from '../assets/images/mag-archiving.jpg'
import magMemoryImg from '../assets/images/mag-memory.jpg'
import memoryHeroImg from '../assets/images/memory-hero.jpg'
import propParkImg from '../assets/images/prop-park.jpg'
import propStreetImg from '../assets/images/prop-street.jpg'
import shelterQuietImg from '../assets/images/shelter-quiet.jpg'
import shelterRestImg from '../assets/images/shelter-rest.jpg'
import shelterWalkImg from '../assets/images/shelter-walk.jpg'
import { EcoMapView, type MapPin } from '../components/EcoMapView'
import {
  ARCHIVING_HIGHLIGHTS,
  ECOLOGY_STORIES,
  GONGNEUNG_HISTORY,
  WALKING_COURSES,
} from '../data/magazineDetails'
import styles from './MagazineDetailPage.module.css'

const CATEGORY_TABS = [
  { id: 'walking', label: '산책 코스' },
  { id: 'memory', label: '공간의 기억' },
  { id: 'archiving', label: '녹색 아카이빙' },
  { id: 'ecology', label: '생태이야기' },
]

export function MagazineDetailPage() {
  const { category = 'walking' } = useParams<{ category?: string }>()
  const [selectedCourseId, setSelectedCourseId] = useState(
    WALKING_COURSES[0].id,
  )

  const activeCourse =
    WALKING_COURSES.find((c) => c.id === selectedCourseId) ?? WALKING_COURSES[0]

  const coursePins: MapPin[] = WALKING_COURSES.map((c) => ({
    id: c.id,
    number: c.number,
    title: c.title,
    address: c.address,
    lat: c.lat,
    lng: c.lng,
  }))

  return (
    <section className={styles.page}>
      {/* 상단 뒤로가기 + 카테고리 탭 */}
      <div className={styles.topNav}>
        <Link to="/magazine/categories" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>카테고리 전체</span>
        </Link>

        <div className={styles.tabs}>
          {CATEGORY_TABS.map((tab) => (
            <NavLink
              key={tab.id}
              to={`/magazine/${tab.id}`}
              className={({ isActive }) =>
                `${styles.tabPill} ${isActive ? styles.tabActive : ''}`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 1. 산책 코스 */}
      {category === 'walking' && (
        <div>
          <div className={styles.walkingHero}>
            <div className={styles.walkingIntroCard}>
              <div>
                <p className={styles.walkingSmall}>프로젝트 중심지</p>
                <h1 className={styles.walkingPlace}>서울여자대학교</h1>
                <p className={styles.walkingRoute}>Route · 공릉동</p>
              </div>
              <p className={styles.walkingSmall}>
                일상 속에서 쉬어갈 수 있는 장소와 산책 코스를 소개합니다.
              </p>
            </div>

            <div className={styles.walkingMapBox}>
              <EcoMapView
                pins={coursePins}
                selectedPinId={activeCourse.id}
                onSelectPin={setSelectedCourseId}
                accentColor="#5e7a2d"
              />
            </div>
          </div>

          <div className={styles.courseStepper}>
            {WALKING_COURSES.map((course) => {
              const isSelected = course.id === activeCourse.id
              return (
                <button
                  key={course.id}
                  type="button"
                  className={`${styles.courseBtn} ${isSelected ? styles.courseBtnActive : ''}`}
                  onClick={() => setSelectedCourseId(course.id)}
                >
                  <span className={styles.courseNum}>{course.number}</span>
                  <span className={styles.courseBtnTitle}>{course.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 2. 공간의 기억 (PDF 17페이지 시안 + 공릉동의 역사) */}
      {category === 'memory' && (
        <div>
          <div className={styles.memoryHeader}>
            <h1 className={styles.pageTitle}>공간의 기억</h1>
            <p className={styles.memorySub}>
              장소에 남겨진 추억과
              <br />
              사람 사는 이야기
            </p>
          </div>

          <img
            src={memoryHeroImg}
            alt="공릉동 철길 위 주민들의 모습"
            className={styles.memoryHeroImg}
          />

          <p className={styles.memoryTagline}>
            → A LOCATION-BASED ECOLOGICAL ARCHIVE AND DIGITAL NEIGHBORHOOD
            MAGAZINE.
          </p>
          <p className={styles.memoryLead}>Let’s turn over a local leaf.</p>

          <div className={styles.memoryIndexList}>
            <Link to="/magazine/history" className={styles.memoryIndexRow}>
              <ArrowRight size={16} />
              <span>공릉동의 역사, 시간을 거쳐온 우리의 동네 이야기</span>
            </Link>
            <Link to="/magazine/archiving" className={styles.memoryIndexRow}>
              <ArrowRight size={16} />
              <span>주민들이 기억하는 공릉동의 이야기</span>
            </Link>
            <Link to="/magazine/ecology" className={styles.memoryIndexRow}>
              <ArrowRight size={16} />
              <span>계절에 따라 변화하는 거리의 이야기</span>
            </Link>
            <Link to="/magazine/ecology" className={styles.memoryIndexRow}>
              <ArrowRight size={16} />
              <span>공릉동 생태 이야기</span>
            </Link>
          </div>

          <div className={styles.memoryFourGrid}>
            <Link to="/magazine/history" className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>공릉동의 역사</h2>
              <img
                src={shelterWalkImg}
                alt="공릉동의 역사"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                익숙한 골목 속 숨겨진 풍경을 발견하는 동네 산책 기록, 천천히
                걷다 보면 만나는 공릉동만의 이야기들
              </p>
            </Link>
            <article className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>주민들의 추억</h2>
              <img
                src={shelterRestImg}
                alt="주민들의 추억"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                공릉동에서 나고 자란 사람들, 떠나와 정착한 젊은이들, 이 동네
                사람들의 오래되고도 새로운 이야기
              </p>
            </article>
            <article className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>계절의 변화</h2>
              <img
                src={propParkImg}
                alt="계절의 변화"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                계절의 변화를 담은 공릉동의 이야기를 함께 주민들의 추억들과 함께
                이야기
              </p>
            </article>
            <article className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>
                공릉동 사는 사람들 이야기
              </h2>
              <img
                src={propStreetImg}
                alt="공릉동 사는 사람들 이야기"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                상인과 주민의 목소리로 만나는 진짜 공릉동 이야기. 사람들의 삶과
                일상이 쌓여 만들어가는 동네 기록
              </p>
            </article>
          </div>

          <h2 className={styles.memoryCircleTitle}>공릉동의 역사</h2>
          <div className={styles.memoryCircleGrid}>
            {[
              magArchivingImg,
              homeHeroImg,
              propParkImg,
              aboutForestImg,
              shelterRestImg,
              shelterWalkImg,
              shelterQuietImg,
              magMemoryImg,
            ].map((imgSrc, idx) => (
              <Link key={idx} to="/magazine/history">
                <img
                  src={imgSrc}
                  alt={`공릉동 기록 ${idx + 1}`}
                  className={styles.memoryCircleItem}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2-1. 공릉동의 역사 상세 */}
      {category === 'history' && (
        <div>
          <Link
            to="/magazine/memory"
            className={styles.backLink}
            style={{ marginBottom: '20px' }}
          >
            <ArrowLeft size={16} />
            <span>공간의 기억으로 돌아가기</span>
          </Link>
          <h1 className={styles.pageTitle}>공릉동의 역사</h1>
          <p className={styles.pageLead}>
            시간의 흐름 속에서 공릉동의 자연과 마을이 어떻게 변해왔는지 기록합니다.
          </p>
          <div className={styles.timelineGrid}>
            {GONGNEUNG_HISTORY.map((item) => (
              <article key={item.era} className={styles.timelineCard}>
                <h2 className={styles.timelineEra}>{item.era}</h2>
                <p className={styles.timelineSub}>{item.subtitle}</p>
                <p className={styles.timelineBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. 녹색 아카이빙 */}
      {category === 'archiving' && (
        <div>
          <h1 className={styles.pageTitle}>녹색 아카이빙</h1>
          <p className={styles.pageLead}>
            주민들이 직접 발견한 장소와 관찰 기록, 인터뷰 이야기를 모아봅니다.
          </p>
          <div className={styles.storyGrid}>
            {ARCHIVING_HIGHLIGHTS.map((item) => (
              <article key={item.id} className={styles.storyCard}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{item.title}</h2>
                <p className={styles.storyEn}>
                  {item.author} · {item.date}
                </p>
                <p className={styles.storyPara}>{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 4. 생태이야기 (9개 카드) */}
      {category === 'ecology' && (
        <div>
          <h1 className={styles.pageTitle}>생태이야기</h1>
          <p className={styles.pageLead}>
            공릉동의 식물, 계절, 골목 정원, 그리고 함께 살아가는 생명들의 이야기
          </p>
          <div className={styles.storyGrid}>
            {ECOLOGY_STORIES.map((story) => (
              <article key={story.id} className={styles.storyCard}>
                <img
                  src={story.image}
                  alt={story.title}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{story.title}</h2>
                <p className={styles.storyEn}>{story.englishTitle}</p>
                {story.paragraphs.map((p) => (
                  <p key={p} className={styles.storyPara}>
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
