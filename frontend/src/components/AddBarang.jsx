import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBarang = () => {
  const [name, setName] = useState('');
  const [harga, setHarga] = useState('');
  const [stok, setStok] = useState('');

  const navigate = useNavigate();

  const saveBarang = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/barangs', {
        name,
        harga,
        stok
      });
      navigate('/barang');
    } catch (error) {
      console.error("Failed to save barang:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveBarang}>
          <div className="field">
            <label className="label">Nama Barang Cuy</label>
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
            <button type="submit" className="button is-success">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBarang;
