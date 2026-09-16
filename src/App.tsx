import { useEffect, useState, type ReactNode } from 'react';
import { Activity, ArrowLeft, ArrowRight, Bell, Calendar, CalendarDays, Check, CheckCircle, ChevronDown, CircleHelp, ClipboardCheck, Clock, Clock3, HeartPulse, Home, Menu, MessageCircle, Pill, Plus, Search, ShieldAlert, Stethoscope, Trash2, User, Utensils } from 'lucide-react';

type Diagnosis = { id: string; name: string; icon: typeof Activity; color: string; definition: string; symptoms: string[]; warning: string[]; medication: string[]; diet: string[]; activity: string[]; checklist: string[]; quiz: { q: string; options: string[]; answer: number }[] };
const commonChecklist = ['Saya mengetahui kondisi penyakit saya.', 'Saya mengetahui obat yang harus diminum.', 'Saya mengetahui aturan diet yang diperbolehkan.', 'Saya mengetahui aktivitas yang perlu dilakukan.', 'Saya mengetahui tanda bahaya dan kapan harus kembali.'];

const diagnoses: Diagnosis[] = [
  {
    id: 'diabetes',
    name: 'Diabetes Melitus',
    icon: Activity,
    color: 'green',
    definition: 'Diabetes melitus adalah kondisi kadar gula darah yang tinggi akibat gangguan pada produksi atau kerja insulin.',
    symptoms: ['Sering haus dan buang air kecil (terutama malam hari)', 'Mudah lelah, lemas, dan sering lapar', 'Berat badan turun tanpa sebab jelas', 'Luka sulit sembuh dan pandangan kabur'],
    warning: ['Gula darah sangat tinggi (>300 mg/dL) atau sangat rendah (<70 mg/dL)', 'Penurunan kesadaran, pusing berat, atau kebingungan', 'Luka kaki membengkak, berbau, atau membusuk'],
    medication: ['Minum obat sesuai jadwal dan dosis dari dokter.', 'Jangan menghentikan obat tanpa berkonsultasi.', 'Simpan insulin sesuai petunjuk (suhu dingin) dan periksa tanggal kedaluwarsa.'],
    diet: ['Konsumsi makanan sesuai anjuran ahli gizi.', 'Perbanyak sayur dan buah rendah gula.', 'Batasi karbohidrat sederhana, gula, garam, dan lemak jenuh.'],
    activity: ['Berjalan ringan 30 menit sehari (minimal 3–5 kali seminggu).', 'Periksa kondisi kaki setiap hari dari luka atau lecet.', 'Istirahat cukup dan kelola stres dengan baik.'],
    checklist: commonChecklist,
    quiz: [{ q: 'Kapan sebaiknya obat diabetes diminum?', options: ['Sesuai jadwal dan dosis dokter', 'Saat merasa tidak enak badan saja', 'Boleh dihentikan sendiri'], answer: 0 }, { q: 'Makanan mana yang dianjurkan?', options: ['Minuman manis', 'Sayur dan buah sesuai porsi', 'Gorengan berlebihan'], answer: 1 }, { q: 'Apa yang perlu diperiksa setiap hari?', options: ['Warna rambut', 'Kondisi kaki', 'Ukuran sepatu'], answer: 1 }]
  },
  {
    id: 'hipertensi',
    name: 'Hipertensi',
    icon: HeartPulse,
    color: 'rose',
    definition: 'Hipertensi adalah kondisi ketika tekanan darah sistolik ≥ 140 mmHg dan/atau tekanan darah diastolik ≥ 90 mmHg secara konsisten.',
    symptoms: ['Sakit kepala hebat di bagian tengkuk', 'Pusing atau rasa melayang/berkunang-kunang', 'Jantung berdebar dan mudah lelah', 'Rasa berat di leher atau tengkuk'],
    warning: ['Nyeri dada hebat seperti tertindih beban', 'Sesak napas berat secara mendadak', 'Kelemahan atau kelumpuhan mendadak pada satu sisi tubuh'],
    medication: ['Minum obat tekanan darah setiap hari secara teratur sesuai resep.', 'Ukur dan catat tekanan darah secara berkala di rumah.', 'Jangan menggandakan dosis jika ada yang terlewat.'],
    diet: ['Batasi asupan garam (maksimal 1 sendok teh/hari) dan makanan olahan.', 'Perbanyak konsumsi sayur, buah, dan air putih.', 'Hindari rokok, alkohol, dan batasi asupan kafein.'],
    activity: ['Lakukan olahraga ringan bertahap (jalan santai, senam).', 'Jaga berat badan ideal dan tidur cukup 7–8 jam sehari.', 'Hindari aktivitas fisik berat yang mendadak.'],
    checklist: commonChecklist,
    quiz: [{ q: 'Berapa batas maksimal asupan garam per hari bagi penderita hipertensi?', options: ['1 sendok teh', '3 sendok makan', 'Bebas tanpa batas'], answer: 0 }, { q: 'Obat hipertensi sebaiknya?', options: ['Diminum teratur sesuai resep dokter', 'Dihentikan saat membaik', 'Dibagi ke orang lain'], answer: 0 }, { q: 'Nyeri dada mendadak adalah?', options: ['Normal', 'Tanda bahaya', 'Tanda lapar'], answer: 1 }]
  },
  {
    id: 'jantung',
    name: 'Gagal Jantung',
    icon: HeartPulse,
    color: 'red',
    definition: 'Gagal jantung adalah kondisi ketika jantung tidak mampu memompa darah secara optimal untuk memenuhi kebutuhan tubuh.',
    symptoms: ['Sesak napas saat beraktivitas atau saat berbaring', 'Pembengkakan pada kedua kaki atau pergelangan kaki', 'Cepat lelah dan lemas'],
    warning: ['Sesak napas berat bahkan saat beristirahat', 'Nyeri dada hebat', 'Kenaikan berat badan mendadak (1–2 kg dalam beberapa hari) akibat penumpukan cairan'],
    medication: ['Minum obat teratur sesuai arahan dokter.', 'Timbang berat badan setiap pagi setelah buang air kecil.', 'Batasi asupan cairan harian bila diinstruksikan oleh dokter.'],
    diet: ['Batasi penggunaan garam dalam masakan.', 'Pilih makanan segar dibanding makanan kemasan/kaleng.', 'Patuhi batasan jumlah cairan harian yang ditentukan dokter.'],
    activity: ['Aktivitas fisik ringan sesuai dengan toleransi tubuh.', 'Segera beristirahat bila merasa lelah atau agak sesak.', 'Rutin kontrol berobat sesuai jadwal.'],
    checklist: commonChecklist,
    quiz: [{ q: 'Mengapa berat badan perlu dipantau setiap pagi?', options: ['Melihat adanya penumpukan cairan', 'Untuk memilih pakaian', 'Tidak perlu dipantau'], answer: 0 }, { q: 'Asupan apa yang wajib dibatasi?', options: ['Garam dan cairan berlebih', 'Semua jenis buah', 'Air putih hangat'], answer: 0 }, { q: 'Sesak napas berat saat istirahat memerlukan?', options: ['Penanganan medis segera', 'Dibiarkan saja', 'Olahraga berat'], answer: 0 }]
  },
  {
    id: 'stroke',
    name: 'Stroke Infark',
    icon: ShieldAlert,
    color: 'blue',
    definition: 'Stroke infark terjadi akibat adanya penyumbatan aliran darah ke jaringan otak, sehingga sel-sel otak kekurangan oksigen dan nutrisi.',
    symptoms: ['Senyum tidak simetris atau mulut mencong ke satu sisi', 'Gerak anggota tubuh lemah atau lumpuh mendadak di satu sisi', 'Bicara pelo, tidak jelas, atau tidak dapat memahami pembicaraan', 'Mata atau pandangan kabur/kabur mendadak', 'Rasa kesemutan atau kebas hebat pada separuh badan'],
    warning: ['Gejala kelemahan atau mulut mencong muncul kembali/memburuk', 'Penurunan kesadaran atau mengantuk berat yang tidak wajar', 'Sakit kepala hebat yang muncul mendadak'],
    medication: ['Minum obat pengencer darah dan obat pencegah stroke teratur sesuai dosis.', 'Jangan menghentikan obat tanpa persetujuan dokter.', 'Hindari minum obat bebas tanpa berkonsultasi.'],
    diet: ['Gunakan prinsip gizi seimbang rendah garam dan rendah lemak jenuh/kolesterol.', 'Pilih tekstur makanan yang sesuai kemampuan menelan (lunak/saring jika ada gangguan menelan).', 'Makan dengan posisi duduk tegak 90 derajat dan secara perlahan untuk mencegah tersedak.', 'Tetap tegak minimal 30 menit setelah makan.'],
    activity: ['Lakukan latihan rentang gerak (ROM) dan fisioterapi rutin sesuai petunjuk tenaga medis.', 'Gunakan alat bantu jalan jika keseimbangan belum stabil.', 'Modifikasi rumah agar aman (pasang pegangan di kamar mandi, pencahayaan cukup, hilangkan karpet licin) untuk mencegah jatuh.', 'Ubah posisi tidur/duduk tiap 2 jam untuk mencegah luka tekan (dekubitus).'],
    checklist: commonChecklist,
    quiz: [{ q: 'Apa kepanjangan dari slogan SeGeRa ke RS?', options: ['Senyum mencong, Gerak lemah, Bicara pelo, Rabun, Sempoyongan', 'Sehat, Gemar, Rajin, Kerja, Rumah', 'Sebelum Gemuk Rajin Olahraga'], answer: 0 }, { q: 'Posisi saat makan bagi pasien stroke sebaiknya?', options: ['Duduk tegak 90 derajat', 'Berbaring telentang', 'Sambil berjalan'], answer: 0 }, { q: 'Untuk mencegah jatuh di rumah, langkah tepat adalah?', options: ['Memastikan penerangan cukup dan tidak licin', 'Membiarkan lantai basah', 'Mematikan lampu'], answer: 0 }]
  },
  {
    id: 'luka',
    name: 'Perawatan Luka',
    icon: ClipboardCheck,
    color: 'amber',
    definition: 'Perawatan luka adalah tindakan menjaga kebersihan dan mempercepat penyembuhan jaringan kulit serta mencegah terjadinya infeksi sekunder.',
    symptoms: ['Nyeri ringan yang semakin berkurang seiring waktu', 'Kemerahan tipis di sekitar area luka', 'Cairan jernih tipis (serous) dalam jumlah sedikit'],
    warning: ['Luka tampak makin merah, bengkak, terasa panas, dan bernanah', 'Demam tinggi (>38°C) atau menggigil', 'Nyeri yang semakin hebat atau timbul bau tidak sedap dari luka'],
    medication: ['Selalu cuci tangan dengan sabun dan air mengalir sebelum & sesudah merawat luka.', 'Gunakan salep/obat luka sesuai petunjuk dokter.', 'Jaga agar kasa/balutan luka tetap bersih dan kering.'],
    diet: ['Tingkatkan konsumsi makanan tinggi protein (telur, ikan, dada ayam, tahu/tempe) untuk mempercepat penutupan luka.', 'Perbanyak konsumsi buah ber-vitamin C dan sayuran.', 'Cukupi kebutuhan air putih.'],
    activity: ['Batasi gerakan yang meregangkan area luka secara berlebihan.', 'Hindari mengangkat beban berat yang memicu regangan luka.', 'Rutin kontrol ganti balutan sesuai jadwal.'],
    checklist: commonChecklist,
    quiz: [{ q: 'Langkah pertama yang wajib dilakukan sebelum merawat luka adalah?', options: ['Mencuci tangan dengan sabun', 'Meniup area luka', 'Membuka kassa dengan kasar'], answer: 0 }, { q: 'Nutrisi apa yang sangat penting untuk penyembuhan jaringan luka?', options: ['Protein', 'Gula murni', 'Garam berlebih'], answer: 0 }, { q: 'Luka yang bernanah dan berbau merupakan tanda?', options: ['Infeksi luka', 'Proses penyembuhan normal', 'Luka sudah sembuh'], answer: 0 }]
  },
  {
    id: 'ginjal',
    name: 'Gagal Ginjal Kronis',
    icon: Activity,
    color: 'cyan',
    definition: 'Gagal ginjal kronis adalah penurunan fungsi ginjal bertahap yang bersifat menahun dalam menyaring limbah metabolisme.',
    symptoms: ['Pembengkakan pada kaki, pergelangan, atau wajah', 'Mual, muntah, nafsu makan menurun, lemas', 'Perubahan volume atau frekuensi buang air kecil'],
    warning: ['Sesak napas berat akibat penumpukan cairan di paru', 'Tidak buang air kecil sama sekali dalam 24 jam', 'Penurunan kesadaran atau kejang'],
    medication: ['Minum obat rutin sesuai indikasi dokter.', 'Sangat dilarang mengonsumsi obat anti-nyeri atau obat herbal bebas tanpa konsultasi.', 'Patuhi jadwal terapi/cuci darah (bila ada).'],
    diet: ['Patuhi pembatasan asupan cairan, garam, kalium, dan protein sesuai instruksi ahli gizi.', 'Hindari makanan tinggi kalium dan natrium jika dilarang.'],
    activity: ['Lakukan aktivitas fisik ringan teratur yang tidak memicu kelelahan.', 'Jaga kebersihan area akses cuci darah (AV Shunt/CDL) bila menggunakan.'],
    checklist: commonChecklist,
    quiz: [{ q: 'Pengaturan asupan apa yang sangat vital pada gagal ginjal kronis?', options: ['Cairan dan garam', 'Bebas minum apa saja', 'Hanya menghindari nasi'], answer: 0 }, { q: 'Obat bebas/herbal sebaiknya?', options: ['Dihindari tanpa konsultasi dokter', 'Bebas dikonsumsi', 'Diminum pengganti obat RS'], answer: 0 }, { q: 'Tidak buang air kecil sama sekali termasuk?', options: ['Tanda bahaya medis', 'Hal biasa', 'Tanda ginjal sehat'], answer: 0 }]
  },
];

