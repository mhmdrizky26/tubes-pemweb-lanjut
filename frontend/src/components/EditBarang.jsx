import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBarang = () => {
  const [name, setName] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBarangById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/barangs/${id}`);
        setName(response.data.name);
        setHarga(response.data.harga);
        setStok(response.data.stok);
      } catch (error) {
        console.error('Failed to fetch barang:', error);
      }
    };

    getBarangById();
  }, [id]);

  const updateBarang = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/barangs/${id}`, {
        name,
        harga,
        stok
      });
      navigate('/barang');
    } catch (error) {
      console.error('Failed to update barang:', error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateBarang}>
          <div className="field">
            <label className="label">Nama Barang</label>
            <div className="control">
              <input
                type="text"
                className="input"
                placeholder="Nama Barang"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Harga</label>
            <div className="control">
              <input
                type="number"
                className="input"
                placeholder="Harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Stok</label>
            <div className="control">
              <input
                type="number"
                className="input"
                placeholder="Stok"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-info">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBarang;
