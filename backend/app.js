// app.js
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwertyuiop890",
  database: "ibu_hamil_js",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi gagal:", err);
    return;
  }
  console.log("Koneksi MySQL berhasil ✅");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!", timestamp: new Date().toISOString() });
});

app.get("/api/gejala", (req, res) => {
  const query = "SELECT * FROM gejala ORDER BY id";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Gagal mengambil data gejala:", err);
      return res.status(500).json({ error: "Gagal mengambil data gejala" });
    }
    res.json(results);
  });
});

app.get("/api/gejala/trimester/:trimester_id", (req, res) => {
  const trimesterId = req.params.trimester_id;
  const query = `
    SELECT DISTINCT g.id, g.kode_gejala, g.nama_gejala
    FROM aturan a
    JOIN gejala g ON a.id_gejala = g.id
    WHERE a.id_trimester = ? ORDER BY g.id`;

  db.query(query, [trimesterId], (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil gejala" });
    res.json(results);
  });
});

app.post("/api/pengguna", (req, res) => {
  const { nama, no_hp, pekerjaan, alamat } = req.body;
  if (!nama || !no_hp || !pekerjaan || !alamat) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  const query = `
    INSERT INTO pengguna (nama, no_hp, pekerjaan, alamat)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [nama, no_hp, pekerjaan, alamat], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal menyimpan pengguna" });
    res
      .status(201)
      .json({ message: "Pengguna ditambahkan", user_id: result.insertId });
  });
});

app.post("/api/trimester", (req, res) => {
  const { nama_trimester } = req.body;

  if (!nama_trimester) {
    return res.status(400).json({ error: "Nama trimester wajib diisi" });
  }

  const query = `
    INSERT INTO trimester (nama_trimester)
    VALUES (?)
  `;

  db.query(query, [nama_trimester], (err, result) => {
    if (err) {
      console.error("❌ Gagal menyimpan data trimester:", err);
      return res.status(500).json({ error: "Gagal menyimpan data trimester" });
    }

    res.json({ status: "berhasil", id: result.insertId });
  });
});

app.post("/api/diagnosa", (req, res) => {
  const { user_id, trimester_id, gejala } = req.body;
  if (
    !user_id ||
    !trimester_id ||
    !Array.isArray(gejala) ||
    gejala.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Data tidak lengkap atau gejala kosong" });
  }

  const aturanQuery = `
    SELECT a.id_penyakit, a.id_gejala, p.nama_penyakit, p.deskripsi, p.kode
    FROM aturan a
    JOIN penyakit p ON a.id_penyakit = p.id
    WHERE a.id_trimester = ?
  `;

  db.query(aturanQuery, [trimester_id], (err, rules) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil aturan" });

    const penyakitMap = {};
    rules.forEach((r) => {
      if (!penyakitMap[r.id_penyakit]) {
        penyakitMap[r.id_penyakit] = {
          nama: r.nama_penyakit,
          deskripsi: r.deskripsi,
          kode: r.kode,
          gejala_required: [],
        };
      }
      penyakitMap[r.id_penyakit].gejala_required.push(r.id_gejala);
    });

    let bestMatch = null;
    let bestPercentage = 0;

    for (const id in penyakitMap) {
      const { gejala_required, nama, deskripsi, kode } = penyakitMap[id];
      const match = gejala_required.filter((g) => gejala.includes(g));
      const percentage = (match.length / gejala_required.length) * 100;
      if (percentage > bestPercentage) {
        bestPercentage = percentage;
        bestMatch = { id, nama, deskripsi, kode, persentase: percentage };
      }
    }

    if (!bestMatch)
      return res
        .status(404)
        .json({ error: "Tidak ditemukan penyakit yang cocok" });

    const insertDiagnosa = `
      INSERT INTO diagnosa (id_pengguna, id_trimester, id_penyakit, tanggal_diagnosa)
      VALUES (?, ?, ?, NOW())`;

    db.query(
      insertDiagnosa,
      [user_id, trimester_id, bestMatch.id],
      (err, result) => {
        if (err)
          return res.status(500).json({ error: "Gagal menyimpan diagnosa" });

        const diagnosa_id = result.insertId;
        const gejalaQueries = gejala.map((g) => [diagnosa_id, g]);
        db.query(
          "INSERT INTO diagnosis_gejala (id_diagnosa, id_gejala) VALUES ?",
          [gejalaQueries],
          (err2) => {
            if (err2)
              return res
                .status(500)
                .json({ error: "Gagal menyimpan detail gejala" });
                res.status(201).json({
                  message: "Diagnosa berhasil",
                  diagnosa_id: diagnosa_id, // ✅ HARUS ADA INI
                  hasil: bestMatch,
                });
          }
        );
      }
    );
  });
});

app.get("/api/diagnosa/:id", (req, res) => {
  const diagnosaId = req.params.id;

  const query = `
    SELECT d.*, p.nama AS nama, p.no_hp AS telepon, p.pekerjaan, p.alamat,
           t.nama_trimester,
           py.nama_penyakit AS nama_penyakit, py.deskripsi
    FROM diagnosa d
    JOIN pengguna p ON d.id_pengguna = p.id
    JOIN trimester t ON d.id_trimester = t.id
    JOIN penyakit py ON d.id_penyakit = py.id
    WHERE d.id = ?
  `;

  db.query(query, [diagnosaId], (err, result) => {
    if (err) {
      console.error("❌ Gagal ambil hasil diagnosa:", err);
      return res.status(500).json({ error: "Gagal ambil hasil diagnosa" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Data diagnosa tidak ditemukan" });
    }

    const row = result[0];

    const response = {
      identitas: {
        nama: row.nama,
        telepon: row.telepon,
        pekerjaan: row.pekerjaan,
        alamat: row.alamat,
        trimester: row.nama_trimester,
      },
      penyakit: {
        nama: row.nama_penyakit,
        deskripsi: row.deskripsi,
      },
    };

    res.json(response);
  });
});


app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