const menuItems = [{ label: 'Siap Pulang', icon: ClipboardCheck, path: '/siap-pulang' }, { label: 'Edukasi', icon: Stethoscope, path: '/edukasi' }, { label: 'Obat', icon: Pill, path: '/edukasi/diabetes' }, { label: 'Diet', icon: Utensils, path: '/edukasi/diabetes?tab=diet' }, { label: 'Perawatan di Rumah', icon: Home, path: '/siap-pulang' }, { label: 'Tanda Bahaya', icon: ShieldAlert, path: '/tanda-bahaya' }, { label: 'Jadwal Kontrol', icon: CalendarDays, path: '/jadwal-kontrol' }, { label: 'Pertanyaan Umum', icon: CircleHelp, path: '/faq' }, { label: 'Kontak', icon: MessageCircle, path: '/kontak' }];
function go(path: string) { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); }

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

function Button({ children, onClick, secondary = false, disabled = false }: { children: ReactNode; onClick?: () => void; secondary?: boolean; disabled?: boolean }) { return <button disabled={disabled} className={`button ${secondary ? 'secondary' : ''}`} onClick={onClick}>{children}</button>; }
function Back() { return <button className="back" onClick={() => window.history.back()}><ArrowLeft size={17} /> Kembali</button>; }
function List({ items }: { items: string[] }) { return <ul className="check-list">{items.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>; }

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

      {d.id === 'diabetes' && (
        <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0', margin: '16px 0' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#166534' }}>Kadar Gula Darah Acuan (mg/dL)</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '6px' }}>Kategori</th>
                <th style={{ padding: '6px' }}>Puasa (GDP)</th>
                <th style={{ padding: '6px' }}>Sewaktu (GDS)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '6px' }}><b>Normal</b></td><td style={{ padding: '6px' }}>70 – 99</td><td style={{ padding: '6px' }}>&lt; 140</td></tr>
              <tr><td style={{ padding: '6px' }}><b>Pre-Diabetes</b></td><td style={{ padding: '6px' }}>100 – 125</td><td style={{ padding: '6px' }}>140 – 199</td></tr>
              <tr style={{ color: '#dc2626', fontWeight: 'bold' }}><td style={{ padding: '6px' }}>Diabetes</td><td style={{ padding: '6px' }}>≥ 126</td><td style={{ padding: '6px' }}>≥ 200</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {d.id === 'hipertensi' && (
        <div style={{ backgroundColor: '#fff1f2', padding: '16px', borderRadius: '10px', border: '1px solid #fecdd3', margin: '16px 0' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#9f1239' }}>Klasifikasi Tekanan Darah (mmHg)</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '6px' }}>Kategori</th>
                <th style={{ padding: '6px' }}>Sistolik</th>
                <th style={{ padding: '6px' }}>Diastolik</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ color: '#16a34a' }}><td style={{ padding: '6px' }}><b>Normal</b></td><td style={{ padding: '6px' }}>&lt; 120</td><td style={{ padding: '6px' }}>dan &lt; 80</td></tr>
              <tr><td style={{ padding: '6px' }}><b>Pre-Hipertensi</b></td><td style={{ padding: '6px' }}>120 – 139</td><td style={{ padding: '6px' }}>atau 80 – 89</td></tr>
              <tr style={{ color: '#dc2626' }}><td style={{ padding: '6px' }}><b>Hipertensi Derajat 1</b></td><td style={{ padding: '6px' }}>140 – 159</td><td style={{ padding: '6px' }}>atau 90 – 99</td></tr>
              <tr style={{ color: '#991b1b', fontWeight: 'bold' }}><td style={{ padding: '6px' }}>Hipertensi Derajat 2</td><td style={{ padding: '6px' }}>≥ 160</td><td style={{ padding: '6px' }}>atau ≥ 100</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {d.id === 'stroke' && (
        <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '10px', border: '1px solid #bfdbfe', margin: '16px 0' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Gejala Utama & Slogan "SeGeRa ke RS":</h4>
          <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13.5px', lineHeight: '1.6' }}>
            <li><b>Se</b>nyum tidak simetris (bibir mencong ke satu sisi).</li>
            <li><b>Ge</b>rak anggota tubuh lemah atau lumpuh mendadak.</li>
            <li>Bida<b>Ra</b> / Bicara pelo, tiba-tiba tidak dapat bicara atau tidak mengerti kata-kata.</li>
            <li><b>K</b>ebas atau kesemutan separuh badan secara mendadak.</li>
            <li><b>R</b>abun / Pandangan kabur mendadak pada satu atau kedua mata.</li>
            <li><b>S</b>empoyongan / Gangguan keseimbangan mendadak.</li>
          </ul>
        </div>
      )}

      <h3>Gejala yang mungkin dirasakan</h3>
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
          <div><strong>Tanda Bahaya Utama:</strong><List items={d.warning} /></div>
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
      <h4 style={{ marginBottom: '8px' }}>Tabel Anjuran Kategori Makanan Pasien Diabetes</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#16a34a' }}>Dianjurkan (Bebas/Sesuai Porsi)</th>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#d97706' }}>Dibatasi (Sesuai Jadwal & Porsi)</th>
            <th style={{ padding: '10px', border: '1px solid #cbd5e1', color: '#dc2626' }}>Dihindari / Dikurangi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • Sayuran hijau & serat (bayam, brokoli, labu)<br />
              • Ikan segar, dada ayam tanpa kulit, tahu, tempe<br />
              • Buah kurang manis (apel, pepaya, alpukat)
            </td>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • Nasi putih, jagung, kentang, ubi<br />
              • Roti tawar, mie, bihun<br />
              • Buah tinggi gula (durian, mangga matang, anggur)
            </td>
            <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
              • Gula pasir, gula jawa, sirup, madu berlebih<br />
              • Minuman kemasan manis, teh/kopi manis<br />
              • Makanan cepat saji, gorengan, kue basah manis
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
      <h3>7 Langkah Penyuntikan Insulin</h3>
      <div style={{ margin: '12px 0', textAlign: 'center' }}>
        <img
          src="/LangkahInsulin.png"
          alt="Panduan Gambar 7 Langkah Menyuntik Insulin"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      </div>
      <div className="steps">
        {[
          'Cuci tangan hingga bersih dengan sabun dan air mengalir.',
          'Siapkan pena insulin, pasang jarum baru, dan lakukan uji aliran (2 unit).',
          'Atur dosis insulin sesuai intruksi dan resep dokter.',
          'Pilih lokasi suntikan (perut, paha, atau lengan atas) dan bersihkan.',
          'Cubit lembut kulit area penyuntikan.',
          'Suntikkan insulin tegak lurus (90°), tekan tombol hingga habis, dan tahan 10 detik.',
          'Lepaskan jarum dari pena insulin dan buang jarum ke tempat aman.'
        ].map((x, i) => <div key={x}><b>{i + 1}</b><span>{x}</span></div>)}
      </div>
    </div>
  );
}

