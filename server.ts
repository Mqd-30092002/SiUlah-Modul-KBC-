import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { GoogleGenAI } from '@google/genai';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint to extract text from uploaded PDF
app.post('/api/extract-pdf', async (req, res) => {
  try {
    const { base64Data } = req.body;
    if (!base64Data) {
      return res.status(400).json({ error: 'Tidak ada data file PDF yang dikirim.' });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const parser = typeof pdfParse === 'function' ? pdfParse : (pdfParse as any).default;
    const data = await parser(buffer);
    
    return res.json({ text: data.text });
  } catch (error: any) {
    console.error('Gagal mengekstrak PDF:', error);
    return res.status(500).json({
      error: `Gagal membaca file PDF: ${error.message || 'Format tidak valid'}`
    });
  }
});

// Endpoint to generate Modul Ajar / RPP Berbasis Cinta (KBC)
app.post('/api/generate-modul', async (req, res) => {
  try {
    const {
      mapel,
      kelas,
      waktu,
      tujuanPembelajaran,
      namaGuru = 'Guru Madrasah / Pendidik',
      namaSekolah = 'Madrasah / Satuan Pendidikan',
      tahunPelajaran = '2024/2025',
      jenjang = 'MI',
      modelPembelajaran = 'Alur FIDS (Feel, Imagine, Do, Share - KBC)',
      pancaCinta = ['Cinta Allah dan Rasul-Nya', 'Cinta Ilmu', 'Cinta Diri dan Sesama Manusia'],
      profilPancasila = ['Beriman & Bertakwa', 'Bernalar Kritis', 'Gotong Royong'],
      metode = 'Eksplorasi kontekstual, dialog welas asih, unjuk karya',
      includeLKPD = true,
      includeRubrik = true,
    } = req.body;

    if (!mapel || !tujuanPembelajaran) {
      return res.status(400).json({
        error: 'Mata Pelajaran dan Tujuan Pembelajaran (TP) wajib diisi!'
      });
    }

    const pancaCintaStr = Array.isArray(pancaCinta) && pancaCinta.length > 0
      ? pancaCinta.join('; ')
      : 'Cinta Allah dan Rasul-Nya; Cinta Ilmu; Cinta Lingkungan; Cinta Diri dan Sesama Manusia; Cinta Tanah Air';

    const prompt = `
Anda adalah Pengembang Kurikulum Kementerian Agama RI dan Pakar Implementasi Kurikulum Berbasis Cinta (KBC) di Madrasah berdasarkan:
- Keputusan Direktur Jenderal Pendidikan Islam Nomor 6077 Tahun 2025 tentang Panduan Kurikulum Berbasis Cinta di Madrasah
- Keputusan Menteri Agama (KMA) Nomor 450 Tahun 2024 tentang Pedoman Implementasi Kurikulum pada RA, MI, MTs, MA, dan MAK
- KMA Nomor 183 & 184 Tahun 2019 tentang Kurikulum PAI dan Bahasa Arab di Madrasah.

Tugas Anda adalah menyusun dokumen Modul Ajar / Rencana Pelaksanaan Pembelajaran (RPP) Kurikulum Berbasis Cinta (KBC) yang resmi, aplikatif, mendalam, dan inspiratif untuk jenjang ${jenjang} (${kelas}).

DATA PERENCANAAN PEMBELAJARAN:
- Satuan Pendidikan: ${namaSekolah} (${jenjang})
- Mata Pelajaran: ${mapel}
- Fase / Kelas / Jenjang: ${kelas}
- Alokasi Waktu: ${waktu || '2 JP (2 x 35/40/45 Menit)'}
- Nama Pendidik/Penyusun: ${namaGuru}
- Tahun Pelajaran / Semester: ${tahunPelajaran}
- Model Pembelajaran: ${modelPembelajaran}
- Metode Pembelajaran: ${metode}
- Integrasi Panca Cinta Fokus: ${pancaCintaStr}
- Profil Pelajar Pancasila & Rahmatan Lil 'Alamin: ${Array.isArray(profilPancasila) ? profilPancasila.join(', ') : profilPancasila}
- Capaian Pembelajaran / Rumusan Tujuan Pembelajaran (TP):
"""
${tujuanPembelajaran}
"""

PEDOMAN KHUSUS PANCA CINTA (5 TOPIK KBC - KEPDIRJEN PENDIS 6077/2025):
Pastikan dokumen mengintegrasikan pilar Panca Cinta berikut sesuai pilihan:
1. Cinta Allah dan Rasul-Nya (Sumber Cinta): Kenalkan sifat Jamaliyah (keindahan & welas asih) dan Jalaliyah Allah Swt., Asmaul Husna (Ar-Rahman, Ar-Rahim, Al-Wadud, dll.), ibadah berakar pada cinta (eros-oriented) bukan sekadar paksaan (nomos-oriented), sirah nabawiyah kasih sayang.
2. Cinta Ilmu (Sumber Cinta): Menghubungkan ayat qauliyah dan kauniyah, 6 pilar sukses ilmu (niat ikhlas, tekun, tawakal, wara', yakin, syukur), adab kepada guru, literasi kritis dan pembelajar sepanjang hayat.
3. Cinta Lingkungan (Tanda Cinta): Alam semesta sebagai tajalli (manifestasi) cinta Allah, ekoteologi, menghindari fasad (kerusakan) dan ishraf/tabdzir (pemborosan air/energi), menjaga kebersihan (thaharah) dan kelestarian alam.
4. Cinta Diri dan Sesama Manusia (Tali Cinta): Self-compassion, Social Emotional Skills (SES), kesehatan mental, ukhuwah Islamiyah & insaniyah (kemanusiaan universal), adab kepada sesama (ta'awun, tasamuh, tafahum, tawadhu), 7 jurus madrasah happy tanpa bully (anti-perundungan & kekerasan).
5. Cinta Tanah Air (Tali Cinta): Ukhuwah wathaniyah, Hubbul Wathan minal Iman, merawat keberagaman suku/agama dalam bingkai persatuan NKRI (QS. Al-Hujurat: 13), bela negara dengan karya inovatif.

SUSUNAN DOKUMEN MODUL AJAR (Gunakan format Markdown formal Indonesia):

# RENCANA PELAKSANAAN PEMBELAJARAN (RPP) / MODUL AJAR
## KURIKULUM BERBASIS CINTA (KBC) DI MADRASAH
### ${mapel.toUpperCase()} - ${kelas.toUpperCase()}

---

### I. IDENTITAS MODUL
- **Satuan Pendidikan**: ${namaSekolah}
- **Nama Penyusun**: ${namaGuru}
- **Tahun Ajaran / Semester**: ${tahunPelajaran}
- **Jenjang / Fase / Kelas**: ${jenjang} / ${kelas}
- **Mata Pelajaran**: ${mapel}
- **Alokasi Waktu**: ${waktu}
- **Tema Kurikulum Berbasis Cinta (Panca Cinta)**: ${pancaCintaStr}
- **Materi Insersi KBC**:
  *(Tuliskan 3-4 butir materi insersi spesifik nilai cinta, dalil Al-Qur'an/Hadis, atau konsep akhlak terkait)*
- **Model & Metode Pembelajaran**: ${modelPembelajaran}, metode: ${metode}
- **Dimensi Profil Pelajar**: ${Array.isArray(profilPancasila) ? profilPancasila.join(', ') : profilPancasila}

### II. KOMPETENSI AWAL & SARANA PRASARANA
1. **Kompetensi Awal Murid**
2. **Sarana, Prasarana & Media Ajar Berbasis Cinta** (Alat peraga, media digital, lingkungan nyata)
3. **Target Peserta Didik** (Inklusif, ramah anak, mengakomodasi kebutuhan belajar beragam)

### III. KOMPONEN INTI
1. **Tujuan Pembelajaran (TP) & Indikator Ketercapaian (IKTP / KKTP)**
   - Rincikan indikator ketercapaian secara terukur (Kognitif, Keterampilan, dan Karakter Panca Cinta).
2. **Pemahaman Bermakna (Deep Meaning)**
   - Jelaskan makna mendalam materi dikaitkan dengan cinta Ilahi, kemanusiaan, atau kelestarian semesta.
3. **Pertanyaan Pemantik Berbasis Cinta**
   - 3-4 pertanyaan reflektif yang menyentuh hati, empati, dan nalar kritis murid.
4. **Langkah-Langkah Kegiatan Pembelajaran Berdiferensiasi** (Detail alokasi menit):
   - **A. Kegiatan Pendahuluan (... Menit)**:
     * Orientasi penuh kehangatan (salam, doa dengan khusyuk, sapaan kasih sayang).
     * Apersepsi & Motivasi (menghubungkan materi dengan fenomena cinta Allah/alam/sesama).
     * Ice breaking / energizer positif yang membangun safe spaces (ruang aman & ceria).
     * Penyampaian tujuan belajar dan kegiatan yang akan dilakukan.
   - **B. Kegiatan Inti (... Menit)**:
     * Jalankan tahapan/sintaks model yang dipilih (misal: FIDS [Feel, Imagine, Do, Share] atau ARKA [Aktivitas, Refleksi, Konsep, Aplikasi] atau PBL/Discovery).
     * Diferensiasi proses dan konten: berikan pilihan eksplorasi sesuai kesiapan murid tanpa diskriminasi.
     * Penerapan komunikasi welas asih (compassionate communication: koneksi sebelum koreksi).
     * Kolaborasi antar-murid yang menumbuhkan sikap ta'awun dan saling menghargai.
   - **C. Kegiatan Penutup (... Menit)**:
     * Refleksi berkesadaran (Mindful, Meaningful, Joyful): murid mengekspresikan apa yang dirasakan dalam hati dan dipelajari hari ini.
     * Penguatan kesimpulan dari guru dengan sentuhan kasih sayang.
     * Tindak lanjut aksi nyata (amal saleh cinta lingkungan/sesama di rumah).
     * Doa kafaratul majelis dan salam penutup.

### IV. ASESMEN DAN EVALUASI BERBASIS CINTA
1. **Asesmen Diagnostik (Awal)**: Pemetaan kesiapan belajar dan kondisi emosional murid.
2. **Asesmen Formatif (Proses)**: Observasi sikap empati, kerja sama (ta'awun), keaktifan berpendapat santun, dan lembar ceklis.
3. **Asesmen Sumatif (Akhir)**: Penilaian unjuk kerja / produk / proyek kebaikan nyata atau tes pemahaman.
${includeRubrik ? `4. **Rubrik Penilaian Karakter Panca Cinta & Akademik**:
   *(Buat tabel rubrik dengan kriteria: Perlu Bimbingan, Cukup, Baik, Sangat Baik mencakup aspek Panca Cinta yang dipilih)*` : ''}

### V. PENGAYAAN DAN REMEDIAL RAMAH ANAK
1. **Program Pengayaan**: Tantangan khidmat / proyek berbagi ilmu untuk sesama bagi murid yang telah tuntas.
2. **Program Remedial**: Pendampingan penuh kehangatan (tutor sebaya / bimbingan personal) tanpa menghakimi.

### VI. JURNAL REFLEKSI DIRI (PANCA CINTA)
- Format tabel jurnal refleksi harian murid untuk mengecek pembiasaan cinta dalam kehidupan sehari-hari.

${includeLKPD ? `### VII. LAMPIRAN: LEMBAR KERJA PESERTA DIDIK (LKPD) BERBASIS CINTA
- Judul Aktivitas LKPD
- Petunjuk Pengerjaan (Bahasa santun, ramah, dan memotivasi)
- Bahan & Langkah Eksplorasi
- Lembar Kerja Diskusi / Kolaborasi Tim
- Kolom Renungan & Tindakan Kebaikan
` : ''}

### VIII. GLOSARIUM DAN DAFTAR PUSTAKA
- Glosarium istilah pedagogis & keislaman (sifat Jamaliyah, ekoteologi, sympathea, ta'awun, dll.)
- Sumber pustaka resmi Kemenag RI, Al-Qur'an, Hadis, dan literatur relevan.

Gunakan gaya bahasa pedagogis yang santun, menyejukkan, ilmiah, serta sarat nilai keluhuran akhlak khas Madrasah Berbasis Cinta.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const markdownResult = response.text || '';

    return res.json({
      success: true,
      content: markdownResult,
      metadata: {
        mapel,
        kelas,
        waktu,
        namaGuru,
        namaSekolah,
        jenjang,
        modelPembelajaran,
        pancaCinta,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error saat membuat Modul Ajar KBC:', error);
    return res.status(500).json({
      error: error?.message || 'Terjadi kesalahan pada server saat memproses modul ajar.',
    });
  }
});

// Endpoint to refine or adjust existing Modul Ajar
app.post('/api/refine-modul', async (req, res) => {
  try {
    const { currentContent, actionType, instruction } = req.body;

    if (!currentContent) {
      return res.status(400).json({ error: 'Dokumen modul saat ini tidak ditemukan.' });
    }

    let refinementPrompt = '';
    switch (actionType) {
      case 'add_cinta_lingkungan':
        refinementPrompt = 'Integrasikan pilar "Cinta Lingkungan (Ekoteologi)" ke dalam pembelajaran: masukkan tadabbur ayat kauniyah (QS. Al-A\'raf: 56 / QS. Ar-Rum: 41), adab pada alam, larangan fasad (perusakan lingkungan), dan aksi nyata hemat energi/air (anti ishraf).';
        break;
      case 'add_ukhuwah_antibullying':
        refinementPrompt = 'Perkuat pilar "Cinta Diri dan Sesama Manusia" dengan memasukkan nilai Ukhuwah Islamiyah & Insaniyah, akhlak ta\'awun (tolong-menolong), tasamuh (toleransi), serta penegasan komitmen madrasah ramah anak (7 Jurus Cegah & Tangani Bullying / Happy Tanpa Bully).';
        break;
      case 'apply_fids':
        refinementPrompt = 'Ubah bagian Kegiatan Inti menjadi Alur FIDS (Feel, Imagine, Do, Share) khas Kurikulum Berbasis Cinta (KBC): Feel (merasakan masalah/empati), Imagine (membayangkan solusi ideal sesuai ajaran Islam & sains), Do (mempraktikkan aksi nyata), Share (berbagi karya & mengedukasi sesama).';
        break;
      case 'apply_arka':
        refinementPrompt = 'Format langkah kegiatan menggunakan alur ARKA (Aktivitas, Refleksi, Konsep, Aplikasi) berbasis pengalaman nyata (experiential learning) yang mengaitkan materi secara mendalam dengan nilai-nilai Panca Cinta.';
        break;
      case 'add_mindful_joyful':
        refinementPrompt = 'Perkuat aspek Pembelajaran Mendalam (Deep Learning): hadirkan suasana Mindful (penuh kesadaran & kehadiran batin), Meaningful (pemaknaan nilai cinta Ilahi & kemanusiaan), serta Joyful (menggembirakan, santun, dan penuh kasih sayang).';
        break;
      case 'add_icebreaking':
        refinementPrompt = 'Tambahkan 2 pilihan ice breaking / energizer kreatif yang santun dan membangun keakraban/empati kelas pada bagian Pendahuluan, lengkap dengan langkah bermain dan durasi waktu.';
        break;
      case 'hots_questions':
        refinementPrompt = 'Tambahkan 5 butir soal HOTS (Higher Order Thinking Skills) berbasis studi kasus kehidupan nyata yang menggugah nalar kritis dan empati moral murid, lengkap dengan kunci jawaban dan rubrik penskoran.';
        break;
      case 'expand_differentiation':
        refinementPrompt = 'Perkuat strategi Pembelajaran Berdiferensiasi (Diferensiasi Konten, Proses, dan Produk) yang ramah anak, menghargai keunikan tiap murid tanpa diskriminasi sesuai prinsip KBC.';
        break;
      case 'simplify_language':
        refinementPrompt = 'Sederhanakan bahasa dan petunjuk pada seluruh modul serta LKPD agar lebih ramah anak, mudah dipahami siswa, tanpa mengurangi esensi capaian belajar dan nilai cinta.';
        break;
      case 'rpp_1_lembar':
        refinementPrompt = 'Buatkan juga versi ringkas/eksekutif (RPP 1 Halaman Berbasis Cinta) yang padat mencakup Tujuan Pembelajaran, Integrasi Panca Cinta, Langkah Kegiatan Inti, dan Asesmen Pokok.';
        break;
      case 'custom':
      default:
        refinementPrompt = instruction || 'Tingkatkan kualitas pedagogis dan kelengkapan materi pada modul ini sesuai prinsip Kurikulum Berbasis Cinta.';
        break;
    }

    const prompt = `
Anda adalah Pakar Kurikulum Berbasis Cinta (KBC) Kementerian Agama RI.
Berikut adalah draft Modul Ajar saat ini:
--------------------------------
${currentContent}
--------------------------------

INSTRUKSI PENYEMPURNAAN KHUSUS (KBC / PANCA CINTA):
${refinementPrompt}

Silakan perbarui dan sempurnakan dokumen di atas dengan tetap mempertahankan format Markdown formal, rapi, lengkap, dan berjiwa Kurikulum Berbasis Cinta (Kepdirjen Pendis 6077/2025). Kembalikan keseluruhan dokumen yang telah disempurnakan.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const refinedContent = response.text || currentContent;

    return res.json({
      success: true,
      content: refinedContent,
    });
  } catch (error: any) {
    console.error('Error saat menyempurnakan modul KBC:', error);
    return res.status(500).json({
      error: error?.message || 'Gagal menyempurnakan modul.',
    });
  }
});

// Setup Vite middlewares for development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server RPP & Modul Ajar berjalan pada http://localhost:${port}`);
  });
}

startServer();
