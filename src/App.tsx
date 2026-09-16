import { useEffect, useState, type ReactNode } from 'react';
import { Activity, ArrowLeft, ArrowRight, Bell, Calendar, CalendarDays, Check, CheckCircle, ChevronDown, CircleHelp, ClipboardCheck, Clock, Clock3, HeartPulse, Home, Menu, MessageCircle, Pill, Plus, Search, ShieldAlert, Star, Stethoscope, Trash2, User, Utensils, X } from 'lucide-react';

type Diagnosis = { id: string; name: string; icon: typeof Activity; color: string; definition: string; symptoms: string[]; warning: string[]; medication: string[]; diet: string[]; activity: string[]; checklist: string[]; quiz: { q: string; options: string[]; answer: number }[] };

const diagnoses: Diagnosis[] = [
  {
    id: 'diabetes',
    name: 'Diabetes Melitus',
    icon: Activity,
    color: 'green',
    definition: 'Diabetes Melitus adalah kondisi kronis yang ditandai dengan tingginya kadar gula darah (glukosa) akibat tubuh tidak dapat memproduksi atau menggunakan insulin secara efektif.',
    symptoms: [
      '3P: Polidipsi (sering haus), Polifagi (sering lapar), Poliuri (sering kencing terutama malam hari)',
      'Berat badan turun drastis tanpa alasan jelas',
      'Luka sulit sembuh, lemas, dan penglihatan kabur'
    ],
    warning: [
      'Gula darah sangat tinggi (>300 mg/dL) atau sangat rendah (<70 mg/dL / Hipoglikemia: keringat dingin, gemetar, pusing, pingsan)',
      'Ada luka baru yang membusuk atau berbau'
    ],
    medication: [
      'Patuhi jadwal minum obat antidiabetes oral (misal: Metformin, Glibenklamid) atau penyuntikan Insulin sesuai resep dokter.',
      'Jangan menghentikan atau mengubah dosis obat tanpa konsultasi medis.',
      'Untuk pengguna insulin, ketahui teknik menyuntik dan area rotasi penyuntikan yang benar (perut, paha, atau lengan atas).'
    ],
    diet: [
      'Terapkan prinsip 3J (Jadwal, Jumlah, Jenis):',
      '• Jadwal: Makan teratur (3 kali makan besar, 2–3 kali selingan).',
      '• Jumlah: Porsi makan tidak berlebihan sesuai kebutuhan kalori.',
      '• Jenis: Hindari gula murni, sirup, kue manis, dan minuman kemasan. Pilih karbohidrat kompleks (nasi merah, gandum, oatmeal), perbanyak serat (sayur dan buah rendah gula).',
      'Batasi asupan garam dan lemak jenuh.'
    ],
    activity: [
      'Olahraga teratur 3–5 kali seminggu selama 30 menit (seperti jalan kaki, senam DM, bersepeda santai).',
      'Gunakan alas kaki yang empuk dan tidak sempit setiap kali beraktivitas (di dalam maupun luar rumah) untuk mencegah luka pada kaki.',
      'Periksa kaki setiap hari dari kemerahan, lecet, atau luka.'
    ],
    checklist: [
      'Saya mengetahui kondisi penyakit Diabetes Melitus dan tanda bahayanya.',
      'Saya mengetahui jenis, dosis, serta jadwal minum obat / suntik insulin.',
      'Saya memahami aturan diet 3J (Jadwal, Jumlah, Jenis).',
      'Saya memahami aktivitas fisik yang dianjurkan dan pentingnya perawatan kaki.',
      'Saya mengetahui jadwal dan lokasi kontrol ulang.'
    ],
    quiz: [
      {
        q: 'Apa tindakan pertama yang harus dilakukan jika pasien DM mengalami gejala hipoglikemia (keringat dingin, gemetar, pusing)?',
        options: ['Langsung tidur dan beristirahat', 'Mengonsumsi air gula manis atau teh manis segera', 'Menyuntikkan insulin tambahan', 'Meminum obat DM dua kali lipat'],
        answer: 1
      },
      {
        q: 'Manakah prinsip diet yang tepat untuk penderita Diabetes Melitus?',
        options: ['Mengurangi minum air putih', 'Menghindari makan pagi', 'Menerapkan aturan 3J (Jadwal, Jumlah, Jenis)', 'Bebas mengonsumsi minuman kemasan bergula'],
        answer: 2
      },
      {
        q: 'Mengapa penderita DM dianjurkan untuk selalu menggunakan alas kaki?',
        options: ['Supaya tidak kedinginan', 'Untuk mencegah timbulnya luka/cedera pada kaki yang sulit sembuh', 'Supaya kaki tidak cepat pegal', 'Hanya formalitas saat keluar rumah'],
        answer: 1
      }
    ]
  },
  {
    id: 'ginjal',
    name: 'Chronic Kidney Disease (Gagal Ginjal Kronis)',
    icon: Activity,
    color: 'cyan',
    definition: 'CKD adalah penurunan fungsi ginjal secara bertahap dalam jangka waktu lama, sehingga ginjal tidak mampu menyaring limbah dan cairan berlebih dari darah secara optimal.',
    symptoms: [
      'Kaki/wajah bengkak, sesak napas, mual/muntah',
      'Nafsu makan turun, kulit gatal',
      'Jumlah urine berkurang'
    ],
    warning: [
      'Sesak napas berat',
      'Bengkak semakin memburuk di seluruh tubuh',
      'Penurunan kesadaran / kesadaran menurun',
      'Tidak bisa buang air kecil sama sekali'
    ],
    medication: [
      'Konsumsi obat sesuai resep (seperti obat tekanan darah, pengikat fosfat, penambah darah/eritropoietin).',
      'PERINGATAN: Hindari obat anti-nyeri golongan NSAID (seperti Asam Mefenamat, Ibuprofen) dan jamu/herbal tanpa persetujuan dokter karena dapat merusak ginjal lebih lanjut.'
    ],
    diet: [
      'Pembatasan Cairan: Minum air sesuai dengan instruksi dokter/perawat (biasanya jumlah urine 24 jam + 500 mL).',
      'Rendah Protein & Natrium: Batasi asupan garam dan makanan berprotein tinggi (disesuaikan apakah pasien sudah hemodialisis/cuci darah atau belum).',
      'Batasi Makanan Tinggi Kalium & Fosfat: Batasi pisang, alpukat, kurma, air kelapa, serta jeroan dan produk susu berlebih.'
    ],
    activity: [
      'Lakukan aktivitas fisik ringan hingga sedang yang tidak memicu kelelahan berlebih (seperti jalan santai atau rentang gerak ringan).',
      'Hindari mengangkat beban berat atau olahraga berat.',
      'Istirahat yang cukup (7–8 jam sehari).'
    ],
    checklist: [
      'Saya memahami kondisi CKD dan pentingnya menjaga fungsi ginjal.',
      'Saya paham aturan pembatasan cairan harian yang diperbolehkan.',
      'Saya tahu obat-obatan yang harus diminum dan obat yang pantang dikonsumsi tanpa resep.',
      'Saya memahami diet rendah garam, kalium, dan pembatasan protein.',
      'Saya tahu jadwal kontrol dan/atau lokasi jadwal hemodialisis (jika rutin cuci darah).'
    ],
    quiz: [
      {
        q: 'Mengapa penderita CKD perlu membatasi asupan cairan minum harian?',
        options: ['Agar tidak cepat merasa lapar', 'Karena ginjal tidak mampu mengeluarkan kelebihan cairan sehingga berisiko bengkak dan sesak napas', 'Supaya obat bekerja lebih cepat', 'Tidak ada alasan khusus'],
        answer: 1
      },
      {
        q: 'Golongan obat/bahan apa yang HARUS DIHINDARI oleh penderita CKD tanpa resep dokter?',
        options: ['Obat peningkat sel darah merah', 'Obat darah tinggi dari dokter', 'Obat anti-nyeri sembarangan dan jamu herbal', 'Vitamin sesuai anjuran dokter'],
        answer: 2
      },
      {
        q: 'Manakah dari tanda berikut yang merupakan Tanda Bahaya pada pasien CKD dan harus segera ke RS?',
        options: ['Merasa sedikit mengantuk di malam hari', 'Sesak napas berat dan pembengkakan tubuh meluas', 'Berat badan stabil', 'Nafsu makan membaik'],
        answer: 1
      }
    ]
  },
  {
    id: 'jantung',
    name: 'Congestive Heart Failure (Gagal Jantung)',
    icon: HeartPulse,
    color: 'red',
    definition: 'CHF adalah kondisi di mana jantung tidak mampu memompa darah secara efektif untuk memenuhi kebutuhan oksigen dan nutrisi tubuh.',
    symptoms: [
      'Sesak napas (terutama saat berbaring atau beraktivitas)',
      'Cepat lelah, kaki/pergelangan kaki bengkak',
      'Timbul batuk di malam hari'
    ],
    warning: [
      'Sesak napas hebat tiba-tiba (harus duduk agar bisa bernapas)',
      'Nyeri dada menjalar',
      'Bibir/kuku kebiruan',
      'Peningkatan berat badan mendadak (>2 kg dalam 2 hari)'
    ],
    medication: [
      'Obat pemacu jantung, penurun tekanan darah, dan obat pelebar pembuluh darah harus diminum teratur.',
      'Obat Diuretik (Pelancar Kencing): Diminum pagi/siang hari (agar tidak mengganggu tidur malam) untuk membantu membuang kelebihan cairan dalam tubuh.'
    ],
    diet: [
      'Diet Rendah Garam (Rendah Natrium): Maksimal 1 sendok teh garam per hari (termasuk garam dalam masakan/makanan kemasan).',
      'Pembatasan Cairan: Batasi asupan cairan total (minum, kuah sup, es) sesuai instruksi dokter (biasanya 1,5–2 liter per hari).',
      'Hindari makanan olahan, kalengan, dan makanan cepat saji yang tinggi natrium.'
    ],
    activity: [
      'Timbang berat badan setiap pagi setelah buang air kecil (sebelum makan) untuk memantau penumpukan cairan.',
      'Olahraga ringan bergradasi (jalan kaki singkat) sesuai toleransi tubuh.',
      'Hentikan aktivitas jika merasa sesak, pusing, nyeri dada, atau jantung berdebar kencang. Istirahat dengan posisi kepala/punggung ditinggikan (pakai 2–3 bantal).'
    ],
    checklist: [
      'Saya memahami kondisi gagal jantung dan penyebab munculnya sesak/bengkak.',
      'Saya mengetahui cara penimbangan berat badan harian dan batas aman perubahan BB.',
      'Saya memahami aturan minum obat, terutama obat pelancar kencing di pagi hari.',
      'Saya memahami aturan pembatasan garam dan asupan cairan harian.',
      'Saya mengetahui posisi tidur yang nyaman (setengah duduk/bantal tinggi) jika merasa sesak.'
    ],
    quiz: [
      {
        q: 'Kapan waktu terbaik untuk menimbang berat badan harian pada pasien CHF?',
        options: ['Malam hari sebelum tidur', 'Setiap pagi setelah buang air kecil dan sebelum makan/minum', 'Siang hari setelah berolahraga', 'Setiap seminggu sekali di RS'],
        answer: 1
      },
      {
        q: 'Mengapa pasien CHF disarankan meminum obat diuretik (pelancar kencing) pada pagi hari?',
        options: ['Agar tidak mengganggu tidur malam karena sering buang air kecil', 'Agar bisa langsung berolahraga berat', 'Karena obat hanya bekerja di pagi hari', 'Agar tidak perlu makan pagi'],
        answer: 0
      },
      {
        q: 'Posisi tubuh seperti apa yang dianjurkan jika pasien CHF mulai merasa sesak napas di rumah?',
        options: ['Berbaring telentang tanpa bantal', 'Tengkurap', 'Posisi setengah duduk dengan menyangga punggung menggunakan bantal', 'Berdiri tegak terus-menerus'],
        answer: 2
      }
    ]
  },
  {
    id: 'stroke',
    name: 'Stroke Infark',
    icon: ShieldAlert,
    color: 'blue',
    definition: 'Stroke Infark terjadi akibat tersumbatnya pembuluh darah yang menyuplai darah ke otak, sehingga jaringan otak kekurangan oksigen dan nutrisi.',
    symptoms: [
      'Se: Senyum tidak simetris (mencong)',
      'Ge: Gerak separuh anggota tubuh melemah',
      'Ra: Bicara pelo / tidak lancar / tidak mengerti kata-kata',
      'Ke: Kebas atau kesemutan separuh badan',
      'R: Rabun / pandangan kabur tiba-tiba',
      'S: Sempoyongan / gangguan keseimbangan'
    ],
    warning: [
      'Gejala stroke berulang',
      'Kejang atau kesadaran menurun',
      'Tersedak hebat saat makan'
    ],
    medication: [
      'Minum obat pengencer darah / antiplatelet (misal: Aspirin, Clopidogrel) serta obat pengontrol faktor risiko (obat hipertensi, kolesterol, DM) secara teratur.',
      'Penting: Jangan menghentikan obat pengencer darah tanpa konsultasi dokter karena berisiko tinggi memicu stroke susulan.'
    ],
    diet: [
      'Tekstur Makanan Sesuai Kemampuan Menelan: Makanan lunak, saring, atau blender jika ada gangguan menelan (disfagia).',
      'Rendah garam, rendah lemak jenuh/kolesterol, serta tinggi serat (buah dan sayur).',
      'Aturan Makan Aman: Makan dalam posisi duduk tegak, suapan kecil, dan jangan terburu-buru untuk mencegah tersedak (aspirasi).'
    ],
    activity: [
      'Latihan rehabilitasi/fisioterapi rutin di rumah (Latihan Rentang Gerak / ROM) untuk mencegah kekakuan otot dan sendi.',
      'Ubah posisi tidur (miring kanan/kiri) setiap 2 jam sekali pada pasien yang tirah baring (bedridden) guna mencegah luka tekan (dekubitus).',
      'Bantu dan dampingi pasien saat berpindah atau berjalan untuk mencegah risiko jatuh.'
    ],
    checklist: [
      'Saya mengetahui tanda-tanda stroke berulang (SeGeRa Ke RS).',
      'Saya memahami pentingnya minum obat pengencer darah secara rutin tanpa terputus.',
      'Saya tahu cara memberikan makanan yang aman agar pasien tidak tersedak.',
      'Saya memahami cara melakukan latihan gerak sendi (ROM) dan miring kanan-kiri setiap 2 jam.',
      'Saya memahami cara menjaga keselamatan pasien di rumah agar tidak jatuh.'
    ],
    quiz: [
      {
        q: 'Berapa jam sekali posisi pasien tirah baring (lumpuh akibat stroke) harus diubah untuk mencegah luka lecet/dekubitus?',
        options: ['Setiap 6 jam sekali', 'Setiap 2 jam sekali', 'Cukup 1 kali sehari', 'Tidak perlu diubah'],
        answer: 1
      },
      {
        q: 'Apa yang harus dilakukan jika pasien stroke memiliki gangguan menelan saat diberi makan?',
        options: ['Memberikan makanan bertekstur lunak/halus dan menyuapi dalam posisi duduk tegak', 'Menyuruh pasien makan sambil berbaring telentang', 'Memberikan makanan dalam jumlah besar sekaligus', 'Memaksa pasien minum air dalam jumlah banyak secara cepat'],
        answer: 0
      },
      {
        q: 'Mengapa obat pengencer darah pada pasien stroke infark tidak boleh dihentikan sembarangan?',
        options: ['Supaya tidak menyebabkan ketagihan', 'Untuk mencegah timbulnya penyumbatan ulang yang memicu stroke susulan', 'Agar pasien cepat mengantuk', 'Supaya kadar gula darah tetap stabil'],
        answer: 1
      }
    ]
  },
  {
    id: 'luka',
    name: 'Perawatan Luka',
    icon: ClipboardCheck,
    color: 'amber',
    definition: 'Perawatan luka bertujuan untuk mempercepat proses penyembuhan, mencegah infeksi, dan melindungi jaringan luka dari cedera ulang.',
    symptoms: [
      'Luka mengering secara bertahap',
      'Kemerahan halus di sekitar tepi luka pada fase peradangan normal',
      'Tidak ada bau menyengat atau nanah'
    ],
    warning: [
      'Kemerahan meluas di sekitar luka',
      'Bengkak dan terasa sangat hangat/panas',
      'Nyeri yang semakin bertambah berat',
      'Keluar cairan berbau menyengat atau nanah (pus)',
      'Demam (suhu tubuh >38°C)'
    ],
    medication: [
      'Konsumsi antibiotik yang diresepkan dokter sampai habis (jika diberikan).',
      'Minum obat pereda nyeri sesuai instruksi saat merasa sakit.',
      'Langkah Bersih Merawat Luka di Rumah:',
      '1. Cuci tangan dengan sabun dan air mengalir sebelum dan sesudah merawat luka.',
      '2. Gunakan cairan pembersih yang tepat (misal: NaCl 0,9% / cairan steril).',
      '3. Hindari mengoleskan bahan-bahan tidak steril (seperti minyak goreng, kopi, odol, atau racikan herbal tidak teruji).',
      '4. Jaga agar balutan luka tetap bersih dan kering. Segera ganti jika balutan basah/kotor.'
    ],
    diet: [
      'Tinggi Protein: Konsumsi makanan kaya protein tinggi untuk mempercepat regenerasi jaringan kulit (misal: telur, dada ayam, ikan gabus/gurami, tahu, tempe, daging tanpa lemak).',
      'Konsumsi makanan tinggi vitamin C dan Zinc (buah-buahan segar dan sayur) untuk mendukung kekebalan tubuh dan penyembuhan jaringan.',
      'Mitos: Tidak perlu pantang makan telur/ikan kecuali jika pasien memiliki alergi spesifik.'
    ],
    activity: [
      'Hindari aktivitas ekstrem atau tekanan berlebih pada area luka yang dapat menyebabkan jahitan terbuka/luka robek kembali.',
      'Lakukan mobilisasi bertahap sesuai petunjuk perawat/dokter.',
      'Lindungi luka saat mandi agar tidak kemasukan air tidak steril (gunakan penutup kedap air jika perlu).'
    ],
    checklist: [
      'Saya memahami langkah-langkah mencuci tangan dan menjaga kebersihan saat merawat luka.',
      'Saya tahu cara menjaga agar balutan luka tetap bersih dan kering.',
      'Saya tahu tanda-tanda infeksi pada luka (merah, bengkak, nanah, demam).',
      'Saya memahami pentingnya asupan makan tinggi protein untuk mempercepat penyembuhan.',
      'Saya tahu kapan dan ke mana harus kontrol ganti balutan/angkat jahitan.'
    ],
    quiz: [
      {
        q: 'Langkah utama apa yang WAJIB dilakukan sebelum dan sesudah menyentuh atau merawat luka di rumah?',
        options: ['Mengoleskan alkohol ke seluruh tangan tanpa dicuci', 'Mencuci tangan dengan sabun dan air mengalir', 'Cukup mengelap tangan dengan tisu kering', 'Langsung mengganti perban tanpa persiapan'],
        answer: 1
      },
      {
        q: 'Asupan nutrisi apakah yang sangat penting ditingkatkan untuk mempercepat penyembuhan jaringan luka?',
        options: ['Makanan tinggi garam dan pengawet', 'Protein tinggi (seperti telur, ikan, dan daging) serta Vitamin C', 'Makanan bersantan dan berlemak tinggi', 'Minuman bergula tinggi'],
        answer: 1
      },
      {
        q: 'Manakah dari tanda berikut yang menunjukkan bahwa luka mengalami INFEKSI dan membutuhkan penanganan medis?',
        options: ['Luka tampak mengering dan tidak berbau', 'Keluar nanah, timbul kemerahan meluas, bengkak, dan pasien demam', 'Rasa gatal ringan saat luka mulai menutup', 'Warna kulit kembali normal'],
        answer: 1
      }
    ]
  }
];

