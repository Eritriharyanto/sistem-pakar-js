import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";

const Hasil = () => {
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(true);
  const pdfRef = useRef();

  // Fungsi solusi bawaan jika backend tidak kirim
  const getSolutionText = (penyakitName) => {
    const solutions = {
      "Hiperemesis Gravidarum": [
        "Minum air sedikit-sedikit tapi sering untuk mencegah dehidrasi",
        "Konsumsi makanan hambar seperti biskuit kering",
        "Hindari makanan berlemak, pedas, atau berbau tajam",
        "Istirahat cukup dan hindari aktivitas berat",
        "Segera konsultasi ke dokter jika tidak bisa makan atau minum sama sekali",
      ],
      "Abortus Imminens": [
        "Istirahat total (bed rest)",
        "Hindari aktivitas fisik berat dan hubungan seksual",
        "Segera periksa ke dokter untuk evaluasi kondisi kehamilan",
        "Kelola stres dan perbanyak dukungan emosional",
      ],
      "Kehamilan Ektopik": [
        "Segera ke fasilitas kesehatan jika ada gejala mencurigakan",
        "Penanganan medis cepat diperlukan (operasi/laparoskopi)",
        "Lakukan pemeriksaan HCG dan USG transvaginal",
      ],
      Preeklampsia: [
        "Rutin kontrol tekanan darah dan pemeriksaan urine",
        "Istirahat cukup dan hindari stres",
        "Batasi konsumsi garam dan makanan berlemak",
        "Konsultasi rutin dengan dokter kandungan",
      ],
      "Anemia Kehamilan": [
        "Konsumsi makanan kaya zat besi seperti hati ayam, daging merah, dan sayuran hijau",
        "Minum suplemen zat besi sesuai anjuran dokter",
        "Konsumsi vitamin C untuk membantu penyerapan zat besi",
        "Hindari teh/kopi saat makan karena menghambat penyerapan zat besi",
      ],
      "Infeksi Saluran Kemih": [
        "Minum air putih yang banyak (minimal 8 gelas per hari)",
        "Jangan menahan buang air kecil",
        "Bersihkan area kewanitaan dari depan ke belakang",
        "Hindari sabun kewanitaan berpewangi",
        "Segera konsultasi ke dokter untuk pengobatan yang aman",
      ],
      "Plasenta Previa": [
        "Istirahat total jika mengalami perdarahan",
        "Hindari aktivitas fisik dan hubungan seksual",
        "Lakukan USG secara berkala untuk memantau posisi plasenta",
        "Konsultasikan dengan dokter mengenai persiapan persalinan",
      ],
      "Mola Hidatidosa": [
        "Segera lakukan pemeriksaan USG jika dicurigai mola",
        "Lakukan tindakan kuretase oleh tenaga medis",
        "Lakukan pemantauan kadar HCG secara rutin setelah tindakan",
        "Tunda kehamilan berikutnya hingga dokter menyatakan aman",
      ],
      "Diabetes Melitus Gestasional": [
        "Kontrol kadar gula darah secara rutin",
        "Atur pola makan sehat dan rendah gula",
        "Lakukan olahraga ringan seperti jalan kaki secara teratur",
        "Konsultasi dengan dokter atau ahli gizi mengenai menu harian",
      ],
      "Abortus Inkomplit": [
        "Segera periksa ke dokter jika terjadi perdarahan hebat",
        "Dilakukan kuretase atau evakuasi sisa jaringan dalam rahim",
        "Minum antibiotik jika diresepkan dokter untuk mencegah infeksi",
        "Istirahat total dan pantau tanda-tanda syok",
      ],
    };

    return (
      solutions[penyakitName] || [
        "Konsultasi dengan dokter untuk penanganan yang tepat",
        "Jaga pola makan yang sehat dan bergizi",
        "Istirahat yang cukup",
        "Minum air putih yang cukup",
        "Hindari stres berlebihan",
      ]
    );
  };

  useEffect(() => {
    const diagnosaId = localStorage.getItem("diagnosa_id");
    console.log("diagnosa_id dari localStorage:", diagnosaId);

    if (!diagnosaId) {
      alert("Diagnosa ID tidak ditemukan. Silakan lakukan diagnosa ulang.");
      return;
    }

    fetch(`http://localhost:3001/api/hasil/${diagnosaId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data dari API");
        return res.json();
      })
      .then((data) => {
        setHasil({
          identitas: {
            nama: data.identitas.nama,
            telepon: data.identitas.telepon,
            pekerjaan: data.identitas.pekerjaan,
            alamat: data.identitas.alamat,
            trimester: data.identitas.trimester,
          },
          penyakit: {
            nama: data.penyakit.nama,
            deskripsi: data.penyakit.deskripsi,
            solusi: data.penyakit.solusi,
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Gagal ambil data:", err);
        setLoading(false);
      });
  }, []);

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("hasil-diagnosa.pdf");
  };

  if (loading) {
    return <div className='container my-5'>Memuat hasil diagnosis...</div>;
  }

  if (!hasil || !hasil.identitas || !hasil.penyakit) {
    return (
      <div className='container my-5'>
        <div className='alert alert-danger'>
          Gagal memuat hasil diagnosis. Pastikan Anda telah mengisi semua data
          sebelumnya.
        </div>
      </div>
    );
  }

  const { identitas, penyakit } = hasil;
  const solusiFinal =
    penyakit.solusi && penyakit.solusi.length > 0
      ? penyakit.solusi
      : getSolutionText(penyakit.nama);

  return (
    <div className='container my-5' ref={pdfRef}>
      <div className='text-center mb-4'>
        <h2 className='fw-bold'>Hasil Diagnosis Penyakit Ibu Hamil</h2>
        <p className='text-muted'>
          Berdasarkan gejala dan informasi yang Anda berikan.
        </p>
      </div>

      <section className='mb-4'>
        <h5 className='bg-light p-2 fw-bold'>Identitas Pengguna</h5>
        <table className='table table-borderless'>
          <tbody>
            <tr>
              <th>Nama Lengkap</th>
              <td>{identitas.nama}</td>
            </tr>
            <tr>
              <th>Nomor Telepon</th>
              <td>{identitas.telepon}</td>
            </tr>
            <tr>
              <th>Pekerjaan</th>
              <td>{identitas.pekerjaan}</td>
            </tr>
            <tr>
              <th>Alamat</th>
              <td>{identitas.alamat}</td>
            </tr>
            <tr>
              <th>Trimester</th>
              <td>{identitas.trimester}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className='mb-4'>
        <h5 className='bg-light p-2 fw-bold'>Penyakit Terdeteksi</h5>
        <p className='ps-2 fw-semibold'>{penyakit.nama || "Tidak ditemukan"}</p>
        <p className='ps-2'>{penyakit.deskripsi || "-"}</p>
      </section>

      <section className='mb-4'>
        <h5 className='bg-light p-2 fw-bold'>Solusi / Saran Penanganan</h5>
        {solusiFinal.length > 0 ? (
          <ul className='ps-3'>
            {solusiFinal.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className='ps-2'>Solusi belum tersedia.</p>
        )}
      </section>

      <div className='text-center mt-4'>
        <button
          className='btn btn-danger rounded-pill px-4'
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Hasil;
