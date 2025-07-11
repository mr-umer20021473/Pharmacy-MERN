import { useEffect, useState } from 'react'
// import { UilEdit, UilTrashAlt } from '@iconscout/unicons-react'
// Replacement:
import { FiEdit2 as UilEdit } from 'react-icons/fi' // Edit
import { FiTrash2 as UilTrashAlt } from 'react-icons/fi' // Delete
import '../styles/dashboard.css'
import { BASE_URL } from '../constant'

const Sales = () => {
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    _id: '',
    product: '',
    quantity: '',
    totalPrice: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchSales()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/sales`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setSales(data)
    } catch (error) {
      console.error('Error fetching sales:', error)
    }
  }

  const calculatePrice = () => {
    const productId = formData.product
    const quantity = Number(formData.quantity)

    if (!productId || quantity <= 0) {
      setFormData(prev => ({ ...prev, totalPrice: '' }))
      return
    }

    const selectedProduct = products.find(p => p._id === productId)
    if (selectedProduct) {
      const total = selectedProduct.price * quantity
      setFormData(prev => ({ ...prev, totalPrice: total.toFixed(2) }))
    }
  }

  useEffect(() => {
    calculatePrice()
  }, [formData.product, formData.quantity])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { product, quantity, totalPrice } = formData
    if (!product || quantity <= 0 || totalPrice <= 0) {
      alert('Please select product and enter a valid quantity.')
      return
    }

    const saleData = {
      product,
      quantity: Number(quantity),
      totalPrice: Number(totalPrice)
    }

    try {
      const token = localStorage.getItem('token')
      const method = formData._id ? 'PUT' : 'POST'
      const url = formData._id ? `${BASE_URL}/sales/${formData._id}` : `${BASE_URL}/sales`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(saleData)
      })

      const data = await response.json()
      alert(data?.message || (formData._id ? 'Sale updated successfully!' : 'Sale added successfully!'))

      setFormData({
        _id: '',
        product: '',
        quantity: '',
        totalPrice: ''
      })
      fetchSales()
    } catch (error) {
      console.error('Error saving sale:', error)
    }
  }

  const loadSale = async (saleId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/sales/${saleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const sale = await response.json()

      setFormData({
        _id: sale._id,
        product: sale.product._id,
        quantity: sale.quantity,
        totalPrice: sale.totalPrice.toFixed(2)
      })
    } catch (error) {
      console.error('Error loading sale:', error)
    }
  }

  const deleteSale = async (saleId) => {
    if (confirm('Are you sure you want to delete this sale?')) {
      try {
        const token = localStorage.getItem('token')
        await fetch(`${BASE_URL}/sales/${saleId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        fetchSales()
      } catch (error) {
        console.error('Error deleting sale:', error)
      }
    }
  }

  return (
    <section className="dashboard">
      <div className="form-container">
        <h2>{formData._id ? 'Edit Sale' : 'Add New Sale'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" id="_id" value={formData._id} />
          <select
            id="product"
            value={formData.product}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            id="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            id="totalPrice"
            placeholder="Total Price"
            value={formData.totalPrice}
            onChange={handleInputChange}
            disabled
            required
          />
          <button type="submit">Save Sale</button>
        </form>
      </div>

      <div className="table-container">
        <h2>Sales</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Sell Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale._id}>
                <td>{sale.product?.name}</td>
                <td>{sale.quantity}</td>
                <td>${sale.totalPrice.toFixed(2)}</td>
                <td>{new Date(sale.createdAt).toISOString().split('T')[0]}</td>
                <td>
                  <button className="edit-btn" onClick={() => loadSale(sale._id)}>
                    <UilEdit />
                  </button>
                  <button className="delete-btn" onClick={() => deleteSale(sale._id)}>
                    <UilTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Sales