const menuItems = [
  { label: 'Siap Pulang', icon: ClipboardCheck, path: '/siap-pulang' },
  { label: 'Edukasi', icon: Stethoscope, path: '/edukasi' },
  { label: 'Obat', icon: Pill, path: '/edukasi/diabetes' },
  { label: 'Diet', icon: Utensils, path: '/edukasi/diabetes?tab=diet' },
  { label: 'Perawatan di Rumah', icon: Home, path: '/siap-pulang' },
  { label: 'Tanda Bahaya', icon: ShieldAlert, path: '/tanda-bahaya' },
  { label: 'Jadwal Kontrol', icon: CalendarDays, path: '/jadwal-kontrol' },
  { label: 'Pertanyaan Umum', icon: CircleHelp, path: '/faq' },
  { label: 'Kontak', icon: MessageCircle, path: '/kontak' }
];

function go(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function Logo() {
  return (
    <div className="brand" onClick={() => go('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img src="/Logo-Siap-Pulang.png" alt="SIAP PULANG" style={{ height: '55px', width: 'auto', objectFit: 'contain' }} />
    </div>
  );
}

function PartnerLogos() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '12px', borderLeft: '1px solid #e2e8f0' }}>
      <img src="/LogoRSUD.png" alt="RSUD Kota Tangerang" title="RSUD Kota Tangerang" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
      <img src="/LogoEsaUnggul.png" alt="Universitas Esa Unggul" title="Universitas Esa Unggul" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ marginTop: '40px', padding: '24px 16px 80px 16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', backgroundColor: '#f8fafc' }}>
      <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '0.5px' }}>KOLABORASI EDUKASI PASIEN</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <img src="/LogoRSUD.png" alt="RSUD Kota Tangerang" style={{ height: '42px', width: 'auto' }} />
        <img src="/LogoEsaUnggul.png" alt="Universitas Esa Unggul" style={{ height: '42px', width: 'auto' }} />
      </div>
      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>© {new Date().getFullYear()} SIAP PULANG — RSUD Kota Tangerang & Universitas Esa Unggul</p>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Logo />
          <div className="desktop-only"><PartnerLogos /></div>
        </div>
        <nav>
          {menuItems.slice(0, 3).map(item => (
            <button key={item.label} onClick={() => go(item.path)}>{item.label}</button>
          ))}
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Buka menu"><Menu size={21} /></button>
      </header>

      {open && (
        <div className="mobile-menu">
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>Kerja Sama:</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <img src="/LogoRSUD.png" alt="RSUD Kota Tangerang" style={{ height: '32px', width: 'auto' }} />
              <img src="/LogoEsaUnggul.png" alt="Universitas Esa Unggul" style={{ height: '32px', width: 'auto' }} />
            </div>
          </div>
          {menuItems.map(item => (
            <button key={item.label} onClick={() => { go(item.path); setOpen(false); }}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </div>
      )}

      <main>{children}</main>
      <Footer />
      <div className="bottom-bar">
        <button onClick={() => go('/')}><Home size={19} /><span>Beranda</span></button>
        <button onClick={() => setOpen(!open)}><Menu size={19} /><span>Menu</span></button>
      </div>
    </div>
  );
}

function Button({ children, onClick, secondary = false, disabled = false }: { children: ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button disabled={disabled} className={`button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{children}</button>;
}

function Back() {
  return <button className="back" onClick={() => window.history.back()}><ArrowLeft size={17} /> Kembali</button>;
}

function List({ items }: { items: string[] }) {
  return <ul className="check-list">{items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>;
}

function RatingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleGoToGoogleMaps = () => {
    const directReviewUrl = "https://www.google.com/maps/search/?api=1&query=RSUD+Kota+Tangerang";
    window.open(directReviewUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', padding: '24px',
        maxWidth: '400px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        position: 'relative', textAlign: 'center'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '12px', right: '12px', background: 'none',
          border: 'none', cursor: 'pointer', color: '#64748b'
        }}>
          <X size={20} />
        </button>

        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fef3c7', padding: '14px', borderRadius: '50%', color: '#d97706' }}>
            <Star size={36} fill="#d97706" />
          </div>
        </div>

        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0f172a' }}>Bantu Kami Berkembang</h3>
        <p style={{ margin: '0 0 20px 0', fontSize: '13.5px', color: '#64748b', lineHeight: '1.5' }}>
          Apakah layanan edukasi ini membantu Anda? Luangkan waktu sejenak untuk memberikan ulasan/rating untuk <b>RSUD Kota Tangerang</b> di Google Maps.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button onClick={handleGoToGoogleMaps}>
            <Star size={17} /> Beri Rating di Google Maps
          </Button>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: '#64748b',
              fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', padding: '8px'
            }}
          >
            Nanti Saja / Lewati
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">PUSAT INFORMASI PASIEN</p>
          <h1>Selamat datang di<br /><span>SIAP PULANG</span></h1>
          <p>Website ini membantu Anda dan keluarga mempersiapkan informasi yang diperlukan sebelum dan setelah pulang dari rumah sakit.</p>
          <Button onClick={() => go('/edukasi')}>Mulai Edukasi <ArrowRight size={17} /></Button>
        </div>
        <div className="hero-art"><HeartPulse size={112} strokeWidth={1.2} /></div>
      </section>
      <section>
        <div className="section-heading">
          <div><p className="eyebrow">AKSES CEPAT</p><h2>Apa yang ingin Anda pelajari?</h2></div>
          <p className="muted">Pilih informasi yang Anda butuhkan</p>
        </div>
        <div className="quick-grid">
          {menuItems.map((item, index) => (
            <button className={`quick-card tint-${index % 5}`} key={item.label} onClick={() => go(item.path)}>
              <item.icon size={25} />
              <span>{item.label}</span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>
      <section className="info-strip">
        <Bell size={25} />
        <div><strong>Jangan lupa jadwal kontrol Anda</strong><p>Siapkan dokumen dan catat pertanyaan untuk dokter.</p></div>
        <Button secondary onClick={() => go('/jadwal-kontrol')}>Lihat Jadwal</Button>
      </section>
    </>
  );
}

function DiagnosisPage() {
  const [search, setSearch] = useState('');
  const shown = diagnoses.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <section className="page">
      <Back />
      <div className="page-intro"><p className="eyebrow">EDUKASI BERDASARKAN DIAGNOSIS</p><h1>Pilih kondisi Anda</h1><p>Pelajari informasi yang sesuai dengan kondisi kesehatan Anda.</p></div>
      <div className="search"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari diagnosis atau kondisi..." /></div>
      <div className="diagnosis-list">{shown.map(d => <button key={d.id} className="diagnosis-card" onClick={() => go(`/edukasi/${d.id}`)}><span className={`diagnosis-icon ${d.color}`}><d.icon size={23} /></span><span><strong>{d.name}</strong><small>Materi edukasi pasien</small></span><ArrowRight size={18} /></button>)}</div>
    </section>
  );
}

function DetailPage({ d }: { d: Diagnosis }) {
  const params = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState(params.get('tab') || 'tentang');
  const tabs = [['tentang', 'Tentang Penyakit', Activity], ['obat', 'Obat', Pill], ['diet', 'Diet', Utensils], ['aktivitas', 'Aktivitas', Activity]] as const;

  const content = tab === 'tentang' ? (
    <>
      <h3>Apa itu {d.name}?</h3>
      <p>{d.definition}</p>

      {d.id === 'stroke' && (
        <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '10px', border: '1px solid #bfdbfe', margin: '16px 0' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Slogan Gejala "SeGeRa Ke RS":</h4>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13.5px', lineHeight: '1.6' }}>
            <li><b>Se</b> : Senyum tidak simetris (mencong)</li>
            <li><b>Ge</b> : Gerak separuh anggota tubuh melemah</li>
            <li><b>Ra</b> : Bicara Pelo / tidak lancar / tidak mengerti kata-kata</li>
            <li><b>Ke</b> : Kebas atau kesemutan separuh badan</li>
            <li><b>R</b> : Rabun / pandangan kabur tiba-tiba</li>
            <li><b>S</b> : Sempoyongan / gangguan keseimbangan</li>
          </ul>
        </div>
      )}

      <h3>Gejala / Tanda-tanda</h3>
      <List items={d.symptoms} />

      {d.id === 'luka' && <HealingStages />}
    </>
  ) : tab === 'obat' ? (
    <>
      <h3>Penggunaan Obat</h3>
      <List items={d.medication} />
      {d.id === 'diabetes' && <InsulinSteps />}
    </>
  ) : tab === 'diet' ? (
    <>
      <h3>Pengaturan Diet & Nutrisi</h3>
      <List items={d.diet} />
      {d.id === 'diabetes' && <DietTable />}
    </>
  ) : (
    <>
      <h3>Aktivitas di Rumah</h3>
      <List items={d.activity} />
    </>
  );

  return (
    <section className="page">
      <Back />
      <div className="diagnosis-title">
        <span className={`diagnosis-icon ${d.color}`}><d.icon size={27} /></span>
        <div><p className="eyebrow">EDUKASI DISCHARGE PLANNING</p><h1>{d.name}</h1></div>
      </div>
      <div className="tabs">
        {tabs.map(([id, label, Icon]) => (
          <button className={tab === id ? 'active' : ''} onClick={() => setTab(id)} key={id}>
            <Icon size={17} /><span>{label}</span>
          </button>
        ))}
      </div>
      <article className="content-card">{content}</article>

      {tab === 'tentang' && (
        <div className="warning-box">
          <ShieldAlert size={21} />
          <div><strong>Tanda Bahaya Utama (Segera ke RS):</strong><List items={d.warning} /></div>
        </div>
      )}

      <Button onClick={() => go(`/edukasi/${d.id}/checklist`)}>
        Lanjut ke Checklist Pemahaman <ArrowRight size={17} />
      </Button>
    </section>
  );
}

function DietTable() {
  return (
    <div style={{ marginTop: '20px', overflowX: 'auto' }}>
      <h4 style={{ marginBottom: '8px' }}>Tabel Pola Makan Diabetes Melitus (3J)</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#16a34a' }}>Dianjurkan</th>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#d97706' }}>Dibatasi</th>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#dc2626' }}>Dihindari</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • <b>Karbohidrat Kompleks:</b> Nasi merah, oatmeal, roti gandum, beras hitam.<br />
              • <b>Serat Tinggi:</b> Bayam, buncis, brokoli, wortel, apel, pepaya.<br />
              • <b>Protein Rendah Lemak:</b> Ikan rebus/panggang, dada ayam tanpa kulit, tahu, tempe.
            </td>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • <b>Karbohidrat Sederhana:</b> Nasi putih, lontong, ketan, mi/pasta.<br />
              • <b>Buah Tinggi Gula:</b> Pisang, mangga matang, durian, anggur, sawo.<br />
              • <b>Makanan Berlemak:</b> Daging berlemak, gorengan, santan encer, keju.
            </td>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • <b>Gula Murni & Sirup:</b> Gula pasir, gula jawa, madu berlebih, kental manis.<br />
              • <b>Minuman Kemasan:</b> Teh kemasan, soda, es krim, jus buah dengan gula.<br />
              • <b>Makanan Olahan:</b> Kue kering, donat, permen, buah kaleng ber-sirup.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function InsulinSteps() {
  return (
    <div className="special-card" style={{ marginTop: '20px' }}>
      <h3>Panduan Injeksi Insulin (Step-by-Step)</h3>
      <div style={{ margin: '16px 0', textAlign: 'center' }}>
        <img
          src="/Insulin.png"
          alt="Panduan Cara Menggunakan Injeksi Insulin"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      </div>
      <div className="steps">
        {[
          'Persiapan: Cuci tangan dengan sabun dan siapkan pen insulin serta alkohol swab.',
          'Pilih & Bersihkan Area: Pilih lokasi penyuntikan (perut, paha luar, atau lengan atas). Bersihkan area kulit dengan alkohol swab dan biarkan mengering.',
          'Cubit Kulit: Cubit sedikit lipatan kulit pada area yang akan disuntik.',
          'Suntikkan: Tancapkan jarum tegak lurus (sudut 90 derajat) ke dalam kulit.',
          'Tekan Plunger: Tekan tombol/plunger pen hingga angka dosis menunjukkan angka 0.',
          'Tahan: Tahan posisi jarum selama 10 detik sebelum dicabut agar cairan insulin terserap sempurna.',
          'Rotasi Area: Selalu ubah (rotasi) titik penyuntikan setiap hari untuk mencegah benjolan lemak (lipohipertrofi).'
        ].map((x, i) => <div key={x}><b>{i + 1}</b><span>{x}</span></div>)}
      </div>
    </div>
  );
}

function HealingStages() {
  return (
    <div className="special-card" style={{ marginTop: '20px' }}>
      <h3>4 Tahap Penyembuhan Luka yang Perlu Dipantau</h3>
      <div style={{ margin: '16px 0', textAlign: 'center' }}>
        <img
          src="/Luka.png"
          alt="Empat Tahapan Penyembuhan Luka"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      </div>
      <div className="timeline">
        {[
          ['1. Fase Hemostasis (Penutupan Darah)', 'Terjadi sesaat setelah pembentukan luka. Darah membeku untuk menghentikan pendarahan dan membentuk keropeng tipis.'],
          ['2. Fase Inflamasi (Peradangan)', 'Berlangsung 1–4 hari. Area luka sedikit kemerahan, agak hangat, dan sedikit bengkak. Ini adalah reaksi normal tubuh membersihkan kuman & jaringan mati.'],
          ['3. Fase Proliferasi (Pembentukan Jaringan Baru)', 'Berlangsung hari ke-4 hingga minggu ke-3. Tumbuh jaringan berwarna merah muda kemerahan (jaringan granulasi) yang sehat dan luka mulai mengkerut/mengecil.'],
          ['4. Fase Remodeling (Pematangan/Penguatan Jaringan)', 'Berlangsung beberapa minggu hingga bulan. Luka menutup sempurna dan membentuk bekas luka (scars) yang memudar seiring waktu.']
        ].map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}
      </div>
    </div>
  );
}

function ChecklistPage({ d }: { d: Diagnosis }) {
  const [checked, setChecked] = useState<boolean[]>(d.checklist.map(() => false));
  return (
    <section className="page">
      <Back />
      <div className="page-intro"><p className="eyebrow">LANGKAH 2 DARI 3</p><h1>Checklist Pemahaman</h1><p>Pastikan Anda telah memahami poin-poin penting berikut sebelum melanjutkan ke evaluasi.</p></div>
      <div className="progress"><span style={{ width: '66%' }} /></div>
      <div className="check-card">{d.checklist.map((item, i) => <label key={item} className={`check-row ${checked[i] ? 'checked' : ''}`}><input type="checkbox" checked={checked[i]} onChange={e => setChecked(prev => prev.map((v, j) => j === i ? e.target.checked : v))} /><span>{item}</span><Check size={17} /></label>)}</div>
      <Button disabled={!checked.every(Boolean)} onClick={() => go(`/edukasi/${d.id}/evaluasi`)}>Lanjut ke Evaluasi <ArrowRight size={17} /></Button>
    </section>
  );
}

function QuizPage({ d }: { d: Diagnosis }) {
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSubmit = () => {
    const score = d.quiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
    // Simpan skor ke localStorage agar aman di mode phone / Vercel
    localStorage.setItem(`last_quiz_score_${d.id}`, score.toString());
    localStorage.setItem('last_quiz_total', d.quiz.length.toString());
    go(`/edukasi/${d.id}/hasil`);
  };

  return (
    <section className="page">
      <Back />
      <div className="page-intro">
        <p className="eyebrow">LANGKAH 3 DARI 3</p>
        <h1>Evaluasi Pemahaman</h1>
        <p>Jawab pertanyaan berikut dengan memilih satu jawaban yang paling tepat.</p>
      </div>
      <div className="progress"><span style={{ width: '88%' }} /></div>
      <div className="quiz-list">
        {d.quiz.map((quiz, i) => (
          <div className="quiz-card" key={quiz.q}>
            <strong>{i + 1}. {quiz.q}</strong>
            {quiz.options.map((option, j) => (
              <label className="radio-row" key={option}>
                <input
                  type="radio"
                  name={`q-${i}`}
                  checked={answers[i] === j}
                  onChange={() => setAnswers(prev => { const next = [...prev]; next[i] = j; return next; })}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
      <Button
        disabled={answers.length !== d.quiz.length}
        onClick={handleSubmit}
      >
        Submit Jawaban <ArrowRight size={17} />
      </Button>
    </section>
  );
}

function ResultPage({ d }: { d: Diagnosis }) {
  // Ambil skor dari localStorage (fallback aman jika URL param kosong)
  const savedScore = localStorage.getItem(`last_quiz_score_${d.id}`);
  const savedTotal = localStorage.getItem('last_quiz_total');

  const score = savedScore !== null ? Number(savedScore) : Number(new URLSearchParams(window.location.search).get('score') || 0);
  const total = savedTotal !== null ? Number(savedTotal) : d.quiz.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowRating(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="page result-page">
      <RatingModal isOpen={showRating} onClose={() => setShowRating(false)} />

      <div className="result-icon"><Check size={42} /></div>
      <p className="eyebrow">EVALUASI SELESAI</p>
      <h1>Terima Kasih!</h1>
      <p>Anda telah menyelesaikan edukasi discharge planning untuk <strong>{d.name}</strong>.</p>

      <div className="score-card">
        <div><span>Jawaban benar</span><strong>{score} / {total}</strong></div>
        <div><span>Nilai Pemahaman</span><strong>{percentage}%</strong></div>
      </div>

      <blockquote style={{ margin: '20px 0', padding: '12px 16px', borderLeft: '4px solid #0284c7', backgroundColor: '#f0f9ff', fontStyle: 'italic', borderRadius: '0 8px 8px 0' }}>
        “Pulang bukan akhir perawatan, tapi awal dari kemandirian.”
      </blockquote>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <Button onClick={() => setShowRating(true)} secondary>
          <Star size={17} /> Beri Ulasan / Rating Google
        </Button>
        <Button onClick={() => go('/')}><Home size={17} /> Kembali ke Beranda</Button>
        <Button secondary onClick={() => go('/jadwal-kontrol')}><CalendarDays size={17} /> Isi Jadwal Kontrol</Button>
      </div>
    </section>
  );
}

interface Schedule { id: string; tanggal: string; poliDokter: string; waktu: string; catatan: string; }
function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [formData, setFormData] = useState({ tanggal: '', poliDokter: '', jam: '08', menit: '00', catatan: '' });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('siap_pulang_jadwal_kontrol');
    if (savedData) {
      try { setSchedules(JSON.parse(savedData)); } catch (e) { console.error(e); }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tanggal || !formData.poliDokter) return;
    const newSchedule: Schedule = { id: Date.now().toString(), tanggal: formData.tanggal, poliDokter: formData.poliDokter, waktu: `${formData.jam}:${formData.menit}`, catatan: formData.catatan };
    const updatedSchedules = [newSchedule, ...schedules];
    setSchedules(updatedSchedules);
    localStorage.setItem('siap_pulang_jadwal_kontrol', JSON.stringify(updatedSchedules));
    setFormData({ tanggal: '', poliDokter: '', jam: '08', menit: '00', catatan: '' });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDelete = (id: string) => {
    const filteredSchedules = schedules.filter(item => item.id !== id);
    setSchedules(filteredSchedules);
    localStorage.setItem('siap_pulang_jadwal_kontrol', JSON.stringify(filteredSchedules));
  };

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'));

  return (
    <section className="page">
      <Back />
      <div className="page-intro"><p className="eyebrow">JADWAL PENGINGAT KONTROL</p><h1>Jadwal Kontrol Saya</h1><p>Isi jadwal kontrol Anda sendiri. Data tersimpan aman di HP ini.</p></div>
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '16px' }}><Plus size={20} /> Tambah Jadwal Kontrol</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Tanggal Kontrol *</label>
            <input type="date" required value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Poli / Nama Dokter *</label>
            <input type="text" required placeholder="Contoh: Poli Penyakit Dalam / dr. Budi Santoso" value={formData.poliDokter} onChange={e => setFormData({ ...formData, poliDokter: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Jam Berobat (WIB)</label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <select value={formData.jam} onChange={e => setFormData({ ...formData, jam: e.target.value })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {hours.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <span style={{ fontWeight: 'bold' }}>:</span>
                <select value={formData.menit} onChange={e => setFormData({ ...formData, menit: e.target.value })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Catatan Tambahan</label>
              <input type="text" placeholder="Contoh: Ambil Surat Kontrol di Poli" value={formData.catatan} onChange={e => setFormData({ ...formData, catatan: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
          </div>
          <Button onClick={() => { }}>Simpan Jadwal Pengingat</Button>
          {isSaved && <p style={{ color: '#16a34a', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', margin: 0 }}><CheckCircle size={16} /> Jadwal berhasil tersimpan!</p>}
        </form>
      </div>

      <div className="content-card">
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Daftar Pengingat Kontrol Tersimpan</h3>
        {schedules.length === 0 ? (
          <p className="muted" style={{ textAlign: 'center', padding: '20px 0' }}>Belum ada jadwal kontrol tersimpan di HP ini.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {schedules.map((item) => (
              <div key={item.id} style={{ padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: 'bold' }}>
                    <Calendar size={16} />
                    <span>{new Date(item.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' }}>
                    <User size={15} style={{ color: '#64748b' }} />
                    <span>{item.poliDokter}</span>
                  </div>
                  {item.waktu && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748b' }}><Clock size={15} /><span>Jam: {item.waktu} WIB</span></div>}
                  {item.catatan && <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontStyle: 'italic', color: '#475569', backgroundColor: '#fff', padding: '6px 10px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>Catatan: {item.catatan}</p>}
                </div>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }} title="Hapus Jadwal"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="appointment" style={{ marginTop: '24px' }}>
        <p className="eyebrow">DOKUMEN UMUM WAJIB DIBAWA SAAT KONTROL</p>
        <List items={['Kartu BPJS / KTP', 'Surat Kontrol dari Rumah Sakit', 'Hasil pemeriksaan laboratorium/radiologi terakhir', 'Obat-obatan yang sedang dikonsumsi']} />
      </div>
    </section>
  );
}

function ContactPage() {
  const handleWhatsApp = () => {
    const phoneNumber = '6285111308183';
    const message = encodeURIComponent('Halo, saya ingin bertanya mengenai pelayanan SIAP PULANG.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="page">
      <Back />
      <div className="page-intro">
        <p className="eyebrow">BANTUAN & KONTAK</p>
        <h1>Kontak kami</h1>
        <p>Butuh bantuan atau informasi lebih lanjut? Kami siap membantu.</p>
      </div>
      <div className="contact-list">
        {([
          ['Ruangan', 'Ruang Rawat Inap Melati', '085111308183', Home],
          ['Poliklinik', 'Poliklinik Penyakit Dalam', '085111308183', Stethoscope],
          ['Jam Pelayanan', 'Senin–Jumat · 07.00–15.00 WIB', 'Sabtu · 07.00–12.00 WIB', Clock3]
        ] as [string, string, string, typeof Home][]).map(([title, one, two, Icon]) => (
          <div className="contact-card" key={String(title)}>
            <span className="contact-icon"><Icon size={21} /></span>
            <div>
              <strong>{title}</strong>
              <span>{one}</span>
              <small>{two}</small>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleWhatsApp}>
        <MessageCircle size={18} /> Hubungi via WhatsApp
      </Button>
    </section>
  );
}

function FAQPage() { const [active, setActive] = useState<number | null>(null); const faqs = [['Apa yang perlu disiapkan sebelum pulang?', 'Pastikan Anda memahami obat, diet, aktivitas, tanda bahaya, dan jadwal kontrol.'], ['Kapan harus segera ke rumah sakit?', 'Jika muncul tanda bahaya seperti sesak berat, penurunan kesadaran, nyeri dada, atau perdarahan yang tidak berhenti.'], ['Bagaimana jika lupa minum obat?', 'Jangan menggandakan dosis. Ikuti petunjuk dokter atau hubungi fasilitas kesehatan.'], ['Siapa yang bisa membantu menggunakan SIAP PULANG?', 'Keluarga dan pendamping dapat membaca materi bersama pasien.']]; return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">PERTANYAAN UMUM</p><h1>Ada yang ingin ditanyakan?</h1><p>Temukan jawaban dari pertanyaan yang sering ditanyakan pasien.</p></div><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq-item" key={q}><button onClick={() => setActive(active === i ? null : i)}><strong>{q}</strong><ChevronDown className={active === i ? 'rotate' : ''} size={19} /></button>{active === i && <p>{a}</p>}</div>)}</div></section>; }
function WarningPage() { return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">PENTING UNTUK DIKETAHUI</p><h1>Tanda bahaya</h1><p>Segera hubungi tenaga kesehatan atau layanan gawat darurat bila mengalami gejala berikut.</p></div><div className="warning-grid">{diagnoses.slice(0, 5).map(d => <div className="warning-card" key={d.id}><div><d.icon size={20} /><strong>{d.name}</strong></div><List items={d.warning} /></div>)}</div><div className="emergency"><ShieldAlert size={24} /><div><strong>Dalam keadaan darurat</strong><p>Hubungi IGD rumah sakit atau layanan darurat terdekat.</p></div></div></section>; }

// --- READYPAGE DENGAN FLEXBOX AMAN DAN RAPI DI HP ---
function ReadyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps = [
    {
      title: 'Pahami kondisi',
      subtitle: 'Kenali diagnosis, gejala, dan perawatan Anda.',
      icon: Stethoscope,
      details: [
        'Pahami nama diagnosis penyakit yang Anda alami.',
        'Kenali gejala normal masa pemulihan dan tanda bahaya yang harus diwaspadai.',
        'Ketahui perawatan khusus di rumah seperti perawatan luka atau pembatasan aktivitas.'
      ]
    },
    {
      title: 'Siapkan obat',
      subtitle: 'Tanyakan nama, dosis, dan waktu minum obat.',
      icon: Pill,
      details: [
        'Catat seluruh daftar obat yang dibawa pulang beserta fungsinya.',
        'Pahami dosis, aturan minum (sebelum/sesudah makan), dan interval waktu.',
        'Ketahui efek samping obat yang umum dan reaksi yang membutuhkan penanganan medis.'
      ]
    },
    {
      title: 'Atur kehidupan di rumah',
      subtitle: 'Ikuti aturan diet dan aktivitas yang aman.',
      icon: Home,
      details: [
        'Patuhi panduan diet (pantangan makanan/minuman dan asupan yang dianjurkan).',
        'Lakukan aktivitas fisik secara bertahap dan hindari aktivitas berat.',
        'Pastikan lingkungan rumah aman (misal: lantai tidak licin) untuk mencegah risiko jatuh.'
      ]
    },
    {
      title: 'Catat jadwal kontrol',
      subtitle: 'Simpan tanggal, jam, dan dokumen yang dibutuhkan.',
      icon: CalendarDays,
      details: [
        'Catat tanggal, jam, dan Poliklinik/Dokter untuk konsultasi ulang.',
        'Siapkan dokumen wajib: Kartu BPJS/KTP, Surat Kontrol, dan hasil lab/radiologi.',
        'Simpan nomor telepon rumah sakit atau IGD untuk kondisi darurat.'
      ]
    }
  ];

  return (
    <section className="page">
      <Back />
      <div className="page-intro" style={{ marginBottom: '16px' }}>
        <p className="eyebrow" style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', margin: 0 }}>PERSIAPAN PULANG</p>
        <h1 style={{ fontSize: '20px', margin: '4px 0' }}>Siap pulang dengan percaya diri</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Klik setiap poin di bawah ini untuk melihat panduan detail bersama keluarga.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isOpen = openIndex === i;

          return (
            <div
              key={step.title}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              style={{
                cursor: 'pointer',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '14px 16px',
                backgroundColor: isOpen ? '#f8fafc' : '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                boxSizing: 'border-box'
              }}
            >
              {/* Header Card dengan Flexbox */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                {/* Nomor Urut */}
                <div style={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  flexShrink: 0
                }}>
                  {i + 1}
                </div>

                {/* Icon */}
                <div style={{
                  backgroundColor: '#f1f5f9',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={18} style={{ color: '#0284c7' }} />
                </div>

                {/* Teks Judul & Subtitle */}
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', lineHeight: '1.4', wordBreak: 'break-word' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4', wordBreak: 'break-word' }}>
                    {step.subtitle}
                  </div>
                </div>

                {/* Panah Dropdown */}
                <div style={{ flexShrink: 0 }}>
                  <ChevronDown
                    size={18}
                    style={{
                      color: '#64748b',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>
              </div>

              {/* Detail Konten Akordeon */}
              {isOpen && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '13px',
                  color: '#334155',
                  textAlign: 'left'
                }}>
                  <strong style={{ color: '#0284c7', display: 'block', marginBottom: '6px' }}>
                    Panduan Detail:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.5' }}>
                    {step.details.map((detail, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => go('/edukasi')}>Mulai Edukasi <ArrowRight size={17} /></Button>
      </div>
    </section>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const parts = path.split('/').filter(Boolean);
  const d = diagnoses.find(x => x.id === parts[1]) || diagnoses[0];

  let page: ReactNode = <HomePage />;
  if (path === '/edukasi') page = <DiagnosisPage />;
  else if (path === '/jadwal-kontrol') page = <SchedulePage />;
  else if (path === '/kontak') page = <ContactPage />;
  else if (path === '/faq') page = <FAQPage />;
  else if (path === '/tanda-bahaya') page = <WarningPage />;
  else if (path === '/siap-pulang') page = <ReadyPage />;
  else if (parts[0] === 'edukasi' && parts[2] === 'checklist') page = <ChecklistPage d={d} />;
  else if (parts[0] === 'edukasi' && parts[2] === 'evaluasi') page = <QuizPage d={d} />;
  else if (parts[0] === 'edukasi' && parts[2] === 'hasil') page = <ResultPage d={d} />;
  else if (parts[0] === 'edukasi' && parts[1]) page = <DetailPage d={d} />;

  return <Shell>{page}</Shell>;
}

export default App;