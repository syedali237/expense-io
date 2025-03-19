import NotFound from "./components/Layout/NotFound"
import DashboardPage from "./screens/DashboardPage"
import LandingPage from "./screens/LandingPage"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <>
      <div className="font-primary">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
