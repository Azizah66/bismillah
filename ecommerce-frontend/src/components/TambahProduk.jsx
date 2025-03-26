import { useState } from "react";
import axios from "axios";

function TambahProduk() {
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validasi submit
        if(!nama || !harga) {
            setError('Nama dan Harga wajib disini');
            return;
        }
        setError('');

        axios.post('http://localhost:3001/produk', { nama, harga }).then((res) => {
            console.log('Produk berhasil ditambah : ', res.data);
            setNama('');
            setHarga('');
            window.location.reload();
        }).catch((err) =>{
            console.log('Error menambah produk : ', err);
        });
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h2 className="text-2xl font-semibold tracking-tight mb-6">Tambah Produk</h2>
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
                    <button 
                        type="submit" 
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-black text-white hover:bg-gray-900 transition-colors"
                    >
                        Simpan
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TambahProduk;