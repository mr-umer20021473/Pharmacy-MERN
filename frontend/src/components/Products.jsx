import { useEffect, useState } from 'react'
// import { UilEdit, UilTrashAlt, UilSearch } from '@iconscout/unicons-react'

// Replacement:
import { FiEdit2 as UilEdit } from 'react-icons/fi' // Edit
import { FiTrash2 as UilTrashAlt } from 'react-icons/fi' // Delete
import { FiSearch as UilSearch } from 'react-icons/fi' // Search
import '../styles/dashboard.css'
import { BASE_URL } from '../constant'

const Products = () => {
  const [medicines, setMedicines] = useState([])
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    company: '',
    expiryDate: '',
    price: '',
    stock: ''
  })
  const [sortBy, setSortBy] = useState('name')
  const [sortType, setSortType] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMedicines()
  }, [sortBy, sortType, searchTerm])

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${BASE_URL}/products?sortBy=${sortBy}&sortType=${sortType}&search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setMedicines(data)
    } catch (error) {
      console.error('Error fetching medicines:', error)
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const medicine = {
      name: formData.name,
      company: formData.company,
      expiryDate: formData.expiryDate,
      price: formData.price,
      stock: formData.stock
    }

    try {
      const token = localStorage.getItem('token')
      const method = formData._id ? 'PUT' : 'POST'
      const url = formData._id ? `${BASE_URL}/products/${formData._id}` : `${BASE_URL}/products`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(medicine)
      })

      if (response.ok) {
        fetchMedicines()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving medicine:', error)
    }
  }

  const loadMedicine = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const med = await response.json()

      setFormData({
        _id: med._id,
        name: med.name,
        company: med.company,
        expiryDate: new Date(med.expiryDate).toISOString().split('T')[0],
        price: med.price,
        stock: med.stock
      })
    } catch (error) {
      console.error('Error loading medicine:', error)
    }
  }

  const deleteMedicine = async (id) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          fetchMedicines()
        }
      } catch (error) {
        console.error('Error deleting medicine:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      _id: '',
      name: '',
      company: '',
      expiryDate: '',
      price: '',
      stock: ''
    })
  }

  return (
    <section className="dashboard">
      

      <div className="form-container">
        <h2 id="formTitle">{formData._id ? 'Edit Product' : 'Add New Product'}</h2>
        <form id="medicineForm" onSubmit={handleSubmit}>
          <input type="hidden" id="_id" value={formData._id} />
          <input
            type="text"
            id="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
          <input
            type="number"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            id="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Save</button>
          {formData._id && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="table-container">
        
        <h2>Inventory</h2>
        <div className="search-box">
        <UilSearch />
        <input
          type="text"
          id="searchInput"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <div className="sort-controls">
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="expiry">Expiry</option>
            <option value="stock">Stock</option>
            <option value="price">Price</option>
          </select>

          <label htmlFor="sortType">Sort Type:</label>
          <select
            id="sortType"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <br />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Added Date</th>
              <th>Expiry</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {  medicines.map(med => (
              <tr key={med._id}>
                <td>{med.name}</td>
                <td>{med.company}</td>
                <td>{new Date(med.createdAt).toISOString().split('T')[0]}</td>
                <td>{new Date(med.expiryDate).toISOString().split('T')[0]}</td>
                <td>${med.price}</td>
                <td>{med.stock}</td>
                <td>
                  <button className="edit-btn" onClick={() => loadMedicine(med._id)}>
                    <UilEdit />
                  </button>
                  <button className="delete-btn" onClick={() => deleteMedicine(med._id)}>
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

export default Products