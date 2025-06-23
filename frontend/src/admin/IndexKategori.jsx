import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexKategori = () => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Gagal fetch kategori:', err);
    }
  };

  const handleAdd = () => {
    setEditMode(false);
    setName('');
    setSelectedId(null);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const kategori = categories.find(c => c.id === id);
    if (kategori) {
      setEditMode(true);
      setSelectedId(id);
      setName(kategori.category_name); // ✅ fix
      setShowModal(true);
    }
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.patch(`http://localhost:5000/categories/${selectedId}`, {
          category_name: name, // ✅ fix
        });
      } else {
        await axios.post('http://localhost:5000/categories', {
          category_name: name, // ✅ fix
        });
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error('Gagal simpan kategori:', err);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/categories/${deleteId}`);
      setShowDeleteModal(false);
      fetchCategories();
    } catch (err) {
      console.error('Gagal hapus kategori:', err);
    }
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
            Tambah Kategori
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>Nama Kategori</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((kategori) => (
                <tr key={kategori.id}>
                  <td>{kategori.id}</td>
                  <td>{kategori.category_name}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(kategori.id)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(kategori.id)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-center'>Tidak ada data</td>
              </tr>
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
                  <h5 className="modal-title">
                    {editMode ? 'Edit Kategori' : 'Tambah Kategori'}
                  </h5>
                  <button className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Kategori</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan nama kategori"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                  <button className="btn btn-success" onClick={handleSave}>
                    Simpan
                  </button>
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
                  <p>Yakin ingin menghapus kategori ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Batal
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexKategori;
