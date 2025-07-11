import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import './Sales.css'

export default function Sales() {
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({ product: '', quantity: '', totalPrice: '', _id: '' })

  const token = localStorage.getItem('token')
  const API_URL = 'https://project-backend-hosting-unxw.onrender.com/api'

  useEffect(() => {
    if (!token) return (window.location.href = '/')
    fetchProducts()
    fetchSales()
  }, [])

  useEffect(() => {
    calculateTotal()
  }, [formData.quantity, formData.product])

  const fetchProducts = async () => {
    const res = await fetch(\`\${API_URL}/products\`, {
      headers: { 'Authorization': \`Bearer \${token}\` }
    })
    const data = await res.json()
    setProducts(data)
  }

  const fetchSales = async () => {
    const res = await fetch(\`\${API_URL}/sales\`, {
      headers: { 'Authorization': \`Bearer \${token}\` }
    })
    const data = await res.json()
    setSales(data)
  }

  const calculateTotal = () => {
    const selected = products.find(p => p._id === formData.product)
    const quantity = parseInt(formData.quantity || 0)
    if (selected && quantity > 0) {
      setFormData(prev => ({ ...prev, totalPrice: (selected.price * quantity).toFixed(2) }))
    } else {
      setFormData(prev => ({ ...prev, totalPrice: '' }))
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id || e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = formData._id ? 'PUT' : 'POST'
    const url = formData._id ? \`\${API_URL}/sales/\${formData._id}\` : \`\${API_URL}/sales\`

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert(formData._id ? 'Sale updated!' : 'Sale added!')
      setFormData({ product: '', quantity: '', totalPrice: '', _id: '' })
      fetchSales()
    }
  }

  const editSale = (sale) => {
    setFormData({
      _id: sale._id,
      product: sale.product._id,
      quantity: sale.quantity,
      totalPrice: sale.totalPrice
    })
  }

  const deleteSale = async (id) => {
    if (!window.confirm('Delete this sale?')) return
    await fetch(\`\${API_URL}/sales/\${id}\`, {
      method: 'DELETE',
      headers: { 'Authorization': \`Bearer \${token}\` }
    })
    fetchSales()
  }

  return (
    <div className="sales-page">
      <Sidebar />
      <div className="sales-content">
        <form className="sales-form" onSubmit={handleSubmit}>
          <select name="product" value={formData.product} onChange={handleChange} required>
            <option value="">Select Product</option>
            {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <input type="number" id="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
          <input type="number" id="totalPrice" placeholder="Total" value={formData.totalPrice} disabled />
          <button type="submit">{formData._id ? 'Update' : 'Save'} Sale</button>
        </form>

        <table className="sales-table">
          <thead>
            <tr><th>Product</th><th>Qty</th><th>Total</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale._id}>
                <td>{sale.product?.name}</td>
                <td>{sale.quantity}</td>
                <td>${sale.totalPrice.toFixed(2)}</td>
                <td>{new Date(sale.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button onClick={() => editSale(sale)}>Edit</button>
                  <button onClick={() => deleteSale(sale._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
