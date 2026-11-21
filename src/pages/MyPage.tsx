import { useEffect, useState, type FormEvent } from 'react'
import {
  Bookmark,
  FileEdit,
  LogOut,
  MapPin,
  MessageSquare,
  Settings,
  Star,
  Trash2,
  User,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import aboutForestImg from '../assets/images/about-forest.jpg'
import magMemoryImg from '../assets/images/mag-memory.jpg'
import propStreamImg from '../assets/images/prop-stream.jpg'
import { useAuth } from '../contexts/AuthContext'
import { uploadEcoImage } from '../lib/storage'
import { supabase } from '../lib/supabase'
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

interface MyProposalItem {
  id: string
  tag: string
  title: string
  description: string
  location: string
  date: string
  image: string
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
  const { user, isConfigured, signOut, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<SideTab>('records')
  const [filterCat, setFilterCat] = useState<RecordCategory>('전체')
  const [records, setRecords] = useState<EcoRecord[]>(
    isConfigured ? [] : INITIAL_RECORDS,
  )
  const [myProposals, setMyProposals] = useState<MyProposalItem[]>([])
  const [bookmarkedProposals, setBookmarkedProposals] = useState<
    MyProposalItem[]
  >([])
  const [showAddForm, setShowAddForm] = useState(false)

  const [newCat, setNewCat] = useState<Exclude<RecordCategory, '전체'>>('식물')
  const [newTitle, setNewTitle] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // 프로필 정보 변경 상태
  const [editNickname, setEditNickname] = useState(
    (user?.user_metadata?.nickname as string | undefined) || '',
  )
  const [editLocationConsent, setEditLocationConsent] = useState(false)
  const [profileMsg, setProfileMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase || !user) return
    const client = supabase

    client
      .from('eco_records')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!data) return
        setRecords(
          data.map((row) => ({
            id: row.id,
            category: row.category,
            title: row.title,
            date: String(row.created_at).slice(0, 10).replaceAll('-', '.'),
            location: row.location,
            image: row.image_url || '',
            bookmarked: row.bookmarked,
          })),
        )
      })

    // 내가 작성한 녹색제안 불러오기
    client
      .from('proposals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (!data) return
        setMyProposals(
          data.map((row) => ({
            id: row.id,
            tag: row.tag,
            title: row.title,
            description: row.description,
            location: row.location,
            date: String(row.created_at).slice(0, 10).replaceAll('-', '.'),
            image: row.image_url || '',
          })),
        )
      })

    // 내가 북마크한 녹색제안 불러오기
    client
      .from('proposal_bookmarks')
      .select('proposal_id, proposals(*)')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!data) return
        const items: MyProposalItem[] = []
        data.forEach((row) => {
          const p = Array.isArray(row.proposals)
            ? row.proposals[0]
            : row.proposals
          if (!p) return
          items.push({
            id: p.id,
            tag: p.tag,
            title: p.title,
            description: p.description,
            location: p.location,
            date: String(p.created_at).slice(0, 10).replaceAll('-', '.'),
            image: p.image_url || '',
          })
        })
        setBookmarkedProposals(items)
      })
  }, [user])

  if (isConfigured && !user) {
    return (
      <section className={styles.content} style={{ textAlign: 'center' }}>
        <h1 className={styles.contentTitle}>로그인이 필요합니다</h1>
        <p
          style={{
            marginTop: '12px',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-serif)',
          }}
        >
          내 생태 기록과 제안, 즐겨찾기를 관리하려면 로그인해 주세요.
        </p>
        <Link
          to="/login"
          className={styles.addBtn}
          style={{ display: 'inline-block', marginTop: '24px' }}
        >
          로그인 / 회원가입 하러 가기
        </Link>
      </section>
    )
  }

  const displayName =
    (user?.user_metadata?.nickname as string | undefined) || '김슈니'
  const displayEmail = user?.email || 'kimmsWuniii@swu.ac.kr'

  const handleAddRecord = async (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || submitting) return
    setSubmitting(true)

    if (supabase && user) {
      const uploadedUrl = newFile
        ? await uploadEcoImage(newFile, user.id)
        : null
      const { data, error } = await supabase
        .from('eco_records')
        .insert({
          user_id: user.id,
          category: newCat,
          title: newTitle.trim(),
          location: newLocation.trim() || '서울 노원구 공릉동',
          image_url: uploadedUrl,
        })
        .select()
        .single()

      if (!error && data) {
        setRecords((prev) => [
          {
            id: data.id,
            category: data.category,
            title: data.title,
            date: String(data.created_at).slice(0, 10).replaceAll('-', '.'),
            location: data.location,
            image: data.image_url || '',
            bookmarked: data.bookmarked,
          },
          ...prev,
        ])
      }
    } else {
      setRecords((prev) => [
        {
          id: `rec-${Date.now()}`,
          category: newCat,
          title: newTitle.trim(),
          date: '2026.11.20',
          location: newLocation.trim() || '서울 노원구 공릉동',
          image: newFile ? URL.createObjectURL(newFile) : '',
          bookmarked: false,
        },
        ...prev,
      ])
    }

    setNewTitle('')
    setNewLocation('')
    setNewFile(null)
    setSubmitting(false)
    setShowAddForm(false)
  }

  const toggleBookmark = async (id: string) => {
    const target = records.find((r) => r.id === id)
    if (!target) return
    const nextValue = !target.bookmarked

    if (supabase && user) {
      await supabase
        .from('eco_records')
        .update({ bookmarked: nextValue })
        .eq('id', id)
    }

    setRecords((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, bookmarked: nextValue } : rec,
      ),
    )
  }

  const deleteRecord = async (id: string) => {
    if (supabase && user) {
      await supabase.from('eco_records').delete().eq('id', id)
    }
    setRecords((prev) => prev.filter((rec) => rec.id !== id))
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
      <aside className={styles.sidebar}>
        <div className={styles.profileBox}>
          <div className={styles.avatar}>
            <User size={38} />
          </div>
          <h1 className={styles.userName}>{displayName}</h1>
          <p className={styles.userEmail}>{displayEmail}</p>
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
            onClick={async () => {
              await signOut()
              navigate('/')
            }}
          >
            <LogOut size={18} />
            <span>로그아웃</span>
          </button>
        </nav>
      </aside>

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
                <input
                  type="file"
                  accept="image/*"
                  aria-label="사진 첨부"
                  onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? '저장 중...' : '저장'}
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

            {visibleRecords.length === 0 ? (
              <div className={styles.emptyPanel}>
                아직 저장된 기록이 없어요. 위 <strong>기록 추가하기</strong>를
                눌러 첫 기록을 남겨보세요!
              </div>
            ) : (
              <div className={styles.recordList}>
                {visibleRecords.map((rec) => (
                  <article key={rec.id} className={styles.recordRow}>
                    {rec.image ? (
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className={styles.recordImg}
                      />
                    ) : (
                      <div
                        className={styles.recordImg}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f3f5ef',
                          color: 'var(--color-text-muted)',
                          fontSize: '12px',
                        }}
                      >
                        사진 없음
                      </div>
                    )}
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
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className={styles.bookmarkBtn}
                        aria-label="기록 삭제"
                        onClick={() => deleteRecord(rec.id)}
                      >
                        <Trash2 size={20} />
                      </button>
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
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'proposals' && (
          <>
            <div className={styles.contentHead}>
              <h2 className={styles.contentTitle}>내 제안</h2>
              <Link to="/proposals" className={styles.addBtn}>
                녹색제안 보러가기
              </Link>
            </div>
            {myProposals.length === 0 ? (
              <div className={styles.emptyPanel}>
                아직 작성한 녹색제안이 없어요.{' '}
                <Link to="/proposals" style={{ textDecoration: 'underline' }}>
                  녹색제안 페이지
                </Link>
                에서 첫 제안을 남겨보세요!
              </div>
            ) : (
              <div className={styles.recordList}>
                {myProposals.map((item) => (
                  <article key={item.id} className={styles.recordRow}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.recordImg}
                      />
                    ) : (
                      <div
                        className={styles.recordImg}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f3f5ef',
                          color: 'var(--color-text-muted)',
                          fontSize: '12px',
                        }}
                      >
                        사진 없음
                      </div>
                    )}
                    <div>
                      <p className={styles.recordCat}>{item.tag}</p>
                      <h3 className={styles.recordTitle}>{item.title}</h3>
                      <div className={styles.recordMeta}>
                        <span>{item.date}</span>
                        <span className={styles.recordLoc}>
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.bookmarkBtn}
                      aria-label="제안 삭제"
                      onClick={async () => {
                        if (supabase && user) {
                          await supabase
                            .from('proposals')
                            .delete()
                            .eq('id', item.id)
                        }
                        setMyProposals((prev) =>
                          prev.filter((p) => p.id !== item.id),
                        )
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'favorites' && (
          <>
            <h2 className={styles.contentTitle}>즐겨찾기</h2>
            {records.filter((r) => r.bookmarked).length === 0 &&
            bookmarkedProposals.length === 0 ? (
              <div className={styles.emptyPanel}>
                아직 북마크(저장)한 기록이나 녹색제안이 없어요.
              </div>
            ) : (
              <div className={styles.recordList}>
                {records
                  .filter((r) => r.bookmarked)
                  .map((rec) => (
                    <article key={rec.id} className={styles.recordRow}>
                      {rec.image ? (
                        <img
                          src={rec.image}
                          alt={rec.title}
                          className={styles.recordImg}
                        />
                      ) : (
                        <div
                          className={styles.recordImg}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f3f5ef',
                            color: 'var(--color-text-muted)',
                            fontSize: '12px',
                          }}
                        >
                          사진 없음
                        </div>
                      )}
                      <div>
                        <p className={styles.recordCat}>내 기록 · {rec.category}</p>
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

                {bookmarkedProposals.map((item) => (
                  <article key={item.id} className={styles.recordRow}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.recordImg}
                      />
                    ) : (
                      <div
                        className={styles.recordImg}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f3f5ef',
                          color: 'var(--color-text-muted)',
                          fontSize: '12px',
                        }}
                      >
                        사진 없음
                      </div>
                    )}
                    <div>
                      <p className={styles.recordCat}>녹색제안 · {item.tag}</p>
                      <h3 className={styles.recordTitle}>{item.title}</h3>
                      <div className={styles.recordMeta}>
                        <span>{item.date}</span>
                        <span className={styles.recordLoc}>
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.bookmarkBtn}
                      aria-label="북마크 해제"
                      onClick={async () => {
                        if (supabase && user) {
                          await supabase
                            .from('proposal_bookmarks')
                            .delete()
                            .eq('proposal_id', item.id)
                            .eq('user_id', user.id)
                        }
                        setBookmarkedProposals((prev) =>
                          prev.filter((p) => p.id !== item.id),
                        )
                      }}
                    >
                      <Bookmark size={22} fill="currentColor" />
                    </button>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <>
            <h2 className={styles.contentTitle}>프로필 정보 변경</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setProfileMsg(null)
                const err = await updateProfile(
                  editNickname.trim() || displayName,
                  editLocationConsent,
                )
                setProfileMsg(
                  err ? `저장 실패: ${err}` : '프로필 정보가 저장되었습니다!',
                )
              }}
              style={{
                marginTop: '24px',
                maxWidth: '420px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                이메일: <strong>{displayEmail}</strong>
              </p>
              <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: 700 }}>
                닉네임
                <input
                  type="text"
                  className={styles.input}
                  placeholder={displayName}
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                />
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={editLocationConsent}
                  onChange={(e) => setEditLocationConsent(e.target.checked)}
                />
                <span>위치기반 정보 활용 동의</span>
              </label>
              {profileMsg && (
                <p style={{ fontSize: '13px', color: 'var(--color-green-dark)' }}>
                  {profileMsg}
                </p>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                style={{ alignSelf: 'flex-start' }}
              >
                변경사항 저장
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
