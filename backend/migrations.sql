CREATE TABLE gejala (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode_gejala VARCHAR(10) NOT NULL UNIQUE,
  nama_gejala VARCHAR(255) NOT NULL
);

CREATE TABLE penyakit (
  id INT PRIMARY KEY AUTO_INCREMENT,
  kode VARCHAR(10) NOT NULL UNIQUE,
  nama_penyakit VARCHAR(100) NOT NULL,
  deskripsi TEXT
);

CREATE TABLE trimester (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_trimester VARCHAR(20) NOT NULL
);

CREATE TABLE pengguna (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama VARCHAR(50) NOT NULL,
  no_hp VARCHAR(15),
  pekerjaan VARCHAR(50),
  alamat VARCHAR(100)
);

CREATE TABLE diagnosa (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_pengguna INT NOT NULL,
  id_trimester INT NOT NULL,
  id_penyakit INT NOT NULL,
  tanggal_diagnosa DATE NOT NULL,
  FOREIGN KEY (id_pengguna) REFERENCES pengguna(id),
  FOREIGN KEY (id_trimester) REFERENCES trimester(id),
  FOREIGN KEY (id_penyakit) REFERENCES penyakit(id)
);

CREATE TABLE diagnosis_gejala (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_diagnosa INT NOT NULL,
  id_gejala INT NOT NULL,
  FOREIGN KEY (id_diagnosa) REFERENCES diagnosa(id),
  FOREIGN KEY (id_gejala) REFERENCES gejala(id)
);

CREATE TABLE aturan (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_penyakit INT NOT NULL,
  id_gejala INT NOT NULL,
  id_trimester INT NOT NULL,
  FOREIGN KEY (id_trimester) REFERENCES trimester(id),
  FOREIGN KEY (id_penyakit) REFERENCES penyakit(id),
  FOREIGN KEY (id_gejala) REFERENCES gejala(id)
);


-- Insert trimester data
INSERT INTO trimester (nama_trimester) VALUES 
('Trimester 1'),
('Trimester 2'),
('Trimester 3');

