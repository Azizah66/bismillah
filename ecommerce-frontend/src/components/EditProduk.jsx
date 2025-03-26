"use client"

import axios from "axios"
import { useState, useEffect } from "react"

function EditProduk({ productId, onCancel }) {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (productId) {
      setIsLoading(true)
      // Fetch single product data
      axios
        .get(`http://localhost:3001/produk/${productId}`)
        .then((res) => {
          if (res.data) {
            setNama(res.data.nama)
            setHarga(res.data.harga)
          }
        })
        .catch((err) => {
          console.log("Error fetching product:", err)
          setError("Gagal memuat data produk")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [productId])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nama || !harga) {
      setError("Nama dan Harga wajib diisi")
      return
    }

    setIsSubmitting(true)

    try {
      // Use PATCH instead of PUT if your backend expects PATCH
      const response = await axios.patch(`http://localhost:3001/produk/${productId}`, {
        nama: nama,
        harga: Number.parseInt(harga),
      })

      if (response.data) {
        console.log("Produk berhasil diupdate:", response.data)
        // Refresh the page or call a callback to update the list
        window.location.reload()
      }
    } catch (err) {
      console.error("Error updating product:", err)
      setError("Gagal mengupdate produk")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6 animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-tight mb-6 text-primary">Edit Produk</h2>
        {error && <p className="text-sm text-danger mb-4">{error}</p>}
        {isLoading ? (
          <div className="py-4 text-center text-text-secondary">Memuat data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nama Produk
              </label>
              <input type="text" className="form-input" value={nama} onChange={(e) => setNama(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Harga
              </label>
              <input type="number" className="form-input" value={harga} onChange={(e) => setHarga(e.target.value)} />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="flex-1 btn btn-primary h-10 px-4 py-2" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
              <button type="button" onClick={onCancel} className="flex-1 btn btn-secondary h-10 px-4 py-2">
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default EditProduk

