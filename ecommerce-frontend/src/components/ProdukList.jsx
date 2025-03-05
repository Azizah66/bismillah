// src/components/ProdukList.jsx
import { useEffect, useState } from 'react';

function ProdukList() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    // Data statis sementara
    setProduk([
      { id: 1, nama: 'Produk D' },
      { id: 2, nama: 'Produk A' },
    ]);
  }, []);

  return (
    <div>
      <h2>Daftar Produk</h2>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>{item.nama}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProdukList;