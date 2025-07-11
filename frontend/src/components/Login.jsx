import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { BASE_URL } from '../constant'

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token)
        setIsAuthenticated(true)
        navigate('/')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
<div className="login-page">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Signup Now</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
