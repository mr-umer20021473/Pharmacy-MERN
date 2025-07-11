// import React, { useEffect, useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import './Products.css'

// export default function Products() {
//   const [medicines, setMedicines] = useState([])
//   const [formData, setFormData] = useState({ name: '', company: '', expiryDate: '', price: '', stock: '', _id: '' })
//   const [sortBy, setSortBy] = useState('name')
//   const [sortType, setSortType] = useState('asc')
//   const [search, setSearch] = useState('')

//   const token = localStorage.getItem('token')
//   const API_URL = 'https://project-backend-hosting-unxw.onrender.com/api/products'

//   useEffect(() => {
//     if (!token) return (window.location.href = '/')
//     fetchMedicines()
//   }, [sortBy, sortType, search])

//   const fetchMedicines = async () => {
//     try {
//       const res = await fetch(`${API_URL}?sortBy=\${sortBy}&sortType=\${sortType}&search=\${encodeURIComponent(search)}`, {
//         headers: { 'Authorization': \`Bearer \${token}\` }
//       })
//       const data = await res.json()
//       setMedicines(data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value })

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const method = formData._id ? 'PUT' : 'POST'
//     const url = formData._id ? \`\${API_URL}/\${formData._id}\` : API_URL

//     const res = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': \`Bearer \${token}\`
//       },
//       body: JSON.stringify(formData)
//     })

//     if (res.ok) {
//       fetchMedicines()
//       setFormData({ name: '', company: '', expiryDate: '', price: '', stock: '', _id: '' })
//     }
//   }

//   const editMedicine = (med) => {
//     setFormData({
//       _id: med._id,
//       name: med.name,
//       company: med.company,
//       expiryDate: med.expiryDate.split('T')[0],
//       price: med.price,
//       stock: med.stock
//     })
//   }

//   const deleteMedicine = async (id) => {
//     if (!window.confirm('Delete this product?')) return
//     await fetch(\`\${API_URL}/\${id}\`, {
//       method: 'DELETE',
//       headers: { 'Authorization': \`Bearer \${token}\` }
//     })
//     fetchMedicines()
//   }

//   return (
//     <div className="products-page">
//       <Sidebar />
//       <div className="products-content">
//         <div className="search-box">
//           <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
//         </div>

//         <form className="product-form" onSubmit={handleSubmit}>
//           <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//           <input type="text" id="company" placeholder="Company" value={formData.company} onChange={handleChange} required />
//           <input type="date" id="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
//           <input type="number" id="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
//           <input type="number" id="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
//           <button type="submit">Save</button>
//         </form>

//         <div className="sort-controls">
//           <label>Sort by:
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="name">Name</option>
//               <option value="price">Price</option>
//               <option value="stock">Stock</option>
//               <option value="expiry">Expiry</option>
//             </select>
//           </label>
//           <label>Order:
//             <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
//               <option value="asc">Asc</option>
//               <option value="desc">Desc</option>
//             </select>
//           </label>
//         </div>

//         <table className="inventory-table">
//           <thead>
//             <tr>
//               <th>Name</th><th>Company</th><th>Expiry</th><th>Price</th><th>Stock</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicines.map(med => (
//               <tr key={med._id}>
//                 <td>{med.name}</td>
//                 <td>{med.company}</td>
//                 <td>{new Date(med.expiryDate).toISOString().split('T')[0]}</td>
//                 <td>${med.price}</td>
//                 <td>{med.stock}</td>
//                 <td>
//                   <button onClick={() => editMedicine(med)}>Edit</button>
//                   <button onClick={() => deleteMedicine(med._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }
