import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import HamburgerButton from './components/HamburgerButton'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Sales from './components/Sales'
import Login from './components/Login'
import Signup from './components/Signup'
import './styles/shared.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <Router>
      <div className="app-container" style={{ display: 'flex' }}>
        {isAuthenticated && (
          <>
            {/* ✅ Only show hamburger when sidebar is closed */}
            {!sidebarOpen && (
              <HamburgerButton onClick={() => setSidebarOpen(true)} />
            )}

            {/* ✅ Sidebar - separate component */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="main-content" style={{ flex: 1 }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}

        {!isAuthenticated && (
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App
