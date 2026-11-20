import { useState, type FormEvent } from 'react'
import {
  Bookmark,
  FileEdit,
  LogOut,
  MapPin,
  MessageSquare,
  Settings,
  Star,
  User,
} from 'lucide-react'
import aboutForestImg from '../assets/images/about-forest.jpg'
import magMemoryImg from '../assets/images/mag-memory.jpg'
import propStreamImg from '../assets/images/prop-stream.jpg'
import styles from './MyPage.module.css'

type SideTab = 'records' | 'proposals' | 'favorites' | 'settings'
type RecordCategory = '전체' | '식물' | '동물' | '공간'

interface EcoRecord {
  id: string
  category: Exclude<RecordCategory, '전체'>
  title: string
  date: string
  location: string
  image: string
  bookmarked: boolean
}

const INITIAL_RECORDS: EcoRecord[] = [
  {
    id: 'rec-1',
    category: '식물',
    title: '서울숲의 느티나무',
    date: '2026.05.20',
    location: '서울 성동구 서울숲길',
    image: aboutForestImg,
    bookmarked: true,
  },
  {
    id: 'rec-2',
    category: '동물',
    title: '청계천의 오리 가족',
    date: '2026.06.01',
    location: '서울 종로구 청계천로',
    image: propStreamImg,
    bookmarked: false,
  },
  {
    id: 'rec-3',
    category: '공간',
    title: '연희동 골목',
    date: '2026.08.06',
    location: '서울 서대문구 연희로 11길',
    image: magMemoryImg,
    bookmarked: true,
  },
]

