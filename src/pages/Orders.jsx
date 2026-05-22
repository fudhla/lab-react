import { useState } from "react";
import PageHeader from "../components/PageHeader";
import initialOrders from "../data/orders"; // Rename import agar tidak bentrok dengan state

export default function Orders() {
  const [orders, setOrders] = useState(initialOrders); // Menyimpan data order ke dalam state
  const [showForm, setShowForm] = useState(false);

  // State untuk menampung input dari form
  const [orderId, setOrderId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("Pending");
  const [totalPrice, setTotalPrice] = useState("");
  const [orderDate, setOrderDate] = useState("");

  // Fungsi untuk menangani simpan data
  const handleSaveOrder = (e) => {
    e.preventDefault();

    // Validasi sederhana agar input tidak kosong
    if (!orderId || !customerName || !totalPrice || !orderDate) {
      alert("Mohon isi semua kolom!");
      return;
    }

    // Buat objek data order baru
    const newOrder = {
      orderId: orderId,
      customerName: customerName,
      status: status,
      totalPrice: parseInt(totalPrice), // Ubah string ke number
      orderDate: orderDate,
    };

    // Tambahkan data baru ke baris paling atas tabel
    setOrders([newOrder, ...orders]);

    // Reset isi form kembali kosong
    setOrderId("");
    setCustomerName("");
    setStatus("Pending");
    setTotalPrice("");
    setOrderDate("");

    // Sembunyikan kembali form input
    setShowForm(false);
  };

  return (
    <div>
      {/* HEADER */}
      <PageHeader
        title="Orders"
        breadcrumb="Dashboard / Orders"
      >
        <button
          onClick={() => setShowForm(!showForm)} // Toggle buka-tutup form
          className="rounded-lg bg-green-500 px-4 py-2 text-white font-semibold hover:bg-green-600 transition"
        >
          {showForm ? "Close Form" : "Add Orders"}
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSaveOrder} className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Add New Order
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Order ID (e.g. ORD014)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="rounded-lg border p-3 focus:outline-blue-500"
            />

            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-lg border p-3 focus:outline-blue-500"
            />

            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border p-3 focus:outline-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <input
              type="number"
              placeholder="Total Price (e.g. 150000)"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              className="rounded-lg border p-3 focus:outline-blue-500"
            />

            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="rounded-lg border p-3 focus:outline-blue-500"
            />

            <button 
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white font-semibold hover:bg-blue-600 transition h-fit lg:mt-1"
            >
              Save Orders
            </button>
          </div>
        </form>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl bg-white p-6 shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600 font-semibold">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr
                key={item.orderId}
                className="border-b hover:bg-gray-50 text-gray-700 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {item.orderId}
                </td>
                <td className="py-3 px-4">
                  {item.customerName}
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  Rp {item.totalPrice.toLocaleString("id-ID")}
                </td>
                <td className="py-3 px-4">
                  {item.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}