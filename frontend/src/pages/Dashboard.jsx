import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import './Dashboard.css'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalSales: 0, totalProducts: 0, totalRevenue: 0 })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return (window.location.href = '/')

    async function fetchData() {
      try {
        const res = await fetch('https://project-backend-hosting-unxw.onrender.com/api/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Failed to fetch stats', err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="title">Stats</h2>
        <div className="boxes">
          <div className="box box1">
            <i className="uil uil-shopping-cart"></i>
            <span className="text">Total Sales</span>
            <span className="number">{stats.totalSales || 0}</span>
          </div>
          <div className="box box2">
            <i className="uil uil-medkit"></i>
            <span className="text">Total Products</span>
            <span className="number">{stats.totalProducts || 0}</span>
          </div>
          <div className="box box3">
            <i className="uil uil-dollar-sign"></i>
            <span className="text">Total Revenue</span>
            <span className="number">${stats.totalRevenue || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
