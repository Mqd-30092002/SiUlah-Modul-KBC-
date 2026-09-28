import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Sparkles,
  Download,
  Copy,
  Printer,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sliders,
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
  History,
  FileCheck,
  Send,
  Wand2,
  Heart,
  Building,
  Check,
  Info,
  Award,
  Activity,
  UserCheck,
} from 'lucide-react';
import { AppLogo } from './components/AppLogo';
import { exportModulToDocx } from './utils/docxExport';
import { MarkdownViewer } from './components/MarkdownViewer';
import { KopSuratModal, KopSuratData } from './components/KopSuratModal';
import { SavedModulesModal, SavedModul } from './components/SavedModulesModal';
import {
  KURIKULUM_PRESETS,
  PANCA_CINTA_LIST,
  KELAS_BY_JENJANG,
  MAPEL_BY_JENJANG,
  MODEL_PEMBELAJARAN_LIST,
  PresetTP,
} from './data/kurikulumPresets';

export default function App() {
  // Jenjang & Mapel
  const [selectedJenjang, setSelectedJenjang] = useState<'MI' | 'MTs' | 'MA' | 'RA' | 'SEKOLAH_UMUM'>('MI');
  const [mapelCategory, setMapelCategory] = useState<'pai' | 'umum'>('umum');
  const [mapel, setMapel] = useState('PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)');
  const [kelas, setKelas] = useState('Kelas 4 (Fase B MI)');
  const [waktu, setWaktu] = useState('3 JP (3 x 35 Menit)');

  // Identitas Tambahan
  const [namaGuru, setNamaGuru] = useState('Ahmad Miqdad Azmi, S.Pd');
  const [namaSekolah, setNamaSekolah] = useState('Madrasah Ibtidaiyah Negeri (MIN) 1 Teladan');
  const [tahunPelajaran, setTahunPelajaran] = useState('2024/2025');
  const [modelPembelajaran, setModelPembelajaran] = useState('Alur ARKA (Aktivitas, Refleksi, Konsep, Aplikasi - KBC)');

  // 5 Panca Cinta Selection
  const [selectedPancaCinta, setSelectedPancaCinta] = useState<string[]>([
    'Cinta Allah dan Rasul-Nya',
    'Cinta Diri dan Sesama Manusia',
    'Cinta Lingkungan',
  ]);

  // Profil Pelajar Pancasila & Rahmatan Lil 'Alamin
  const [profilPancasila, setProfilPancasila] = useState<string[]>([
    'Beriman & Bertakwa',
    'Mandiri',
    'Bergotong Royong',
  ]);

  // Input TP
  const [inputMethod, setInputMethod] = useState<'preset' | 'manual' | 'upload'>('preset');
  const [tpText, setTpText] = useState(
    'Peserta didik mampu mempraktikkan berbagai aktivitas kebugaran jasmani (daya tahan jantung, kelenturan, dan kekuatan otot) dengan suasana gembira (joyful), memahami bahwa tubuh sehat dan kuat adalah nikmat dan amanah cinta dari Allah Swt. (Cinta Diri), serta menumbuhkan sportivitas, sikap saling menyemangati, dan menolak perundungan/bullying (Cinta Sesama).'
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressTip, setProgressTip] = useState('');
  const [hasilModul, setHasilModul] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'kegiatan' | 'panca_cinta' | 'lkpd' | 'asesmen'>('all');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extra options
  const [showIdentitySettings, setShowIdentitySettings] = useState(false);
  const [showPancaCintaGuide, setShowPancaCintaGuide] = useState(false);
  const [includeLKPD, setIncludeLKPD] = useState(true);
  const [includeRubrik, setIncludeRubrik] = useState(true);

  // Refinement state
  const [isRefining, setIsRefining] = useState(false);
  const [customRefinement, setCustomRefinement] = useState('');

  // Kop Surat & Saved Modules
  const [isKopModalOpen, setIsKopModalOpen] = useState(false);
  const [kopData, setKopData] = useState<KopSuratData>({
    enabled: true,
    dinas: 'KEMENTERIAN AGAMA REPUBLIK INDONESIA\nKANTOR KEMENTERIAN AGAMA KABUPATEN/KOTA',
    sekolah: 'MADRASAH IBTIDAIYAH NEGERI (MIN) 1 TELADAN',
    alamat: 'Jl. Madani No. 12, Kel. Barakah, Kec. Ihsan, Kode Pos 60123',
    kontak: 'Telp: (021) 789-4567 | Email: min1teladan@kemenag.go.id',
    npsn: '60701234',
  });

  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [savedModules, setSavedModules] = useState<SavedModul[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial settings & history
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rpp_saved_modules');
      if (stored) setSavedModules(JSON.parse(stored));
      const storedKop = localStorage.getItem('rpp_kop_surat');
      if (storedKop) setKopData(JSON.parse(storedKop));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update default kelas and mapel when jenjang changes
  const handleJenjangChange = (newJenjang: 'MI' | 'MTs' | 'MA' | 'RA' | 'SEKOLAH_UMUM') => {
    setSelectedJenjang(newJenjang);
    const kelasList = KELAS_BY_JENJANG[newJenjang] || [];
    if (kelasList.length > 0) {
      setKelas(kelasList[0]);
    }
    const mapelList = MAPEL_BY_JENJANG[newJenjang] || { pai: [], umum: [] };
    const currentList = mapelCategory === 'pai' ? mapelList.pai : mapelList.umum;
    if (currentList && currentList.length > 0) {
      setMapel(currentList[0]);
    }

    // Default time based on jenjang
    if (newJenjang === 'MI') setWaktu('3 JP (3 x 35 Menit)');
    else if (newJenjang === 'MTs') setWaktu('3 JP (3 x 40 Menit)');
    else if (newJenjang === 'MA') setWaktu('3 JP (3 x 45 Menit)');
    else if (newJenjang === 'RA') setWaktu('2 x 30 Menit');
    else setWaktu('3 JP (3 x 45 Menit)');

    // Default school name
    if (newJenjang === 'MI') setNamaSekolah('Madrasah Ibtidaiyah Negeri (MIN) 1 Teladan');
    else if (newJenjang === 'MTs') setNamaSekolah('Madrasah Tsanawiyah Negeri (MTsN) 1 Karakter');
    else if (newJenjang === 'MA') setNamaSekolah('Madrasah Aliyah Negeri (MAN) 1 Unggulan');
    else if (newJenjang === 'RA') setNamaSekolah('Raudhatul Athfal (RA) Mutiara Hati');
  };

  // Toggle Panca Cinta
  const togglePancaCinta = (id: string) => {
    setSelectedPancaCinta((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  // Select Preset
  const handleSelectPreset = (preset: PresetTP) => {
    setSelectedJenjang(preset.jenjang as any);
    setMapel(preset.mapel);
    setKelas(preset.kelas);
    setWaktu(preset.waktu);
    setTpText(preset.tujuanPembelajaran);
    setModelPembelajaran(preset.modelPembelajaran);
    setSelectedPancaCinta(preset.pancaCinta);
    setProfilPancasila(preset.profilPancasila);
    setInputMethod('manual');
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    setIsUploading(true);
    setErrorMessage('');

    try {
      if (file.name.endsWith('.txt')) {
        const text = await file.text();
        setTpText(text);
        setInputMethod('manual');
      } else if (file.name.endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Data = btoa(binary);

        const res = await fetch('/api/extract-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64Data }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Gagal membaca PDF');
        setTpText(data.text);
        setInputMethod('manual');
      } else {
        throw new Error('Format file tidak didukung. Harap unggah file .pdf atau .txt');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memproses file dokumen.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Generate Handler
  const handleGenerate = async () => {
    if (!mapel.trim() || !tpText.trim()) {
      setErrorMessage('Mata Pelajaran dan Tujuan Pembelajaran (TP) harus diisi!');
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);
    setIsEditMode(false);

    const tips = [
      'SiUlah Modul KBC: Mengintegrasikan 5 Pilar Panca Cinta Kemenag RI...',
      'Menyusun sintaks pembelajaran aktif, ramah anak, dan penuh kasih sayang...',
      'Merumuskan pertanyaan pemantik bernilai welas asih dan budi pekerti...',
      'Merancang kegiatan inklusif dan bebas perundungan (Madrasah Happy Tanpa Bully)...',
      'Menyiapkan instrumen asesmen karakter Panca Cinta dan LKPD inspiratif...',
      'Memoles diferensiasi konten, proses, dan produk pembelajaran...',
    ];
    let tipIdx = 0;
    setProgressTip(tips[0]);
    const tipInterval = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      setProgressTip(tips[tipIdx]);
    }, 2800);

    try {
      const response = await fetch('/api/generate-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jenjang: selectedJenjang,
          mapel,
          kelas,
          waktu,
          tujuanPembelajaran: tpText,
          namaGuru,
          namaSekolah,
          tahunPelajaran,
          modelPembelajaran,
          pancaCinta: selectedPancaCinta,
          profilPancasila,
          includeLKPD,
          includeRubrik,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Gagal membuat modul ajar');

      setHasilModul(data.content);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#047857', '#FBBF24', '#FFFFFF'],
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Terjadi gangguan saat memproses modul');
    } finally {
      clearInterval(tipInterval);
      setIsGenerating(false);
    }
  };

  // Refine Handler
  const handleRefine = async (actionType: string, customText?: string) => {
    if (!hasilModul) return;

    setIsRefining(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/refine-modul', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: hasilModul,
          actionType,
          instruction: customText || '',
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Gagal menyempurnakan modul');

      setHasilModul(data.content);
      if (actionType === 'custom') setCustomRefinement('');
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memperbarui modul.');
    } finally {
      setIsRefining(false);
    }
  };

  // Export to Docx
  const handleExportDocx = async () => {
    if (!hasilModul) return;
    try {
      const blob = await exportModulToDocx({
        title: `Modul Ajar KBC ${mapel}`,
        subject: `${mapel} (${selectedJenjang})`,
        grade: kelas,
        teacherName: namaGuru,
        schoolName: namaSekolah,
        markdown: hasilModul,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanFileName = `SiUlah_Modul_KBC_${mapel.replace(/[\s\/\(\)]+/g, '_')}_${selectedJenjang}_${kelas.replace(/[\s\/\(\)]+/g, '_')}.docx`;
      a.download = cleanFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      alert('Gagal mengekspor ke file Word (.docx). Silakan coba lagi.');
    }
  };

  // Save to Local History
  const handleSaveToHistory = () => {
    if (!hasilModul) return;
    const newModul: SavedModul = {
      id: Date.now().toString(),
      mapel: `${mapel} (${selectedJenjang})`,
      kelas,
      waktu,
      namaGuru,
      namaSekolah,
      content: hasilModul,
      createdAt: new Date().toISOString(),
    };

    const updated = [newModul, ...savedModules];
    setSavedModules(updated);
    localStorage.setItem('rpp_saved_modules', JSON.stringify(updated));
    alert('Modul Ajar SiUlah KBC berhasil disimpan ke Arsip!');
  };

  // Filter content by Tab
  const getFilteredContent = () => {
    if (activeTab === 'all') return hasilModul;
    if (activeTab === 'kegiatan') {
      const match = hasilModul.match(/4\.\s+\*\*Langkah-Langkah Kegiatan Pembelajaran[\s\S]*?(?=### IV|\Z)/i);
      return match ? match[0] : hasilModul;
    }
    if (activeTab === 'panca_cinta') {
      const match = hasilModul.match(/Tema Kurikulum Berbasis Cinta[\s\S]*?(?=### II|\Z)/i);
      return match ? `### FOKUS INTEGRASI PANCA CINTA & MATERI INSERSI\n\n${match[0]}` : hasilModul;
    }
    if (activeTab === 'asesmen') {
      const match = hasilModul.match(/### IV\. ASESMEN DAN EVALUASI[\s\S]*?(?=### V|\Z)/i);
      return match ? match[0] : hasilModul;
    }
    if (activeTab === 'lkpd') {
      const match = hasilModul.match(/### VII\. LAMPIRAN[\s\S]*?(?=### VIII|\Z)/i);
      return match ? match[0] : hasilModul;
    }
    return hasilModul;
  };

  const currentMapels = MAPEL_BY_JENJANG[selectedJenjang] || { pai: [], umum: [] };
  const currentMapelList = mapelCategory === 'pai' ? currentMapels.pai : currentMapels.umum;

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col font-sans">
      
      {/* Top Header - Theme Hijau, Kuning, dan Putih */}
      <header className="sticky top-0 z-30 bg-emerald-900 border-b-4 border-amber-400 text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between flex-wrap gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <AppLogo size="md" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-extrabold text-white text-base sm:text-xl tracking-tight flex items-center gap-1.5">
                  <span>Generator RPP & Modul Ajar AI</span>
                  <span className="text-amber-300 font-black">(SiUlah Modul KBC)</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-emerald-950 uppercase tracking-wide shadow-2xs">
                  5 Panca Cinta
                </span>
              </div>
              
              {/* Creator Subtitle */}
              <div className="flex items-center gap-2 mt-0.5 text-xs">
                <span className="font-medium text-emerald-200">
                  Dikembangkan Oleh:
                </span>
                <span className="font-bold text-amber-300 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-amber-400/40 flex items-center gap-1 shadow-2xs">
                  <UserCheck className="w-3 h-3 text-amber-300" />
                  Ahmad Miqdad Azmi, S.Pd
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPancaCintaGuide(!showPancaCintaGuide)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-amber-300 border border-amber-400/40 transition shadow-xs"
              title="Panduan 5 Panca Cinta Kemenag RI"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Info 5 Panca Cinta</span>
            </button>
            <button
              onClick={() => setIsKopModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
              title="Pengaturan Kop Surat Madrasah"
            >
              <Building className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Kop Madrasah</span>
            </button>
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition relative"
              title="Arsip Dokumen Modul"
            >
              <History className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Arsip</span>
              {savedModules.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-emerald-950 text-[10px] font-black flex items-center justify-center">
                  {savedModules.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Golden-Green Sub-Ribbon with Panca Cinta & PJOK highlights */}
        <div className="bg-emerald-950/90 border-t border-emerald-800/80 px-4 py-1.5 text-[11px] text-emerald-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-extrabold text-amber-300">5 Pilar Panca Cinta (KBC):</span>
              <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-semibold">
                Kepdirjen Pendis No. 6077/2025
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-emerald-200">
              <span className="flex items-center gap-1">💖 1. Cinta Allah & Rasul</span>
              <span>•</span>
              <span className="flex items-center gap-1">📖 2. Cinta Ilmu</span>
              <span>•</span>
              <span className="flex items-center gap-1">🌿 3. Cinta Lingkungan</span>
              <span>•</span>
              <span className="flex items-center gap-1">🤝 4. Cinta Diri & Sesama</span>
              <span>•</span>
              <span className="flex items-center gap-1">🇮🇩 5. Cinta Tanah Air</span>
            </div>
          </div>
        </div>
      </header>

      {/* Info Guide Drawer: Panduan 5 Panca Cinta */}
      {showPancaCintaGuide && (
        <div className="bg-emerald-50 border-b-2 border-amber-300 p-4 sm:p-6 print:hidden">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                <h3 className="font-bold text-emerald-950 text-base">
                  Panduan Kurikulum Berbasis Cinta (SiUlah Modul KBC) — Kepdirjen Pendis No. 6077 Tahun 2025
                </h3>
              </div>
              <button
                onClick={() => setShowPancaCintaGuide(false)}
                className="text-xs text-emerald-800 font-bold hover:underline"
              >
                Tutup Panduan ✕
              </button>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>SiUlah Modul KBC</strong> dikembangkan oleh <strong>Ahmad Miqdad Azmi, S.Pd</strong> untuk membantu guru di madrasah (MI, MTs, MA, RA) dan sekolah umum merancang dokumen pembelajaran yang sarat nilai-nilai kasih sayang, memadukan ayat qauliyah dan kauniyah, serta membangun madrasah ramah anak (bebas kekerasan dan perundungan).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {PANCA_CINTA_LIST.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl border-2 border-emerald-100 hover:border-amber-400 space-y-1 shadow-2xs transition">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-emerald-950">{item.name}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-3">{item.description}</p>
                  <p className="text-[10px] text-emerald-700 italic pt-1">{item.quranHadisRef}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Form Settings */}
          <div className="lg:col-span-5 space-y-5 print:hidden">

            {/* Jenjang Selector Tabs (MI, MTs, MA, RA) */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-emerald-800/10 space-y-2.5">
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center justify-between">
                <span>Pilih Jenjang Madrasah / Sekolah:</span>
                <span className="text-[11px] text-amber-700 font-semibold">MI • MTs • MA • RA</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['MI', 'MTs', 'MA', 'RA'] as const).map((jId) => {
                  const isSelected = selectedJenjang === jId;
                  const labelMap = {
                    MI: 'MI (Ibtidaiyah)',
                    MTs: 'MTs (Tsanawiyah)',
                    MA: 'MA / MAK (Aliyah)',
                    RA: 'RA (Raudhatul Athfal)',
                  };
                  return (
                    <button
                      key={jId}
                      type="button"
                      onClick={() => handleJenjangChange(jId)}
                      className={`py-2 px-1 text-center rounded-xl font-extrabold text-xs transition border-2 ${
                        isSelected
                          ? 'bg-emerald-800 text-amber-300 border-amber-400 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-emerald-300'
                      }`}
                    >
                      {labelMap[jId]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Box 1: Parameter Kelas, Mapel & PJOK */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-700" />
                  <h2 className="font-bold text-slate-900 text-base">
                    1. Parameter Kelas & Mata Pelajaran ({selectedJenjang})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIdentitySettings(!showIdentitySettings)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                >
                  {showIdentitySettings ? 'Tutup Identitas' : 'Identitas Guru/Sekolah'}
                  {showIdentitySettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Collapsible Identity Form */}
              {showIdentitySettings && (
                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Penyusun / Guru</label>
                    <input
                      type="text"
                      value={namaGuru}
                      onChange={(e) => setNamaGuru(e.target.value)}
                      placeholder="Contoh: Ahmad Miqdad Azmi, S.Pd"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nama Madrasah / Satuan</label>
                      <input
                        type="text"
                        value={namaSekolah}
                        onChange={(e) => setNamaSekolah(e.target.value)}
                        placeholder="Contoh: MIN 1..."
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Tahun Ajaran</label>
                      <input
                        type="text"
                        value={tahunPelajaran}
                        onChange={(e) => setTahunPelajaran(e.target.value)}
                        placeholder="2024/2025"
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mapel Category Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pilih Mata Pelajaran:
                  </label>
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setMapelCategory('umum');
                        setMapel('PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)');
                      }}
                      className={`px-2.5 py-1 rounded-md font-bold transition flex items-center gap-1 ${
                        mapelCategory === 'umum'
                          ? 'bg-amber-400 text-emerald-950 border border-amber-500'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Activity className="w-3 h-3 text-emerald-900" />
                      Mapel Umum & PJOK
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMapelCategory('pai');
                        if (currentMapels.pai[0]) setMapel(currentMapels.pai[0]);
                      }}
                      className={`px-2.5 py-1 rounded-md font-bold transition ${
                        mapelCategory === 'pai'
                          ? 'bg-emerald-800 text-amber-300 border border-emerald-900'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Kekhasan PAI & B. Arab
                    </button>
                  </div>
                </div>

                <select
                  value={mapel}
                  onChange={(e) => setMapel(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border-2 border-emerald-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-bold text-slate-900"
                >
                  {currentMapelList.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Quick Subject Chips including prominent PJOK button */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMapelCategory('umum');
                      setMapel('PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)');
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border-2 font-bold transition flex items-center gap-1 ${
                      mapel.includes('PJOK')
                        ? 'bg-amber-400 border-amber-500 text-emerald-950 shadow-xs'
                        : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    <Activity className="w-3 h-3 text-emerald-800" />
                    ⭐ PJOK
                  </button>

                  {['Fikih', 'Akidah Akhlak', 'Al-Qur’an Hadis', 'Bahasa Arab', 'IPAS', 'Matematika', 'B. Indonesia'].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        const isPai = currentMapels.pai.some((p) => p.includes(chip));
                        setMapelCategory(isPai ? 'pai' : 'umum');
                        const found = (isPai ? currentMapels.pai : currentMapels.umum).find((m) => m.includes(chip));
                        if (found) setMapel(found);
                        else setMapel(chip);
                      }}
                      className={`text-[11px] px-2 py-0.5 rounded-md border transition ${
                        mapel.includes(chip)
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kelas & Alokasi Waktu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kelas / Fase
                  </label>
                  <select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    {(KELAS_BY_JENJANG[selectedJenjang] || []).map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Alokasi Waktu
                  </label>
                  <input
                    type="text"
                    value={waktu}
                    onChange={(e) => setWaktu(e.target.value)}
                    placeholder="3 JP (3 x 35 Menit)"
                    className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              {/* Model Pembelajaran KBC */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Model Pembelajaran Aktif & Ramah Anak
                </label>
                <select
                  value={modelPembelajaran}
                  onChange={(e) => setModelPembelajaran(e.target.value)}
                  className="w-full text-sm px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {MODEL_PEMBELAJARAN_LIST.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Integrasi 5 Panca Cinta Section */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                    Pilih Integrasi Panca Cinta ({selectedPancaCinta.length}/5)
                  </label>
                  <span className="text-[11px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                    KBC Kemenag RI
                  </span>
                </div>

                <div className="space-y-1.5">
                  {PANCA_CINTA_LIST.map((panca) => {
                    const isSelected = selectedPancaCinta.includes(panca.id);
                    return (
                      <div
                        key={panca.id}
                        onClick={() => togglePancaCinta(panca.id)}
                        className={`p-2.5 rounded-xl border-2 cursor-pointer transition flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-emerald-50/90 border-emerald-600 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">
                              {panca.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-900">
                              {panca.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-tight">
                            {panca.description}
                          </p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-emerald-700 border-emerald-700 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Box 2: Input Capaian & Tujuan Pembelajaran (TP) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <h2 className="font-bold text-slate-900 text-base">
                    2. Input Tujuan Pembelajaran (TP)
                  </h2>
                </div>
              </div>

              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setInputMethod('preset')}
                  className={`py-1.5 rounded-lg transition text-center ${
                    inputMethod === 'preset'
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Contoh Resmi KBC
                </button>
                <button
                  type="button"
                  onClick={() => setInputMethod('manual')}
                  className={`py-1.5 rounded-lg transition text-center ${
                    inputMethod === 'manual'
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Teks Manual
                </button>
                <button
                  type="button"
                  onClick={() => setInputMethod('upload')}
                  className={`py-1.5 rounded-lg transition text-center ${
                    inputMethod === 'upload'
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unggah PDF / TXT
                </button>
              </div>

              {/* Preset Selection List */}
              {inputMethod === 'preset' && (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  <p className="text-xs text-slate-500 font-medium">
                    Pilih inspirasi modul (termasuk PJOK & Fikih/IPAS/B.Arab/Akidah):
                  </p>
                  {KURIKULUM_PRESETS.filter(
                    (p) => p.jenjang === selectedJenjang || p.jenjang === 'UMUM'
                  ).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full text-left p-2.5 rounded-xl border-2 transition text-xs space-y-1 ${
                        preset.mapel.includes('PJOK')
                          ? 'border-amber-400 bg-amber-50/60 hover:bg-amber-100/70'
                          : 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                          {preset.mapel.includes('PJOK') && <span>🏃‍♂️</span>}
                          {preset.mapel} — {preset.kelas}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-400 text-emerald-950">
                          {preset.pancaCinta.length} Panca Cinta
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium text-[11px]">{preset.topik}</p>
                      <p className="text-slate-500 text-[10px] line-clamp-1 italic">
                        Model: {preset.modelPembelajaran}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {/* Upload Document */}
              {inputMethod === 'upload' && (
                <div className="space-y-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 rounded-xl p-5 text-center cursor-pointer bg-emerald-50/40 hover:bg-emerald-50/70 transition"
                  >
                    <Upload className="w-7 h-7 mx-auto text-emerald-700 stroke-1 mb-1.5" />
                    <p className="text-xs font-semibold text-slate-800">
                      Klik untuk unggah file Capaian / Materi Pembelajaran
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Mendukung file dokumen PDF (.pdf) atau Teks (.txt)
                    </p>
                    {uploadFileName && (
                      <p className="mt-2 text-xs text-emerald-800 font-bold bg-white py-1 px-2.5 rounded-lg border border-emerald-300 inline-block">
                        File terpilih: {uploadFileName}
                      </p>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isUploading && (
                    <div className="text-xs text-emerald-700 font-medium flex items-center justify-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
                      Mengekstrak teks dokumen PDF...
                    </div>
                  )}
                </div>
              )}

              {/* Textarea for TP */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Rumusan Tujuan Pembelajaran (TP) / Capaian Pembelajaran
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {tpText.length} karakter
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={tpText}
                  onChange={(e) => setTpText(e.target.value)}
                  placeholder="Ketik tujuan pembelajaran spesifik yang ingin dicapai murid..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
                />
              </div>

              {/* Options */}
              <div className="flex items-center gap-4 text-xs font-medium text-slate-700 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLKPD}
                    onChange={(e) => setIncludeLKPD(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  Sertakan LKPD Berbasis Cinta
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeRubrik}
                    onChange={(e) => setIncludeRubrik(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                  />
                  Sertakan Rubrik Panca Cinta
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Generate Button - Hijau & Kuning Highlight */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || isUploading}
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white font-extrabold text-sm rounded-xl shadow-lg border-2 border-amber-400 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>SiUlah KBC: Sedang Merakit Dokumen Modul...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>🚀 Susun Modul Ajar (SiUlah KBC) — {selectedJenjang}</span>
                  </>
                )}
              </button>

              {isGenerating && (
                <p className="text-center text-xs text-emerald-800 animate-pulse font-medium">
                  {progressTip}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Generated Document Result & Preview */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Kop Surat Header for Print View */}
            {kopData.enabled && hasilModul && (
              <div className="hidden print:block border-b-4 border-double border-slate-900 pb-3 mb-6 text-center font-serif">
                <h3 className="text-sm font-bold tracking-wider uppercase whitespace-pre-line">{kopData.dinas}</h3>
                <h2 className="text-lg font-extrabold uppercase mt-0.5">{kopData.sekolah}</h2>
                <p className="text-xs mt-1 text-slate-700">{kopData.alamat}</p>
                <div className="flex justify-center gap-4 text-[10px] text-slate-600 mt-0.5">
                  {kopData.npsn && <span>NPSN: {kopData.npsn}</span>}
                  {kopData.kontak && <span>• {kopData.kontak}</span>}
                </div>
              </div>
            )}

            {/* Document Header & Action Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3 print:border-none print:shadow-none print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 print:hidden">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                    <h2 className="font-extrabold text-slate-900 text-base">
                      {hasilModul
                        ? `Dokumen: ${mapel} (${selectedJenjang})`
                        : 'Hasil Modul Ajar SiUlah KBC'}
                    </h2>
                  </div>
                  {hasilModul && (
                    <p className="text-xs text-slate-500">
                      {kelas} • {waktu} • Integrasi: {selectedPancaCinta.join(', ')}
                    </p>
                  )}
                </div>

                {/* Primary Export Actions */}
                {hasilModul && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleExportDocx}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
                      title="Unduh file dokumen Word (.docx)"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Word (.docx)</span>
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
                      title="Cetak atau Simpan PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak / PDF</span>
                    </button>

                    <button
                      onClick={() => {
                        if (!hasilModul) return;
                        navigator.clipboard.writeText(hasilModul);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
                      title="Salin teks markdown"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>

                    <button
                      onClick={handleSaveToHistory}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
                      title="Simpan ke Arsip Lokal"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Simpan</span>
                    </button>

                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                        isEditMode
                          ? 'bg-amber-50 border-amber-300 text-amber-800'
                          : 'border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                      title="Edit langsung teks dokumen"
                    >
                      <span>{isEditMode ? 'Lihat Tampilan' : 'Edit Teks'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Sub-tabs for quick navigation */}
              {hasilModul && !isEditMode && (
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-medium border-b border-slate-100 print:hidden">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'all'
                        ? 'bg-emerald-800 text-amber-300 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    📄 Dokumen Lengkap KBC
                  </button>
                  <button
                    onClick={() => setActiveTab('kegiatan')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'kegiatan'
                        ? 'bg-emerald-800 text-amber-300 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🎯 Langkah Pembelajaran Aktif
                  </button>
                  <button
                    onClick={() => setActiveTab('panca_cinta')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'panca_cinta'
                        ? 'bg-emerald-800 text-amber-300 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    💖 Fokus 5 Panca Cinta
                  </button>
                  <button
                    onClick={() => setActiveTab('asesmen')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'asesmen'
                        ? 'bg-emerald-800 text-amber-300 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    📊 Asesmen Karakter Panca Cinta
                  </button>
                  <button
                    onClick={() => setActiveTab('lkpd')}
                    className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap ${
                      activeTab === 'lkpd'
                        ? 'bg-emerald-800 text-amber-300 font-extrabold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    📝 LKPD Murid
                  </button>
                </div>
              )}

              {/* Document Body View or Placeholder */}
              {!hasilModul ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 border-2 border-amber-300 flex items-center justify-center text-emerald-800 shadow-sm">
                    <Heart className="w-8 h-8 fill-amber-400 text-emerald-800" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-800 text-lg">
                      SiUlah Modul KBC Siap Merakit Modul Ajar Anda
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Pilih jenjang <strong>(MI, MTs, MA, atau RA)</strong>, tentukan mata pelajaran <strong>(termasuk PJOK, PAI, Sains, Bahasa)</strong>, pilih pilar <strong>Panca Cinta</strong>, lalu klik tombol <strong className="text-emerald-800">"🚀 Susun Modul Ajar"</strong>.
                    </p>
                  </div>
                </div>
              ) : isEditMode ? (
                <div className="space-y-2">
                  <p className="text-xs text-slate-500 italic">
                    Ketik langsung pada editor untuk mengubah narasi atau butir kegiatan:
                  </p>
                  <textarea
                    rows={22}
                    value={hasilModul}
                    onChange={(e) => setHasilModul(e.target.value)}
                    className="w-full text-xs font-mono p-4 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed bg-slate-50"
                  />
                </div>
              ) : (
                <div className="p-2 sm:p-4 rounded-xl bg-white max-h-[75vh] overflow-y-auto print:max-h-none print:overflow-visible">
                  <MarkdownViewer content={getFilteredContent()} />
                </div>
              )}
            </div>

            {/* AI Refinement & Expansion Toolbar */}
            {hasilModul && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-3 print:hidden">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      Penyempurnaan 1-Klik AI (Kurikulum Berbasis Cinta)
                    </h3>
                  </div>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                    SiUlah Assistant
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRefine('add_cinta_lingkungan')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-950 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🌿 + Ekoteologi & Cinta Lingkungan (Anti Fasad)</span>
                  </button>
                  <button
                    onClick={() => handleRefine('add_ukhuwah_antibullying')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/70 text-emerald-950 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🤝 + Ukhuwah & 7 Jurus Madrasah Happy Tanpa Bully</span>
                  </button>
                  <button
                    onClick={() => handleRefine('apply_fids')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>💖 Terapkan Alur FIDS (Feel, Imagine, Do, Share)</span>
                  </button>
                  <button
                    onClick={() => handleRefine('apply_arka')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🧭 Terapkan Alur ARKA (Aktivitas, Refleksi, Konsep, Aplikasi)</span>
                  </button>
                  <button
                    onClick={() => handleRefine('add_mindful_joyful')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🧘 Perkuat Refleksi Mindful-Meaningful-Joyful</span>
                  </button>
                  <button
                    onClick={() => handleRefine('add_icebreaking')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>🧊 + Ice Breaking & Energizer Ceria</span>
                  </button>
                  <button
                    onClick={() => handleRefine('rpp_1_lembar')}
                    disabled={isRefining}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span>📄 Buat Format RPP 1 Lembar Berbasis Cinta</span>
                  </button>
                </div>

                {/* Custom Instruction Box */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (customRefinement.trim()) {
                      handleRefine('custom', customRefinement);
                    }
                  }}
                  className="flex items-center gap-2 pt-1"
                >
                  <input
                    type="text"
                    value={customRefinement}
                    onChange={(e) => setCustomRefinement(e.target.value)}
                    placeholder="Instruksi kustom: Contoh: 'Tambahkan aktivitas pemanasan gerak dinamis berpasangan untuk mapel PJOK'..."
                    className="flex-1 text-xs px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={isRefining || !customRefinement.trim()}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold rounded-xl text-xs transition flex items-center gap-1 disabled:opacity-50 border border-amber-400"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </form>

                {isRefining && (
                  <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium animate-pulse">
                    <div className="w-3.5 h-3.5 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
                    <span>Sedang memproses penyempurnaan dokumen Kurikulum Berbasis Cinta...</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Tema Hijau, Kuning, Putih */}
      <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-400 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AppLogo size="sm" />
            <div>
              <p className="text-xs font-bold text-white">
                Generator RPP & Modul Ajar AI (SiUlah Modul KBC)
              </p>
              <p className="text-[11px] text-amber-300">
                Dikembangkan Oleh: <strong>Ahmad Miqdad Azmi, S.Pd</strong>
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right text-[11px] text-emerald-200">
            <p>Berpedoman pada Keputusan Direktur Jenderal Pendidikan Islam No. 6077 Tahun 2025</p>
            <p className="text-amber-400 font-semibold mt-0.5">
              Kementerian Agama Republik Indonesia • Madrasah Maju, Bermutu, Mendunia
            </p>
          </div>
        </div>
      </footer>

      {/* Kop Surat Modal */}
      <KopSuratModal
        isOpen={isKopModalOpen}
        onClose={() => setIsKopModalOpen(false)}
        kopData={kopData}
        onSave={(newKop) => {
          setKopData(newKop);
          localStorage.setItem('rpp_kop_surat', JSON.stringify(newKop));
        }}
      />

      {/* Saved Modules Archive Modal */}
      <SavedModulesModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        modules={savedModules}
        onSelect={(modul) => {
          setMapel(modul.mapel);
          setKelas(modul.kelas);
          setWaktu(modul.waktu);
          if (modul.namaGuru) setNamaGuru(modul.namaGuru);
          if (modul.namaSekolah) setNamaSekolah(modul.namaSekolah);
          setHasilModul(modul.content);
        }}
        onDelete={(id) => {
          const updated = savedModules.filter((m) => m.id !== id);
          setSavedModules(updated);
          localStorage.setItem('rpp_saved_modules', JSON.stringify(updated));
        }}
      />
    </div>
  );
}
