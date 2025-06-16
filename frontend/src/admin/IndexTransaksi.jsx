import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexTransaksi = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const dummyTransaction = {
    id: 1,
    user: 'Budi',
    total: 120000,
    status: 'Pending',
    items: [
      { nama: 'Pupuk Organik', qty: 2, harga: 50000 },
      { nama: 'Benih Jagung', qty: 1, harga: 20000 }
    ]
  };

  const handleAdd = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
  };

  const handleDetail = (transactionId) => {
    setSelectedTransaction(dummyTransaction); // ganti dengan data asli nanti
    setShowDetailModal(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div style={{ paddingTop: '10px'}}>          
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-primary" onClick={handleAdd}>
            Tambah Transaksi
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th style={{ width: '25%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Budi</td>
                <td>Rp 120.000</td>
                <td><span className="badge badge-warning">Pending</span></td>
                <td>
                  <div className='d-flex gap-2'>
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleDetail(1)}>Detail</button>
                    <button className="btn btn-sm btn-warning mr-2" onClick={() => handleEdit(1)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(1)}>Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit Transaksi' : 'Tambah Transaksi'}</h5>
                  <button className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>User</label>
                      <select className="form-control">
                        <option value="1">Budi</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Total</label>
                      <input type="number" className="form-control" placeholder="Masukkan total transaksi" />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select className="form-control">
                        <option value="pending">Pending</option>
                        <option value="dibayar">Dibayar</option>
                        <option value="dikirim">Dikirim</option>
                        <option value="selesai">Selesai</option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="btn btn-success">Simpan</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {showDeleteModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Yakin ingin menghapus transaksi ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  <button className="btn btn-danger">Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detail Transaksi */}
        {showDetailModal && selectedTransaction && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">Detail Transaksi</h5>
                  <button className="close text-dark" onClick={() => setShowDetailModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p><strong>ID:</strong> {selectedTransaction.id}</p>
                  <p><strong>User:</strong> {selectedTransaction.user}</p>
                  <p><strong>Total:</strong> Rp {selectedTransaction.total.toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedTransaction.status}</p>

                  <hr />
                  <h6>Daftar Produk:</h6>
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr>
                        <th>Nama Produk</th>
                        <th>Jumlah</th>
                        <th>Harga</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTransaction.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.nama}</td>
                          <td>{item.qty}</td>
                          <td>Rp {item.harga.toLocaleString()}</td>
                          <td>Rp {(item.qty * item.harga).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Tutup</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default IndexTransaksi;
