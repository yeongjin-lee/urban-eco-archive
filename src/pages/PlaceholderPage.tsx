interface PlaceholderPageProps {
  title: string
  description: string
}

// 아직 본격 구현 전인 페이지들을 임시로 보여주는 공용 컴포넌트
export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '64px 32px',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>{title}</h1>
      <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)' }}>
        {description}
      </p>
    </section>
  )
}
