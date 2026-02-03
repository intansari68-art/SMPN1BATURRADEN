import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, Printer, Sparkles, Loader2, BookOpen, MessageCircle, Smile, MapPin, Calendar, Download, Users, Brain, Target, Share2 } from 'lucide-react';

// --- DATASET DARI DOKUMEN ---
const databaseCPTP = [
  // KELAS 7
  { kelas: "7", semester: "1", elemen: "Menyimak", topik: "Teks Deskripsi", tp_kode: "7.1.1", tp: "Menganalisis informasi berupa gagasan dan pesan dalam teks deskripsi yang didengar.", indikator: ["Memahami struktur dan kebahasaan teks deskripsi", "Memahami ide pokok dan gagasan penjelas dalam teks deskripsi", "Menganalisis gagasan dalam teks deskripsi"] },
  { kelas: "7", semester: "1", elemen: "Menulis", topik: "Teks Deskripsi", tp_kode: "7.1.2", tp: "Menulis gagasan, pandangan, arahan, pesan, pengalaman dalam bentuk teks deskripsi.", indikator: ["Menentukan objek yang akan dideskripsikan", "Menyusun gagasan berdasarkan objek yang diamati dalam bentuk kerangka karangan", "Menulis gagasan dalam bentuk teks deskripsi secara lengkap sesuai kerangka karangan"] },
  { kelas: "7", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Fantasi/Puisi Rakyat", tp_kode: "7.1.3", tp: "Memahami informasi berupa pesan dari teks fantasi/puisi rakyat untuk menemukan makna yang tersurat dan tersirat.", indikator: ["Memahami struktur dan kebahasaan teks Fantasi/Puisi Rakyat", "Memahami informasi berupa pesan dalam teks fantasi", "Memahami informasi berupa pesan dalam teks puisi rakyat"] },
  { kelas: "7", semester: "1", elemen: "Berbicara", topik: "Teks Fantasi/Puisi Rakyat", tp_kode: "7.1.4", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks fantasi/puisi rakyat.", indikator: ["Menentukan tema atau topik puisi rakyat", "Menyusun gagasan, pandangan berdasarkan topik yang dipilih", "Mempresentasikan gagasan dan pandangan dalam bentuk teks puisi rakyat"] },
  { kelas: "7", semester: "1", elemen: "Menulis", topik: "Teks Fantasi/Puisi Rakyat", tp_kode: "7.1.5", tp: "Menulis gagasan, pandangan, arahan, pesan, pengalaman, dan/atau imajinasi dalam bentuk teks fantasi/puisi rakyat.", indikator: ["Menentukan tema teks fantasi berdasarkan fakta, pengalaman dan imajinasi", "Menyusun kerangka teks fantasi", "Menulis gagasan dalam bentuk teks fantasi secara utuh"] },
  { kelas: "7", semester: "1", elemen: "Menyimak", topik: "Teks Prosedur", tp_kode: "7.1.6", tp: "Menganalisis informasi berupa arahan dari teks prosedur yang didengar.", indikator: ["Memahami informasi berupa struktur dan kebahasaan teks prosedur", "Menganalisis informasi berupa arahan dalam teks prosedur"] },
  { kelas: "7", semester: "1", elemen: "Menulis", topik: "Teks Prosedur", tp_kode: "7.1.7", tp: "Menulis gagasan, pandangan, arahan, pesan, pengalaman dalam bentuk teks prosedur.", indikator: ["Menentukan topik yang akan disusun menjadi teks prosedur", "Menyusun kerangka teks prosedur secara logis, kritis, dan kreatif", "Menulis teks prosedur secara logis, kritis, dan kreatif"] },
  { kelas: "7", semester: "2", elemen: "Menyimak", topik: "Teks Berita", tp_kode: "7.2.1", tp: "Menganalisis informasi berupa gagasan dan pesan dalam teks berita yang didengar.", indikator: ["Memahami struktur dan kebahasaan teks berita", "Menentukan informasi berupa fakta dan opini dalam teks berita", "Mengeksplorasi informasi dalam teks berita"] },
  { kelas: "7", semester: "2", elemen: "Berbicara", topik: "Teks Berita", tp_kode: "7.2.2", tp: "Menyajikan ungkapan kepedulian dari teks berita.", indikator: ["Menentukan topik aktual berdasarkan analisis lingkungan sekitar", "Menyusun kerangka teks berita dari topik aktual", "Menulis teks berita berdasarkan kerangka", "Menyajikan teks berita dalam bentuk multimoda"] },
  { kelas: "7", semester: "2", elemen: "Membaca dan Memirsa", topik: "Buku Fiksi dan Nonfiksi", tp_kode: "7.2.3", tp: "Menggunakan sumber informasi lain untuk menilai akurasi dan kualitas data serta membandingkan informasi pada buku fiksi dan nonfiksi.", indikator: ["Memahami unsur-unsur buku fiksi dan nonfiksi", "Menganalisis unsur-unsur buku fiksi dan nonfiksi", "Menggunakan informasi unsur-unsur untuk membandingkan"] },
  { kelas: "7", semester: "2", elemen: "Menulis", topik: "Buku Fiksi dan Nonfiksi", tp_kode: "7.2.4", tp: "Menulis ungkapan kepedulian dan/atau pendapat pro/kontra tentang buku fiksi atau nonfiksi.", indikator: ["Menentukan kekurangan dan kelebihan pada sebuah buku", "Menyusun kerangka tanggapan sebagai bentuk penghargaan", "Menulis pendapat pro dan kontra tentang buku fiksi dan nonfiksi"] },
  { kelas: "7", semester: "2", elemen: "Membaca dan Memirsa", topik: "Teks Surat", tp_kode: "7.2.5", tp: "Memahami informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari teks surat untuk menemukan makna yang tersurat dan tersirat.", indikator: ["Memahami struktur dan kebahasaan dalam surat resmi dan pribadi", "Memahami informasi berupa gagasan, arahan, atau pesan dalam surat"] },
  { kelas: "7", semester: "2", elemen: "Menulis", topik: "Teks Surat", tp_kode: "7.2.6", tp: "Menulis gagasan, pandangan, arahan, pesan, pengalaman dalam bentuk teks surat.", indikator: ["Menentukan topik yang akan disusun menjadi teks surat pribadi", "Menyusun kerangka teks surat pribadi", "Menulis gagasan dalam bentuk teks surat pribadi"] },

  // KELAS 8
  { kelas: "8", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks LHO", tp_kode: "8.1.1", tp: "Mengevaluasi kualitas dan/atau kredibilitas pada teks laporan hasil observasi.", indikator: ["Memahami struktur dan kebahasaan teks LHO", "Menganalisis informasi dalam teks LHO", "Mengevaluasi kualitas dan kredibilitas teks LHO"] },
  { kelas: "8", semester: "1", elemen: "Menulis", topik: "Teks LHO", tp_kode: "8.1.2", tp: "Menulis gagasan dan pengalaman dalam bentuk teks LHO.", indikator: ["Menentukan topik teks LHO berdasarkan analisis lingkungan", "Menyusun kerangka teks LHO", "Menulis gagasan dan pengalaman dalam bentuk teks LHO"] },
  { kelas: "8", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Iklan, Slogan, Poster", tp_kode: "8.1.3", tp: "Memahami informasi berupa gagasan, pikiran, pandangan, arahan atau pesan dari teks iklan, slogan, poster untuk menemukan makna yang tersurat dan tersirat.", indikator: ["Memahami struktur dan kebahasaan teks iklan, slogan, dan poster", "Memahami informasi dalam teks iklan, slogan dan poster", "Menemukan makna tersurat dan tersirat"] },
  { kelas: "8", semester: "1", elemen: "Berbicara", topik: "Teks Iklan, Slogan, Poster", tp_kode: "8.1.4", tp: "Menyajikan ungkapan kepedulian dari iklan, slogan, poster.", indikator: ["Menentukan topik iklan/slogan/poster dari analisis permasalahan gender/keberagaman", "Menyusun iklan, slogan atau poster", "Menyajikan ungkapan kepedulian dari iklan, slogan, atau poster"] },
  { kelas: "8", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Artikel Ilmiah Populer", tp_kode: "8.1.5", tp: "Mengevaluasi kualitas dan/atau kredibilitas pada artikel ilmiah populer.", indikator: ["Memahami struktur dan kebahasaan teks artikel ilmiah populer", "Menganalisis informasi dalam teks artikel ilmiah populer", "Mengevaluasi teks artikel ilmiah populer yang dibaca"] },
  { kelas: "8", semester: "1", elemen: "Menulis", topik: "Teks Artikel Ilmiah Populer", tp_kode: "8.1.6", tp: "Menulis gagasan, pandangan, arahan, pesan, pengalaman dalam bentuk teks artikel ilmiah populer.", indikator: ["Menentukan permasalahan dari analisis lingkungan sekitar", "Menyusun kerangka artikel ilmiah populer", "Menulis artikel ilmiah populer dengan struktur dan kebahasaan yang tepat"] },
  { kelas: "8", semester: "2", elemen: "Menyimak", topik: "Teks Ulasan", tp_kode: "8.2.1", tp: "Menganalisis informasi berupa gagasan, pandangan dari teks ulasan yang didengar.", indikator: ["Memahami struktur dan kebahasaan teks ulasan", "Menganalisis gagasan pokok dan gagasan penjelas dalam teks ulasan"] },
  { kelas: "8", semester: "2", elemen: "Menulis", topik: "Teks Ulasan", tp_kode: "8.2.2", tp: "Menulis ungkapan kepedulian dan/atau pendapat pro/kontra dalam teks ulasan.", indikator: ["Menentukan karya yang akan diulas", "Menyusun kerangka teks ulasan", "Menulis pendapat pro dan kontra dalam bentuk teks ulasan"] },
  { kelas: "8", semester: "2", elemen: "Menyimak", topik: "Teks Puisi", tp_kode: "8.2.3", tp: "Menganalisis unsur intrinsik dari teks puisi yang didengar.", indikator: ["Memahami unsur-unsur dalam teks puisi", "Menganalisis unsur-unsur dalam teks puisi"] },
  { kelas: "8", semester: "2", elemen: "Menulis", topik: "Teks Puisi", tp_kode: "8.2.4", tp: "Menggunakan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk menulis teks puisi.", indikator: ["Mengidentifikasi kosakata bermakna denotatif dan konotatif", "Memaknai kosakata bermakna denotatif dan konotatif", "Menggunakan kosakata bermakna denotatif dan konotatif untuk menulis puisi"] },
  { kelas: "8", semester: "2", elemen: "Menyimak", topik: "Teks Pidato", tp_kode: "8.2.5", tp: "Memaknai informasi berupa gagasan, pandangan, arahan atau pesan dari teks pidato yang didengar.", indikator: ["Memahami struktur dan kebahasaan teks pidato", "Mengidentifikasi pandangan, arahan, dan pesan dalam teks pidato", "Memaknai pandangan, arahan, dan pesan dalam teks pidato"] },
  { kelas: "8", semester: "2", elemen: "Berbicara", topik: "Teks Pidato", tp_kode: "8.2.6", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks pidato.", indikator: ["Menentukan topik atau permasalahan dari analisis lingkungan sekitar", "Menyusun kerangka teks pidato", "Menulis teks pidato lengkap", "Mempresentasikan teks pidato secara lisan"] },

  // KELAS 9
  { kelas: "9", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Deskripsi", tp_kode: "9.1.1", tp: "Mengevaluasi kualitas dan/atau kredibilitas pada teks deskripsi.", indikator: ["Memahami gagasan pokok dan gagasan penjelas dalam teks deskripsi", "Menganalisis sudut pandangan dalam teks deskripsi", "Mengevaluasi teks deskripsi"] },
  { kelas: "9", semester: "1", elemen: "Berbicara", topik: "Teks Deskripsi", tp_kode: "9.1.2", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks deskripsi.", indikator: ["Menentukan objek yang akan dideskripsikan", "Menyusun gagasan berdasarkan objek yang diamati", "Menulis gagasan dalam bentuk teks deskripsi secara lengkap", "Mempresentasikan teks deskripsi dalam bentuk teks audiovisual"] },
  { kelas: "9", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Prosedur", tp_kode: "9.1.3", tp: "Mengevaluasi kualitas dan/atau kredibilitas pada teks prosedur.", indikator: ["Mengidentifikasi informasi dalam teks prosedur", "Mengeksplorasi informasi dalam teks prosedur", "Mengevaluasi teks prosedur yang dibaca"] },
  { kelas: "9", semester: "1", elemen: "Berbicara", topik: "Teks Prosedur", tp_kode: "9.1.4", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks prosedur.", indikator: ["Menentukan arahan dalam sebuah teks cerpen", "Menyusun kerangka teks prosedur dari arahan dalam teks cerpen", "Megubah teks cerpen menjadi sebuah teks prosedur", "Mempresentasikan arahan dalam bentuk teks prosedur audiovisual"] },
  { kelas: "9", semester: "1", elemen: "Membaca dan Memirsa", topik: "Teks Rekon", tp_kode: "9.1.5", tp: "Mengevaluasi kualitas dan/atau kredibilitas pada teks rekon.", indikator: ["Mengidentifikasi struktur dan kebahasaan teks rekon", "Mengevaluasi kualitas teks rekon"] },
  { kelas: "9", semester: "1", elemen: "Menulis", topik: "Teks Rekon", tp_kode: "9.1.6", tp: "Menggunakan kosakata baru yang memiliki makna denotatif, konotatif, dan kiasan untuk menulis teks Rekon.", indikator: ["Menentukan topik teks rekon berdasarkan hasil analisis fakta", "Menyusun kerangka teks rekon", "Menggunakan kosakata baru untuk mengembangkan teks rekon"] },
  { kelas: "9", semester: "2", elemen: "Menyimak", topik: "Teks Eksplanasi", tp_kode: "9.2.1", tp: "Menganalisis informasi berupa gagasan dan pesan dalam teks eksplanasi yang didengar.", indikator: ["Memahami struktur dan kebahasaan teks eksplanasi", "Menganalisis informasi berupa gagasan pokok dan gagasan penjelas dalam teks eksplanasi"] },
  { kelas: "9", semester: "2", elemen: "Berbicara", topik: "Teks Eksplanasi", tp_kode: "9.2.2", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks eksplanasi.", indikator: ["Menentukan topik aktual teks eksplanasi", "Menyusun kerangka teks eksplanasi", "Menulis teks eksplanasi sesuai struktur", "Mempresentasikan teks eksplanasi yang telah disusun"] },
  { kelas: "9", semester: "2", elemen: "Membaca dan Memirsa", topik: "Teks Laporan", tp_kode: "9.2.3", tp: "Menginterpretasikan informasi untuk mengungkapkan simpati, kepedulian, empati atau pendapat pro dan kontra dalam teks laporan.", indikator: ["Menganalisis struktur dan kebahasaan teks laporan", "Menentukan ungkapan pro dan kontra dalam sebuah laporan", "Menginterpretasikan informasi dalam teks laporan"] },
  { kelas: "9", semester: "2", elemen: "Berbicara", topik: "Teks Laporan", tp_kode: "9.2.4", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks laporan.", indikator: ["Menentukan topik teks laporan", "Menyusun kerangka teks laporan", "Menulis teks laporan sesuai struktur", "Mempresentasikan gagasan bentuk teks laporan multimoda"] },
  { kelas: "9", semester: "2", elemen: "Menyimak", topik: "Teks Argumentasi dan Diskusi", tp_kode: "9.2.5", tp: "Menginterpretasikan informasi untuk mengungkapkan simpati, kepedulian, empati atau pendapat pro dan kontra dalam teks diskusi dan argumentasi yang di dengar.", indikator: ["Memahami struktur dan kebahasaan teks argumentasi dan diskusi", "Menganalisis informasi berupa pesan, gagasan utama dan penjelas"] },
  { kelas: "9", semester: "2", elemen: "Berbicara", topik: "Teks Argumentasi dan Diskusi", tp_kode: "9.2.6", tp: "Mempresentasikan gagasan, pandangan, arahan, dan/atau pesan untuk tujuan pengajuan usul dan pemberian solusi dalam bentuk teks diskusi dan argumentasi", indikator: ["Menentukan topik/mosi diskusi", "Merancang kegiatan diskusi", "Mempresentasikan gagasan dalam diskusi secara aktif, kontributif, efektif, dan santun"] },
];

const modelPembelajaran = [
  { id: 'pbl', name: 'Problem Based Learning (PBL)', syntax: ['Orientasi Peserta Didik pada Masalah', 'Mengorganisasikan Peserta Didik untuk Belajar', 'Membimbing Penyelidikan Individu maupun Kelompok', 'Mengembangkan dan Menyajikan Hasil Karya', 'Menganalisis dan Mengevaluasi Proses Pemecahan Masalah'] },
  { id: 'pjbl', name: 'Project Based Learning (PjBL)', syntax: ['Menentukan Pertanyaan Mendasar', 'Mendesain Perencanaan Proyek', 'Menyusun Jadwal', 'Memonitor Peserta Didik dan Kemajuan Proyek', 'Menguji Hasil (Presentasi)', 'Mengevaluasi Pengalaman'] },
  { id: 'jigsaw', name: 'Jigsaw (Kooperatif)', syntax: ['Membentuk Kelompok Asal', 'Diskusi Kelompok Ahli', 'Kembali ke Kelompok Asal', 'Presentasi Hasil', 'Evaluasi'] },
  { id: 'ink', name: 'Inkuiri (Discovery Learning)', syntax: ['Pemberian Stimulus', 'Identifikasi Masalah', 'Pengumpulan Data', 'Pengolahan Data', 'Pembuktian', 'Menarik Kesimpulan'] },
  { id: 'nht', name: 'Number Head Together (NHT)', syntax: ['Penomoran', 'Mengajukan Pertanyaan', 'Berpikir Bersama', 'Menjawab', 'Evaluasi'] },
  { id: 'tgt', name: 'Teams Games Tournament (TGT)', syntax: ['Penyajian Kelas (Class Presentation)', 'Belajar dalam Kelompok (Teams)', 'Permainan (Games)', 'Pertandingan (Tournament)', 'Penghargaan Kelompok (Team Recognition)'] },
  { id: 'gi', name: 'Group Investigation (Investigasi Kelompok)', syntax: ['Memilih Topik (Topic Selection)', 'Perencanaan Kooperatif', 'Pelaksanaan Investigasi', 'Analisis dan Sintesis', 'Presentasi Hasil Akhir', 'Evaluasi'] },
  { id: 'tps', name: 'Think-Pair-Share (TPS)', syntax: ['Think (Berpikir Mandiri)', 'Pair (Berdiskusi dengan Pasangan)', 'Share (Berbagi dengan Kelas)', 'Refleksi dan Simpulan'] },
  { id: 'station', name: 'Station Rotation (Blended Learning)', syntax: ['Pembagian Stasiun Belajar', 'Rotasi 1: Instruksi Langsung Guru', 'Rotasi 2: Kolaborasi/Proyek', 'Rotasi 3: Belajar Mandiri/Digital', 'Sintesis dan Penutup'] },
];

const profilPelajar = [
  "Keimanan dan Ketakwaan terhadap Tuhan YME",
  "Kewargaan (Berkebinekaan Global & Peduli Sosial)",
  "Penalaran Kritis",
  "Kreativitas",
  "Kolaborasi",
  "Kemandirian",
  "Kesehatan (Keseimbangan Fisik & Mental)",
  "Komunikasi"
];

const apiKey = ""; // API Key akan disuntikkan oleh sistem

const App = () => {
  const [formData, setFormData] = useState({
    judul: "RPP Bahasa Indonesia Teks ...",
    tahunPelajaran: "2025/2026",
    namaSekolah: "SMP Negeri ...",
    namaPenyusun: "Guru Bahasa Indonesia",
    nipPenyusun: "NIP.....................", 
    namaKepalaSekolah: "Nama Kepala Sekolah",
    nipKepalaSekolah: "NIP.....................",
    tempatTtd: "Banyumas",
    tanggalTtd: new Date().toISOString().split('T')[0],
    kelas: "7",
    alokasiWaktu: "2",
    durasiPerPertemuan: "40",
    selectedTPKode: "",
    modelBelajar: "pbl",
    // Field baru untuk kemitraan
    kemitraan: "Orang Tua (Wawancara), Perpustakaan (Literasi), Teman Sebaya (Tutor)",
    asesmen: "Formatif: Observasi, Catatan Anekdot, Penilaian Antarteman"
  });

  const [activeData, setActiveData] = useState(null);
  const [generatedRPP, setGeneratedRPP] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState({
    pemantik: [],
    iceBreaking: null,
    bahanBacaan: null,
    materiLengkap: null, // NEW: Untuk Bahan Ajar
    ideKemitraan: null, // NEW: Ide Kemitraan AI
    glosarium: []
  });

  // Filter Data Logic
  const filteredTopics = [...new Set(databaseCPTP.filter(d => d.kelas === formData.kelas).map(d => d.topik))];
  const [selectedTopic, setSelectedTopic] = useState("");
  
  useEffect(() => {
    if(filteredTopics.length > 0 && !filteredTopics.includes(selectedTopic)) {
      setSelectedTopic(filteredTopics[0]);
    }
  }, [formData.kelas]);

  const filteredTPs = databaseCPTP.filter(d => d.kelas === formData.kelas && d.topik === selectedTopic);

  useEffect(() => {
    if (filteredTPs.length > 0) {
      setFormData(prev => ({...prev, selectedTPKode: filteredTPs[0].tp_kode}));
    }
  }, [selectedTopic, formData.kelas]);

  useEffect(() => {
    const data = databaseCPTP.find(d => d.tp_kode === formData.selectedTPKode);
    setActiveData(data);
    setFormData(prev => ({...prev, judul: `RPP ${data?.topik || 'Bahasa Indonesia'} - ${data?.elemen || ''}`}));
    setAiContent({ pemantik: [], iceBreaking: null, bahanBacaan: null, materiLengkap: null, ideKemitraan: null, glosarium: [] });
  }, [formData.selectedTPKode]);

  // --- GEMINI API INTEGRATION ---
  const generateWithGemini = async () => {
    if (!activeData) return;
    setAiLoading(true);

    const prompt = `
      Bertindaklah sebagai Guru Bahasa Indonesia profesional. Saya sedang membuat RPP Pembelajaran Mendalam (Deep Learning) untuk Kelas ${formData.kelas}, Topik "${activeData.topik}".
      
      Tolong buatkan konten berikut dalam format JSON valid:
      1. "pemantik": Buat 3 pertanyaan pemantik yang HOTS, seru, dan kontekstual.
      2. "iceBreaking": Buat 1 ide permainan/ice breaking yang relevan dengan topik ini (Nama Permainan dan Cara Main Singkat).
      3. "bahanBacaan": Buat 1 contoh teks lengkap (300-400 kata, 3-7 paragraf) yang sesuai struktur teks ${activeData.topik}. Teks harus menarik dan kompleks untuk analisis siswa.
      4. "glosarium": Daftar 5-8 istilah sulit/teknis terkait topik ini beserta artinya.
      5. "materiLengkap": Ringkasan materi ajar (pengertian, struktur, kaidah kebahasaan) sekitar 200 kata untuk lampiran.
      6. "ideKemitraan": 1 ide spesifik kemitraan dengan pihak luar/sekolah (misal: wawancara narasumber, kunjungan perpustakaan) untuk topik ini.

      Format JSON wajib:
      {
        "pemantik": ["tanya 1", "tanya 2", "tanya 3"],
        "iceBreaking": "Nama: ... Cara: ...",
        "bahanBacaan": "Judul Teks... (Isi teks lengkap...)",
        "glosarium": [{"kata": "...", "arti": "..."}],
        "materiLengkap": "Judul Materi... Isi...",
        "ideKemitraan": "Mitra: ... Aktivitas: ..."
      }
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          }),
        }
      );

      const data = await response.json();
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (textResult) {
        const parsedAI = JSON.parse(textResult);
        setAiContent({
            pemantik: parsedAI.pemantik || [],
            iceBreaking: parsedAI.iceBreaking || "Tebak kata terkait topik.",
            bahanBacaan: parsedAI.bahanBacaan || "Teks belum tersedia.",
            glosarium: parsedAI.glosarium || [],
            materiLengkap: parsedAI.materiLengkap || "Materi belum tersedia.",
            ideKemitraan: parsedAI.ideKemitraan || null
        });
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
      alert("Gagal menghubungi Gemini AI. Silakan coba lagi.");
    } finally {
      setAiLoading(false);
    }
  };

  // Helper untuk membuat langkah rinci (4-8 langkah per sintaks)
  const expandSyntax = (syntaxName, topic) => {
      const details = [
          `Guru memberikan arahan jelas mengenai tahapan ${syntaxName} yang akan dilakukan.`,
          `Siswa menyiapkan diri dan alat bahan yang diperlukan untuk ${syntaxName}.`,
          `Siswa melakukan aktivitas ${syntaxName} dengan fokus pada pemecahan masalah terkait ${topic}.`,
          `Terjadi interaksi aktif dan kolaboratif antar siswa dalam kelompok saat fase ${syntaxName}.`,
          `Siswa menggunakan kemampuan berpikir kritis (HOTS) untuk menganalisis data/informasi yang ditemukan.`,
          `Guru berkeliling memberikan bimbingan (scaffolding) kepada kelompok yang mengalami kesulitan.`,
          `Siswa mendokumentasikan hasil kerjanya secara rapi dan sistematis.`,
          `Siswa melakukan refleksi singkat mengenai apa yang telah dicapai pada tahap ${syntaxName} ini.`
      ];
      return details;
  };

  // GENERATE RPP LOGIC
  const handleGenerate = () => {
    if (!activeData) return;
    
    const model = modelPembelajaran.find(m => m.id === formData.modelBelajar);
    const pertemuanCount = parseInt(formData.alokasiWaktu);
    const topicLC = activeData.topik.toLowerCase();
    
    let steps = [];
    const syntaxPerMeeting = Math.ceil(model.syntax.length / pertemuanCount);
    
    for (let i = 1; i <= pertemuanCount; i++) {
        let meetingSyntax = [];
        if (pertemuanCount === 1) meetingSyntax = model.syntax;
        else {
            let startIndex = (i-1) * syntaxPerMeeting;
            let endIndex = Math.min(startIndex + syntaxPerMeeting, model.syntax.length);
            if (i === pertemuanCount) endIndex = model.syntax.length;
            
            if (startIndex >= model.syntax.length) {
                 meetingSyntax = ["Pendalaman Materi & Evaluasi Mandiri"];
            } else {
                 meetingSyntax = model.syntax.slice(startIndex, endIndex);
            }
        }

        // Logic to inject AI Content & DETAILED Pendahuluan
        let pendahuluanSteps = [
            `Guru membuka pembelajaran dengan salam penuh semangat, meminta ketua kelas memimpin doa (Beriman & Bertakwa).`,
            `Guru mengecek kehadiran dan kesiapan fisik/psikis siswa, serta memeriksa kebersihan kelas (Budaya Positif).`,
            `Apersepsi: Guru mengaitkan materi ${topicLC} dengan pengalaman siswa sebelumnya atau isu terkini yang relevan.`,
            `Motivasi: Guru menyampaikan manfaat penting mempelajari ${topicLC} bagi kehidupan masa depan siswa (Bermakna).`,
            `Guru menyampaikan Tujuan Pembelajaran dan alur kegiatan yang akan dilakukan.`
        ];

        // Insert Ice Breaking
        if (i === 1) {
             const ib = aiContent.iceBreaking || "Permainan 'Sambung Kata' untuk melatih fokus";
             pendahuluanSteps.splice(2, 0, `Ice Breaking: Guru memandu permainan "${ib}" untuk mencairkan suasana dan membangun semangat (Menggembirakan).`);
             
             if (aiContent.pemantik.length > 0) {
                 pendahuluanSteps.push(`Pertanyaan Pemantik: "${aiContent.pemantik[0]}" (Bernalar Kritis).`);
             }
        }

        const step = {
            pertemuan: i,
            pendahuluan: pendahuluanSteps,
            inti: meetingSyntax.map(s => {
                // Expand syntax to 4-8 detailed steps
                const detailedSteps = expandSyntax(s, topicLC);
                const tags = ["(bermakna)", "(berkesadaran)", "(menggembirakan)", "(kritis)", "(kolaboratif)"];
                
                return {
                    sintaks: s,
                    steps: detailedSteps.map(d => `${d} ${tags[Math.floor(Math.random() * tags.length)]}`)
                };
            }),
            penutup: [
                `Siswa dan guru menyimpulkan poin-poin penting materi ${topicLC} yang telah dipelajari.`,
                `Refleksi: Siswa mengungkapkan perasaan dan pemahamannya menggunakan sticky notes/aplikasi digital (Berkesadaran).`,
                `Guru memberikan umpan balik formatif dan apresiasi atas kinerja kelompok (tanpa nilai angka, fokus pada proses).`,
                `Guru menyampaikan rencana materi untuk pertemuan berikutnya.`,
                `Guru menutup pembelajaran dengan doa dan salam penutup.`
            ]
        };
        steps.push(step);
    }

    setGeneratedRPP({
        ...formData,
        ...activeData,
        modelName: model.name,
        langkah: steps
    });
  };

  const printRPP = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-6 print:p-0">
      
      {/* HEADER NO PRINT */}
      <div className="max-w-5xl mx-auto mb-8 print:hidden">
        <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2 mb-2">
          <FileText className="w-8 h-8" />
          RPP Pembelajaran Mendalam <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI Powered</span>
        </h1>
        <p className="text-gray-600">Generator RPP Deep Learning dengan Struktur Lengkap & Bantuan AI.</p>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs p-2 mt-2 rounded">
            Catatan: Kode ini dibuat menggunakan React. Untuk menyematkan di Google Sites, Anda perlu melakukan build project ini (misal di Vercel/Netlify) lalu gunakan URL-nya pada fitur "Embed URL" di Google Sites.
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
        
        {/* FORM INPUT SECTION - HIDDEN ON PRINT */}
        <div className="lg:col-span-1 space-y-6 h-fit print:hidden">
            
          {/* AI CONTROL PANEL */}
          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-100">
             <h2 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Smart AI Generator
             </h2>
             <p className="text-sm text-gray-600 mb-4">
                Generate otomatis: Ice Breaking, Teks LKPD Panjang, Materi Ajar, dan Kemitraan untuk topik <strong>{selectedTopic}</strong>.
             </p>
             
             <button 
                onClick={generateWithGemini} 
                disabled={aiLoading || !activeData}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
             >
                {aiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                {aiLoading ? "Sedang Meracik..." : "Generate Konten Kreatif"}
             </button>

             {/* AI Status Indicators */}
             <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                <div className={`p-2 rounded border ${aiContent.iceBreaking ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>✅ Ice Breaking</div>
                <div className={`p-2 rounded border ${aiContent.bahanBacaan ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>✅ Teks LKPD</div>
                <div className={`p-2 rounded border ${aiContent.materiLengkap ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>✅ Materi Ajar</div>
                <div className={`p-2 rounded border ${aiContent.ideKemitraan ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>✅ Kemitraan</div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <RefreshCw className="w-5 h-5" /> Konfigurasi Sekolah
            </h2>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
                    <input type="text" value={formData.namaSekolah} onChange={e => setFormData({...formData, namaSekolah: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kepala Sekolah</label>
                    <input type="text" value={formData.namaKepalaSekolah} onChange={e => setFormData({...formData, namaKepalaSekolah: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIP Kepala Sekolah</label>
                    <input type="text" value={formData.nipKepalaSekolah} onChange={e => setFormData({...formData, nipKepalaSekolah: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
                <FileText className="w-5 h-5" /> Konfigurasi RPP
            </h2>
            
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Pelajaran</label>
                <input type="text" value={formData.tahunPelajaran} onChange={e => setFormData({...formData, tahunPelajaran: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Guru Penyusun</label>
                <input type="text" value={formData.namaPenyusun} onChange={e => setFormData({...formData, namaPenyusun: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIP Guru Penyusun</label>
                <input type="text" value={formData.nipPenyusun} onChange={e => setFormData({...formData, nipPenyusun: e.target.value})} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>

                {/* TEMPAT DAN TANGGAL TTD */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat TTD</label>
                        <input type="text" value={formData.tempatTtd} onChange={e => setFormData({...formData, tempatTtd: e.target.value})} className="w-full border rounded-lg p-2" placeholder="Cth: Banyumas" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal TTD</label>
                        <input type="date" value={formData.tanggalTtd} onChange={e => setFormData({...formData, tanggalTtd: e.target.value})} className="w-full border rounded-lg p-2" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
                        <select value={formData.kelas} onChange={e => setFormData({...formData, kelas: e.target.value})} className="w-full border rounded-lg p-2 bg-white">
                            <option value="7">Kelas 7</option>
                            <option value="8">Kelas 8</option>
                            <option value="9">Kelas 9</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alokasi Waktu</label>
                        <select value={formData.alokasiWaktu} onChange={e => setFormData({...formData, alokasiWaktu: e.target.value})} className="w-full border rounded-lg p-2 bg-white">
                            {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Pertemuan</option>)}
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Durasi per Pertemuan (Menit)</label>
                    <input type="number" value={formData.durasiPerPertemuan} onChange={e => setFormData({...formData, durasiPerPertemuan: e.target.value})} className="w-full border rounded-lg p-2" />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topik / Teks</label>
                <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)} className="w-full border rounded-lg p-2 bg-white">
                    {filteredTopics.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Pembelajaran (TP)</label>
                <select value={formData.selectedTPKode} onChange={e => setFormData({...formData, selectedTPKode: e.target.value})} className="w-full border rounded-lg p-2 bg-white text-sm">
                    {filteredTPs.map((d, idx) => (
                        <option key={idx} value={d.tp_kode}>
                            [{d.elemen}] {d.tp.substring(0, 60)}...
                        </option>
                    ))}
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Pembelajaran</label>
                <select value={formData.modelBelajar} onChange={e => setFormData({...formData, modelBelajar: e.target.value})} className="w-full border rounded-lg p-2 bg-white">
                    {modelPembelajaran.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
                </div>

                <button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4 shadow-md">
                    <FileText className="w-5 h-5" /> Buat RPP Sekarang
                </button>
            </div>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <div className="lg:col-span-2 print:col-span-3 print:w-full">
            {!generatedRPP ? (
                <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300 p-12 text-gray-400 print:hidden">
                    <FileText className="w-16 h-16 mb-4 opacity-20" />
                    <p className="text-center">
                        Silakan generate konten kreatif dengan AI terlebih dahulu (opsional),<br/>
                        kemudian klik "Buat RPP Sekarang".
                    </p>
                </div>
            ) : (
                <div className="bg-white shadow-xl rounded-none md:rounded-xl overflow-hidden print:shadow-none print:w-full">
                    {/* TOOLBAR */}
                    <div className="bg-gray-800 text-white p-3 flex justify-between items-center print:hidden">
                        <span className="font-semibold text-sm">Preview Dokumen</span>
                        <button onClick={printRPP} className="flex items-center gap-2 bg-white text-gray-900 px-3 py-1.5 rounded text-sm font-bold hover:bg-blue-50 transition-colors">
                            <Printer className="w-4 h-4" /> Cetak / Simpan PDF
                        </button>
                    </div>

                    {/* DOCUMENT CONTENT */}
                    <div className="p-8 md:p-12 text-sm md:text-base leading-relaxed print:p-0 font-serif text-black max-w-[210mm] mx-auto bg-white min-h-screen">
                        
                        {/* HEADER */}
                        <div className="text-center mb-8 border-b-2 border-black pb-4">
                            <h2 className="font-bold text-lg uppercase">RENCANA PELAKSANAAN PEMBELAJARAN (RPP)</h2>
                            <h3 className="font-bold text-lg uppercase">PEMBELAJARAN MENDALAM (DEEP LEARNING)</h3>
                            <p className="mt-2 text-base">Tahun Pelajaran {generatedRPP.tahunPelajaran}</p>
                        </div>

                        {/* BAGIAN A */}
                        <div className="mb-6">
                            <h3 className="font-bold bg-gray-100 p-2 border border-gray-300 mb-3 print:bg-gray-100">A. IDENTIFIKASI</h3>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="w-48 font-semibold py-1">Nama Penyusun</td>
                                        <td>: {generatedRPP.namaPenyusun}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Satuan Pendidikan</td>
                                        <td>: {generatedRPP.namaSekolah} (Terakreditasi A)</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Kelas / Fase</td>
                                        <td>: {generatedRPP.kelas} / Fase D</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Mata Pelajaran</td>
                                        <td>: Bahasa Indonesia</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Elemen</td>
                                        <td>: {generatedRPP.elemen}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Topik</td>
                                        <td>: {generatedRPP.topik}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Alokasi Waktu</td>
                                        <td>: {generatedRPP.alokasiWaktu} Pertemuan (@ {generatedRPP.durasiPerPertemuan} Menit)</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1 align-top">Dimensi Profil Pelajar</td>
                                        <td>: 
                                            <ul className="list-disc pl-5 m-0">
                                                <li>{profilPelajar[2]}</li>
                                                <li>{profilPelajar[3]}</li>
                                                <li>{profilPelajar[4]}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Moda Pembelajaran</td>
                                        <td>: Tatap Muka (Luring)</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Target Siswa</td>
                                        <td>: Siswa Reguler</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold py-1">Kompetensi Awal</td>
                                        <td>: Siswa telah mampu membaca dan memahami teks sederhana terkait {generatedRPP.topik.toLowerCase()}.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* BAGIAN B */}
                        <div className="mb-6 page-break-inside-avoid">
                            <h3 className="font-bold bg-gray-100 p-2 border border-gray-300 mb-3 print:bg-gray-100">B. DESAIN PEMBELAJARAN</h3>
                            
                            <div className="mb-4">
                                <h4 className="font-bold underline mb-1">1. Tujuan Pembelajaran (TP)</h4>
                                <p className="mb-2">{generatedRPP.tp}</p>
                                <p className="font-semibold italic mb-1">Indikator Ketercapaian (IKTP):</p>
                                <ul className="list-disc pl-5">
                                    {generatedRPP.indikator.map((ind, i) => (
                                        <li key={i}>Siswa dapat {ind.toLowerCase()} dengan tepat, kritis, dan bertanggung jawab.</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold underline mb-1">2. Praktik Pedagogis & Metode</h4>
                                <ul className="list-disc pl-5">
                                    <li><strong>Model:</strong> {generatedRPP.modelName}</li>
                                    <li><strong>Metode:</strong> Diskusi kelompok, tanya jawab, presentasi, penugasan proyek.</li>
                                    <li><strong>Media:</strong> Interactive Flat Panel (IFP), Video Youtube, Slide Canva/PowerPoint, LKPD Digital.</li>
                                </ul>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold underline mb-1">3. Kemitraan Pembelajaran</h4>
                                <p>{aiContent.ideKemitraan || generatedRPP.kemitraan}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-bold underline mb-1">4. Pertanyaan Pemantik</h4>
                                {aiContent.pemantik.length > 0 ? (
                                    <ul className="list-disc pl-5">
                                        {aiContent.pemantik.map((q, i) => (
                                            <li key={i} className="italic text-blue-900 font-medium">"{q}"</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="italic">"Pernahkah kalian menemukan {generatedRPP.topik.toLowerCase()} di kehidupan sehari-hari? Apa manfaatnya bagi kita jika memahaminya?"</p>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <h4 className="font-bold underline mb-1">5. Asesmen (Formatif)</h4>
                                <ul className="list-disc pl-5">
                                    <li><strong>Formatif Awal:</strong> Pertanyaan pemantik dan ice breaking untuk mengecek kesiapan.</li>
                                    <li><strong>Formatif Proses:</strong> {generatedRPP.asesmen} (Umpan balik langsung saat diskusi).</li>
                                    <li><strong>Refleksi:</strong> Jurnal belajar siswa dan lembar observasi guru.</li>
                                </ul>
                            </div>
                        </div>

                        {/* BAGIAN C */}
                        <div className="mb-6">
                            <h3 className="font-bold bg-gray-100 p-2 border border-gray-300 mb-3 print:bg-gray-100">C. KEGIATAN PEMBELAJARAN</h3>
                            
                            {generatedRPP.langkah.map((meeting, idx) => (
                                <div key={idx} className="mb-6 border border-gray-200 rounded-lg p-4 print:border-black page-break-inside-avoid">
                                    <h4 className="font-bold text-lg mb-3 text-blue-800 print:text-black border-b border-gray-300 pb-2">
                                        Pertemuan Ke-{meeting.pertemuan} ({generatedRPP.durasiPerPertemuan} Menit)
                                    </h4>
                                    
                                    <div className="mb-3">
                                        <strong className="text-gray-700 font-bold block mb-1">a. Pendahuluan (10 menit)</strong>
                                        <ul className="list-decimal pl-5 space-y-1">
                                            {meeting.pendahuluan.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>

                                    <div className="mb-3 bg-blue-50 p-3 rounded print:bg-transparent print:p-0">
                                        <strong className="text-gray-700 font-bold block mb-1">b. Kegiatan Inti (Model: {generatedRPP.modelName})</strong>
                                        <div className="space-y-4 pl-1">
                                            {meeting.inti.map((s, i) => (
                                                <div key={i}>
                                                    <span className="font-semibold underline text-blue-900 print:text-black block mb-1">Sintaks {i+1}: {s.sintaks}</span>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {s.steps.map((d, j) => (
                                                            <li key={j} className="text-justify text-sm">{d}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <strong className="text-gray-700 font-bold block mb-1">c. Penutup (10 menit)</strong>
                                        <ul className="list-decimal pl-5 space-y-1">
                                            {meeting.penutup.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    
                                    <div className="mt-3 pt-3 border-t border-dashed border-gray-400">
                                        <p className="text-sm italic"><strong>Refleksi:</strong> Guru membagikan link <u>Padlet/Mentimeter</u> di grup WA/LMS agar siswa menuliskan perasaan mereka setelah belajar hari ini.</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* BAGIAN D LAMPIRAN */}
                        <div className="page-break-before-always">
                            <h3 className="font-bold bg-gray-100 p-2 border border-gray-300 mb-3 print:bg-gray-100">D. LAMPIRAN</h3>
                            
                            <div className="space-y-6">
                                {/* FEATURE AI: BAHAN BACAAN & LKPD KOMPLEKS */}
                                <div className="border border-black p-4">
                                    <h4 className="font-bold text-center mb-2">LEMBAR KERJA PESERTA DIDIK (LKPD) HOTS</h4>
                                    <p className="text-center italic mb-4">Topik: {generatedRPP.topik} | Melatih Berpikir Tingkat Tinggi</p>
                                    
                                    {/* Stimulus */}
                                    <div className="mb-4">
                                        <h5 className="font-bold border-b border-gray-400 mb-1">A. STIMULUS (LITERASI)</h5>
                                        <div className="bg-gray-50 p-4 rounded text-justify border border-gray-200 italic font-serif">
                                            {aiContent.bahanBacaan ? (
                                                <div dangerouslySetInnerHTML={{__html: aiContent.bahanBacaan.replace(/\n/g, '<br/>')}} />
                                            ) : (
                                                <p className="text-center text-gray-500">[Klik "Generate Konten Kreatif" untuk memunculkan Teks Stimulus Lengkap]</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* HOTS Activities (Complex) */}
                                    <div className="mb-4">
                                        <h5 className="font-bold border-b border-gray-400 mb-1">B. AKTIVITAS PENYELIDIKAN (SAINTIFIK/HOTS)</h5>
                                        <ol className="list-decimal pl-5 space-y-4">
                                            <li>
                                                <strong>1. Identifikasi Masalah:</strong> Berdasarkan teks/stimulus di atas, rumuskan 2 pertanyaan kritis yang ingin kalian cari jawabannya!
                                                <div className="border border-black h-12 mt-1 bg-white"></div>
                                            </li>
                                            <li>
                                                <strong>2. Pengumpulan Data:</strong> Temukan bukti-bukti dalam teks yang mendukung argumen atau struktur teks tersebut.
                                                <table className="w-full border-collapse border border-black mt-1 text-sm">
                                                    <thead><tr><th className="border border-black p-1">No</th><th className="border border-black p-1">Aspek/Bukti</th><th className="border border-black p-1">Kutipan Teks</th></tr></thead>
                                                    <tbody>
                                                        <tr><td className="border border-black p-2">1</td><td className="border border-black"></td><td className="border border-black"></td></tr>
                                                        <tr><td className="border border-black p-2">2</td><td className="border border-black"></td><td className="border border-black"></td></tr>
                                                    </tbody>
                                                </table>
                                            </li>
                                            <li>
                                                <strong>3. Pengolahan Data (Analisis C4):</strong> Analisislah kaidah kebahasaan yang dominan muncul! Mengapa penulis menggunakan gaya bahasa tersebut?
                                                <div className="border border-black h-16 mt-1 bg-white"></div>
                                            </li>
                                            <li>
                                                <strong>4. Verifikasi (Evaluasi C5):</strong> Bandingkan teks tersebut dengan teks lain yang sejenis. Manakah yang lebih efektif penyampaiannya? Jelaskan!
                                                <div className="border border-black h-16 mt-1 bg-white"></div>
                                            </li>
                                            <li>
                                                <strong>5. Generalisasi (Kreasi C6):</strong> Simpulkan pembelajaran hari ini dengan membuat Peta Konsep/Mind Map di bawah ini!
                                                <div className="border border-black h-32 mt-1 bg-white border-dashed"></div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>

                                {/* NEW: BAHAN AJAR */}
                                <div className="border border-black p-4 bg-gray-50">
                                    <h4 className="font-bold text-center mb-2">RINGKASAN MATERI AJAR</h4>
                                    <p className="text-justify text-sm">
                                        {aiContent.materiLengkap ? aiContent.materiLengkap : "[Materi ajar lengkap akan muncul di sini setelah Anda menekan tombol 'Generate Konten Kreatif']"}
                                    </p>
                                </div>

                                {/* GLOSARIUM */}
                                <div>
                                    <h4 className="font-bold underline mb-1">Glosarium</h4>
                                    {aiContent.glosarium.length > 0 ? (
                                        <ul className="list-disc pl-5 italic">
                                            {aiContent.glosarium.map((g, i) => (
                                                <li key={i}><strong>{g.kata}:</strong> {g.arti}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="italic text-gray-500">[Glosarium akan muncul setelah generate AI]</p>
                                    )}
                                </div>

                                <div className="border border-black p-4">
                                    <h4 className="font-bold text-center mb-4">RUBRIK PENILAIAN FORMATIF</h4>
                                    <table className="w-full border-collapse border border-black text-sm">
                                        <thead>
                                            <tr>
                                                <th className="border border-black p-2">Aspek</th>
                                                <th className="border border-black p-2">Mahir (4)</th>
                                                <th className="border border-black p-2">Cakap (3)</th>
                                                <th className="border border-black p-2">Layak (2)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-black p-2">Ketajaman Analisis</td>
                                                <td className="border border-black p-2">Analisis sangat mendalam dan didukung bukti kuat</td>
                                                <td className="border border-black p-2">Analisis cukup mendalam</td>
                                                <td className="border border-black p-2">Analisis masih di permukaan</td>
                                            </tr>
                                            <tr>
                                                <td className="border border-black p-2">Kolaborasi</td>
                                                <td className="border border-black p-2">Sangat aktif dan menghargai pendapat teman</td>
                                                <td className="border border-black p-2">Aktif berdiskusi</td>
                                                <td className="border border-black p-2">Kurang aktif</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div className="mb-12">
                                    <h4 className="font-bold underline">Daftar Pustaka</h4>
                                    <p>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. (2025). <em>Buku Panduan Guru & Siswa Bahasa Indonesia Kelas {generatedRPP.kelas} SMP Kurikulum Merdeka</em>. Jakarta: Kemendikbudristek.</p>
                                </div>
                                
                                {/* Tanda Tangan */}
                                <div className="flex justify-between mt-12 page-break-inside-avoid">
                                    <div className="text-center w-1/3">
                                        <p>Mengetahui,</p>
                                        <p>Kepala {generatedRPP.namaSekolah}</p>
                                        <br /><br /><br />
                                        <p className="font-bold underline">{generatedRPP.namaKepalaSekolah}</p>
                                        <p>{generatedRPP.nipKepalaSekolah}</p>
                                    </div>
                                    <div className="text-center w-1/3">
                                        <p>{generatedRPP.tempatTtd}, {new Date(generatedRPP.tanggalTtd).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                        <p>Guru Mata Pelajaran</p>
                                        <br /><br /><br />
                                        <p className="font-bold underline">{generatedRPP.namaPenyusun}</p>
                                        <p>{generatedRPP.nipPenyusun}</p> 
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default App;