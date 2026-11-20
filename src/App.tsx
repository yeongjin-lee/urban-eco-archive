import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PlaceholderPage } from './pages/PlaceholderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout 안에 있는 모든 페이지는 같은 Header와 Footer를 공유합니다 */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PlaceholderPage
                title="도시의 생태를 기록하고, 함께 지키다"
                description="시민의 참여로 모인 생태 기록이 더 건강한 도시를 만듭니다. (Step 4에서 홈 화면을 완성할 예정입니다)"
              />
            }
          />
          <Route
            path="/about"
            element={
              <PlaceholderPage
                title="서비스 소개"
                description="SI-프론티어 「도시생태기록소」 팀이 개발하는 시민 참여형 플랫폼입니다."
              />
            }
          />
          <Route
            path="/magazine"
            element={
              <PlaceholderPage
                title="매거진"
                description="동네의 일상적인 장소를 관찰하고, 장소에 담긴 사람과 자연의 이야기를 수집합니다."
              />
            }
          />
          <Route
            path="/shelter"
            element={
              <PlaceholderPage
                title="오늘의쉼터"
                description="일상 속 잠시 쉬어갈 수 있는 공간과 작은 쉼의 순간들을 소개합니다."
              />
            }
          />
          <Route
            path="/proposals"
            element={
              <PlaceholderPage
                title="녹색제안"
                description="시민들이 직접 기록하고 제안하는 녹색 아이디어 공간입니다."
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
          <Route
            path="/privacy"
            element={
              <PlaceholderPage
                title="개인정보처리방침"
                description="도시생태기록소 개인정보처리방침 페이지입니다."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <PlaceholderPage
                title="문의하기"
                description="도시생태기록소에 문의사항을 남길 수 있습니다."
              />
            }
          />
          <Route
            path="/terms"
            element={
              <PlaceholderPage
                title="이용약관"
                description="도시생태기록소 이용약관 페이지입니다."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
