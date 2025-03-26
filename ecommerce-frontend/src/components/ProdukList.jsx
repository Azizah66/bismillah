"use client"

import { useState, useEffect } from "react"
import axios from "axios"

function ProdukList({ onEdit }) {
  const [produk, setProduk] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchProduk = () => {
    setIsLoading(true)
    axios
      .get("http://localhost:3001/produk")
      .then((response) => {
        setProduk(response.data)
        setError("")
      })
      .catch((error) => {
        console.log("Terjadi error : ", error)
        setError("Gagal memuat daftar produk")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchProduk()
  }, [])

  const handleEdit = (id) => {
    onEdit(id) // Just pass the ID to parent component
  }

  const handleDelete = (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus produk ini?")) {
      axios
        .delete(`http://localhost:3001/produk/${id}`)
        .then(() => {
          setProduk(produk.filter((p) => p.id !== id))
        })
        .catch((err) => {
          console.error("Error deleting product:", err)
          alert("Gagal menghapus produk")
        })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold tracking-tight mb-6 text-primary">Daftar Produk</h2>
      <div className="card animate-fade-in">
        {isLoading ? (
          <div className="p-8 text-center text-text-secondary">Memuat data...</div>
        ) : error ? (
          <div className="p-8 text-center text-danger">{error}</div>
        ) : produk.length === 0 ? (
          <div className="p-8 text-center text-text-secondary">Belum ada produk</div>
        ) : (
          <div className="divide-y divide-border">
            {produk.map((item) => (
              <div key={item.id} className="product-item flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <h3 className="font-medium text-text">{item.nama}</h3>
                  <p className="text-sm text-text-secondary">Rp{item.harga.toLocaleString()}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(item.id)} className="btn btn-secondary h-9 px-4 py-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-danger h-9 px-4 py-2">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProdukList

