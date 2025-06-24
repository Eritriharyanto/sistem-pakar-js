import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function FormIdentitas() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    pekerjaan: "",
    alamat: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Hapus error saat user mulai mengetik
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "Mohon diisi";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/pengguna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Berhasil kirim identitas:", data);

      // ✅ Perbaikan di sini
      localStorage.setItem("user_id", data.user_id);

      navigate("/Trimester");
    } catch (err) {
      console.error("Gagal mengirim data identitas:", err);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      <div className='p-4'>
        <h2 className='fw-bold mb-3'>Form Identitas</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='nama'
              placeholder='Nama Lengkap'
              value={formData.nama}
              onChange={handleChange}
            />
            {errors.nama && (
              <small style={{ color: "red" }}>{errors.nama}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='no_hp'
              placeholder='no_hp'
              value={formData.no_hp}
              onChange={handleChange}
            />
            {errors.no_hp && (
              <small style={{ color: "red" }}>{errors.no_hp}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='pekerjaan'
              placeholder='Pekerjaan'
              value={formData.pekerjaan}
              onChange={handleChange}
            />
            {errors.pekerjaan && (
              <small style={{ color: "red" }}>{errors.pekerjaan}</small>
            )}
          </div>

          <div className='mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow-sm'
              name='alamat'
              placeholder='Alamat'
              value={formData.alamat}
              onChange={handleChange}
            />
            {errors.alamat && (
              <small style={{ color: "red" }}>{errors.alamat}</small>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-danger px-4 py-2 rounded-pill'
          >
            Selanjutnya
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default FormIdentitas;
