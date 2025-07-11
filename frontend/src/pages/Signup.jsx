import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Password and Confirm Password should match')
      return
    }

    try {
      const res = await fetch('https://project-backend-hosting-unxw.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await res.json()
      if (res.ok) {
        alert('User Registered Successfully')
        navigate('/')
      } else {
        alert(data.message || 'Registration failed')
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="login-container">
      <h2>Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      <span>Already have an account? <Link to="/">SignIn Now</Link></span>
    </div>
  )
}
