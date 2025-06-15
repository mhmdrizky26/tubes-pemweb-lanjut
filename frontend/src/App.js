import { BrowserRouter, Routes, Route } from 'react-router-dom';

// USER COMPONENTS
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';

// BARANG COMPONENTS
import BarangList from './components/BarangList';
import AddBarang from './components/AddBarang';
import EditBarang from './components/EditBarang';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />

        {/* Barang routes */}
        <Route path="/barang" element={<BarangList />} />
        <Route path="/barang/add" element={<AddBarang />} />
        <Route path="/barang/edit/:id" element={<EditBarang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

