import React, { useState } from "react";
// 💡 IMPORT UTAMA: Menambahkan Link untuk navigasi Route Dinamis
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

const productData = [
  { "id": 1, "title": "Smartphone X10", "code": "PROD-001", "category": "Electronics", "brand": "TechVibe", "price": 5999000, "stock": 45 },
  { "id": 2, "title": "Wireless Headphone Pro", "code": "PROD-002", "category": "Audio", "brand": "SoundWave", "price": 1250000, "stock": 120 },
  { "id": 3, "title": "Mechanical Keyboard K80", "code": "PROD-003", "category": "Accessories", "brand": "KeyClick", "price": 850000, "stock": 75 },
  { "id": 4, "title": "Gaming Mouse RGB", "code": "PROD-004", "category": "Accessories", "brand": "SwiftGlide", "price": 450000, "stock": 200 },
  { "id": 5, "title": "UltraWide Monitor 34\"", "code": "PROD-005", "category": "Electronics", "brand": "VisionMax", "price": 4800000, "stock": 15 },
  { "id": 6, "title": "Running Shoes Air", "code": "PROD-006", "category": "Apparel", "brand": "StrideFit", "price": 950000, "stock": 60 },
  { "id": 7, "title": "Leather Wallet Classic", "code": "PROD-007", "category": "Fashion", "brand": "UrbanCraft", "price": 350000, "stock": 110 },
  { "id": 8, "title": "Ergonomic Office Chair", "code": "PROD-008", "category": "Furniture", "brand": "ComfortSeat", "price": 1750000, "stock": 30 },
  { "id": 9, "title": "Smart Watch Series 5", "code": "PROD-009", "category": "Electronics", "brand": "TechVibe", "price": 2499000, "stock": 85 },
  { "id": 10, "title": "Bluetooth Speaker Mini", "code": "PROD-010", "category": "Audio", "brand": "SoundWave", "price": 399000, "stock": 150 },
  { "id": 11, "title": "Waterproof Backpack 25L", "code": "PROD-011", "category": "Fashion", "brand": "UrbanCraft", "price": 550000, "stock": 90 },
  { "id": 12, "title": "Coffee Maker Espresso", "code": "PROD-012", "category": "Appliances", "brand": "BrewMaster", "price": 1890000, "stock": 25 },
  { "id": 13, "title": "Electric Kettle 1.5L", "code": "PROD-013", "category": "Appliances", "brand": "BrewMaster", "price": 299000, "stock": 140 },
  { "id": 14, "title": "Stainless Steel Tumblr", "code": "PROD-014", "category": "Home & Living", "brand": "HydroPeak", "price": 185000, "stock": 300 },
  { "id": 15, "title": "Dumbbell Set 10kg", "code": "PROD-015", "category": "Sports", "brand": "IronGym", "price": 420000, "stock": 40 },
  { "id": 16, "title": "Yoga Mat Non-Slip", "code": "PROD-016", "category": "Sports", "brand": "FlexiBody", "price": 150000, "stock": 95 },
  { "id": 17, "title": "External SSD 1TB", "code": "PROD-017", "category": "Storage", "brand": "DataShield", "price": 1350000, "stock": 70 },
  { "id": 18, "title": "USB-C Hub 6-in-1", "code": "PROD-018", "category": "Accessories", "brand": "KeyClick", "price": 275000, "stock": 180 },
  { "id": 19, "title": "Casual Denim Jacket", "code": "PROD-019", "category": "Apparel", "brand": "UrbanCraft", "price": 499000, "stock": 50 },
  { "id": 20, "title": "Sunglasses Polarized", "code": "PROD-020", "category": "Fashion", "brand": "RayShade", "price": 220000, "stock": 130 },
  { "id": 21, "title": "LED Desk Lamp", "code": "PROD-021", "category": "Furniture", "brand": "Lumina", "price": 195000, "stock": 88 },
  { "id": 22, "title": "Powerbank 20000mAh", "code": "PROD-022", "category": "Accessories", "brand": "TechVibe", "price": 320000, "stock": 210 },
  { "id": 23, "title": "Air Purifier HEPA", "code": "PROD-023", "category": "Appliances", "brand": "PureAir", "price": 1450000, "stock": 18 },
  { "id": 24, "title": "Blender High Speed", "code": "PROD-024", "category": "Appliances", "brand": "MixMaster", "price": 680000, "stock": 35 },
  { "id": 25, "title": "Graphic Drawing Tablet", "code": "PROD-025", "category": "Electronics", "brand": "VisionMax", "price": 1150000, "stock": 22 },
  { "id": 26, "title": "Wireless Clip-on Mic", "code": "PROD-026", "category": "Audio", "brand": "SoundWave", "price": 550000, "stock": 65 },
  { "id": 27, "title": "Memory Card MicroSD 128GB", "code": "PROD-027", "category": "Storage", "brand": "DataShield", "price": 195000, "stock": 400 },
  { "id": 28, "title": "Standing Desk Motorized", "code": "PROD-028", "category": "Furniture", "brand": "ComfortSeat", "price": 3499000, "stock": 12 },
  { "id": 29, "title": "Hoodie Oversize", "code": "PROD-029", "category": "Apparel", "brand": "StrideFit", "price": 280000, "stock": 145 },
  { "id": 30, "title": "Trimming & Shaving Kit", "code": "PROD-030", "category": "Personal Care", "brand": "GroomPro", "price": 340000, "stock": 80 }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Mendapatkan daftar kategori unik secara dinamis untuk filter otomatis
  const categories = ["All", ...new Set(productData.map(p => p.category))];

  // Logika Filter dan Cari data (Real-time)
  const filteredProducts = productData.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Hitung ringkasan statistik inventaris
  const totalItems = productData.length;
  const lowStockItems = productData.filter(p => p.stock < 20).length;
  const totalAssetValue = productData.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="p-4 text-slate-800 bg-slate-50/50 min-h-screen">
      {/* HEADER */}
      <PageHeader title="Product" breadcrumb="Dashboard / Product" />
      
      {/* CARD STATISTIK RINGKASAN DATA */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 mt-2">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total SKU Produk</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{totalItems} <span className="text-sm font-medium text-slate-400">Items</span></h3>
          </div>
          <div className="bg-indigo-50 p-3 rounded-xl text-xl">📦</div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stok Menipis (&lt; 20)</p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{lowStockItems} <span className="text-sm font-medium text-slate-400">Alerts</span></h3>
          </div>
          <div className="bg-rose-50 p-3 rounded-xl text-xl">⚠️</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimasi Nilai Aset</p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1">{formatRupiah(totalAssetValue)}</h3>
          </div>
          <div className="bg-emerald-50 p-3 rounded-xl text-xl">💰</div>
        </div>
      </div>

      {/* BILAH ALAT: CARI & FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Cari kode, nama, atau brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-400 uppercase">Kategori:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/50 p-2 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TABEL DATA UTAMA */}
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6 text-center w-16">ID</th>
                <th className="py-4 px-6">Code</th>
                <th className="py-4 px-6">Product Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Brand</th>
                <th className="py-4 px-6 text-right">Price</th>
                <th className="py-4 px-6 text-center">Stock</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-indigo-50/20 text-slate-600 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 text-center text-slate-400 font-medium">
                      {product.id}
                    </td>
                    <td className="py-4 px-6 font-semibold text-indigo-600 tracking-wide">
                      {product.code}
                    </td>
                    {/* 🛠️ MODIFIKASI: Judul produk dibungkus komponen <Link> dinamis */}
                    <td className="py-4 px-6 font-semibold">
                      <Link 
                        to={`/products/${product.id}`} 
                        className="text-slate-900 hover:text-indigo-600 transition-colors duration-150 block underline decoration-transparent hover:decoration-indigo-500 decoration-2"
                      >
                        {product.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200/40">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500">
                      {product.brand}
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900 text-right">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        product.stock < 20 
                          ? "bg-rose-50 text-rose-700 border border-rose-200/60" 
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${product.stock < 20 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`}></span>
                        {product.stock} {product.stock < 20 ? "Low" : "Ready"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400 font-medium">
                    ❌ Tidak ada produk yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}