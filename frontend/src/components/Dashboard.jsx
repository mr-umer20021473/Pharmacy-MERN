import { useEffect, useState } from 'react'
import {
  FiActivity as UilTachometerFastAlt,
  FiShoppingCart as UilShoppingCart,
  FiPackage as UilMedkit,
  FiDollarSign as UilDollarSign
} from 'react-icons/fi'
import '../styles/dashboard.css'
import { BASE_URL } from '../constant'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalRevenue: 0
  })

  const [topSales, setTopSales] = useState([])
  const [topProducts, setTopProducts] = useState([])


  useEffect(() => {
    fetchDashboardStats()
    fetchTopSales()
    fetchTopProducts()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/stats`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setStats({
        totalSales: data.totalSales || 0,
        totalProducts: data.totalProducts || 0,
        totalRevenue: data.totalRevenue || 0
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const fetchTopSales = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/sales`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      const sorted = data.sort((a, b) => b.totalPrice - a.totalPrice).slice(0, 5)
      setTopSales(sorted)
    } catch (error) {
      console.error('Error fetching sales:', error)
    }
  }

  const fetchTopProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/products?sortBy=stock&sortType=desc`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      const top = data.slice(0, 5)
      setTopProducts(top)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <section className="dashboard">
      <div className="dash-content">
        {/* Stats overview */}
        <div className="overview">
          <div className="title">
            <UilTachometerFastAlt />
            <span className="text">Stats</span>
          </div>

          <div className="boxes">
            <div className="box box1">
              <UilShoppingCart />
              <span className="text">Total Sales</span>
              <span className="number">{stats.totalSales}</span>
            </div>
            <div className="box box2">
              <UilMedkit />
              <span className="text">Total Products</span>
              <span className="number">{stats.totalProducts}</span>
            </div>
            <div className="box box3">
              <UilDollarSign />
              <span className="text">Total Revenue</span>
              <span className="number">${stats.totalRevenue}</span>
            </div>
          </div>
        </div>

        {/* Two tables side-by-side */}
        <div className="side-by-side-tables">
          {/* Top Sales */}
          <div className="table-card">
            <h3>Top Sales</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {topSales.map(sale => (
                  <tr key={sale._id}>
                    <td>{sale.product?.name}</td>
                    <td>{sale.quantity}</td>
                    <td>${sale.totalPrice.toFixed(2)}</td>
                    <td>{new Date(sale.createdAt).toISOString().split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Products */}
          <div className="table-card">
            <h3>Top Products (Stock)</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.company}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
