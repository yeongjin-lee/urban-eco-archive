import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ecoIconsStripImg from '../assets/courses/eco-icons.png'
import memCircle1Img from '../assets/images/mem-circle-1.jpg'
import memCircle2Img from '../assets/images/mem-circle-2.jpg'
import memCircle3Img from '../assets/images/mem-circle-3.jpg'
import memCircle4Img from '../assets/images/mem-circle-4.jpg'
import memCircle5Img from '../assets/images/mem-circle-5.jpg'
import memCircle6Img from '../assets/images/mem-circle-6.jpg'
import memCircle7Img from '../assets/images/mem-circle-7.jpg'
import memCircle8Img from '../assets/images/mem-circle-8.jpg'
import memCol1Img from '../assets/images/mem-col-1.jpg'
import memCol2Img from '../assets/images/mem-col-2.jpg'
import memCol3Img from '../assets/images/mem-col-3.jpg'
import memCol4Img from '../assets/images/mem-col-4.jpg'
import memoryHeroImg from '../assets/images/memory-hero.jpg'
import { EcoMapView, type MapPin } from '../components/EcoMapView'
import {
  ECOLOGY_STORIES,
  GONGNEUNG_HISTORY,
  PEOPLE_SPEAK_STORIES,
  RESIDENTS_STORIES,
  SEASONS_STORIES,
  WALKING_COURSES,
} from '../data/magazineDetails'
import styles from './MagazineDetailPage.module.css'

