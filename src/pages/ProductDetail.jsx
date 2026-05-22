import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "../components/PageHeader";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // Format Mata Uang Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka || 0);
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(response.message);
          return;
        }
        setProduct(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return (
      <div className="p-8 text-center min-h-screen bg-slate-50/50 flex flex-col items-center justify-center">
        <div className="bg-white border border-rose-100 p-8 rounded-2xl shadow-sm max-w-md">
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Gagal Memuat Data</h3>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <Link to="/product" className="px-4 py-2 bg-slate-800 hover:bg-slate-950 text-white font-medium text-xs rounded-xl transition-all shadow-sm">
            Kembali ke Daftar Produk
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 bg-slate-50/50 min-h-screen">
        <PageHeader title="Product Detail" breadcrumb="Dashboard / Product / Loading..." />
        <div className="max-w-5xl mx-auto mt-6 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5 aspect-square bg-slate-100 rounded-xl"></div>
            <div className="flex-1 space-y-4 py-2">
              <div className="h-6 bg-slate-100 rounded w-1/4"></div>
              <div className="h-10 bg-slate-100 rounded w-3/4"></div>
              <div className="h-20 bg-slate-100 rounded w-full"></div>
              <div className="h-12 bg-slate-100 rounded w-1/2 mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Menghitung harga sebelum diskon untuk pemanis UI ritel
  const originalPrice = product.price / (1 - (product.discountPercentage / 100));

  return (
    <div className="p-4 text-slate-800 bg-slate-50/50 min-h-screen selection:bg-indigo-500 selection:text-white">
      {/* HEADER */}
      <PageHeader 
        title="Product Detail" 
        breadcrumb={`Dashboard / Product / SKU-${product.id}`} 
      />
      
      <div className="max-w-5xl mx-auto mt-2">
        {/* Tombol Navigasi Kembali */}
        <div className="mb-4">
          <Link to="/product" className="group inline-flex items-center text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors gap-1.5">
            <span className="transform group-hover:-translate-x-0.5 transition-transform">←</span> Kembali ke Inventaris
          </Link>
        </div>

        {/* CONTAINER UTAMA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* KOLOM KIRI: VISUAL & IMAGES (4-Grid lebar) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100/60 rounded-2xl overflow-hidden border border-slate-200/60 flex items-center justify-center p-6 shadow-inner group">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain rounded-xl transform group-hover:scale-105 transition-all duration-500 ease-out"
              />
              {/* Badge Diskon Mengambang */}
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase">
                  -{Math.round(product.discountPercentage)}% Promo
                </span>
              )}
            </div>
            
            {/* Metadata Ringkas di bawah gambar */}
            <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50/60 rounded-lg border border-slate-100">
                <p className="text-slate-400 font-medium">SKU Code</p>
                <p className="text-slate-700 font-bold mt-0.5">⭐ {product.sku || `SKU-${product.id}`}</p>
              </div>
              <div className="p-2.5 bg-slate-50/60 rounded-lg border border-slate-100">
                <p className="text-slate-400 font-medium">Rating Marketplace</p>
                <p className="text-slate-700 font-bold mt-0.5 text-amber-500">★ {product.rating} / 5.0</p>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: SPESIFIKASI DATA (7-Grid lebar) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
              
              {/* Kategori, Brand, & Status Garansi */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl bg-indigo-50/80 px-3 py-1 text-xs font-bold uppercase text-indigo-700 border border-indigo-100 tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs font-medium text-slate-400 border-l border-slate-200 pl-2.5">
                  Brand: <span className="text-slate-700 font-semibold">{product.brand || "Generic"}</span>
                </span>
                {product.warrantyInformation && (
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-md border border-emerald-100 ml-auto">
                    🛡️ {product.warrantyInformation}
                  </span>
                )}
              </div>

              {/* Judul Utama */}
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{product.title}</h2>
                {product.tags && (
                  <div className="flex gap-1.5 mt-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium text-slate-400">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Deskripsi */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rincian Deskripsi</h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-100">
                  {product.description}
                </p>
              </div>

              {/* Dimensi & Info Logistik Tambahan */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kebijakan Retur</h5>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">{product.returnPolicy || "No returns available"}</p>
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Metode Pengiriman</h5>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">{product.shippingInformation || "Standard Courier"}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status Order</h5>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5 text-indigo-600">{product.availabilityStatus || "In Stock"}</p>
                </div>
              </div>

              {/* AREA PRICING & INVENTORY */}
              <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                {/* Harga */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nilai Jual Terkonversi</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-3xl font-black text-slate-900 tracking-tight">
                      {formatRupiah(product.price * 15000)}
                    </p>
                    {product.discountPercentage > 0 && (
                      <p className="text-xs text-slate-400 line-through">
                        {formatRupiah(originalPrice * 15000)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sektor Stok */}
                <div className="sm:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Manajemen Stok</p>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                    product.stock < 20 
                      ? "bg-rose-50 text-rose-700 border-rose-200/60" 
                      : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                  }`}>
                    <span className={`h-2 w-2 rounded-full ${product.stock < 20 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`}></span>
                    {product.stock} Unit Tersedia ({product.stock < 20 ? "Kritis" : "Aman"})
                  </span>
                </div>

              </div>

              {/* ACTION TOOLBAR (Pemanis UI Dasbor Admin) */}
              <div className="border-t border-slate-100 pt-5 flex gap-3">
                <button 
                  onClick={() => alert("Fitur edit data produk akan segera diintegrasikan.")}
                  className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all text-center"
                >
                  📝 Edit Informasi SKU
                </button>
                <button 
                  onClick={() => alert("Fitur restock otomatis diaktifkan.")}
                  className="py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-all"
                >
                  ⚡ Restock Cepat
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}