import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexPromo = () => {
  const [promos, setPromos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({ nama: '', deskripsi: '', diskon: '', masaBerlaku: '' });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/promos');
      setPromos(res.data);
    } catch (err) {
      console.error('Gagal fetch promo:', err);
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ nama: '', deskripsi: '', diskon: '', masaBerlaku: '' });
    setSelectedId(null);
    setShowModal(true);
  };

  const handleEdit = (promo) => {
    setEditMode(true);
    setSelectedId(promo.id);
    setFormData({
      nama: promo.nama,
      deskripsi: promo.deskripsi,
      diskon: promo.diskon,
      masaBerlaku: promo.masaBerlaku
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.patch(`http://localhost:5000/promos/${selectedId}`, formData);
      } else {
        await axios.post('http://localhost:5000/promos', formData);
      }
      setShowModal(false);
      fetchPromos();
    } catch (err) {
      console.error('Gagal simpan promo:', err);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/promos/${deleteId}`);
      setShowDeleteModal(false);
      fetchPromos();
    } catch (err) {
      console.error('Gagal hapus promo:', err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Promo</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nama Promo</th>
                <th>Deskripsi</th>
                <th>Diskon (%)</th>
                <th>Masa Berlaku</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {promos.length > 0 ? promos.map((promo) => (
                <tr key={promo.id}>
                  <td>{promo.id}</td>
                  <td>{promo.nama}</td>
                  <td>{promo.deskripsi}</td>
                  <td>{promo.diskon}</td>
                  <td>{promo.masaBerlaku}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(promo)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(promo.id)}>Hapus</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="6" className="text-center">Tidak ada data</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit Promo' : 'Tambah Promo'}</h5>
                  <button className="close text-dark" onClick={() => setShowModal(false)}><span>&times;</span></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Promo</label>
                      <input type="text" className="form-control" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea className="form-control" value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Diskon (%)</label>
                      <input type="number" className="form-control" value={formData.diskon} onChange={(e) => setFormData({ ...formData, diskon: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Masa Berlaku</label>
                      <input type="text" className="form-control" value={formData.masaBerlaku} onChange={(e) => setFormData({ ...formData, masaBerlaku: e.target.value })} />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="btn btn-success" onClick={handleSave}>Simpan</button>
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
                  <button className="close text-dark" onClick={() => setShowDeleteModal(false)}><span>&times;</span></button>
                </div>
                <div className="modal-body">
                  <p>Yakin ingin menghapus promo ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  <button className="btn btn-danger" onClick={confirmDelete}>Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default IndexPromo;
