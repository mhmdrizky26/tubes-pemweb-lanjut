import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({});
  const [newPassword, setNewPassword] = useState('');

  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (localUser?.id) {
      fetchUser();
      fetchTransactions();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${localUser.id}`);
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/transactions/user/${localUser.id}`);
      setTransactions(res.data);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const updateData = { ...formData };
      if (newPassword) updateData.password = newPassword;

      await axios.put(`http://localhost:5000/users/${user.id}`, updateData);
      setUser(updateData);
      setShowModal(false);
      alert('Profil berhasil diperbarui!');
    } catch (err) {
      console.error('Gagal update profil:', err);
      alert('Gagal memperbarui profil.');
    }
  };

  const handleDetail = (trx) => {
    setSelectedTransaction(trx);
    setShowDetailModal(true);
  };

  return (
    <div>
      <UserHeader />

      <div className="breadcrumb-section hero-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="hero-text">
                <div className="hero-text-tablecell">
                  <p className="subtitle">Profil Pengguna</p>
                  <h1>Informasi & Transaksi Anda</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mt-100 mb-100">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm p-4">
              <h4 className="orange-text mb-3">Data Diri</h4>
              <p><strong>Nama:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button className="boxed-btn mt-3" onClick={() => setShowModal(true)}>Edit Profil</button>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card shadow-sm p-4">
              <h4 className="orange-text mb-4">Riwayat Transaksi</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((trx) => (
                      <tr key={trx.id}>
                        <td>{trx.id}</td>
                        <td>{new Date(trx.created_at).toLocaleDateString()}</td>
                        <td>Rp{Number(trx.total_price).toLocaleString()}</td>
                        <td>{trx.status}</td>
                        <td>
                          <button className="btn btn-sm btn-info" onClick={() => handleDetail(trx)}>Detail</button>
                        </td>
                      </tr>
                    ))}
                    {transactions.length === 0 && (
                      <tr><td colSpan="5" className="text-center">Belum ada transaksi.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <a href="/shop" className="boxed-btn mt-3">Belanja Lagi</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header bg-light text-dark">
                <h5 className="modal-title">Edit Profil</h5>
                <button className="close" onClick={() => setShowModal(false)}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <input name="name" value={formData.name} onChange={handleInputChange} className="form-control mb-2" placeholder="Nama" />
                <input name="email" value={formData.email} onChange={handleInputChange} className="form-control mb-2" placeholder="Email" />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-2" placeholder="Password Baru (opsional)" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-success" onClick={handleSave}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Transaksi */}
      {showDetailModal && selectedTransaction && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Detail Transaksi #{selectedTransaction.id}</h5>
                <button className="close" onClick={() => setShowDetailModal(false)}><span>&times;</span></button>
              </div>
              <div className="modal-body">
                <p><strong>Tanggal:</strong> {new Date(selectedTransaction.created_at).toLocaleDateString()}</p>
                <p><strong>Total:</strong> Rp{Number(selectedTransaction.total_price).toLocaleString()}</p>
                <p><strong>Status:</strong> {selectedTransaction.status}</p>
                <h6 className="mt-3">Item:</h6>
                <ul>
                  {selectedTransaction.TransactionDetails.map((item, i) => (
                    <li key={i}>{item.Product?.product_name} - {item.quantity} x Rp{Number(item.price).toLocaleString()}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

export default UserProfile;