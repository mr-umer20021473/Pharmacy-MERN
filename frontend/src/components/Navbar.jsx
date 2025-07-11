import { Link, useNavigate } from 'react-router-dom'
// import { UilTachometerFastAlt, UilShoppingCart, UilMedkit, UilSignout } from '@iconscout/unicons-react'
import { FiActivity as UilTachometerFastAlt } from 'react-icons/fi' // Dashboard
import { FiShoppingCart as UilShoppingCart } from 'react-icons/fi' // Sales
import { FiPackage as UilMedkit } from 'react-icons/fi' // Products
import { FiLogOut as UilSignout } from 'react-icons/fi' // Logout
import '../styles/dashboard.css'

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav>
      <div className="logo-name">
        {/* <div className="logo-image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7qS1289n56ZLX24P_mBwRZv2LwVZemELQRg&s" alt="Logo" />
        </div> */}
        <span className="logo_name">Admin Panel</span>
      </div>

      <div className="menu-items">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <UilTachometerFastAlt />
              <span className="link-name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/sales">
              <UilShoppingCart />
              
              <span className="link-name">Sales</span>
            </Link>
          </li>
          <li>
            <Link to="/products">
              <UilMedkit />
              <span className="link-name">Products</span>
            </Link>
          </li>
        </ul>

        <ul className="logout-mode">
          <li>
            <a href="/" onClick={handleLogout}>
              <UilSignout />
              <span className="link-name">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar