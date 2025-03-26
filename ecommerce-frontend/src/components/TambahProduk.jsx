"use client"

import { useState } from "react"
import axios from "axios"

function TambahProduk() {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    //Validasi submit
    if (!nama || !harga) {
      setError("Nama dan Harga wajib disini")
      return
    }
    setError("")
    setIsSubmitting(true)

    axios
      .post("http://localhost:3001/produk", { nama, harga: Number.parseInt(harga) })
      .then((res) => {
        console.log("Produk berhasil ditambah : ", res.data)
        setNama("")
        setHarga("")
        window.location.reload()
      })
      .catch((err) => {
        console.log("Error menambah produk : ", err)
        setError("Gagal menambah produk")
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card p-6 animate-fade-in">
        <h2 className="text-2xl font-semibold tracking-tight mb-6 text-primary">Tambah Produk</h2>
        {error && <p className="text-sm text-danger mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Nama Produk
            </label>
            <input
              type="text"
              className="form-input"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama produk"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Harga
            </label>
            <input
              type="number"
              className="form-input"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="Masukkan harga produk"
            />
          </div>
          <button type="submit" className="btn btn-primary h-10 px-4 py-2 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TambahProduk

