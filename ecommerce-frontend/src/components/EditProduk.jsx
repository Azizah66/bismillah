import axios from "axios";
import { useState, useEffect } from "react";

function EditProduk({ productId, onCancel }) {
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (productId) {
            // Fetch single product data
            axios.get(`http://localhost:3001/produk/${productId}`)
                .then((res) => {
                    if (res.data) {
                        setNama(res.data.nama);
                        setHarga(res.data.harga);
                    }
                })
                .catch((err) => {
                    console.log('Error fetching product:', err);
                    setError('Gagal memuat data produk');
                });
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nama || !harga) {
            setError('Nama dan Harga wajib diisi');
            return;
        }
        
        try {
            // Use PATCH instead of PUT if your backend expects PATCH
            const response = await axios.patch(`http://localhost:3001/produk/${productId}`, {
                nama: nama,
                harga: parseInt(harga)
            });

            if (response.data) {
                console.log('Produk berhasil diupdate:', response.data);
                // Refresh the page or call a callback to update the list
                window.location.reload();
            }
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Gagal mengupdate produk');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-6">Edit Produk</h2>
                {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Nama Produk
                        </label>
                        <input 
                            type="text" 
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            value={nama} 
                            onChange={(e) => setNama(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Harga
                        </label>
                        <input 
                            type="number" 
                            className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            value={harga} 
                            onChange={(e) => setHarga(e.target.value)} 
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            type="submit" 
                            className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-black text-white hover:bg-gray-900 transition-colors"
                        >
                            Simpan
                        </button>
                        <button 
                            type="button"
                            onClick={onCancel}
                            className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduk;