import React from 'react'
import './Sidebar.css' // or use separate hamburger.css if needed

const HamburgerButton = ({ onClick }) => (
  <button className="hamburger-btn" onClick={onClick}>
    ☰
  </button>
)

export default HamburgerButton
