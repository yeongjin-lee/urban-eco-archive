import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ContactPage, PrivacyPage, TermsPage } from './pages/LegalPage'
import { MagazinePage } from './pages/MagazinePage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { ShelterPage } from './pages/ShelterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout 안에 있는 모든 페이지는 같은 Header와 Footer를 공유합니다 */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/magazine" element={<MagazinePage />} />
          <Route
            path="/magazine/:category"
            element={
              <PlaceholderPage
                title="매거진 상세"
                description="산책 코스, 공간의 기억, 생태이야기 상세 화면입니다. (Step 8에서 구현 예정)"
              />
            }
          />
          <Route path="/shelter" element={<ShelterPage />} />
          <Route
            path="/shelter/:category"
            element={
              <PlaceholderPage
                title="오늘의쉼터 지도"
                description="지도 위 핀을 클릭해 쉼터 상세 정보를 보는 화면입니다. (Step 7에서 구현 예정)"
              />
            }
          />
          <Route
            path="/proposals"
            element={
              <PlaceholderPage
                title="녹색제안"
                description="시민들이 직접 기록하고 제안하는 녹색 아이디어 공간입니다. (Step 6에서 구현 예정)"
              />
            }
          />
          <Route
            path="/mypage"
            element={
              <PlaceholderPage
                title="마이페이지"
                description="내 기록, 내 제안, 즐겨찾기를 모아보는 공간입니다."
              />
            }
          />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
