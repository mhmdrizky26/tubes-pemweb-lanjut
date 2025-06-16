import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexPromo = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const handleAdd = () => {
    setEditMode(false);
    setSelectedPromo(null);
    setShowModal(true);
  };

  const handleEdit = (promo) => {
    setEditMode(true);
    setSelectedPromo(promo);
    setShowModal(true);
  };

  const handleDelete = (promo) => {
    setSelectedPromo(promo);
    setShowDeleteModal(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div className="d-flex justify-content-between align-items-center mb-4 mt-2">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Promo</button>
        </div>

        <div className="table-responsive" style={{ overflowX: 'auto' }}>
        <table className="table table-hover table-striped table-bordered shadow-sm rounded" style={{ minWidth: '700px' }}>
            <thead className="thead-dark">
            <tr>
                <th style={{ width: '60px' }}>ID</th>
                <th style={{ minWidth: '150px' }}>Nama Promo</th>
                <th style={{ minWidth: '200px' }}>Deskripsi</th>
                <th style={{ width: '120px' }}>Diskon (%)</th>
                <th style={{ minWidth: '160px' }}>Masa Berlaku</th>
                <th style={{ width: '140px' }}>Aksi</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Diskon Musim Panen</td>
                <td>Diskon spesial untuk pembelian di musim panen</td>
                <td>20</td>
                <td>01 Juni - 30 Juni</td>
                <td className="d-flex gap-2">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit({ id: 1 })}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete({ id: 1 })}>Hapus</button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>


        {/* Modal Tambah/Edit Promo */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit Promo' : 'Tambah Promo'}</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Promo</label>
                      <input type="text" className="form-control" defaultValue={selectedPromo?.nama || ''} placeholder="Masukkan nama promo" />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea className="form-control" rows="3" defaultValue={selectedPromo?.deskripsi || ''} placeholder="Masukkan deskripsi promo" />
                    </div>
                    <div className="form-group">
                      <label>Diskon (%)</label>
                      <input type="number" className="form-control" defaultValue={selectedPromo?.diskon || ''} placeholder="Masukkan persentase diskon" />
                    </div>
                    <div className="form-group">
                      <label>Masa Berlaku</label>
                      <input type="text" className="form-control" defaultValue={selectedPromo?.masaBerlaku || ''} placeholder="Contoh: 01 Juni - 30 Juni" />
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
                  <button type="button" className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin menghapus promo ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  <button className="btn btn-danger">Hapus</button>
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
