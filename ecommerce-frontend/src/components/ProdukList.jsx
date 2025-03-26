import { useState, useEffect } from "react";
import axios from 'axios';

function ProdukList({onEdit}) {
    const [produk, setProduk] = useState([]);

    const fetchProduk = () => {
        axios.get('http://localhost:3001/produk')
            .then((response) => {
                setProduk(response.data);
            })
            .catch((error) => {
                console.log('Terjadi error : ', error);
            });
    };

    useEffect(() => {
        fetchProduk();
    }, []);

    const handleEdit = (id) => {
        onEdit(id); // Just pass the ID to parent component
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah anda yakin ingin menghapus produk ini?')) {
            axios.delete(`http://localhost:3001/produk/${id}`)
                .then(() => {
                    setProduk(produk.filter((p) => p.id !== id));
                })
                .catch(err => {
                    console.error('Error deleting product:', err);
                    alert('Gagal menghapus produk');
                });
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">Daftar Produk</h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="divide-y divide-gray-200">
                    {produk.map((item) => (
                        <div 
                            key={item.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                        >
                            <div>
                                <h3 className="font-medium text-gray-900">{item.nama}</h3>
                                <p className="text-sm text-gray-500">Rp{item.harga.toLocaleString()}</p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    onClick={() => handleEdit(item.id)}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(item.id)}
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProdukList;