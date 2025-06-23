import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexProduk = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    seller_id: '',
    image: null,
  });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/categories');
    setCategories(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users');
    setUsers(res.data);
  };

  const handleAdd = () => {
    setFormData({
      product_name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      seller_id: '',
      image_url: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const product = products.find(p => p.id === id);
    setFormData({
      product_name: product.product_name,
      description: product.description || '',
      price: product.price,
      stock: product.stock || '',
      category_id: product.category_id || '',
      seller_id: product.seller_id || '',
      image_url: product.image_url || ''
    });
    setSelectedId(id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      payload.append('product_name', formData.product_name);
      payload.append('description', formData.description);
      payload.append('price', formData.price);
      payload.append('stock', formData.stock);
      payload.append('category_id', formData.category_id);
      payload.append('seller_id', formData.seller_id);
      if (formData.image) payload.append('image', formData.image);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (editMode) {
        await axios.patch(`http://localhost:5000/products/${selectedId}`, payload, config);
      } else {
        await axios.post('http://localhost:5000/products', payload, config);
      }

      fetchProducts();
      setShowModal(false);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${deleteId}`);
      fetchProducts();
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Produk</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.product_name}</td>
                    <td>Rp {Number(p.price).toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td>{p.category_id}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(p.id)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Tidak ada data</td>
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
                  <h5 className="modal-title">{editMode ? 'Edit Produk' : 'Tambah Produk'}</h5>
                  <button type="button" className="close" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Produk</label>
                      <input type="text" className="form-control" name="product_name" value={formData.product_name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                      <label>Harga</label>
                      <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Stok</label>
                      <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Kategori</label>
                      <select className="form-control" name="category_id" value={formData.category_id} onChange={handleChange}>
                        <option value="">-- Pilih Kategori --</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Penjual</label>
                      <select className="form-control" name="seller_id" value={formData.seller_id} onChange={handleChange}>
                        <option value="">-- Pilih Penjual --</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Gambar Produk</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFormData(prev => ({ ...prev, image: file }));
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>

                    {previewImage && (
                      <div className="mb-3">
                        <label>Preview Gambar:</label>
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: '200px', maxHeight: '200px', display: 'block', marginTop: '10px' }}
                        />
                      </div>
                    )}
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="btn btn-success" onClick={handleSubmit}>Simpan</button>
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
                  <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin menghapus produk ini?</p>
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

export default IndexProduk;
