import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AuthProvider } from './contexts/AuthContext'
import { AboutPage } from './pages/AboutPage'
import { HomePage } from './pages/HomePage'
import { ContactPage, PrivacyPage, TermsPage } from './pages/LegalPage'
import { LoginPage } from './pages/LoginPage'
import { MagazineDetailPage } from './pages/MagazineDetailPage'
import { MagazineMapHomePage } from './pages/MagazineMapHomePage'
import { MagazinePage } from './pages/MagazinePage'
import { MyPage } from './pages/MyPage'
import { ProposalsMapPage } from './pages/ProposalsMapPage'
import { ProposalsPage } from './pages/ProposalsPage'
import { ShelterMapPage } from './pages/ShelterMapPage'
import { ShelterPage } from './pages/ShelterPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout 안에 있는 모든 페이지는 같은 Header와 Footer를 공유합니다 */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/magazine" element={<MagazineMapHomePage />} />
            <Route path="/magazine/categories" element={<MagazinePage />} />
            <Route
              path="/magazine/:category"
              element={<MagazineDetailPage />}
            />
            <Route path="/shelter" element={<ShelterPage />} />
            <Route path="/shelter/:category" element={<ShelterMapPage />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/proposals/map" element={<ProposalsMapPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
