import { useEffect, useState, type FormEvent } from 'react'
import {
  Bookmark,
  Heart,
  MapPin,
  MessageCircle,
  Plus,
  Search,
  Trash2,
  Trees,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import propParkImg from '../assets/images/prop-park.jpg'
import { useAuth } from '../contexts/AuthContext'
import { INITIAL_PROPOSALS, type Proposal } from '../data/proposals'
import { uploadEcoImage } from '../lib/storage'
import { supabase } from '../lib/supabase'
import styles from './ProposalsPage.module.css'

type SortOption = 'latest' | 'likes' | 'comments'

interface ProposalWithOwner extends Proposal {
  userId?: string
  isDb?: boolean
}

interface ProposalComment {
  id: string
  proposalId: string
  userId?: string
  authorName: string
  content: string
  createdAt: string
}

export function ProposalsPage() {
  const { user, isConfigured } = useAuth()
  const navigate = useNavigate()

  const [proposals, setProposals] =
    useState<ProposalWithOwner[]>(INITIAL_PROPOSALS)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])
  const [commentsByProposal, setCommentsByProposal] = useState<
    Record<string, ProposalComment[]>
  >({})
  const [openCommentId, setOpenCommentId] = useState<string | null>(null)
  const [commentInput, setCommentInput] = useState('')

  // 제안 작성 폼 상태
  const [showForm, setShowForm] = useState(false)
  const [newTag, setNewTag] = useState('그늘')
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Supabase가 연결되어 있으면 글 · 좋아요 · 댓글 · 북마크를 함께 불러옵니다
  useEffect(() => {
    if (!supabase) return
    const client = supabase

    async function loadProposals() {
      const { data: rows } = await client
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false })

      if (!rows || rows.length === 0) return

      const [{ data: likesRows }, { data: commentRows }, bookmarkRes] =
        await Promise.all([
          client.from('proposal_likes').select('proposal_id, user_id'),
          client
            .from('proposal_comments')
            .select('*')
            .order('created_at', { ascending: true }),
          user
            ? client
                .from('proposal_bookmarks')
                .select('proposal_id')
                .eq('user_id', user.id)
            : Promise.resolve({ data: null }),
        ])

      const likeCountMap: Record<string, number> = {}
      const userLiked: string[] = []
      likesRows?.forEach((l) => {
        likeCountMap[l.proposal_id] = (likeCountMap[l.proposal_id] || 0) + 1
        if (user && l.user_id === user.id) userLiked.push(l.proposal_id)
      })

      const groupedComments: Record<string, ProposalComment[]> = {}
      commentRows?.forEach((c) => {
        const list = groupedComments[c.proposal_id] ?? []
        list.push({
          id: c.id,
          proposalId: c.proposal_id,
          userId: c.user_id,
          authorName: c.author_name,
          content: c.content,
          createdAt: String(c.created_at).slice(0, 10),
        })
        groupedComments[c.proposal_id] = list
      })

      const mapped: ProposalWithOwner[] = rows.map((row) => ({
        id: row.id,
        userId: row.user_id,
        isDb: true,
        tag: row.tag,
        title: row.title,
        description: row.description,
        location: row.location,
        image: row.image_url || propParkImg,
        likes: likeCountMap[row.id] ?? 0,
        comments: groupedComments[row.id]?.length ?? 0,
        createdAt: String(row.created_at).slice(0, 10),
      }))

      setProposals([...mapped, ...INITIAL_PROPOSALS])
      setLikedIds(userLiked)
      setCommentsByProposal(groupedComments)
      if (bookmarkRes.data) {
        setBookmarkedIds(bookmarkRes.data.map((b) => b.proposal_id))
      }
    }

    loadProposals()
  }, [user])

  const handleOpenForm = () => {
    if (isConfigured && !user) {
      navigate('/login')
      return
    }
    setShowForm((prev) => !prev)
  }

  const handleCreateProposal = async (e: FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newDesc.trim() || submitting) return
    setSubmitting(true)

    if (supabase && user) {
      const uploadedUrl = newFile
        ? await uploadEcoImage(newFile, user.id)
        : null
      const nickname =
        (user.user_metadata?.nickname as string | undefined) || '시민 기록자'
      const { data, error } = await supabase
        .from('proposals')
        .insert({
          user_id: user.id,
          author_name: nickname,
          tag: newTag,
          title: newTitle.trim(),
          description: newDesc.trim(),
          location: newLocation.trim() || '서울 노원구 공릉동',
          image_url: uploadedUrl,
        })
        .select()
        .single()

      if (!error && data) {
        setProposals((prev) => [
          {
            id: data.id,
            userId: data.user_id,
            isDb: true,
            tag: data.tag,
            title: data.title,
            description: data.description,
            location: data.location,
            image: data.image_url || propParkImg,
            likes: 0,
            comments: 0,
            createdAt: String(data.created_at).slice(0, 10),
          },
          ...prev,
        ])
      }
    } else {
      setProposals((prev) => [
        {
          id: `local-${Date.now()}`,
          tag: newTag,
          title: newTitle.trim(),
          description: newDesc.trim(),
          location: newLocation.trim() || '서울 노원구 공릉동',
          image: newFile ? URL.createObjectURL(newFile) : propParkImg,
          likes: 0,
          comments: 0,
          createdAt: '2026-11-20',
        },
        ...prev,
      ])
    }

    setNewTitle('')
    setNewDesc('')
    setNewLocation('')
    setNewFile(null)
    setSubmitting(false)
    setShowForm(false)
  }

  const handleDeleteProposal = async (id: string) => {
    if (supabase && user) {
      await supabase.from('proposals').delete().eq('id', id)
    }
    setProposals((prev) => prev.filter((item) => item.id !== id))
  }

  const handleToggleLike = async (item: ProposalWithOwner) => {
    const isLiked = likedIds.includes(item.id)

    if (item.isDb && supabase) {
      if (!user) {
        navigate('/login')
        return
      }
      if (isLiked) {
        await supabase
          .from('proposal_likes')
          .delete()
          .eq('proposal_id', item.id)
          .eq('user_id', user.id)
      } else {
        await supabase
          .from('proposal_likes')
          .insert({ proposal_id: item.id, user_id: user.id })
      }
      setProposals((prev) =>
        prev.map((p) =>
          p.id === item.id
            ? { ...p, likes: p.likes + (isLiked ? -1 : 1) }
            : p,
        ),
      )
    }

    setLikedIds((prev) =>
      isLiked ? prev.filter((id) => id !== item.id) : [...prev, item.id],
    )
  }

  const handleToggleBookmark = async (item: ProposalWithOwner) => {
    const isBookmarked = bookmarkedIds.includes(item.id)

    if (item.isDb && supabase) {
      if (!user) {
        navigate('/login')
        return
      }
      if (isBookmarked) {
        await supabase
          .from('proposal_bookmarks')
          .delete()
          .eq('proposal_id', item.id)
          .eq('user_id', user.id)
      } else {
        await supabase
          .from('proposal_bookmarks')
          .insert({ proposal_id: item.id, user_id: user.id })
      }
    }

    setBookmarkedIds((prev) =>
      isBookmarked ? prev.filter((id) => id !== item.id) : [...prev, item.id],
    )
  }

  const handleAddComment = async (
    e: FormEvent,
    item: ProposalWithOwner,
  ) => {
    e.preventDefault()
    if (!commentInput.trim()) return

    if (item.isDb && supabase) {
      if (!user) {
        navigate('/login')
        return
      }
      const nickname =
        (user.user_metadata?.nickname as string | undefined) || '시민'
      const { data, error } = await supabase
        .from('proposal_comments')
        .insert({
          proposal_id: item.id,
          user_id: user.id,
          author_name: nickname,
          content: commentInput.trim(),
        })
        .select()
        .single()

      if (!error && data) {
        const added: ProposalComment = {
          id: data.id,
          proposalId: data.proposal_id,
          userId: data.user_id,
          authorName: data.author_name,
          content: data.content,
          createdAt: String(data.created_at).slice(0, 10),
        }
        setCommentsByProposal((prev) => ({
          ...prev,
          [item.id]: [...(prev[item.id] ?? []), added],
        }))
        setProposals((prev) =>
          prev.map((p) =>
            p.id === item.id ? { ...p, comments: p.comments + 1 } : p,
          ),
        )
      }
    } else {
      const added: ProposalComment = {
        id: `c-${Date.now()}`,
        proposalId: item.id,
        authorName: '나',
        content: commentInput.trim(),
        createdAt: '2026-11-20',
      }
      setCommentsByProposal((prev) => ({
        ...prev,
        [item.id]: [...(prev[item.id] ?? []), added],
      }))
    }

    setCommentInput('')
  }

  const visibleProposals = proposals
    .filter((item) => {
      const q = searchQuery.trim().toLowerCase()
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes
      if (sortBy === 'comments') return b.comments - a.comments
      return b.createdAt.localeCompare(a.createdAt)
    })

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <span className={styles.titleIcon} aria-hidden="true">
          <Trees size={20} />
        </span>
        <h1 className={styles.title}>녹색 제안</h1>
      </div>
      <p className={styles.subtitle}>
        시민들이 직접 기록하고 제안하는 녹색 아이디어
      </p>

      {/* 정렬 & 검색 & 지도/글쓰기 컨트롤 */}
      <div className={styles.controls}>
        <select
          aria-label="정렬 기준"
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="latest">최신순</option>
          <option value="likes">인기순</option>
          <option value="comments">댓글순</option>
        </select>

        <div className={styles.searchWrap}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="녹색 제안을 검색해보세요. (예: 그늘, 휴식공간, 생태 등)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className={styles.searchIcon} aria-hidden="true" />
        </div>

        <Link
          to="/proposals/map"
          className={styles.sortSelect}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <MapPin size={16} />
          <span>지도에서 보기</span>
        </Link>

        <button
          type="button"
          className={styles.sortSelect}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--color-primary-tint)',
          }}
          onClick={handleOpenForm}
        >
          <Plus size={16} />
          <span>{showForm ? '닫기' : '제안 남기기'}</span>
        </button>
      </div>

      {/* 새 제안 작성 폼 */}
      {showForm && (
        <form
          onSubmit={handleCreateProposal}
          style={{
            marginTop: '20px',
            padding: '20px',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
            backgroundColor: '#fafbf8',
            display: 'grid',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              aria-label="태그"
              className={styles.sortSelect}
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            >
              <option value="그늘">그늘</option>
              <option value="생태">생태</option>
              <option value="휴식·쉼터">휴식·쉼터</option>
              <option value="공원">공원</option>
            </select>
            <input
              type="text"
              placeholder="위치 (예: 서울 노원구 공릉역 인근)"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                height: '40px',
                padding: '0 14px',
                border: '1px solid var(--color-border-muted)',
                borderRadius: '10px',
              }}
            />
          </div>
          <input
            type="text"
            placeholder="제안 제목을 입력하세요"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            style={{
              height: '40px',
              padding: '0 14px',
              border: '1px solid var(--color-border-muted)',
              borderRadius: '10px',
            }}
          />
          <textarea
            rows={3}
            placeholder="어떤 점이 개선되면 좋을지 자세히 적어주세요"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            required
            style={{
              padding: '10px 14px',
              border: '1px solid var(--color-border-muted)',
              borderRadius: '10px',
              fontFamily: 'inherit',
            }}
          />
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
            }}
          >
            <span>사진 첨부 (선택):</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            style={{
              justifySelf: 'end',
              padding: '10px 22px',
              borderRadius: '999px',
              backgroundColor: '#000',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
            }}
          >
            {submitting ? '업로드 중...' : '제안 등록하기'}
          </button>
        </form>
      )}

      {/* 제안 카드 목록 */}
      {visibleProposals.length === 0 ? (
        <p className={styles.empty}>검색어와 일치하는 녹색 제안이 아직 없어요.</p>
      ) : (
        <div className={styles.grid}>
          {visibleProposals.map((item) => {
            const isLiked = likedIds.includes(item.id)
            const isBookmarked = bookmarkedIds.includes(item.id)
            const likeCount = item.isDb
              ? item.likes
              : item.likes + (isLiked ? 1 : 0)
            const commentsList = commentsByProposal[item.id] ?? []
            const commentCount = item.isDb
              ? item.comments
              : item.comments + commentsList.length
            const canDelete =
              item.id.startsWith('local-') || (user && item.userId === user.id)
            const commentsOpen = openCommentId === item.id

            return (
              <article key={item.id} className={styles.card}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.thumb}
                />

                <div className={styles.cardBody}>
                  <span className={styles.tag}>{item.tag}</span>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardDesc}>{item.description}</p>

                  <div className={styles.cardMeta}>
                    <div className={styles.stats}>
                      <button
                        type="button"
                        className={`${styles.statBtn} ${isLiked ? styles.liked : ''}`}
                        aria-label="좋아요"
                        onClick={() => handleToggleLike(item)}
                      >
                        <Heart
                          size={19}
                          fill={isLiked ? 'currentColor' : 'none'}
                        />
                        <span>{likeCount}</span>
                      </button>

                      <button
                        type="button"
                        className={styles.statBtn}
                        aria-label="댓글 보기"
                        onClick={() =>
                          setOpenCommentId(commentsOpen ? null : item.id)
                        }
                      >
                        <MessageCircle size={19} />
                        <span>{commentCount}</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {canDelete && (
                        <button
                          type="button"
                          className={styles.bookmarkBtn}
                          aria-label="제안 삭제"
                          onClick={() => handleDeleteProposal(item.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                      <button
                        type="button"
                        className={styles.bookmarkBtn}
                        aria-label="북마크"
                        onClick={() => handleToggleBookmark(item)}
                      >
                        <Bookmark
                          size={19}
                          fill={isBookmarked ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                  </div>

                  {/* 댓글 펼침 영역 */}
                  {commentsOpen && (
                    <div
                      style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--color-border-muted)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      {commentsList.length === 0 ? (
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          첫 댓글을 남겨보세요!
                        </p>
                      ) : (
                        commentsList.map((c) => (
                          <div
                            key={c.id}
                            style={{
                              fontSize: '12.5px',
                              lineHeight: 1.45,
                              backgroundColor: '#fafbf8',
                              padding: '6px 10px',
                              borderRadius: '8px',
                            }}
                          >
                            <strong>{c.authorName}</strong> · {c.content}
                          </div>
                        ))
                      )}
                      <form
                        onSubmit={(e) => handleAddComment(e, item)}
                        style={{ display: 'flex', gap: '6px' }}
                      >
                        <input
                          type="text"
                          placeholder="댓글 입력..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          style={{
                            flex: 1,
                            height: '32px',
                            padding: '0 10px',
                            border: '1px solid var(--color-border-muted)',
                            borderRadius: '999px',
                            fontSize: '12.5px',
                          }}
                        />
                        <button
                          type="submit"
                          style={{
                            padding: '0 12px',
                            height: '32px',
                            borderRadius: '999px',
                            backgroundColor: '#000',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          등록
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
