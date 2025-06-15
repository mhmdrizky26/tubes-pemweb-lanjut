import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BarangList = () => {
  const [barangs, setBarangs] = useState([]);

  useEffect(() => {
    getBarangs();
  }, []);

  const getBarangs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/barangs');
      setBarangs(response.data);
    } catch (error) {
      console.error('Failed to fetch barang:', error);
    }
  };

  const deleteBarang = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus barang ini?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/barangs/${id}`);
      getBarangs();
    } catch (error) {
      console.error('Failed to delete barang:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="field">
        <Link to="/barang/add" className="button is-primary">
          Tambah Barang
        </Link>
      </div>

      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {barangs.length > 0 ? (
              barangs.map((barang, index) => (
                <tr key={barang.id}>
                  <td>{index + 1}</td>
                  <td>{barang.name}</td>
                  <td>{barang.harga}</td>
                  <td>{barang.stok}</td>
                  <td>
                    <Link
                      to={`/barang/edit/${barang.id}`}
                      className="button is-small is-info mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteBarang(barang.id)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="has-text-centered">
                  Tidak ada barang.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BarangList;
