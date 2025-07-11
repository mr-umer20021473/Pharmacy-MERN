import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css' // still using the same CSS as login
import { BASE_URL } from '../constant'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! Please log in.')
        navigate('/login')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Create Account 🚀</h2>
        <p className="subtitle">Join us by filling the information below</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Signup</button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
