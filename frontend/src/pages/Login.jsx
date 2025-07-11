import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('https://project-backend-hosting-unxw.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <span className="signup-btn">
        Don't have an account? <Link to="/signup">Signup Now</Link>
      </span>
    </div>
  )
}
