"use client"

import { useState } from "react"
import ProdukList from "./components/ProdukList"
import TambahProduk from "./components/TambahProduk"
import EditProduk from "./components/EditProduk"

function App() {
  const [editingProduct, setEditingProduct] = useState(null)

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-primary">Aplikasi E-Commerce</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 md:grid-cols-2 responsive-grid">
          <div className="space-y-8">
            <TambahProduk />
            {editingProduct && <EditProduk productId={editingProduct} onCancel={handleCancelEdit} />}
          </div>
          <div>
            <ProdukList onEdit={setEditingProduct} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

