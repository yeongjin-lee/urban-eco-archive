import { useState } from 'react'
import { Bookmark, Heart, MessageCircle, Search, Trees } from 'lucide-react'
import { INITIAL_PROPOSALS } from '../data/proposals'
import styles from './ProposalsPage.module.css'

type SortOption = 'latest' | 'likes' | 'comments'

export function ProposalsPage() {
  // 1) 검색어와 정렬 기준을 state로 기억합니다
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  // 2) 내가 누른 좋아요 / 북마크 글 ID 목록
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([])

  const toggleItem = (list: string[], id: string) =>
    list.includes(id) ? list.filter((item) => item !== id) : [...list, id]

  // 3) 검색어 필터링 + 정렬 적용 (원본 배열을 건드리지 않도록 [...배열]로 복사 후 정렬)
  const visibleProposals = INITIAL_PROPOSALS.filter((item) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    )
  }).sort((a, b) => {
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
      <p className={styles.subtitle}>시민들이 직접 기록하고 제안하는 녹색 아이디어</p>

      {/* 정렬 & 검색 컨트롤 */}
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
      </div>

      {/* 제안 카드 목록 */}
      {visibleProposals.length === 0 ? (
        <p className={styles.empty}>검색어와 일치하는 녹색 제안이 아직 없어요.</p>
      ) : (
        <div className={styles.grid}>
          {visibleProposals.map((item) => {
            const isLiked = likedIds.includes(item.id)
            const isBookmarked = bookmarkedIds.includes(item.id)
            const likeCount = item.likes + (isLiked ? 1 : 0)

            return (
              <article key={item.id} className={styles.card}>
                <img src={item.image} alt={item.title} className={styles.thumb} />

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
                        onClick={() => setLikedIds((prev) => toggleItem(prev, item.id))}
                      >
                        <Heart
                          size={19}
                          fill={isLiked ? 'currentColor' : 'none'}
                        />
                        <span>{likeCount}</span>
                      </button>

                      <span className={styles.statItem}>
                        <MessageCircle size={19} />
                        <span>{item.comments}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      className={styles.bookmarkBtn}
                      aria-label="북마크"
                      onClick={() =>
                        setBookmarkedIds((prev) => toggleItem(prev, item.id))
                      }
                    >
                      <Bookmark
                        size={19}
                        fill={isBookmarked ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