function HealingStages() {
  return (
    <div className="special-card" style={{ marginTop: '20px' }}>
      <h3>Tahapan / Fase Penyembuhan Luka</h3>
      <div style={{ margin: '12px 0', textAlign: 'center' }}>
        <img
          src="/FaseLuka.png"
          alt="Diagram Fase Penyembuhan Luka"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
        />
      </div>
      <div className="timeline">
        {[
          ['1. Fase Hemostasis (Penghentian Perdarahan)', 'Terjadi segera saat luka muncul, pembuluh darah menyempit & darah membeku.'],
          ['2. Fase Inflamasi (Peradangan)', 'Berlangsung hari ke 1–4. Tubuh membersihkan kuman & timbul kemerahan halus.'],
          ['3. Fase Proliferasi (Pembentukan Jaringan)', 'Berlangsung hari ke 4–21. Jaringan baru & pembuluh darah baru mulai tumbuh.'],
          ['4. Fase Maturasi / Remodeling (Pematangan)', 'Berlangsung dari minggu ke-3 hingga berbulan-bulan. Luka menutup & menguat.']
        ].map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}
      </div>
    </div>
  );
}

function ChecklistPage({ d }: { d: Diagnosis }) { const [checked, setChecked] = useState<boolean[]>(d.checklist.map(() => false)); return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">LANGKAH 2 DARI 3</p><h1>Checklist Pemahaman</h1><p>Pastikan Anda sudah memahami hal-hal berikut sebelum melanjutkan.</p></div><div className="progress"><span style={{ width: '66%' }} /></div><div className="check-card">{d.checklist.map((item, i) => <label key={item} className={`check-row ${checked[i] ? 'checked' : ''}`}><input type="checkbox" checked={checked[i]} onChange={e => setChecked(prev => prev.map((v, j) => j === i ? e.target.checked : v))} /><span>{item}</span><Check size={17} /></label>)}</div><Button disabled={!checked.every(Boolean)} onClick={() => go(`/edukasi/${d.id}/evaluasi`)}>Lanjut ke Evaluasi <ArrowRight size={17} /></Button></section>; }

function QuizPage({ d }: { d: Diagnosis }) {
  const [answers, setAnswers] = useState<number[]>([]);

  return (
    <section className="page">
      <Back />
      <div className="page-intro">
        <p className="eyebrow">LANGKAH 3 DARI 3</p>
        <h1>Evaluasi Pemahaman</h1>
        <p>Jawab pertanyaan berikut dengan memilih satu jawaban yang benar.</p>
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
        onClick={() => {
          const score = d.quiz.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
          go(`/edukasi/${d.id}/hasil?score=${score}`);
        }}
      >
        Submit Jawaban <ArrowRight size={17} />
      </Button>
    </section>
  );
}

function ResultPage({ d }: { d: Diagnosis }) {
  const score = Number(new URLSearchParams(window.location.search).get('score') || 0);
  const percentage = Math.round((score / d.quiz.length) * 100);

  return (
    <section className="page result-page">
      <div className="result-icon"><Check size={42} /></div>
      <p className="eyebrow">EVALUASI SELESAI</p>
      <h1>Terima Kasih!</h1>
      <p>Anda telah menyelesaikan edukasi discharge planning untuk <strong>{d.name}</strong>.</p>

      <div className="score-card">
        <div><span>Jawaban benar</span><strong>{score} / {d.quiz.length}</strong></div>
        <div><span>Nilai</span><strong>{percentage}%</strong></div>
      </div>

      <blockquote style={{ margin: '20px 0', padding: '12px 16px', borderLeft: '4px solid #0284c7', backgroundColor: '#f0f9ff', fontStyle: 'italic', borderRadius: '0 8px 8px 0' }}>
        “Pulang bukan akhir perawatan, tapi awal dari kemandirian.”
      </blockquote>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
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
      <div className="page-intro"><p className="eyebrow">JADWAL PENGINGAT KONTROL</p><h1>Jadwal Kontrol Saya</h1><p>Isi jadwal kontrol Anda sendiri. Data tersimpan aman di handphone ini.</p></div>
      <div className="content-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '16px' }}><Plus size={20} /> Tambah Jadwal Kontrol</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Tanggal Kontrol *</label>
            <input type="date" required value={formData.tanggal} onChange={e => setFormData({ ...formData, tanggal: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Poli / Nama Dokter *</label>
            <input type="text" required placeholder="Contoh: Poli Penyakit Dalam / dr. Andi" value={formData.poliDokter} onChange={e => setFormData({ ...formData, poliDokter: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Jam Berobat (24 Jam WIB)</label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <select value={formData.jam} onChange={e => setFormData({ ...formData, jam: e.target.value })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {hours.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <span style={{ fontWeight: 'bold' }}>:</span>
                <select value={formData.menit} onChange={e => setFormData({ ...formData, menit: e.target.value })} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                  {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>WIB</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>Catatan Tambahan</label>
              <input type="text" placeholder="Contoh: Bawa Kartu BPJS" value={formData.catatan} onChange={e => setFormData({ ...formData, catatan: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
          </div>
          <Button onClick={() => { }}>Simpan Jadwal Pengingat</Button>
          {isSaved && <p style={{ color: '#16a34a', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', margin: 0 }}><CheckCircle size={16} /> Jadwal berhasil tersimpan di HP ini!</p>}
        </form>
      </div>

      <div className="content-card">
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Daftar Pengingat Kontrol Tersimpan</h3>
        {schedules.length === 0 ? (
          <p className="muted" style={{ textAlign: 'center', padding: '20px 0' }}>Belum ada jadwal kontrol tersimpan di handphone ini.</p>
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

function ContactPage() { return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">BANTUAN & KONTAK</p><h1>Kontak kami</h1><p>Butuh bantuan atau informasi lebih lanjut? Kami siap membantu.</p></div><div className="contact-list">{([['Ruangan', 'Ruang Rawat Inap Melati', '(021) 1234 5678', Home], ['Poliklinik', 'Poliklinik Penyakit Dalam', '(021) 8765 4321', Stethoscope], ['Jam Pelayanan', 'Senin–Jumat · 07.00–15.00 WIB', 'Sabtu · 07.00–12.00 WIB', Clock3]] as [string, string, string, typeof Home][]).map(([title, one, two, Icon]) => <div className="contact-card" key={String(title)}><span className="contact-icon"><Icon size={21} /></span><div><strong>{title}</strong><span>{one}</span><small>{two}</small></div></div>)}</div><Button onClick={() => window.open('https://wa.me/622112345678', '_blank')}><MessageCircle size={18} /> Hubungi via WhatsApp</Button></section>; }
function FAQPage() { const [active, setActive] = useState<number | null>(null); const faqs = [['Apa yang perlu disiapkan sebelum pulang?', 'Pastikan Anda memahami obat, diet, aktivitas, tanda bahaya, dan jadwal kontrol.'], ['Kapan harus segera ke rumah sakit?', 'Jika muncul tanda bahaya seperti sesak berat, penurunan kesadaran, nyeri dada, atau perdarahan yang tidak berhenti.'], ['Bagaimana jika lupa minum obat?', 'Jangan menggandakan dosis. Ikuti petunjuk dokter atau hubungi fasilitas kesehatan.'], ['Siapa yang bisa membantu menggunakan SIAP PULANG?', 'Keluarga dan pendamping dapat membaca materi bersama pasien.']]; return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">PERTANYAAN UMUM</p><h1>Ada yang ingin ditanyakan?</h1><p>Temukan jawaban dari pertanyaan yang sering ditanyakan pasien.</p></div><div className="faq-list">{faqs.map(([q, a], i) => <div className="faq-item" key={q}><button onClick={() => setActive(active === i ? null : i)}><strong>{q}</strong><ChevronDown className={active === i ? 'rotate' : ''} size={19} /></button>{active === i && <p>{a}</p>}</div>)}</div></section>; }
function WarningPage() { return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">PENTING UNTUK DIKETAHUI</p><h1>Tanda bahaya</h1><p>Segera hubungi tenaga kesehatan atau layanan gawat darurat bila mengalami gejala berikut.</p></div><div className="warning-grid">{diagnoses.slice(0, 6).map(d => <div className="warning-card" key={d.id}><div><d.icon size={20} /><strong>{d.name}</strong></div><List items={d.warning} /></div>)}</div><div className="emergency"><ShieldAlert size={24} /><div><strong>Dalam keadaan darurat</strong><p>Hubungi IGD rumah sakit atau layanan darurat terdekat.</p></div></div></section>; }
function ReadyPage() { return <section className="page"><Back /><div className="page-intro"><p className="eyebrow">PERSIAPAN PULANG</p><h1>Siap pulang dengan percaya diri</h1><p>Gunakan panduan ini bersama keluarga sebelum meninggalkan rumah sakit.</p></div><div className="ready-steps">{([['Pahami kondisi', 'Kenali diagnosis, gejala, dan perawatan Anda.', Stethoscope], ['Siapkan obat', 'Tanyakan nama, dosis, dan waktu minum obat.', Pill], ['Atur kehidupan di rumah', 'Ikuti aturan diet dan aktivitas yang aman.', Home], ['Catat jadwal kontrol', 'Simpan tanggal, jam, dan dokumen yang dibutuhkan.', CalendarDays]] as [string, string, typeof Stethoscope][]).map(([title, text, Icon], i) => <div key={String(title)}><b>{i + 1}</b><Icon size={22} /><div><strong>{title}</strong><p>{text}</p></div></div>)}</div><Button onClick={() => go('/edukasi')}>Mulai Edukasi <ArrowRight size={17} /></Button></section>; }

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