import styles from './LegalPage.module.css'

interface LegalItem {
  heading: string
  body?: string
  bullets?: string[]
}

interface LegalPageProps {
  eyebrow: string
  title: string
  intro: string
  lead?: string
  items: LegalItem[]
  footerLeft?: string[]
  footerRight?: string[]
}

// 개인정보처리방침 · 문의하기 · 이용약관의 공통 레이아웃 컴포넌트
function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lead,
  items,
  footerLeft,
  footerRight,
}: LegalPageProps) {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.intro}>{intro}</p>

      <hr className={styles.rule} />

      {lead && <p className={styles.lead}>{lead}</p>}

      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.heading}>
            <h2 className={styles.itemTitle}>{item.heading}</h2>
            {item.body && <p className={styles.itemBody}>{item.body}</p>}
            {item.bullets && (
              <ul className={styles.bullets}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {(footerLeft || footerRight) && (
        <>
          <hr className={styles.rule} />
          <div className={styles.metaRow}>
            <div>
              {footerLeft?.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className={styles.metaRight}>
              {footerRight?.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="PRIVACY POLICY"
      title="개인정보처리방침"
      intro="도시생태기록소는 이용자의 개인정보를 소중히 여기며, 안전하게 보호하기 위해 노력합니다."
      lead="[개인정보 수집 및 이용에 관한 안내]"
      items={[
        {
          heading: '01. 개인정보의 처리 목적',
          body: '도시생태기록소는 서비스 운영, 이용자 관리 및 문의 응대 등 필요한 목적에 한하여 개인정보를 처리합니다.',
        },
        {
          heading: '02. 수집하는 개인정보 항목',
          body: '서비스 이용 과정에서 수집하는 개인정보 항목 및 수집 방법을 안내합니다.',
        },
        {
          heading: '03. 개인정보의 보유 및 이용 기간',
          body: '개인정보는 안내된 보유 기간 동안 처리하며, 목적 달성 후 관련 법령에 따라 파기합니다.',
        },
        {
          heading: '04. 개인정보의 제3자 제공',
          body: '개인정보의 제3자 제공 여부 및 제공 시 관련 사항을 안내합니다.',
        },
        {
          heading: '05. 개인정보의 파기',
          body: '개인정보의 파기 시점, 절차 및 방법을 안내합니다.',
        },
        {
          heading: '06. 이용자의 권리 및 행사 방법',
          body: '이용자는 개인정보의 열람, 정정, 삭제 및 처리정지 등을 요구할 수 있습니다.',
        },
        {
          heading: '07. 개인정보 보호책임자',
          body: '개인정보 보호 관련 문의를 위한 담당자 및 연락처를 안내합니다.',
        },
      ]}
      footerLeft={[
        '본 개인정보처리방침은 2026년 11월 14일부터 시행됩니다.',
        '개인정보처리방침이 변경되는 경우, 변경 사항 및 시행일을 본 페이지를 통해 안내합니다.',
      ]}
      footerRight={['시행일: 2026. 11. 14.', '최종 수정일: 2026. 11. 14.']}
    />
  )
}

export function ContactPage() {
  return (
    <LegalPageLayout
      eyebrow="Contact Us"
      title="문의하기"
      intro="도시생태기록소를 이용하면서 궁금한 점이나 불편한 사항이 있다면 언제든지 문의해 주세요."
      items={[
        {
          heading: '01. 문의 안내',
          body: '서비스 이용, 콘텐츠 관련 질문, 오류 신고 및 개선 의견 등 다양한 문의를 받고 있습니다.',
        },
        {
          heading: '02. 문의 방법',
          bullets: [
            '이메일: urbanecologytelescope@naver.com',
            '담당: 도시생태기록소 운영팀',
            '답변: 문의 확인 후 순차적으로 안내',
          ],
        },
        {
          heading: '03. 유의사항',
          body: '원활한 답변을 위해 문의 내용을 구체적으로 작성해 주시고, 비밀번호 등 민감한 개인정보는 포함하지 말아 주세요.',
        },
        {
          heading: '04. 이용자 의견 반영',
          body: '접수된 의견은 서비스 개선을 위한 참고 자료로 활용되며, 더욱 편리하고 유익한 도시생태기록소를 만들어 나가는 데 반영하겠습니다.',
        },
      ]}
    />
  )
}

export function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Terms of Service"
      title="이용약관"
      intro="본 약관은 도시생태기록소가 제공하는 서비스의 이용 조건과 기본적인 사항을 안내합니다."
      items={[
        {
          heading: '제1조 (목적)',
          body: '도시생태기록소는 도시 생태환경에 관한 정보와 콘텐츠를 제공하고, 이용자의 관심과 참여를 높이는 것을 목적으로 합니다.',
        },
        {
          heading: '제2조 (서비스 이용)',
          body: '이용자는 매거진, 오늘의쉼터, 녹색제안 등 웹사이트에서 제공하는 서비스를 이용할 수 있습니다.',
        },
        {
          heading: '제3조 (이용자의 의무)',
          body: '이용자는 타인의 권리를 침해하거나 허위 정보를 게시하는 등 서비스 운영을 방해하는 행위를 해서는 안 됩니다.',
        },
        {
          heading: '제4조 (개인정보 보호)',
          body: '이용자의 개인정보는 관련 법령 및 개인정보처리방침에 따라 보호됩니다.',
        },
        {
          heading: '제5조 (서비스 변경)',
          body: '서비스는 운영 상황에 따라 변경되거나 중단될 수 있으며, 중요한 사항은 웹사이트를 통해 안내합니다.',
        },
      ]}
      footerLeft={['부칙', '본 약관은 2026년 11월 14일부터 시행합니다.']}
    />
  )
}
