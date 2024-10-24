// App.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './App.css';

function App() {
  return (
    <div>
      <Web />
    </div>
  );
}

function Web() {
  return (
    <div className="flex flex-row min-h-screen">
      <Sider />
      <Content />
    </div>
  );
}

function Sider() {
  return (
    <aside className="bg-blue-900 text-white w-1/6">
      <h1 className="text-2xl font-bold pt-4 mb-4 p-2">Admin Panel</h1>
      <nav>
        <ul className="space-y-2 pl-6">
          <li>
            <a href="#" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Users
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function Content() {
  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

function Header() {
  return (
    <div className='bg-white shadow p-4'>
      <div className="flex justify-end">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Log Out</button>
      </div>
    </div>
  );
}

function Main() {
  const [mahasiswaList, setMahasiswaList] = useState([
    { id: 1, nama: 'Gendon', umur: 20 },
    { id: 2, nama: 'Gondrong Memet', umur: 22 }
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newUmur, setNewUmur] = useState('');
  const [editId, setEditId] = useState(null);

  const tambahMahasiswa = () => {
    const newMahasiswa = {
      id: mahasiswaList.length + 1,
      nama: newNama,
      umur: newUmur
    };
    setMahasiswaList([...mahasiswaList, newMahasiswa]);
    resetForm();
  };

  const editMahasiswa = () => {
    const updatedMahasiswaList = mahasiswaList.map(mahasiswa =>
      mahasiswa.id === editId ? { ...mahasiswa, nama: newNama, umur: newUmur } : mahasiswa
    );
    setMahasiswaList(updatedMahasiswaList);
    resetForm();
  };

  const resetForm = () => {
    setNewNama('');
    setNewUmur('');
    setEditId(null);
    setModalVisible(false);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data ini akan dihapus!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus'
    }).then((result) => {
      if (result.isConfirmed) {
        setMahasiswaList(mahasiswaList.filter(mahasiswa => mahasiswa.id !== id));
        Swal.fire('Dihapus!', 'Data mahasiswa berhasil dihapus.', 'success');
      }
    });
  };

  return (
    <div className="flex-grow bg-white-500">
      <div className="p-6">
        <h2 className="font-bold text-2xl">DAFTAR NAMA</h2>
        <button
          className="bg-green-500 text-white rounded-md px-2 py-1 mb-2"
          onClick={() => setModalVisible(true)}
        >
          Tambah Nama
        </button>

        <table className="table-auto w-full bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Umur</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.map((mahasiswa, index) => (
              <tr key={mahasiswa.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{mahasiswa.nama}</td>
                <td className="border px-4 py-2">{mahasiswa.umur}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => {
                      setEditId(mahasiswa.id);
                      setNewNama(mahasiswa.nama);
                      setNewUmur(mahasiswa.umur);
                      setModalVisible(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => confirmDelete(mahasiswa.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Tambah / Edit Mahasiswa */}
        {modalVisible && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-1/3">
              <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}</h2>
              <label className="block mb-2">Nama:</label>
              <input
                type="text"
                value={newNama}
                onChange={(e) => setNewNama(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 mb-4"
              />
              <label className="block mb-2">Umur:</label>
              <input
                type="number"
                value={newUmur}
                onChange={(e) => setNewUmur(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={resetForm}
                >
                  Batal
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={editId ? editMahasiswa : tambahMahasiswa}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-4 text-center">
      &copy; 2024 LSR_KDW
    </footer>
  );
}

export default App;
