import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 12,
    categories: 5,
    products: 20,
    transactions: 45,
    pendingTransactions: 8,
    promo: 10,
  });

  const transaksiData = [
    { status: 'Pending', jumlah: 8 },
    { status: 'Dibayar', jumlah: 15 },
    { status: 'Dikirim', jumlah: 10 },
    { status: 'Selesai', jumlah: 12 },
  ];

  const pendapatanBulanan = [
    { bulan: 'Jan', total: 1200000 },
    { bulan: 'Feb', total: 1600000 },
    { bulan: 'Mar', total: 800000 },
    { bulan: 'Apr', total: 2000000 },
    { bulan: 'Mei', total: 1500000 },
    { bulan: 'Jun', total: 2500000 },
  ];

  const cardStyle = {
    borderRadius: '12px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    minHeight: '120px',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div style={{ paddingTop: '10px' }}>

          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#007bff' }}>
                <h5>Jumlah User</h5>
                <h3>{stats.users}</h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#28a745' }}>
                <h5>Jumlah Kategori</h5>
                <h3>{stats.categories}</h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#17a2b8' }}>
                <h5>Jumlah Produk</h5>
                <h3>{stats.products}</h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#ffc107' }}>
                <h5>Total Transaksi</h5>
                <h3>{stats.transactions}</h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#dc3545' }}>
                <h5>Transaksi Pending</h5>
                <h3>{stats.pendingTransactions}</h3>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4">
              <div style={{ ...cardStyle, backgroundColor: '#d303fc' }}>
                <h5>Promo</h5>
                <h3>{stats.promo}</h3>
              </div>
            </div>
          </div>

          {/* CHARTS */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">Statistik Transaksi</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={transaksiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="jumlah" fill="#007bff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm p-3">
                <h5 className="mb-3">Pendapatan Bulanan</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pendapatanBulanan}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#28a745" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
