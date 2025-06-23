import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role_id: '' });
  const [selectedId, setSelectedId] = useState(null); // Untuk edit/delete
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
  try {
    const res = await axios.get('http://localhost:5000/roles');
    setRoles(res.data);
  } catch (err) {
    console.error('Gagal mengambil roles:', err);
  }
};

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
  try {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  } catch (err) {
    console.error(err);
  }
};

  const handleAdd = () => {
    setEditMode(false);
    setFormData({ name: '', email: '', password: '', role_id: '' });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/users/${selectedId}`, formData);
      } else {
        await axios.post('http://localhost:5000/users', formData);
      }
      setShowModal(false);
      fetchUsers(); // Refresh data
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        password: '', // kosongkan atau tangani khusus
        role_id: res.data.role_id
      });
      setSelectedId(id);
      setEditMode(true);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/users/${selectedId}`);
      setShowDeleteModal(false);
      fetchUsers(); // Refresh data
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
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
            Tambah User
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.Role?.role_name}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(user.id)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Hapus</button>
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
            <div className="modal-dialog modal-lg">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit User' : 'Tambah User'}</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama</label>
                        <input
                          type="text"
                          className="form-control"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />                    
                        </div>
                    <div className="form-group">
                      <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />                    
                        </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                        <select
                          className="form-control"
                          value={formData.role_id}
                          onChange={(e) => setFormData({ ...formData, role_id: parseInt(e.target.value) })}
                        >
                          <option value="">-- Pilih Role --</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.role_name}
                            </option>
                          ))}
                        </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                  <button className="btn btn-success" onClick={handleSubmit}>
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
                  <button type="button" className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Yakin ingin menghapus user ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Batal
                  </button>
                  <button className="btn btn-danger" onClick={handleDeleteConfirm}>
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

export default IndexUser;
