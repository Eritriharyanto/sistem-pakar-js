import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

function Diagnosa_1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { trimester_id } = location.state || {};

  const [gejalaList, setGejalaList] = useState([]);
  const [gejala, setGejala] = useState({});

  useEffect(() => {
    // Cegah user jika masuk tanpa pilih trimester
    if (!trimester_id) {
      alert("Silakan pilih trimester terlebih dahulu.");
      navigate("/trimester");
      return;
    }

    // Ambil data gejala berdasarkan trimester
    fetch(`http://localhost:3001/api/gejala/trimester/${trimester_id}`)
      .then((res) => res.json())
      .then((data) => setGejalaList(data))
      .catch((err) => console.error("Gagal mengambil data gejala:", err));
  }, [trimester_id, navigate]);

  const handleChange = (id, value) => {
    setGejala((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedGejala = Object.entries(gejala)
      .filter(([_, value]) => value === "ya")
      .map(([id]) => parseInt(id));

    const user_id = localStorage.getItem("user_id");

    if (!user_id || !trimester_id) {
      alert("User atau Trimester belum lengkap");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/diagnosa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(user_id),
          trimester_id: parseInt(trimester_id),
          gejala: selectedGejala,
        }),
      });

      const data = await response.json();
      console.log("Hasil diagnosis:", data); // ✅ CEK APA ADA diagnosa_id

      if (data.diagnosa_id) {
        localStorage.setItem("diagnosa_id", data.diagnosa_id); // ⬅️ WAJIB ADA
        localStorage.setItem("hasil_diagnosa", JSON.stringify(data));
        navigate("/hasil");
      } else {
        alert("Gagal mendapatkan diagnosa_id dari server");
      }
    } catch (error) {
      console.error("Gagal mengirim data diagnosa:", error);
    }
  };

  return (
    <div className='bg-white text-dark'>
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik. Kami akan menjaga semua kerahasiaan informasi yang anda
          berikan dan hanya akan kami gunakan untuk kepentingan diagnosis.
        </p>
      </div>

      <main className='container py-5'>
        <h2 className='fw-bold mb-4 text-center'>Identifikasi Gejala</h2>
        <form onSubmit={handleSubmit}>
          {gejalaList.map((item, i) => (
            <div
              className='row align-items-center border-bottom py-2'
              key={item.id}
            >
              <div className='col-12 col-md-6 mb-2 mb-md-0'>
                {`${i + 1}. ${item.nama_gejala}`}
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${item.id}`}
                    value='ya'
                    checked={gejala[item.id] === "ya"}
                    onChange={() => handleChange(item.id, "ya")}
                    id={`ya-${item.id}`}
                  />
                  <label className='form-check-label' htmlFor={`ya-${item.id}`}>
                    Ya
                  </label>
                </div>
              </div>
              <div className='col-6 col-md-3 text-start text-md-center'>
                <div className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name={`gejala-${item.id}`}
                    value='tidak'
                    checked={gejala[item.id] === "tidak"}
                    onChange={() => handleChange(item.id, "tidak")}
                    id={`tidak-${item.id}`}
                  />
                  <label
                    className='form-check-label'
                    htmlFor={`tidak-${item.id}`}
                  >
                    Tidak
                  </label>
                </div>
              </div>
            </div>
          ))}

          <div className='d-flex justify-content-end mt-4'>
            <button type='submit' className='btn btn-danger rounded-pill px-4'>
              Selanjutnya
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Diagnosa_1;