export function MagazineDetailPage() {
  const { category = 'walking' } = useParams<{ category?: string }>()
  const [openedCourseId, setOpenedCourseId] = useState<string | null>(null)

  const activeCourse =
    WALKING_COURSES.find((c) => c.id === openedCourseId) ?? WALKING_COURSES[0]

  const coursePins: MapPin[] = WALKING_COURSES.map((c) => ({
    id: c.id,
    number: c.number,
    title: c.title,
    address: c.address,
    lat: c.lat,
    lng: c.lng,
  }))

  const isMemorySubpage =
    category === 'history' ||
    category === 'residents' ||
    category === 'seasons' ||
    category === 'people'

  return (
    <section className={styles.page}>
      {/* 상단 뒤로가기 */}
      <div className={styles.topNav}>
        <Link
          to={isMemorySubpage ? '/magazine/memory' : '/magazine/categories'}
          className={styles.backLink}
        >
          <ArrowLeft size={16} />
          <span>
            {isMemorySubpage ? '공간의 기억으로' : '카테고리별 글 보기'}
          </span>
        </Link>
      </div>

      {/* 1. 산책 코스 (PDF 10페이지 목록 ↔ PDF 11~16페이지 개별 코스 상세) */}
      {category === 'walking' &&
        (openedCourseId === null ? (
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
                  selectedPinId={null}
                  onSelectPin={(id) => setOpenedCourseId(id)}
                  accentColor="#5e7a2d"
                />
              </div>
            </div>

            <div className={styles.courseStepper}>
              {WALKING_COURSES.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  className={styles.courseBtn}
                  onClick={() => setOpenedCourseId(course.id)}
                >
                  <span className={styles.courseNum}>{course.number}</span>
                  <span className={styles.courseBtnTitle}>{course.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <button
                type="button"
                className={styles.backLink}
                onClick={() => setOpenedCourseId(null)}
              >
                <ArrowLeft size={16} />
                <span>산책 코스 목록으로</span>
              </button>
            </div>

            <div className={styles.courseDetailGrid}>
              <div className={styles.courseLeftCol}>
                <img
                  src={activeCourse.iconImg}
                  alt=""
                  className={styles.courseIconImg}
                />
                <span className={styles.courseBadge}>{activeCourse.title}</span>
                <img
                  src={activeCourse.leftPhoto}
                  alt={activeCourse.title}
                  className={styles.courseLeftPhoto}
                />
              </div>

              <div className={styles.courseCenterMap}>
                <EcoMapView
                  pins={coursePins}
                  selectedPinId={activeCourse.id}
                  onSelectPin={(id) => setOpenedCourseId(id)}
                  accentColor="#5e7a2d"
                />
              </div>

              <div className={styles.courseRightCol}>
                <div className={styles.courseInfoBox}>
                  <p>출발지: {activeCourse.start}</p>
                  <p>도착지: {activeCourse.end}</p>
                  <p>거리: {activeCourse.distance}</p>
                  <p>시간: {activeCourse.duration}</p>
                </div>
                <img
                  src={ecoIconsStripImg}
                  alt=""
                  className={styles.ecoIconsStrip}
                />
                <img
                  src={activeCourse.rightPhoto}
                  alt={`${activeCourse.title} 풍경`}
                  className={styles.courseRightPhoto}
                />
              </div>
            </div>
          </div>
        ))}

      {/* 2. 공간의 기억 (PDF 17페이지) */}
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
            <Link to="/magazine/residents" className={styles.memoryIndexRow}>
              <ArrowRight size={16} />
              <span>주민들이 기억하는 공릉동의 이야기</span>
            </Link>
            <Link to="/magazine/seasons" className={styles.memoryIndexRow}>
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
                src={memCol1Img}
                alt="공릉동의 역사"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                익숙한 골목 속 숨겨진 풍경을 발견하는 동네 산책 기록, 천천히
                걷다 보면 만나는 공릉동만의 이야기들
              </p>
            </Link>
            <Link to="/magazine/residents" className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>주민들의 추억</h2>
              <img
                src={memCol2Img}
                alt="주민들의 추억"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                공릉동에서 나고 자란 사람들, 떠나와 정착한 젊은이들, 이 동네
                사람들의 오래되고도 새로운 이야기
              </p>
            </Link>
            <Link to="/magazine/seasons" className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>계절의 변화</h2>
              <img
                src={memCol3Img}
                alt="계절의 변화"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                계절의 변화를 담은 공릉동의 이야기를 함께 주민들의 추억들과 함께
                이야기
              </p>
            </Link>
            <Link to="/magazine/people" className={styles.memoryCol}>
              <h2 className={styles.memoryColTitle}>
                공릉동 사는 사람들 이야기
              </h2>
              <img
                src={memCol4Img}
                alt="공릉동 사는 사람들 이야기"
                className={styles.memoryColImg}
              />
              <p className={styles.memoryColDesc}>
                상인과 주민의 목소리로 만나는 진짜 공릉동 이야기. 사람들의 삶과
                일상이 쌓여 만들어가는 동네 기록
              </p>
            </Link>
          </div>

          <h2 className={styles.memoryCircleTitle}>공릉동의 역사</h2>
          <div className={styles.memoryCircleGrid}>
            {[
              memCircle1Img,
              memCircle2Img,
              memCircle3Img,
              memCircle4Img,
              memCircle5Img,
              memCircle6Img,
              memCircle7Img,
              memCircle8Img,
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

      {/* 2-1. 공릉동의 역사 (PDF 18페이지) */}
      {category === 'history' && (
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: '28px' }}>
            공릉동의 역사
          </h1>
          <div className={styles.storyGrid}>
            {GONGNEUNG_HISTORY.map((item) => (
              <article key={item.era} className={styles.storyCard}>
                <img
                  src={item.image}
                  alt={item.era}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{item.era}</h2>
                <p className={styles.storyEn}>{item.subtitle}</p>
                <p className={styles.storyPara}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 2-2. 주민들의 이야기 & 경춘선의 산책자 (PDF 19페이지) */}
      {category === 'residents' && (
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: '28px' }}>
            주민들의 이야기
          </h1>
          <div className={styles.storyGrid}>
            {RESIDENTS_STORIES.cards.map((card) => (
              <article key={card.id} className={styles.storyCard}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{card.title}</h2>
                <p className={styles.storyEn}>{card.subtitle}</p>
                <p className={styles.storyPara}>{card.body}</p>
              </article>
            ))}
          </div>

          <h2
            className={styles.pageTitle}
            style={{ marginTop: '56px', marginBottom: '20px' }}
          >
            {RESIDENTS_STORIES.interview.title}
          </h2>
          <article className={styles.storyCard}>
            <img
              src={RESIDENTS_STORIES.interview.banner}
              alt={RESIDENTS_STORIES.interview.title}
              className={styles.storyImg}
              style={{ height: '240px' }}
            />
            <h3 className={styles.storyTitle}>
              {RESIDENTS_STORIES.interview.questionTitle}
            </h3>
            {RESIDENTS_STORIES.interview.qa.map((line) => (
              <p key={line} className={styles.storyPara}>
                {line}
              </p>
            ))}
          </article>
        </div>
      )}

      {/* 2-3. 공릉동의 사계 & 사계 속 추억 (PDF 20페이지) */}
      {category === 'seasons' && (
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: '28px' }}>
            공릉동의 사계
          </h1>
          <div className={styles.storyGrid}>
            {SEASONS_STORIES.cards.map((card) => (
              <article key={card.id} className={styles.storyCard}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{card.title}</h2>
                <p className={styles.storyEn}>{card.subtitle}</p>
                <p className={styles.storyPara}>{card.body}</p>
              </article>
            ))}
          </div>

          <h2
            className={styles.pageTitle}
            style={{ marginTop: '56px', marginBottom: '20px' }}
          >
            {SEASONS_STORIES.interview.title}
          </h2>
          <article className={styles.storyCard}>
            <img
              src={SEASONS_STORIES.interview.banner}
              alt={SEASONS_STORIES.interview.title}
              className={styles.storyImg}
              style={{ height: '240px' }}
            />
            <h3 className={styles.storyTitle}>
              {SEASONS_STORIES.interview.questionTitle}
            </h3>
            {SEASONS_STORIES.interview.qa.map((line) => (
              <p key={line} className={styles.storyPara}>
                {line}
              </p>
            ))}
          </article>
        </div>
      )}

      {/* 2-4. 사는 사람들이 말하다. (PDF 21페이지) */}
      {category === 'people' && (
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: '28px' }}>
            사는 사람들이 말하다.
          </h1>
          <div className={styles.storyGrid}>
            {PEOPLE_SPEAK_STORIES.map((card) => (
              <article key={card.id} className={styles.storyCard}>
                <img
                  src={card.image}
                  alt={card.title}
                  className={styles.storyImg}
                />
                <h2 className={styles.storyTitle}>{card.title}</h2>
                <p className={styles.storyEn}>{card.subtitle}</p>
                <p className={styles.storyPara}>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* 3. 생태이야기 (PDF 22페이지 9개 카드) */}
      {category === 'ecology' && (
        <div>
          <h1 className={styles.pageTitle} style={{ marginBottom: '28px' }}>
            생태이야기
          </h1>
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
