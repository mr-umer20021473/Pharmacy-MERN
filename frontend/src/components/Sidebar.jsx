// Sidebar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiActivity, FiShoppingCart, FiPackage, FiLogOut } from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span className="logo_name">Admin Panel</span>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={onClose}>
              <FiActivity />
              <span className="link-name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/sales" onClick={onClose}>
              <FiShoppingCart />
              <span className="link-name">Sales</span>
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={onClose}>
              <FiPackage />
              <span className="link-name">Products</span>
            </Link>
          </li>
        </ul>

        <ul className="logout-mode">
          <li>
            <a href='/' onClick={handleLogout}>
              <FiLogOut />
              <span className="link-name">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
