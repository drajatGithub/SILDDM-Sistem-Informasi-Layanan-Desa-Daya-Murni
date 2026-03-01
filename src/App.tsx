import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { 
  Home as HomeIcon, 
  Info, 
  Newspaper, 
  Image as ImageIcon, 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  Trash2, 
  Plus, 
  CheckCircle, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "./services/api";

// --- COMPONENTS ---

const Navbar = ({ isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const navItems = isAdmin 
    ? [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Berita", path: "/admin/news", icon: Newspaper },
        { name: "Galeri", path: "/admin/gallery", icon: ImageIcon },
        { name: "Surat Masuk", path: "/admin/letters", icon: FileText },
      ]
    : [
        { name: "Beranda", path: "/", icon: HomeIcon },
        { name: "Profil", path: "/profile", icon: Info },
        { name: "Berita", path: "/news", icon: Newspaper },
        { name: "Galeri", path: "/gallery", icon: ImageIcon },
        { name: "Layanan Surat", path: "/letter-form", icon: FileText },
      ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">SILDDM</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Keluar
              </button>
            )}
            {!isAdmin && !token && (
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Admin
              </Link>
            )}
            {!isAdmin && token && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-600 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
              {isAdmin && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={20} />
                  Keluar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              D
            </div>
            <span className="font-bold text-2xl tracking-tight">SILDDM</span>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed">
            Sistem Informasi Layanan Desa Daya Murni (SILDDM) adalah platform digital resmi untuk mempermudah akses informasi dan pelayanan administrasi bagi seluruh warga Desa Daya Murni.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6">Kontak Kami</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-emerald-500 shrink-0" />
              <span>Jl. Raya Desa Daya Murni No. 123, Kec. Daya Murni, Kab. Lampung Tengah</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-emerald-500 shrink-0" />
              <span>(0721) 123456</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-emerald-500 shrink-0" />
              <span>info@dayamurni.desa.id</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-6">Ikuti Kami</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Desa Daya Murni. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- PAGES ---

const Home = () => {
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await api.getNews();
      const galleryData = await api.getGallery();
      setNews(newsData.slice(0, 3));
      setGallery(galleryData.slice(0, 4));
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80" 
            alt="Desa Daya Murni" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Selamat Datang di <br />
              <span className="text-emerald-400">Desa Daya Murni</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
              Pusat informasi dan pelayanan digital Desa Daya Murni. Kami berkomitmen memberikan pelayanan terbaik, transparan, dan akuntabel bagi seluruh warga.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/letter-form" 
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-900/20"
              >
                Layanan Surat Online
              </Link>
              <Link 
                to="/profile" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-xl font-bold text-lg transition-all"
              >
                Profil Desa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features/Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Pelayanan Cepat", desc: "Pengajuan surat online yang diproses secara efisien oleh perangkat desa.", icon: Clock },
            { title: "Informasi Terkini", desc: "Dapatkan berita dan pengumuman terbaru seputar kegiatan dan program desa.", icon: Newspaper },
            { title: "Transparansi", desc: "Akses informasi publik desa yang terbuka dan dapat dipertanggungjawabkan.", icon: CheckCircle },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Berita Terbaru</h2>
            <p className="text-gray-600">Informasi dan kegiatan terkini di Desa Daya Murni</p>
          </div>
          <Link to="/news" className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Lihat Semua <ChevronRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.length > 0 ? news.map((item: any) => (
            <Link key={item.id} to={`/news/${item.id}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-lg transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image_url || "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <p className="text-emerald-600 text-sm font-bold mb-2 uppercase tracking-wider">
                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">{item.content}</p>
                  <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                    Baca Selengkapnya <ChevronRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-3 py-12 text-center text-gray-500">Belum ada berita.</div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Galeri Kegiatan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dokumentasi berbagai kegiatan dan keindahan Desa Daya Murni</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.length > 0 ? gallery.map((item: any) => (
              <div key={item.id} className="aspect-square rounded-2xl overflow-hidden group relative">
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-4 py-12 text-center text-gray-500">Belum ada foto.</div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/gallery" className="px-8 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all inline-block">
              Lihat Galeri Lengkap
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Profile = () => (
  <div className="pb-20">
    <div className="bg-emerald-600 py-20 text-white mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Profil Desa</h1>
        <p className="text-emerald-100 text-lg max-w-2xl">Mengenal lebih dekat sejarah, visi, misi, dan struktur organisasi Desa Daya Murni.</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-emerald-600 rounded-full" />
            Sejarah Desa
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Desa Daya Murni didirikan pada tahun 1975 oleh sekelompok transmigran yang memiliki semangat juang tinggi untuk membangun peradaban baru di tanah Lampung. Nama "Daya Murni" sendiri diambil dari filosofi kekuatan yang murni dan tulus dalam membangun kebersamaan.
            </p>
            <p>
              Seiring berjalannya waktu, desa ini berkembang pesat dari sebuah pemukiman kecil menjadi pusat pertumbuhan ekonomi lokal di wilayahnya, dengan fokus utama pada sektor pertanian dan perkebunan yang berkelanjutan.
            </p>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" 
            alt="Sejarah Desa" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="bg-gray-50 rounded-3xl p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">Visi</h2>
            <p className="text-xl font-medium text-gray-800 italic leading-relaxed">
              "Mewujudkan Desa Daya Murni yang Mandiri, Sejahtera, dan Unggul dalam Pelayanan Publik Berbasis Teknologi Informasi pada Tahun 2029."
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6 text-emerald-700">Misi</h2>
            <ul className="space-y-4 text-gray-600">
              {[
                "Meningkatkan kualitas sumber daya manusia melalui program pendidikan dan pelatihan.",
                "Mengoptimalkan pelayanan publik dengan sistem digitalisasi yang transparan.",
                "Mendorong pertumbuhan ekonomi lokal berbasis potensi desa.",
                "Membangun infrastruktur desa yang merata dan berkualitas.",
                "Menjaga kelestarian lingkungan dan kearifan lokal desa."
              ].map((misi, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0 mt-1 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span>{misi}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">Struktur Organisasi</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Kepala Desa */}
            <div className="bg-white border-2 border-emerald-600 p-6 rounded-2xl shadow-lg text-center w-64">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden border-4 border-emerald-50">
                <img src="https://i.pravatar.cc/150?u=kades" alt="Kades" />
              </div>
              <h3 className="font-bold text-lg">H. Ahmad Subarjo</h3>
              <p className="text-emerald-600 font-medium text-sm">Kepala Desa</p>
            </div>

            <div className="w-px h-8 bg-gray-300" />

            {/* Sekdes */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md text-center w-64">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=sekdes" alt="Sekdes" />
              </div>
              <h3 className="font-bold">Budi Santoso, S.T.</h3>
              <p className="text-gray-500 font-medium text-sm">Sekretaris Desa</p>
            </div>

            <div className="w-px h-8 bg-gray-300" />

            {/* Kaur/Kasi */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {[
                { name: "Siti Aminah", role: "Kaur Keuangan" },
                { name: "Rudi Hermawan", role: "Kaur Umum" },
                { name: "Dewi Lestari", role: "Kasi Pelayanan" },
                { name: "Andi Wijaya", role: "Kasi Kesejahteraan" },
              ].map((staff, i) => (
                <div key={i} className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${staff.name}`} alt={staff.name} />
                  </div>
                  <h4 className="font-bold text-sm">{staff.name}</h4>
                  <p className="text-gray-500 text-xs">{staff.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getNews();
      setNews(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="pb-20">
      <div className="bg-emerald-600 py-20 text-white mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Berita & Pengumuman</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Dapatkan informasi terbaru mengenai program, kegiatan, dan pengumuman resmi Desa Daya Murni.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <Link key={item.id} to={`/news/${item.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={item.image_url || "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80"} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-emerald-600 text-sm font-bold mb-2 uppercase tracking-wider">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                    <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow">{item.content}</p>
                    <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                      Baca Selengkapnya <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <Newspaper size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Belum ada berita yang dipublikasikan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await api.getNewsById(id);
        setItem(data);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="flex justify-center py-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;
  if (!item) return <div className="text-center py-40">Berita tidak ditemukan.</div>;

  return (
    <div className="pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Link to="/news" className="text-emerald-600 font-bold flex items-center gap-2 mb-8 hover:gap-3 transition-all">
          <ChevronRight size={20} className="rotate-180" /> Kembali ke Berita
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{item.title}</h1>
        <div className="flex items-center gap-4 mb-10 text-gray-500">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>Admin Desa</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden mb-12 shadow-xl">
          <img 
            src={item.image_url || "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80"} 
            alt={item.title} 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          {item.content.split('\n').map((p: string, i: number) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getGallery();
      setGallery(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="pb-20">
      <div className="bg-emerald-600 py-20 text-white mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Galeri Kegiatan</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Dokumentasi visual berbagai momen penting dan pembangunan di Desa Daya Murni.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((item: any) => (
              <motion.div 
                key={item.id} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-2xl overflow-hidden group relative shadow-sm hover:shadow-xl transition-all"
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <p className="text-white font-bold text-lg">{item.title}</p>
                  <p className="text-emerald-400 text-sm">{new Date(item.created_at).toLocaleDateString('id-ID', { year: 'numeric' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl">
            <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Belum ada foto di galeri.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const LetterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    address: "",
    letter_type: "Surat Keterangan Domisili",
    purpose: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitLetter(formData);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Gagal mengirim pengajuan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-emerald-50 p-12 rounded-3xl border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-emerald-200">
            <CheckCircle size={40} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Pengajuan Terkirim!</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Terima kasih, {formData.name}. Pengajuan surat Anda telah kami terima dan sedang dalam proses verifikasi oleh perangkat desa. Kami akan menghubungi Anda segera.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            Buat Pengajuan Baru
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-emerald-600 py-20 text-white mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Layanan Surat Online</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">Ajukan berbagai keperluan administrasi surat menyurat dengan mudah dan cepat tanpa harus datang ke balai desa.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Nama Lengkap</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Masukkan nama sesuai KTP"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">NIK (Nomor Induk Kependudukan)</label>
                <input 
                  required
                  type="text" 
                  value={formData.nik}
                  onChange={e => setFormData({...formData, nik: e.target.value})}
                  placeholder="16 digit nomor NIK"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Alamat Lengkap</label>
              <textarea 
                required
                rows={3}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Masukkan alamat lengkap RT/RW"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Jenis Surat</label>
              <select 
                value={formData.letter_type}
                onChange={e => setFormData({...formData, letter_type: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              >
                <option>Surat Keterangan Domisili</option>
                <option>Surat Keterangan Tidak Mampu (SKTM)</option>
                <option>Surat Keterangan Usaha (SKU)</option>
                <option>Surat Keterangan Kematian</option>
                <option>Surat Pengantar SKCK</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Keperluan / Alasan Pengajuan</label>
              <textarea 
                required
                rows={4}
                value={formData.purpose}
                onChange={e => setFormData({...formData, purpose: e.target.value})}
                placeholder="Jelaskan secara singkat tujuan pembuatan surat ini"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim Pengajuan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.login({ username, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/admin");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 border border-gray-100 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            D
          </div>
          <h1 className="text-2xl font-bold">Login Admin</h1>
          <p className="text-gray-500">Akses dashboard pengelolaan SILDDM</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 text-center font-medium">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Username</label>
            <input 
              required
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ADMIN PAGES ---

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAdmin={true} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({ news: 0, gallery: 0, letters: 0 });
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await api.getNews();
      const galleryData = await api.getGallery();
      const lettersData = await api.getAdminLetters(token);
      setStats({
        news: newsData.length,
        gallery: galleryData.length,
        letters: lettersData.length
      });
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Berita", value: stats.news, icon: Newspaper, color: "bg-blue-500" },
          { label: "Total Foto Galeri", value: stats.gallery, icon: ImageIcon, color: "bg-purple-500" },
          { label: "Pengajuan Surat", value: stats.letters, icon: FileText, color: "bg-emerald-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-gray-500 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Selamat Datang, Admin!</h2>
        <p className="text-gray-600 leading-relaxed">
          Gunakan menu navigasi di atas untuk mengelola konten website Desa Daya Murni. Anda dapat menambah berita baru, mengunggah foto kegiatan ke galeri, dan memproses pengajuan surat dari warga.
        </p>
      </div>
    </div>
  );
};

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", image_url: "" });
  const token = localStorage.getItem("token") || "";

  const fetchNews = () => api.getNews().then(setNews);
  useEffect(() => { fetchNews(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addNews(formData, token);
    setFormData({ title: "", content: "", image_url: "" });
    setShowForm(false);
    fetchNews();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus berita ini?")) {
      await api.deleteNews(id, token);
      fetchNews();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kelola Berita</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Batal" : "Tambah Berita"}
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Judul Berita</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">URL Gambar</label>
              <input 
                required
                type="text" 
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Konten Berita</label>
              <textarea 
                required
                rows={6}
                value={formData.content}
                onChange={e => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500"
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">Simpan Berita</button>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">Judul</th>
              <th className="px-6 py-4 font-bold text-gray-700">Tanggal</th>
              <th className="px-6 py-4 font-bold text-gray-700 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {news.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.title}</td>
                <td className="px-6 py-4 text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", image_url: "" });
  const token = localStorage.getItem("token") || "";

  const fetchGallery = () => api.getGallery().then(setGallery);
  useEffect(() => { fetchGallery(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.addGallery(formData, token);
    setFormData({ title: "", image_url: "" });
    setShowForm(false);
    fetchGallery();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus foto ini?")) {
      await api.deleteGallery(id, token);
      fetchGallery();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kelola Galeri</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "Batal" : "Tambah Foto"}
        </button>
      </div>

      {showForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Judul Foto</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">URL Gambar</label>
              <input 
                required
                type="text" 
                value={formData.image_url}
                onChange={e => setFormData({...formData, image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-emerald-500"
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold">Simpan Foto</button>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group relative">
            <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
            <div className="p-4 flex justify-between items-center">
              <p className="font-medium text-sm truncate pr-2">{item.title}</p>
              <button 
                onClick={() => handleDelete(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminLetters = () => {
  const [letters, setLetters] = useState([]);
  const token = localStorage.getItem("token") || "";

  const fetchLetters = () => api.getAdminLetters(token).then(setLetters);
  useEffect(() => { fetchLetters(); }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await api.updateLetterStatus(id, status, token);
    fetchLetters();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Pengajuan Surat Masuk</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-700">Nama / NIK</th>
                <th className="px-6 py-4 font-bold text-gray-700">Jenis Surat</th>
                <th className="px-6 py-4 font-bold text-gray-700">Keperluan</th>
                <th className="px-6 py-4 font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 font-bold text-gray-700 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {letters.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.nik}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-emerald-600">{item.letter_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{item.purpose}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {item.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(item.id, 'processed')}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"
                      >
                        Proses
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-white text-gray-900">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />
          <Route path="/news" element={<><Navbar /><NewsList /><Footer /></>} />
          <Route path="/news/:id" element={<><Navbar /><NewsDetail /><Footer /></>} />
          <Route path="/gallery" element={<><Navbar /><Gallery /><Footer /></>} />
          <Route path="/letter-form" element={<><Navbar /><LetterForm /><Footer /></>} />
          <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/news" element={<AdminLayout><AdminNews /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
          <Route path="/admin/letters" element={<AdminLayout><AdminLetters /></AdminLayout>} />
        </Routes>
      </div>
    </Router>
  );
}