-- Insert gejala data
INSERT INTO gejala (id, kode_gejala, nama_gejala) VALUES
(1, 'G01', 'Usia kehamilan kurang dari 16 minggu'),
(2, 'G02', 'Usia kehamilan kurang dari 20 minggu'),
(3, 'G03', 'Usia kehamilan lebih dari 20 minggu'),
(4, 'G04', 'Memiliki riwayat Preeklampsia pada kehamilan sebelumnya'),
(5, 'G05', 'Memiliki riwayat Diabetes Gestasional pada kehamilan sebelumnya'),
(6, 'G06', 'Memiliki riwayat kehamilan diluar kandungan sebelumnya'),
(7, 'G07', 'Memiliki riwayat hipertensi atau darah tinggi'),
(8, 'G08', 'Memiliki penyakit turunan darah tinggi dari keluarga'),
(9, 'G09', 'Memiliki riwayat diabetes dalam keluarga'),
(10, 'G10', 'Terjadi perdarahan pada usia kehamilan kurang dari 20 minggu'),
(11, 'G11', 'Terjadi perdarahan pada usia kehamilan lebih dari 22 minggu'),
(12, 'G12', 'Keluarnya darah tampak seperti flek darah'),
(13, 'G13', 'Perdarahan ringan berulang pada trimester dua atau tiga'),
(14, 'G14', 'Rahim terasa lebih besar dari usia kehamilan'),
(15, 'G15', 'Tingginya kadar hormon kehamilan (hCG)'),
(16, 'G16', 'Nyeri tajam di satu sisi perut bagian bawah'),
(17, 'G17', 'Perdarahan disertai gumpalan darah'),
(18, 'G18', 'Perdarahan tanpa nyeri perut'),
(19, 'G19', 'Tekanan atau rasa penuh pada panggul'),
(20, 'G20', 'Rasa tidak nyaman di perut bagian bawah'),
(21, 'G21', 'Keluhan pusing dan mual berlebihan'),
(22, 'G22', 'Perdarahan tanpa kontraksi rahim'),
(23, 'G23', 'Jaringan janin keluar tidak utuh dari jalan lahir'),
(24, 'G24', 'Rasa sakit dan nyeri pada perut bagian bawah'),
(25, 'G25', 'Nyeri pada tulang panggul'),
(26, 'G26', 'Nyeri atau kram pada panggul terus menerus dan memberat'),
(27, 'G27', 'Nyeri menjalar hingga bahu dan leher'),
(28, 'G28', 'Pusing terus menerus'),
(29, 'G29', 'Sakit kepala hebat seperti tertusuk-tusuk'),
(30, 'G30', 'Mual dan muntah'),
(31, 'G31', 'Mual dan muntah berlebih dan terus menerus (lebih dari 4x)'),
(32, 'G32', 'Kulit, bibir dan wajah terlihat pucat'),
(33, 'G33', 'Wajah terlihat pucat, pusing kepala, hingga pingsan'),
(34, 'G34', 'Wajah dan badan terlihat pucat kekuning-kuningan'),
(35, 'G35', 'Mengalami Jaundice (kulit dan mata menjadi kuning)'),
(36, 'G36', 'Kesulitan bernapas atau sesak napas'),
(37, 'G37', 'Tidur menggunakan 2-3 bantal untuk meredakan sesak napas'),
(38, 'G38', 'Detak jantung tidak teratur'),
(39, 'G39', 'Mudah lelah dan lesu'),
(40, 'G40', 'Mudah pingsan'),
(41, 'G41', 'Gangguan penglihatan (pandangan mata kabur, pandangan mata hilang secara sementara, berkunang-kunang)'),
(42, 'G42', 'Pembengkakan pada kaki'),
(43, 'G43', 'Pembengkakan pada bagian telapak kaki, wajah, dan tangan atau salah satu'),
(44, 'G44', 'Berat badan turun'),
(45, 'G45', 'Lidah mengering dan kotor'),
(46, 'G46', 'Mulut terasa kering'),
(47, 'G47', 'Rasa haus yang berlebih'),
(48, 'G48', 'Dehidrasi'),
(49, 'G49', 'Kenaikan suhu badan atau demam jika terjadi dehidrasi'),
(50, 'G50', 'Kenaikan suhu badan atau demam'),
(51, 'G51', 'Sensitif terhadap aroma tertentu'),
(52, 'G52', 'Mengeluarkan air liur secara berlebihan'),
(53, 'G53', 'Tangan gemetar dan berkeringat'),
(54, 'G54', 'Tekanan darah menjadi tinggi'),
(55, 'G55', 'Tidak ada tanda-tanda adanya janin/tidak merasakan gerakan janin'),
(56, 'G56', 'Rahim yang tampak lebih besar dari usia kandungan'),
(57, 'G57', 'Rasa sakit saat buang air kecil'),
(58, 'G58', 'Frekuensi buang air kecil meningkat'),
(59, 'G59', 'Urine yang keluar hanya sedikit'),
(60, 'G60', 'Cairan urine keruh'),
(61, 'G61', 'Nyeri pada bagian kandung kemih'),
(62, 'G62', 'Ada sensasi terbakar atau kram di perut bagian bawah'),
(63, 'G63', 'Teraba adanya jaringan (janin berwarna putih) pada gumpalan darah'),
(64, 'G64', 'Keluarnya jaringan tidak seluruhnya (tidak ada bagian dari plasenta, memungkinkan plasenta masih tertinggal di dalam)'),
(65, 'G65', 'Kontraksi berkurang setelah keluarnya jaringan (janin) berwarna putih.'),
(66, 'G66', 'Hilangnya tanda-tanda kehamilan misalnya tidak ada nyeri payudara, tidak ada mual-muntah (morning sickness)'),
(67, 'G67', 'Pada kondisi perdarahan hebat dapat menimbulkan gejala anemia (pusing, pandangan mata kabur, pingsan)');

