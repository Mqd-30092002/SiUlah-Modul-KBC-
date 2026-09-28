export interface PancaCintaItem {
  id: string;
  name: string;
  category: 'Sumber Cinta' | 'Tanda Cinta' | 'Tali Cinta';
  badgeColor: string;
  description: string;
  quranHadisRef?: string;
  contohInsersi: string[];
}

export const PANCA_CINTA_LIST: PancaCintaItem[] = [
  {
    id: 'Cinta Allah dan Rasul-Nya',
    name: '1. Cinta Allah Swt. dan Rasul-Nya',
    category: 'Sumber Cinta',
    badgeColor: 'emerald',
    description:
      'Mengenal sifat Jamaliyah (keindahan & welas asih) dan Jalaliyah Allah Swt. serta meneladani Rasulullah saw. sebagai sosok teladan penuh kasih sayang dalam beribadah dan bermasyarakat.',
    quranHadisRef: 'QS. Al-Baqarah: 165, HR. Bukhari & Muslim tentang mencintai saudara',
    contohInsersi: [
      'Meneladani Asmaul Husna (Ar-Rahman, Ar-Rahim, Al-Wadud, Al-Latif, Ar-Rauf, Al-Karim)',
      'Ibadah sebagai wujud cinta (eros-oriented) bukan paksaan/ketakutan semata (nomos-oriented)',
      'Menghidupkan sunnah kasih sayang Rasulullah saw. dalam perilaku sehari-hari',
      'Syukur nikmat dalam setiap napas kehidupan dan aktivitas belajar',
    ],
  },
  {
    id: 'Cinta Ilmu',
    name: '2. Cinta Ilmu',
    category: 'Sumber Cinta',
    badgeColor: 'blue',
    description:
      'Memahami ilmu sebagai jalan membukakan tabir keagungan penciptaan dan hikmah syariat, menghubungkan ayat qauliyah dan kauniyah untuk merasakan getaran cinta Ilahi.',
    quranHadisRef: 'QS. Az-Zumar: 9, QS. Al-Mujadilah: 11',
    contohInsersi: [
      '6 Pilar pencari ilmu: niat ikhlas, tekun, tawakal, wara’, yakin, dan syukur',
      'Integrasi sumber ilmu qauliyah (Al-Qur’an/Hadis) dan kauniyah (semesta/sains)',
      'Adab luhur kepada guru dan sesama penuntut ilmu',
      'Literasi kritis, rasa ingin tahu ilmiah, dan pembelajar sepanjang hayat',
    ],
  },
  {
    id: 'Cinta Lingkungan',
    name: '3. Cinta Lingkungan',
    category: 'Tanda Cinta',
    badgeColor: 'teal',
    description:
      'Memandang alam semesta sebagai tajalli (manifestasi) cinta Allah yang harus dirawat dengan prinsip tawaazun (keseimbangan) serta menjauhi fasad (kerusakan) dan ishraf (pemborosan).',
    quranHadisRef: 'QS. Al-A’raf: 56, QS. Ar-Rum: 41, QS. Fushshilat: 53',
    contohInsersi: [
      'Islam sebagai rahmatan lil ‘alamin (rahmat bagi semesta alam)',
      'Ekoteologi: memuliakan alam sebagai ayat kauniyah Allah',
      'Menjauhi perusakan alam (fasad) dan pemborosan air/energi (larangan tabdzir/ishraf)',
      'Praktik thaharah dan aksi nyata konservasi lingkungan madrasah',
    ],
  },
  {
    id: 'Cinta Diri dan Sesama Manusia',
    name: '4. Cinta Diri dan Sesama Manusia',
    category: 'Tali Cinta',
    badgeColor: 'purple',
    description:
      'Menumbuhkan self-compassion dan kesehatan mental, serta membangun persaudaraan (Ukhuwah Islamiyah & Insaniyah), empati sosial, dan madrasah ramah anak tanpa kekerasan/perundungan.',
    quranHadisRef: 'QS. Al-Hujurat: 10, QS. Ali Imran: 159',
    contohInsersi: [
      'Self-compassion & Social Emotional Skills (SES) untuk kesehatan mental diri',
      'Ukhuwah Islamiyah (persaudaraan seagama) dan Ukhuwah Insaniyah (kemanusiaan universal)',
      'Akhlak terpuji: ta’awun (tolong-menolong), tasamuh (toleransi), tafahum, tawadhu',
      '7 Jurus Cegah & Tangani Bullying (Madrasah Ramah Anak / Happy Tanpa Bully)',
    ],
  },
  {
    id: 'Cinta Tanah Air',
    name: '5. Cinta Tanah Air',
    category: 'Tali Cinta',
    badgeColor: 'rose',
    description:
      'Menanamkan semangat patriotisme dan kebangsaan (Hubbul Wathan minal Iman), merawat kebinekaan Indonesia, serta berkontribusi nyata bagi kedaulatan dan kemajuan bangsa.',
    quranHadisRef: 'QS. Al-Hujurat: 13, Prinsip Ukhuwah Wathaniyah',
    contohInsersi: [
      'Ukhuwah Wathaniyah (persaudaraan sebangsa dan setanah air)',
      'Konsep cinta tanah air dalam Islam: Hubbul Wathan minal Iman',
      'Menghormati keragaman suku, bahasa, adat, dan agama dalam Bhinneka Tunggal Ika',
      'Bela negara melalui karya inovatif dan kontribusi positif untuk peradaban',
    ],
  },
];

