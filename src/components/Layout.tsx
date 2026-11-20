import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

// 모든 페이지에 공통으로 적용되는 뼈대 (위: Header / 가운데: 페이지 내용 / 아래: Footer)
export function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Outlet 자리에 현재 주소에 맞는 페이지 컴포넌트가 들어옵니다 */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