-- Insert penyakit data
INSERT INTO penyakit (kode, nama_penyakit, deskripsi) VALUES
('P01', 'Anemia Kehamilan', 'Anemia kehamilan adalah kondisi saat kadar hemoglobin dalam darah ibu hamil berada di bawah normal akibat kekurangan zat besi, folat, atau vitamin B12. Gejalanya termasuk lemas, pucat, sesak napas, dan detak jantung cepat. Jika tidak ditangani, dapat menyebabkan komplikasi seperti persalinan prematur atau berat bayi lahir rendah.'),
('P02', 'Preeklampsia','Preeklampsia adalah komplikasi kehamilan yang ditandai oleh tekanan darah tinggi dan adanya protein dalam urin setelah usia kehamilan 20 minggu. Gejalanya bisa meliputi sakit kepala, gangguan penglihatan, pembengkakan, dan nyeri perut bagian atas. Jika tidak segera ditangani, dapat berkembang menjadi eklampsia yang mengancam nyawa.'),
('P03', 'Plasenta Previa','Plasenta previa adalah kondisi ketika plasenta menutupi sebagian atau seluruh jalan lahir (serviks). Hal ini bisa menyebabkan perdarahan hebat selama kehamilan atau saat persalinan. Biasanya terdeteksi melalui USG, dan penanganannya bisa melibatkan persalinan sesar untuk menghindari risiko bagi ibu dan bayi.'),
('P04', 'Hiperemesis Gravidarum','Hiperemesis gravidarum adalah kondisi mual dan muntah berlebihan pada kehamilan yang menyebabkan dehidrasi, ketidakseimbangan elektrolit, dan penurunan berat badan. Berbeda dari morning sickness biasa, kondisi ini memerlukan perawatan medis seperti cairan infus dan obat antiemetik.'),
('P05', 'Kehamilan Ektopik','Kehamilan ektopik terjadi ketika sel telur yang dibuahi tertanam di luar rahim, biasanya di tuba falopi. Gejalanya termasuk nyeri perut tajam, perdarahan vagina, dan pusing berat. Kehamilan ini tidak dapat dilanjutkan dan perlu segera ditangani untuk mencegah ruptur dan perdarahan internal yang fatal.'),
('P06', 'Mola Hidatidosa','Mola hidatidosa atau hamil anggur adalah kehamilan abnormal akibat pertumbuhan jaringan plasenta yang tidak normal, membentuk gelembung-gelembung seperti anggur. Ditandai dengan perdarahan, pembesaran rahim tidak sesuai usia kehamilan, dan kadar hCG yang sangat tinggi. Penanganannya termasuk kuretase dan pemantauan kadar hCG.'),
('P07', 'Infeksi Saluran Kemih','ISK pada ibu hamil adalah infeksi yang terjadi di saluran kemih, seperti kandung kemih atau ginjal. Gejalanya termasuk nyeri saat buang air kecil, sering ingin buang air kecil, dan urin keruh atau berdarah. Jika tidak diobati, dapat memicu persalinan prematur atau infeksi ginjal.'),
('P08', 'Diabetes Melitus Gestasional','Diabetes melitus gestasional adalah kondisi meningkatnya kadar gula darah yang hanya terjadi selama kehamilan. Umumnya tidak menunjukkan gejala, tapi dapat berdampak pada bayi seperti makrosomia (bayi besar), persalinan sesar, dan risiko diabetes tipe 2 di masa depan. Penanganannya termasuk diet, olahraga, dan kadang insulin.'),
('P09', 'Abortus Imminens','Abortus imminens adalah ancaman keguguran yang ditandai dengan perdarahan ringan, kram perut, tetapi serviks masih tertutup dan janin masih hidup. Dengan istirahat dan pemantauan medis, kondisi ini masih bisa berlanjut menjadi kehamilan normal jika ditangani segera.'),
('P10', 'Abortus Inkomplit','Abortus inkomplit adalah kondisi keguguran di mana sebagian jaringan kehamilan masih tertinggal di dalam rahim. Gejalanya meliputi perdarahan terus-menerus dan nyeri perut. Biasanya memerlukan tindakan kuretase untuk membersihkan rahim secara menyeluruh.');


-- T1 
-- Kehamilan Ektopik (T1)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(1, 1, 5, 26),
(2, 1, 5, 27),
(3, 1, 5, 10),
(4, 1, 5, 63),
(5, 1, 5, 65);

-- Hiperemesis Gravidarum (T1)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(6, 1, 4, 30),
(7, 1, 4, 31),
(8, 1, 4, 52),
(9, 1, 4, 51),
(10, 1, 4, 47);

-- Abortus Imminens (T1)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(11, 1, 9, 10),
(12, 1, 9, 12),
(13, 1, 9, 24),
(14, 1, 9, 28),
(15, 1, 9, 67);


-- T2
-- Anemia Kehamilan (T2)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(16, 2, 1, 32),
(17, 2, 1, 33),
(18, 2, 1, 34),
(19, 2, 1, 67),
(20, 2, 1, 28);

-- Preeklampsia (T2)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(21, 2, 2, 41),
(22, 2, 2, 42),
(23, 2, 2, 43),
(24, 2, 2, 54),
(25, 2, 2, 29);

-- Infeksi Saluran Kemih (T2)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(26, 2, 7, 57),
(27, 2, 7, 58),
(28, 2, 7, 59),
(29, 2, 7, 60),
(30, 2, 7, 61),
(31, 2, 7, 62);


-- T3
-- Plasenta Previa (T3)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(32, 3, 3, 11),
(33, 3, 3, 66),
(34, 3, 3, 56),
(35, 3, 3, 55),
(36, 3, 3, 64);

-- Mola Hidatidosa (T3)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(37, 3, 6, 56),
(38, 3, 6, 55),
(39, 3, 6, 49),
(40, 3, 6, 65),
(41, 3, 6, 63);

-- Diabetes Gestasional (T3)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(42, 3, 8, 45),
(43, 3, 8, 46),
(44, 3, 8, 47),
(45, 3, 8, 48),
(46, 3, 8, 54);

-- Abortus Inkomplit (T3)
INSERT INTO aturan (id, id_trimester, id_penyakit, id_gejala) VALUES
(47, 3, 10, 11),  -- Perdarahan > 22 minggu
(48, 3, 10, 64),  -- Jaringan tidak keluar semua
(49, 3, 10, 65),  -- Kontraksi berkurang
(50, 3, 10, 24),  -- Nyeri perut bawah
(51, 3, 10, 67);  -- Gejala anemia (pusing, kabur, pingsan)