export interface PresetTP {
  id: string;
  jenjang: 'MI' | 'MTs' | 'MA' | 'RA' | 'UMUM';
  kategori: 'PAI & Bahasa Arab' | 'Mata Pelajaran Umum';
  mapel: string;
  kelas: string;
  fase: string;
  waktu: string;
  topik: string;
  tujuanPembelajaran: string;
  modelPembelajaran: string;
  metodeSpesifik?: string;
  profilPancasila: string[];
  pancaCinta: string[];
  materiInsersi: string[];
}

export const KURIKULUM_PRESETS: PresetTP[] = [
  // 1. MI - Fikih (From Document Official Example: Fikih Wudu Hemat Air)
  {
    id: 'mi-fikih-wudhu-kbc',
    jenjang: 'MI',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Fikih',
    kelas: 'Kelas 4 (Fase B MI)',
    fase: 'Fase B',
    waktu: '2 JP (2 x 35 Menit)',
    topik: 'Wudu Hemat Air Sesuai Sunnah Rasulullah saw.',
    tujuanPembelajaran:
      'Murid dapat melaksanakan wudu sesuai syarat dan rukun dengan mempraktikkan gaya hidup hemat air ala Rasulullah saw. (satu mud / 0,5 liter), serta menghindari perilaku tabdzir/ishraf sebagai wujud cinta kepada Allah Swt., Rasul-Nya, dan kelestarian lingkungan.',
    modelPembelajaran: 'Project-Based Learning (Alur FIDS: Feel, Imagine, Do, Share)',
    metodeSpesifik: 'Eksperimen wudu botol mineral, kampanye video hemat air, refleksi syukur',
    profilPancasila: ['Beriman & Bertakwa', 'Bernalar Kritis', 'Gotong Royong'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Lingkungan'],
    materiInsersi: [
      'Mensyukuri nikmat air bersih dari Allah Swt. dalam perilaku sehari-hari',
      'Mempraktikkan sifat Rasulullah saw.: hemat dan tidak boros saat bersuci',
      'Praktik thaharah ramah lingkungan (larangan ishraf dan tabdzir)',
    ],
  },

  // 2. MI - IPAS (From Document Official Example: Ekosistem Ciptaan Allah)
  {
    id: 'mi-ipas-ekosistem-kbc',
    jenjang: 'MI',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
    kelas: 'Kelas 5 (Fase C MI)',
    fase: 'Fase C',
    waktu: '2 JP (2 x 35 Menit)',
    topik: 'Keseimbangan Ekosistem Sebagai Wujud Rahmat Ilahi',
    tujuanPembelajaran:
      'Peserta didik mampu menjelaskan hubungan antarkomponen biotik dan abiotik dalam ekosistem, menyadari sunnatullah keteraturan alam, serta merancang aksi nyata pelestarian lingkungan sekitar madrasah sebagai bentuk cinta kepada Allah Swt. dan sesama makhluk.',
    modelPembelajaran: 'Discovery Learning',
    metodeSpesifik: 'Observasi kebun madrasah, simulasi rantai makanan, pembuatan poster anti-pencemaran',
    profilPancasila: ['Beriman & Bertakwa', 'Bernalar Kritis', 'Kreatif'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Lingkungan', 'Cinta Ilmu'],
    materiInsersi: [
      'Keimanan dan ketakwaan kepada Allah Swt. sebagai pencipta keharmonisan alam',
      'Adab pada alam dan menjauhi perbuatan merusak (fasad di darat dan laut)',
      'Ekoteologi: memandang alam sebagai ayat kauniyah yang mencerminkan cinta Ilahi',
    ],
  },

  // 3. MI - Akidah Akhlak (Adab & Cinta Diri/Sesama)
  {
    id: 'mi-akidah-akhlak-kasihsayang',
    jenjang: 'MI',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Akidah Akhlak',
    kelas: 'Kelas 2 (Fase A MI)',
    fase: 'Fase A',
    waktu: '2 JP (2 x 35 Menit)',
    topik: 'Asmaul Husna Ar-Rahman & Ar-Rahim dalam Persaudaraan Kelas',
    tujuanPembelajaran:
      'Peserta didik mampu mengenal dan meneladani Asmaul Husna Ar-Rahman dan Ar-Rahim melalui pembiasaan saling menyayangi teman, berbicara santun, menjaga kebersihan diri, dan menolong teman tanpa membeda-bedakan.',
    modelPembelajaran: 'Experiential Learning (Alur ARKA: Aktivitas, Refleksi, Konsep, Aplikasi)',
    metodeSpesifik: 'Storytelling kisah nabi, pohon kebaikan kelas, bermain peran empati',
    profilPancasila: ['Beriman & Bertakwa', 'Mandiri', 'Bergotong Royong'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Diri dan Sesama Manusia'],
    materiInsersi: [
      'Meneladani sifat Jamaliyah Allah Maha Pengasih dan Penyayang',
      'Pola hidup bersih dan sehat sebagai bentuk rasa sayang pada tubuh',
      'Ukhuwah insaniyah: adab kepada orang tua, guru, dan teman sebaya',
    ],
  },

  // 4. MTs - Bahasa Arab (From Document Official Example: Alam & Isim Mausul)
  {
    id: 'mts-bahasa-arab-alam-kbc',
    jenjang: 'MTs',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Bahasa Arab',
    kelas: 'Kelas 8 (Fase D MTs)',
    fase: 'Fase D',
    waktu: '3 JP (3 x 40 Menit)',
    topik: 'Keindahan Alam Semesta (خالق العالم) dan Tata Bahasa Isim Mausul',
    tujuanPembelajaran:
      'Peserta didik mampu mengomunikasikan ide secara tertulis dan lisan melalui paragraf terstruktur tentang keindahan alam dengan susunan gramatikal Isim Mausul (الذي، التي، الذين), serta mengekspresikan kekaguman kepada Allah Al-Khaliq dan komitmen menjaga kelestarian bumi.',
    modelPembelajaran: 'Project-Based Learning (PjBL)',
    metodeSpesifik: 'Menyimak audio qira\'ah, analisis kaidah isim mausul, pembuatan vlog pendek peduli alam',
    profilPancasila: ['Beriman & Bertakwa', 'Bernalar Kritis', 'Kreatif'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Ilmu', 'Cinta Lingkungan'],
    materiInsersi: [
      'Hubungan Khaliq dan Makhluk: merenungkan kebesaran Allah melalui ayat-ayat kauniyah',
      'Larangan merusak alam (QS. Ar-Rum: 41) dipadukan dengan ekspresi Bahasa Arab',
      'Bahasa Arab sebagai sarana memperdalam cinta ilmu agama dan peradaban',
    ],
  },

  // 5. MTs - Bahasa Indonesia (From Document Official Example: Teks Eksplanasi Gempa Bumi)
  {
    id: 'mts-b-indo-eksplanasi-kbc',
    jenjang: 'MTs',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'Bahasa Indonesia',
    kelas: 'Kelas 8 (Fase D MTs)',
    fase: 'Fase D',
    waktu: '2 JP (2 x 40 Menit)',
    topik: 'Teks Eksplanasi Fenomena Alam dan Renungan Cinta Ilahi',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis gagasan, struktur kausalitas, dan ciri kebahasaan teks eksplanasi tentang fenomena alam (gempa bumi/tsunami), serta meresapi kebesaran Allah Swt. dan menumbuhkan rasa empati sosial untuk menolong korban bencana.',
    modelPembelajaran: 'Model LOK-R (Literasi, Orientasi, Kolaborasi, Refleksi)',
    metodeSpesifik: 'Membaca kritis teks komparasi, diskusi kelompok acak, jurnal refleksi kebencanaan',
    profilPancasila: ['Bernalar Kritis', 'Bergotong Royong', 'Beriman & Bertakwa'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Ilmu', 'Cinta Diri dan Sesama Manusia'],
    materiInsersi: [
      'Melihat bencana alam sebagai sarana muhasabah dan mendekatkan diri kepada Allah',
      'Pilar cinta ilmu: menalar sebab-akibat ilmiah fenomena tektonik dan vulkanik',
      'Empati kemanusiaan (ta\'awun) dalam aksi mitigasi bencana dan solidaritas sesama',
    ],
  },

  // 6. MTs - IPA Terpadu (Sains Berbasis Cinta Semesta / Sympathea)
  {
    id: 'mts-ipa-ekosistem-kbc',
    jenjang: 'MTs',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'IPA Terpadu',
    kelas: 'Kelas 7 (Fase D MTs)',
    fase: 'Fase D',
    waktu: '3 JP (3 x 40 Menit)',
    topik: 'Interaksi Ekosistem, Jaring Makanan, dan Sympathea Kosmis',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis interkoneksi antarkomponen biotik dan abiotik dalam jaring-jaring makanan, memahami konsep sympathea (saling keterhubungan ciptaan Allah), serta merancang kampanye konservasi hayati madrasah.',
    modelPembelajaran: 'Problem-Based Learning (PBL)',
    metodeSpesifik: 'Audit ekologi madrasah, simulasi dampak kepunahan spesies, pembuatan infografis digital',
    profilPancasila: ['Bernalar Kritis', 'Kreatif', 'Bergotong Royong'],
    pancaCinta: ['Cinta Ilmu', 'Cinta Lingkungan', 'Cinta Allah dan Rasul-Nya'],
    materiInsersi: [
      'Konsep Sympathea: seluruh ciptaan Allah saling bertaut dalam kesatuan harmonis',
      'Sains bukan sekadar rumus hafalan, melainkan jalan menuju kebijaksanaan dan cinta Ilahi',
      'Menghindari fasad dan eksploitasi alam yang melanggar tawaazun (keseimbangan kosmis)',
    ],
  },

  // 7. MA - Akidah Akhlak (From Document Official Example: Menghindari Fitnah & Namimah)
  {
    id: 'ma-akidah-akhlak-fitnah-kbc',
    jenjang: 'MA',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Akidah Akhlak',
    kelas: 'Kelas 11 (Fase F MA)',
    fase: 'Fase F',
    waktu: '2 JP (2 x 45 Menit)',
    topik: 'Menghindari Fitnah & Namimah Demi Merawat Cinta Sesama',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis bahaya akhlak tercela fitnah dan namimah (adu domba) berdasarkan dalil naqli, serta merancang strategi komunikasi welas asih (compassionate communication) demi menjaga ukhuwah Islamiyah, ukhuwah wathaniyah, dan ukhuwah insaniyah.',
    modelPembelajaran: 'Cooperative Learning',
    metodeSpesifik: 'Analisis studi kasus berita hoaks media sosial, role-play mediasi konflik, deklarasi anti-bullying',
    profilPancasila: ['Beriman & Bertakwa', 'Bernalar Kritis', 'Berkebinekaan Global'],
    pancaCinta: ['Cinta Diri dan Sesama Manusia', 'Cinta Tanah Air', 'Cinta Allah dan Rasul-Nya'],
    materiInsersi: [
      'Komunikasi welas asih: mengutamakan koneksi sebelum koreksi',
      'Ukhuwah Islamiyah & Insaniyah: menjaga kehormatan dan martabat setiap manusia',
      '7 Jurus Cegah Bullying & Fitnah di lingkungan madrasah dan media digital',
    ],
  },

  // 8. MA - Al-Qur'an Hadis (Ilmu Al-Qur'an & Kemukjizatan)
  {
    id: 'ma-quran-hadis-mukjizat-kbc',
    jenjang: 'MA',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Al-Qur’an Hadis',
    kelas: 'Kelas 10 (Fase E MA)',
    fase: 'Fase E',
    waktu: '2 JP (2 x 45 Menit)',
    topik: 'Kemukjizatan Al-Qur’an dan Spirit Cinta Ilmu Pengetahuan',
    tujuanPembelajaran:
      'Peserta didik mampu memahami aspek-aspek kemukjizatan Al-Qur’an (I’jaz Al-Qur’an) baik dari segi keindahan bahasa maupun kesesuaiannya dengan sains modern, menumbuhkan gairah menuntut ilmu (Cinta Ilmu), serta membiasakan tadabbur ayat qauliyah dan kauniyah.',
    modelPembelajaran: 'Inquiry Learning',
    metodeSpesifik: 'Kajian ayat saintifik Al-Qur\'an, komparasi tafsir klasik dan modern, presentasi kelompok',
    profilPancasila: ['Beriman & Bertakwa', 'Bernalar Kritis', 'Mandiri'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Ilmu'],
    materiInsersi: [
      'Pilar pencari ilmu: niat ikhlas, wara’, tekun, tawakal, yakin, dan syukur',
      'Al-Qur’an sebagai mukjizat cinta Allah yang membimbing peradaban manusia',
      'Adab penghafal dan pengkaji Al-Qur\'an dalam kehidupan sosial',
    ],
  },

  // 9. MA - Sejarah Kebudayaan Islam (SKI)
  {
    id: 'ma-ski-dakwah-madinah-kbc',
    jenjang: 'MA',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Sejarah Kebudayaan Islam (SKI)',
    kelas: 'Kelas 10 (Fase E MA)',
    fase: 'Fase E',
    waktu: '2 JP (2 x 45 Menit)',
    topik: 'Piagam Madinah: Teladan Rasulullah dalam Merajut Cinta Kebinekaan',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis substansi Piagam Madinah sebagai konstitusi modern pertama yang menjamin toleransi antarumat beragama, serta meneladani kepemimpinan berbasis cinta (servant leadership) Rasulullah saw. untuk merawat persatuan bangsa Indonesia.',
    modelPembelajaran: 'Problem-Based Learning (PBL)',
    metodeSpesifik: 'Bedah naskah Piagam Madinah, refleksi toleransi kebangsaan, deklarasi kerukunan',
    profilPancasila: ['Berkebinekaan Global', 'Beriman & Bertakwa', 'Bernalar Kritis'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Diri dan Sesama Manusia', 'Cinta Tanah Air'],
    materiInsersi: [
      'Ukhuwah Wathaniyah: meneladani persaudaraan Muhajirin-Anshar dan perlindungan terhadap kaum minoritas',
      'Servant Leadership: kepemimpinan Rasulullah yang melayani dengan kelembutan dan keadilan',
      'Penerapan tasamuh (toleransi) dan syura (musyawarah) dalam masyarakat majemuk',
    ],
  },

  // 10. MA - Sejarah Indonesia (Cinta Tanah Air & Perjuangan Pahlawan)
  {
    id: 'ma-sejarah-pahlawan-kbc',
    jenjang: 'MA',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'Sejarah',
    kelas: 'Kelas 11 (Fase F MA)',
    fase: 'Fase F',
    waktu: '2 JP (2 x 45 Menit)',
    topik: 'Perjuangan Ulama dan Santri dalam Mempertahankan Kemerdekaan Indonesia',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis peran diplomasi dan jihad kebangsaan para tokoh ulama Nusantara (Resolusi Jihad) dalam mempertahankan proklamasi kemerdekaan Republik Indonesia, serta menginternalisasi nilai Hubbul Wathan minal Iman sebagai pemuda madrasah penerus bangsa.',
    modelPembelajaran: 'Discovery & Project Learning',
    metodeSpesifik: 'Kunjungan digital museum sejarah, analisis arsip Resolusi Jihad, penulisan esai reflektif',
    profilPancasila: ['Beriman & Bertakwa', 'Berkebinekaan Global', 'Bernalar Kritis'],
    pancaCinta: ['Cinta Tanah Air', 'Cinta Diri dan Sesama Manusia', 'Cinta Ilmu'],
    materiInsersi: [
      'Hubbul Wathan minal Iman: cinta tanah air sebagai kewajiban moral dan keagamaan',
      'Meneladani ketulusan dan pengorbanan para syuhada dan pahlawan bangsa',
      'Merawat kemerdekaan dengan karya positif, persatuan nasional, dan toleransi sosial',
    ],
  },

  // 11. RA - Raudhatul Athfal (From Document Official Example: Buah Ciptaan Allah)
  {
    id: 'ra-kebutuhan-buah-kbc',
    jenjang: 'RA',
    kategori: 'PAI & Bahasa Arab',
    mapel: 'Pendidikan Anak Usia Dini (RA)',
    kelas: 'RA / TK (Fase Fondasi)',
    fase: 'Fase Fondasi',
    waktu: '2 x 30 Menit',
    topik: 'Kebutuhan Tubuhku & Buah-Buahan Ciptaan Allah Swt.',
    tujuanPembelajaran:
      'Anak dapat mengenal benda dan makanan bergizi ciptaan Allah Swt. di sekitarnya, terbiasa berbagi bersama teman dari berbagai latar belakang, serta bersyukur dengan makan menggunakan tangan kanan dan posisi duduk.',
    modelPembelajaran: 'Pembelajaran Berbasis Main & Loose Parts',
    metodeSpesifik: 'Eksplorasi sensorik 54321, membuat toko buah mini, bermain peran, membuat olahan pisang sehat',
    profilPancasila: ['Beriman & Bertakwa', 'Mandiri', 'Bergotong Royong'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Diri dan Sesama Manusia', 'Cinta Lingkungan'],
    materiInsersi: [
      'Mengenal tanda cinta Allah melalui rasa manis buah-buahan ciptaan-Nya',
      'Adab makan dan minum sesuai sunnah Rasulullah saw.',
      'Saling menyayangi, berbagi makanan, dan bekerja sama tanpa bertengkar',
    ],
  },

  // 12. MI - PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan - Kebugaran Jasmani & Cinta Diri)
  {
    id: 'mi-pjok-kebugaran-kbc',
    jenjang: 'MI',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
    kelas: 'Kelas 4 (Fase B MI)',
    fase: 'Fase B',
    waktu: '3 JP (3 x 35 Menit)',
    topik: 'Aktivitas Kebugaran Jasmani & Merawat Amanah Tubuh Sehat',
    tujuanPembelajaran:
      'Peserta didik mampu mempraktikkan berbagai aktivitas kebugaran jasmani (daya tahan jantung, kelenturan, dan kekuatan otot) dengan suasana gembira (joyful), memahami bahwa tubuh sehat dan kuat adalah nikmat dan amanah cinta dari Allah Swt. (Cinta Diri), serta menumbuhkan sportivitas, sikap saling menyemangati, dan menolak perundungan/bullying (Cinta Sesama).',
    modelPembelajaran: 'Alur ARKA (Aktivitas, Refleksi, Konsep, Aplikasi - KBC)',
    metodeSpesifik: 'Sirkuit kebugaran pos ceria, senam kesadaran gerak (mindful movement), kartu tantangan kebaikan',
    profilPancasila: ['Beriman & Bertakwa', 'Mandiri', 'Bergotong Royong'],
    pancaCinta: ['Cinta Allah dan Rasul-Nya', 'Cinta Diri dan Sesama Manusia'],
    materiInsersi: [
      'Mukmin yang kuat lebih dicintai Allah daripada mukmin yang lemah (HR. Muslim)',
      'Menjaga kesehatan tubuh (hifzhun nafs) sebagai wujud syukur atas anugerah Allah Swt.',
      'Adab berolahraga Islami: menutup aurat, saling tolong (ta\'awun), tidak mencemooh bentuk tubuh teman (body shaming)',
    ],
  },

  // 13. MTs/MA - PJOK (Permainan Bola Besar: Sportivitas & Ukhuwah)
  {
    id: 'mts-pjok-bolabesar-kbc',
    jenjang: 'MTs',
    kategori: 'Mata Pelajaran Umum',
    mapel: 'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
    kelas: 'Kelas 8 (Fase D MTs)',
    fase: 'Fase D',
    waktu: '3 JP (3 x 40 Menit)',
    topik: 'Permainan Bola Voli / Sepak Bola: Kerjasama (Ta\'awun) dan Sportivitas Welas Asih',
    tujuanPembelajaran:
      'Peserta didik mampu menganalisis dan mempraktikkan keterampilan gerak spesifik (passing dan controlling) permainan bola besar dalam situasi permainan modifikasi, menunjukkan pengendalian diri (self-regulation) dari amarah (ghadhab), menjunjung tinggi kejujuran dan sportivitas, serta mempererat persaudaraan (ukhuwah) di lapangan.',
    modelPembelajaran: 'Cooperative Learning & Alur FIDS (Feel, Imagine, Do, Share)',
    metodeSpesifik: 'Game simulasi fair play, refleksi emosi pasca tanding, deklarasi pemain berkarakter welas asih',
    profilPancasila: ['Bergotong Royong', 'Bernalar Kritis', 'Beriman & Bertakwa'],
    pancaCinta: ['Cinta Diri dan Sesama Manusia', 'Cinta Tanah Air'],
    materiInsersi: [
      'Prinsip sportivitas dalam Islam: kejujuran, lapang dada, dan tidak mencederai lawan',
      'Ta\'awun (kerjasama tim) untuk mencapai tujuan kebaikan bersama',
      'Mengendalikan emosi amarah (la taghdhab walakal jannah) dan membangun komunikasi santun di lapangan',
    ],
  },
];

export const MODEL_PEMBELAJARAN_LIST = [
  'Problem-Based Learning (PBL)',
  'Project-Based Learning (PjBL)',
  'Alur FIDS (Feel, Imagine, Do, Share - KBC)',
  'Alur ARKA (Aktivitas, Refleksi, Konsep, Aplikasi - KBC)',
  'Pembelajaran Mendalam (Mindful, Meaningful, Joyful)',
  'Discovery Learning',
  'Inquiry Learning',
  'Model LOK-R (Literasi, Orientasi, Kolaborasi, Refleksi)',
  'Cooperative Learning (STAD / Jigsaw / TGT)',
  'Pembelajaran Berdiferensiasi (Konten, Proses, Produk)',
  'Teaching at the Right Level (TaRL)',
];

export const JENJANG_MADRASAH_LIST = [
  { id: 'MI', label: 'Madrasah Ibtidaiyah (MI)', desc: 'Setara SD (Kelas 1 - 6)' },
  { id: 'MTs', label: 'Madrasah Tsanawiyah (MTs)', desc: 'Setara SMP (Kelas 7 - 9)' },
  { id: 'MA', label: 'Madrasah Aliyah (MA / MAK)', desc: 'Setara SMA / SMK (Kelas 10 - 12)' },
  { id: 'RA', label: 'Raudhatul Athfal (RA)', desc: 'Setara PAUD / TK (Fase Fondasi)' },
  { id: 'SEKOLAH_UMUM', label: 'Sekolah Umum (SD / SMP / SMA)', desc: 'Kemendikbudristek' },
];

export const KELAS_BY_JENJANG: Record<string, string[]> = {
  MI: [
    'Kelas 1 (Fase A MI)',
    'Kelas 2 (Fase A MI)',
    'Kelas 3 (Fase B MI)',
    'Kelas 4 (Fase B MI)',
    'Kelas 5 (Fase C MI)',
    'Kelas 6 (Fase C MI)',
  ],
  MTs: [
    'Kelas 7 (Fase D MTs)',
    'Kelas 8 (Fase D MTs)',
    'Kelas 9 (Fase D MTs)',
  ],
  MA: [
    'Kelas 10 (Fase E MA)',
    'Kelas 11 (Fase F MA)',
    'Kelas 12 (Fase F MA)',
  ],
  RA: [
    'RA Kelompok A (Usia 4-5 Tahun / Fase Fondasi)',
    'RA Kelompok B (Usia 5-6 Tahun / Fase Fondasi)',
  ],
  SEKOLAH_UMUM: [
    'Kelas 1 (Fase A SD)',
    'Kelas 4 (Fase B SD)',
    'Kelas 7 (Fase D SMP)',
    'Kelas 10 (Fase E SMA)',
    'Kelas 11 (Fase F SMA)',
  ],
};

export const MAPEL_BY_JENJANG: Record<string, { pai: string[]; umum: string[] }> = {
  MI: {
    pai: [
      'Al-Qur’an Hadis',
      'Akidah Akhlak',
      'Fikih',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab',
    ],
    umum: [
      'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
      'IPAS (Ilmu Pengetahuan Alam dan Sosial)',
      'Matematika',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Pendidikan Pancasila (PPKn)',
      'Seni Rupa / Seni Musik / Seni Tari',
    ],
  },
  MTs: {
    pai: [
      'Al-Qur’an Hadis',
      'Akidah Akhlak',
      'Fikih',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab',
    ],
    umum: [
      'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
      'IPA Terpadu',
      'IPS Terpadu',
      'Matematika',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Pendidikan Pancasila (PPKn)',
      'Informatika',
      'Seni Budaya',
      'Prakarya',
    ],
  },
  MA: {
    pai: [
      'Al-Qur’an Hadis',
      'Akidah Akhlak',
      'Fikih',
      'Sejarah Kebudayaan Islam (SKI)',
      'Bahasa Arab',
      'Ilmu Tafsir (Peminatan Keagamaan)',
      'Ilmu Hadis (Peminatan Keagamaan)',
      'Ushul Fikih (Peminatan Keagamaan)',
      'Bahasa Arab Peminatan',
    ],
    umum: [
      'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
      'Matematika (Umum / Tingkat Lanjut)',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Pendidikan Pancasila (PPKn)',
      'Biologi',
      'Fisika',
      'Kimia',
      'Informatika',
      'Ekonomi',
      'Sosiologi',
      'Geografi',
      'Sejarah',
      'Seni Budaya',
    ],
  },
  RA: {
    pai: [
      'Nilai Agama dan Budi Pekerti (KBC)',
      'Al-Qur’an Hadis Sederhana & Kisah Nabi',
      'Doa Harian & Asmaul Husna',
    ],
    umum: [
      'Jati Diri & Motorik Kasar (PJOK Usia Dini - KBC)',
      'Dasar-dasar Literasi, Sains, Teknologi, Rekayasa, dan Seni (STEAM)',
    ],
  },
  SEKOLAH_UMUM: {
    pai: ['Pendidikan Agama dan Budi Pekerti'],
    umum: [
      'PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan)',
      'IPAS',
      'IPA Terpadu',
      'IPS Terpadu',
      'Matematika',
      'Bahasa Indonesia',
      'Bahasa Inggris',
      'Pendidikan Pancasila',
      'Informatika',
      'Biologi',
      'Fisika',
      'Kimia',
    ],
  },
};

export const DIMENSI_PANCASILA = [
  { id: 'Beriman & Bertakwa', label: 'Beriman, Bertakwa kepada Tuhan YME, & Berakhlak Mulia', color: 'emerald' },
  { id: 'Berkebinekaan Global', label: 'Berkebinekaan Global', color: 'blue' },
  { id: 'Bergotong Royong', label: 'Bergotong Royong', color: 'amber' },
  { id: 'Mandiri', label: 'Mandiri', color: 'purple' },
  { id: 'Bernalar Kritis', label: 'Bernalar Kritis', color: 'cyan' },
  { id: 'Kreatif', label: 'Kreatif', color: 'pink' },
];
