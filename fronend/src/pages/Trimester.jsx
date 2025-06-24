import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Trimester() {
  const navigate = useNavigate();
  const [selectedTrimester, setSelectedTrimester] = useState(null);

  const handleCheckboxChange = (num) => {
    setSelectedTrimester((prev) => (prev === num ? null : num));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTrimester) {
      alert("Pilih salah satu trimester terlebih dahulu");
      return;
    }

    // Arahkan ke halaman Diagnosa_1 sambil mengirim id trimester
    navigate("/Diagnosa_1", {
      state: { trimester_id: selectedTrimester },
    });
  };

  return (
    <div className='bg-white text-dark'>
      {/* Header Section */}
      <div style={{ backgroundColor: "#fef4e9", padding: "2rem" }}>
        <h2 className='fw-bold mb-4'>Diagnosis Penyakit</h2>
        <p className='text-muted' style={{ maxWidth: "600px" }}>
          Sebelum diagnosa penyakit ibu hamil, mohon isi form identitas terlebih
          dahulu untuk membantu kami memberikan diagnosis yang lebih akurat dan
          spesifik.
        </p>
      </div>

      {/* Main Section */}
      <main className='container'>
        <section className='py-5 px-3'>
          <h2 className='h5 fw-bold text-center mb-4'>Usia Kehamilan</h2>
          <form
            className='mx-auto'
            style={{ maxWidth: "600px" }}
            onSubmit={handleSubmit}
          >
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className='d-flex justify-content-between align-items-center py-2'
              >
                <label
                  htmlFor={`trimester${num}`}
                  className='form-label mb-0 small'
                >
                  {num}. Trimester {num}
                </label>
                <input
                  type='checkbox'
                  id={`trimester${num}`}
                  name='trimester'
                  checked={selectedTrimester === num}
                  onChange={() => handleCheckboxChange(num)}
                  className='form-check-input'
                />
              </div>
            ))}
            <div className='text-end mt-3'>
              <button
                type='submit'
                className='btn btn-sm text-white'
                style={{ backgroundColor: "#c96a6a" }}
              >
                Selanjutnya
              </button>
            </div>
          </form>
        </section>

        <section className='px-3 pb-5 mx-auto' style={{ maxWidth: "600px" }}>
          <h2 className='h5 fw-bold mb-3'>Catatan</h2>
          <p className='text-muted small text-justify'>
            Trimester 1 (1–13 minggu), Trimester 2 (14–26 minggu), Trimester 3
            (27–40 minggu).
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Trimester;
