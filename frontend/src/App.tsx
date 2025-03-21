import { JSX } from "react";
import NotFound from "./components/Layout/NotFound"
import DashboardPage from "./screens/DashboardPage"
import LandingPage from "./screens/LandingPage"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  function ProtectedRoute({ children }: { children: JSX.Element }) {
    const userInfo = localStorage.getItem("user-info");
    return userInfo ? children : <Navigate to="/" />;
  }
  return (
    <>
      <div className="font-primary">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