export function MyPage() {
  const [activeTab, setActiveTab] = useState<SideTab>('records')
  const [filterCat, setFilterCat] = useState<RecordCategory>('전체')
  const [records, setRecords] = useState<EcoRecord[]>(INITIAL_RECORDS)
  const [showAddForm, setShowAddForm] = useState(false)

  // 새 기록 추가 폼 입력값
  const [newCat, setNewCat] = useState<Exclude<RecordCategory, '전체'>>('식물')
  const [newTitle, setNewTitle] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const handleAddRecord = (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newItem: EcoRecord = {
      id: `rec-${Date.now()}`,
      category: newCat,
      title: newTitle.trim(),
      date: '2026.11.20',
      location: newLocation.trim() || '서울 노원구 공릉동',
      image: aboutForestImg,
      bookmarked: false,
    }
    setRecords((prev) => [newItem, ...prev])
    setNewTitle('')
    setNewLocation('')
    setShowAddForm(false)
  }

  const toggleBookmark = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, bookmarked: !rec.bookmarked } : rec,
      ),
    )
  }

  const counts = {
    전체: records.length,
    식물: records.filter((r) => r.category === '식물').length,
    동물: records.filter((r) => r.category === '동물').length,
    공간: records.filter((r) => r.category === '공간').length,
  }

  const visibleRecords =
    filterCat === '전체'
      ? records
      : records.filter((r) => r.category === filterCat)

  return (
    <div className={styles.page}>
      {/* 왼쪽 프로필 & 메뉴 */}
      <aside className={styles.sidebar}>
        <div className={styles.profileBox}>
          <div className={styles.avatar}>
            <User size={38} />
          </div>
          <h1 className={styles.userName}>김슈니</h1>
          <p className={styles.userEmail}>kimmsWuniii@swu.ac.kr</p>
          <button
            type="button"
            className={styles.editProfileBtn}
            onClick={() => setActiveTab('settings')}
          >
            프로필수정
          </button>
        </div>

        <nav className={styles.sideMenu} aria-label="마이페이지 메뉴">
          <button
            type="button"
            className={`${styles.sideItem} ${activeTab === 'records' ? styles.sideItemActive : ''}`}
            onClick={() => setActiveTab('records')}
          >
            <FileEdit size={18} />
            <span>내 기록</span>
          </button>
          <button
            type="button"
            className={`${styles.sideItem} ${activeTab === 'proposals' ? styles.sideItemActive : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            <MessageSquare size={18} />
            <span>내 제안</span>
          </button>
          <button
            type="button"
            className={`${styles.sideItem} ${activeTab === 'favorites' ? styles.sideItemActive : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Star size={18} />
            <span>즐겨찾기</span>
          </button>
          <button
            type="button"
            className={`${styles.sideItem} ${activeTab === 'settings' ? styles.sideItemActive : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>설정</span>
          </button>
          <button
            type="button"
            className={styles.sideItem}
            onClick={() =>
              alert('2단계(Supabase 연동)에서 실제 로그인/로그아웃이 연결됩니다!')
            }
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </nav>
      </aside>

      {/* 오른쪽 본문 */}
      <section className={styles.content}>
        {activeTab === 'records' && (
          <>
            <div className={styles.contentHead}>
              <h2 className={styles.contentTitle}>내 기록</h2>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setShowAddForm((prev) => !prev)}
              >
                {showAddForm ? '닫기' : '기록 추가하기'}
              </button>
            </div>

            {showAddForm && (
              <form className={styles.addForm} onSubmit={handleAddRecord}>
                <select
                  aria-label="분류"
                  className={styles.select}
                  value={newCat}
                  onChange={(e) =>
                    setNewCat(e.target.value as Exclude<RecordCategory, '전체'>)
                  }
                >
                  <option value="식물">식물</option>
                  <option value="동물">동물</option>
                  <option value="공간">공간</option>
                </select>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="예: 공릉동 벚나무 길"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="위치 (예: 서울 노원구 공릉동)"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
                <button type="submit" className={styles.submitBtn}>
                  저장
                </button>
              </form>
            )}

            <div className={styles.filterTabs}>
              {(['전체', '식물', '동물', '공간'] as RecordCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.filterTab} ${filterCat === cat ? styles.filterTabActive : ''}`}
                    onClick={() => setFilterCat(cat)}
                  >
                    {cat} {counts[cat]}
                  </button>
                ),
              )}
            </div>

            <div className={styles.recordList}>
              {visibleRecords.map((rec) => (
                <article key={rec.id} className={styles.recordRow}>
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className={styles.recordImg}
                  />
                  <div>
                    <p className={styles.recordCat}>{rec.category}</p>
                    <h3 className={styles.recordTitle}>{rec.title}</h3>
                    <div className={styles.recordMeta}>
                      <span>{rec.date}</span>
                      <span className={styles.recordLoc}>
                        <MapPin size={14} />
                        <span>{rec.location}</span>
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.bookmarkBtn}
                    aria-label="북마크"
                    onClick={() => toggleBookmark(rec.id)}
                  >
                    <Bookmark
                      size={22}
                      fill={rec.bookmarked ? 'currentColor' : 'none'}
                    />
                  </button>
                </article>
              ))}
            </div>
          </>
        )}

        {activeTab === 'proposals' && (
          <>
            <h2 className={styles.contentTitle}>내 제안</h2>
            <div className={styles.emptyPanel}>
              내가 작성한 녹색제안 목록이 이곳에 표시됩니다. (2단계 Supabase 연동
              예정)
            </div>
          </>
        )}

        {activeTab === 'favorites' && (
          <>
            <h2 className={styles.contentTitle}>즐겨찾기</h2>
            <div className={styles.recordList}>
              {records
                .filter((r) => r.bookmarked)
                .map((rec) => (
                  <article key={rec.id} className={styles.recordRow}>
                    <img
                      src={rec.image}
                      alt={rec.title}
                      className={styles.recordImg}
                    />
                    <div>
                      <p className={styles.recordCat}>{rec.category}</p>
                      <h3 className={styles.recordTitle}>{rec.title}</h3>
                      <div className={styles.recordMeta}>
                        <span>{rec.date}</span>
                        <span className={styles.recordLoc}>
                          <MapPin size={14} />
                          <span>{rec.location}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.bookmarkBtn}
                      aria-label="북마크 해제"
                      onClick={() => toggleBookmark(rec.id)}
                    >
                      <Bookmark size={22} fill="currentColor" />
                    </button>
                  </article>
                ))}
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <h2 className={styles.contentTitle}>설정</h2>
            <div className={styles.emptyPanel}>
              프로필 이름·알림 설정 기능은 2단계(Supabase 연동)에서 연결됩니다.
            </div>
          </>
        )}
      </section>
    </div>
  )
}
