import { verifyAdminPassword } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  type PortfolioItem,
  type PortfolioCreateInput,
} from "@/lib/portfolio";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  type TestimonialItem,
  type TestimonialCreateInput,
} from "@/lib/testimonials";
import {
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  type FaqItem,
  type FaqCreateInput,
} from "@/lib/faqs";
import {
  getAllServiceDesigns,
  createServiceDesign,
  updateServiceDesign,
  deleteServiceDesign,
  type ServiceDesign,
  type ServiceDesignCreateInput,
} from "@/lib/service-designs";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const CATEGORIES = [
  "Pagar", "Kanopi", "Railing", "Balkon",
  "Tralis", "Baja Ringan", "Las Panggilan",
  "Konstruksi Baja", "Pintu Besi",
];

const emptyPortfolio: PortfolioCreateInput = {
  title: "", category: "", location: "", description: "",
  image_url: "", is_featured: 0, sort_order: 0,
};

const emptyTestimonial: TestimonialCreateInput = {
  name: "", location: "", rating: 5, text: "", avatar_url: "", sort_order: 0,
};

const emptyFaq: FaqCreateInput = {
  question: "", answer: "", sort_order: 0,
};

const SERVICES_SLUGS = [
  { slug: "pagar-besi", label: "Pagar Besi" },
  { slug: "kanopi", label: "Kanopi" },
  { slug: "railing-tangga", label: "Railing Tangga" },
  { slug: "balkon", label: "Balkon" },
  { slug: "tralis-jendela", label: "Tralis Jendela" },
  { slug: "baja-ringan", label: "Konstruksi Baja Ringan" },
  { slug: "las-panggilan", label: "Las Panggilan" },
  { slug: "konstruksi-baja", label: "Konstruksi Baja" },
  { slug: "pintu-besi", label: "Pintu Besi" },
];

const emptyDesain: ServiceDesignCreateInput = {
  service_slug: "",
  name: "",
  description: "",
  image_url: "",
  sort_order: 0,
};

type Tab = "portfolio" | "testimoni" | "faq" | "desain";

// ─── Login Page ───────────────────────────────────────────────────────────────

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  const loginMutation = useMutation({
    mutationFn: (pwd: string) => verifyAdminPassword({ data: { password: pwd } }),
    onSuccess: () => {
      setAuthed(true);
      setAuthError("");
    },
    onError: (err: any) => {
      setAuthError(err?.message ?? "Password salah");
    },
  });

  function handleLogin() {
    if (!password) return;
    loginMutation.mutate(password);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-xl w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="text-slate-400 text-sm mb-6">Bara Baja Las CMS</p>
          <input
            type="password"
            placeholder="Password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-orange-500"
          />
          {authError && (
            <p className="text-red-400 text-sm mb-3">{authError}</p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loginMutation.isPending}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {loginMutation.isPending ? "Memverifikasi..." : "Masuk"}
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => { setAuthed(false); setPassword(""); }} />;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("portfolio");

  // Portfolio state
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [editPortfolio, setEditPortfolio] = useState<PortfolioItem | null>(null);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioCreateInput>(emptyPortfolio);
  const [deletePortfolioConfirm, setDeletePortfolioConfirm] = useState<number | null>(null);

  // Testimoni state
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState<TestimonialItem | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<TestimonialCreateInput>(emptyTestimonial);
  const [deleteTestimonialConfirm, setDeleteTestimonialConfirm] = useState<number | null>(null);

  // FAQ state
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editFaq, setEditFaq] = useState<FaqItem | null>(null);
  const [faqForm, setFaqForm] = useState<FaqCreateInput>(emptyFaq);
  const [deleteFaqConfirm, setDeleteFaqConfirm] = useState<number | null>(null);
  const { data: desainItems = [], isLoading: loadingDesain } = useQuery({
    queryKey: ["admin-desain"],
    queryFn: () => getAllServiceDesigns(),
    retry: false,
    throwOnError: false,
  });

  // Desain state
  const [showDesainForm, setShowDesainForm] = useState(false);
  const [editDesain, setEditDesain] = useState<ServiceDesign | null>(null);
  const [desainForm, setDesainForm] = useState<ServiceDesignCreateInput>(emptyDesain);
  const [deleteDesainConfirm, setDeleteDesainConfirm] = useState<number | null>(null);

  // Queries
  const { data: portfolioItems = [], isLoading: loadingPortfolio } = useQuery({
    queryKey: ["admin-portfolio"],
    queryFn: () => getPortfolioItems(),
    retry: false,
    throwOnError: false,
  });

  const { data: testimonialItems = [], isLoading: loadingTestimonial } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: () => getTestimonials(),
    retry: false,
    throwOnError: false,
  });

  const { data: faqItems = [], isLoading: loadingFaq } = useQuery({
    queryKey: ["admin-faqs"],
    queryFn: () => getFaqs(),
    retry: false,
    throwOnError: false,
  });

  // Portfolio mutations
  const invalidatePortfolio = () => queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });
  const createPortfolioMutation = useMutation({
    mutationFn: (data: PortfolioCreateInput) => createPortfolioItem({ data }),
    onSuccess: () => { invalidatePortfolio(); resetPortfolioForm(); },
  });
  const updatePortfolioMutation = useMutation({
    mutationFn: (data: PortfolioCreateInput & { id: number }) => updatePortfolioItem({ data }),
    onSuccess: () => { invalidatePortfolio(); resetPortfolioForm(); },
  });
  const deletePortfolioMutation = useMutation({
    mutationFn: (id: number) => deletePortfolioItem({ data: { id } }),
    onSuccess: () => { invalidatePortfolio(); setDeletePortfolioConfirm(null); },
  });

  // Testimoni mutations
  const invalidateTestimonial = () => queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
  const createTestimonialMutation = useMutation({
    mutationFn: (data: TestimonialCreateInput) => createTestimonial({ data }),
    onSuccess: () => { invalidateTestimonial(); resetTestimonialForm(); },
  });
  const updateTestimonialMutation = useMutation({
    mutationFn: (data: TestimonialCreateInput & { id: number }) => updateTestimonial({ data }),
    onSuccess: () => { invalidateTestimonial(); resetTestimonialForm(); },
  });
  const deleteTestimonialMutation = useMutation({
    mutationFn: (id: number) => deleteTestimonial({ data: { id } }),
    onSuccess: () => { invalidateTestimonial(); setDeleteTestimonialConfirm(null); },
  });

  // Desain mutations
  const invalidateDesain = () => queryClient.invalidateQueries({ queryKey: ["admin-desain"] });
  const createDesainMutation = useMutation({
    mutationFn: (data: ServiceDesignCreateInput) => createServiceDesign({ data }),
    onSuccess: () => { invalidateDesain(); resetDesainForm(); },
  });
  const updateDesainMutation = useMutation({
    mutationFn: (data: ServiceDesignCreateInput & { id: number }) => updateServiceDesign({ data }),
    onSuccess: () => { invalidateDesain(); resetDesainForm(); },
  });
  const deleteDesainMutation = useMutation({
    mutationFn: (id: number) => deleteServiceDesign({ data: { id } }),
    onSuccess: () => { invalidateDesain(); setDeleteDesainConfirm(null); },
  });

  // FAQ mutations
  const invalidateFaq = () => queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
  const createFaqMutation = useMutation({
    mutationFn: (data: FaqCreateInput) => createFaq({ data }),
    onSuccess: () => { invalidateFaq(); resetFaqForm(); },
  });
  const updateFaqMutation = useMutation({
    mutationFn: (data: FaqCreateInput & { id: number }) => updateFaq({ data }),
    onSuccess: () => { invalidateFaq(); resetFaqForm(); },
  });
  const deleteFaqMutation = useMutation({
    mutationFn: (id: number) => deleteFaq({ data: { id } }),
    onSuccess: () => { invalidateFaq(); setDeleteFaqConfirm(null); },
  });

  // Portfolio helpers
  function resetPortfolioForm() {
    setPortfolioForm(emptyPortfolio);
    setEditPortfolio(null);
    setShowPortfolioForm(false);
  }
  function openEditPortfolio(item: PortfolioItem) {
    setEditPortfolio(item);
    setPortfolioForm({
      title: item.title, category: item.category, location: item.location,
      description: item.description ?? "", image_url: item.image_url,
      is_featured: item.is_featured, sort_order: item.sort_order,
    });
    setShowPortfolioForm(true);
  }
  function handlePortfolioSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editPortfolio) updatePortfolioMutation.mutate({ ...portfolioForm, id: editPortfolio.id });
    else createPortfolioMutation.mutate(portfolioForm);
  }

  // Testimoni helpers
  function resetTestimonialForm() {
    setTestimonialForm(emptyTestimonial);
    setEditTestimonial(null);
    setShowTestimonialForm(false);
  }
  function openEditTestimonial(item: TestimonialItem) {
    setEditTestimonial(item);
    setTestimonialForm({
      name: item.name, location: item.location, rating: item.rating,
      text: item.text, avatar_url: item.avatar_url ?? "", sort_order: item.sort_order,
    });
    setShowTestimonialForm(true);
  }
  function handleTestimonialSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editTestimonial) updateTestimonialMutation.mutate({ ...testimonialForm, id: editTestimonial.id });
    else createTestimonialMutation.mutate(testimonialForm);
  }

  // FAQ helpers
  function resetFaqForm() {
    setFaqForm(emptyFaq);
    setEditFaq(null);
    setShowFaqForm(false);
  }
  function openEditFaq(item: FaqItem) {
    setEditFaq(item);
    setFaqForm({ question: item.question, answer: item.answer, sort_order: item.sort_order });
    setShowFaqForm(true);
  }
  function handleFaqSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editFaq) updateFaqMutation.mutate({ ...faqForm, id: editFaq.id });
    else createFaqMutation.mutate(faqForm);
  }

  // Helpers desain
  function resetDesainForm() {
    setDesainForm(emptyDesain);
    setEditDesain(null);
    setShowDesainForm(false);
  }
  function openEditDesain(item: ServiceDesign) {
    setEditDesain(item);
    setDesainForm({
      service_slug: item.service_slug,
      name: item.name,
      description: item.description ?? "",
      image_url: item.image_url,
      sort_order: item.sort_order,
    });
    setShowDesainForm(true);
  }
  function handleDesainSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editDesain) updateDesainMutation.mutate({ ...desainForm, id: editDesain.id });
    else createDesainMutation.mutate(desainForm);
  }

  const isDesainPending = createDesainMutation.isPending || updateDesainMutation.isPending;
  const isPortfolioPending = createPortfolioMutation.isPending || updatePortfolioMutation.isPending;
  const isTestimonialPending = createTestimonialMutation.isPending || updateTestimonialMutation.isPending;
  const isFaqPending = createFaqMutation.isPending || updateFaqMutation.isPending;

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 text-xs">Bara Baja Las CMS</p>
        </div>
        <div className="flex gap-3 items-center">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition">
            Lihat Website ↗
          </a>
          <button type="button" onClick={onLogout}
            className="text-sm text-slate-400 hover:text-red-400 transition">
            Keluar
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 border-b border-slate-700 px-6">
        <div className="flex gap-1">
          {(["portfolio", "testimoni", "faq", "desain"] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab === "portfolio" ? "Portfolio" : tab === "testimoni" ? "Testimoni" : tab === "faq" ? "FAQ" : "Desain Layanan"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* TAB PORTFOLIO */}
        {activeTab === "portfolio" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Portfolio
                <span className="ml-2 text-sm font-normal text-slate-400">({portfolioItems.length} item)</span>
              </h2>
              <button type="button"
                onClick={() => { resetPortfolioForm(); setShowPortfolioForm(true); }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                + Tambah Item
              </button>
            </div>

            {showPortfolioForm && (
              <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="font-semibold text-white mb-4">
                  {editPortfolio ? "Edit Item Portfolio" : "Tambah Item Portfolio"}
                </h3>
                <form onSubmit={handlePortfolioSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Judul *</label>
                    <input required value={portfolioForm.title}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                      placeholder="Pagar Minimalis Modern"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Kategori *</label>
                    <select required value={portfolioForm.category}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="">Pilih kategori</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Lokasi *</label>
                    <input required value={portfolioForm.location}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, location: e.target.value })}
                      placeholder="Karawang Barat"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">URL Gambar *</label>
                    <input required value={portfolioForm.image_url}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, image_url: e.target.value })}
                      placeholder="/assets/foto.jpg atau https://..."
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-400 mb-1 block">Deskripsi</label>
                    <textarea value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                      placeholder="Deskripsi singkat proyek (opsional)" rows={2}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Urutan tampil</label>
                    <input type="number" value={portfolioForm.sort_order}
                      onChange={(e) => setPortfolioForm({ ...portfolioForm, sort_order: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="flex items-center gap-3 pt-4">
                    <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                      <input type="checkbox" checked={portfolioForm.is_featured === 1}
                        onChange={(e) => setPortfolioForm({ ...portfolioForm, is_featured: e.target.checked ? 1 : 0 })}
                        className="accent-orange-500" />
                      Tampilkan di halaman utama
                    </label>
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button type="submit" disabled={isPortfolioPending}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                      {isPortfolioPending ? "Menyimpan..." : editPortfolio ? "Simpan Perubahan" : "Tambah Item"}
                    </button>
                    <button type="button" onClick={resetPortfolioForm}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg transition">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingPortfolio ? (
              <div className="text-slate-400 text-center py-16">Memuat data...</div>
            ) : portfolioItems.length === 0 ? (
              <div className="text-slate-400 text-center py-16">Belum ada item portfolio.</div>
            ) : (
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-left">
                      <th className="px-4 py-3 font-medium">Gambar</th>
                      <th className="px-4 py-3 font-medium">Judul</th>
                      <th className="px-4 py-3 font-medium">Kategori</th>
                      <th className="px-4 py-3 font-medium">Lokasi</th>
                      <th className="px-4 py-3 font-medium">Featured</th>
                      <th className="px-4 py-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioItems.map((item: PortfolioItem) => (
                      <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                        <td className="px-4 py-3">
                          <img src={item.image_url} alt={item.title}
                            className="w-14 h-10 object-cover rounded-md bg-slate-700" />
                        </td>
                        <td className="px-4 py-3 font-medium text-white">{item.title}</td>
                        <td className="px-4 py-3">
                          <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs">{item.category}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-400">{item.location}</td>
                        <td className="px-4 py-3">
                          {item.is_featured === 1
                            ? <span className="text-orange-400 text-xs font-medium">✓ Ya</span>
                            : <span className="text-slate-500 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => openEditPortfolio(item)}
                              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition">
                              Edit
                            </button>
                            {deletePortfolioConfirm === item.id ? (
                              <div className="flex gap-1">
                                <button type="button" onClick={() => deletePortfolioMutation.mutate(item.id)}
                                  disabled={deletePortfolioMutation.isPending}
                                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">
                                  Hapus?
                                </button>
                                <button type="button" onClick={() => setDeletePortfolioConfirm(null)}
                                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition">
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button type="button" onClick={() => setDeletePortfolioConfirm(item.id)}
                                className="text-xs bg-slate-700 hover:bg-red-600 text-slate-400 hover:text-white px-3 py-1 rounded transition">
                                Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB TESTIMONI */}
        {activeTab === "testimoni" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Testimoni
                <span className="ml-2 text-sm font-normal text-slate-400">({testimonialItems.length} item)</span>
              </h2>
              <button type="button"
                onClick={() => { resetTestimonialForm(); setShowTestimonialForm(true); }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                + Tambah Testimoni
              </button>
            </div>

            {showTestimonialForm && (
              <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="font-semibold text-white mb-4">
                  {editTestimonial ? "Edit Testimoni" : "Tambah Testimoni"}
                </h3>
                <form onSubmit={handleTestimonialSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Nama *</label>
                    <input required value={testimonialForm.name}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                      placeholder="Pak Ahmad"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Lokasi *</label>
                    <input required value={testimonialForm.location}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                      placeholder="Karawang Barat"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Rating *</label>
                    <select required value={testimonialForm.rating}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500">
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>{"⭐".repeat(r)} ({r})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">URL Foto (opsional)</label>
                    <input value={testimonialForm.avatar_url ?? ""}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar_url: e.target.value })}
                      placeholder="https://i.ibb.co/foto.jpg"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-400 mb-1 block">Teks Testimoni *</label>
                    <textarea required value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                      placeholder="Pengerjaan sangat rapi dan tepat waktu..." rows={3}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Urutan tampil</label>
                    <input type="number" value={testimonialForm.sort_order}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, sort_order: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button type="submit" disabled={isTestimonialPending}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                      {isTestimonialPending ? "Menyimpan..." : editTestimonial ? "Simpan Perubahan" : "Tambah Testimoni"}
                    </button>
                    <button type="button" onClick={resetTestimonialForm}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg transition">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingTestimonial ? (
              <div className="text-slate-400 text-center py-16">Memuat data...</div>
            ) : testimonialItems.length === 0 ? (
              <div className="text-slate-400 text-center py-16">Belum ada testimoni.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {testimonialItems.map((item: TestimonialItem) => (
                  <div key={item.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700 flex gap-4">
                    <div className="flex-shrink-0">
                      {item.avatar_url ? (
                        <img src={item.avatar_url} alt={item.name}
                          className="w-12 h-12 rounded-full object-cover bg-slate-700" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-lg">
                          {item.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-white text-sm">{item.name}</p>
                          <p className="text-slate-400 text-xs">{item.location}</p>
                          <p className="text-yellow-400 text-xs mt-0.5">{"⭐".repeat(item.rating)}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button type="button" onClick={() => openEditTestimonial(item)}
                            className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition">
                            Edit
                          </button>
                          {deleteTestimonialConfirm === item.id ? (
                            <div className="flex gap-1">
                              <button type="button" onClick={() => deleteTestimonialMutation.mutate(item.id)}
                                disabled={deleteTestimonialMutation.isPending}
                                className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">
                                Hapus?
                              </button>
                              <button type="button" onClick={() => setDeleteTestimonialConfirm(null)}
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition">
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button type="button" onClick={() => setDeleteTestimonialConfirm(item.id)}
                              className="text-xs bg-slate-700 hover:bg-red-600 text-slate-400 hover:text-white px-3 py-1 rounded transition">
                              Hapus
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm mt-2 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB FAQ */}
        {activeTab === "faq" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                FAQ
                <span className="ml-2 text-sm font-normal text-slate-400">({faqItems.length} item)</span>
              </h2>
              <button type="button"
                onClick={() => { resetFaqForm(); setShowFaqForm(true); }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                + Tambah FAQ
              </button>
            </div>

            {showFaqForm && (
              <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="font-semibold text-white mb-4">
                  {editFaq ? "Edit FAQ" : "Tambah FAQ"}
                </h3>
                <form onSubmit={handleFaqSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Pertanyaan *</label>
                    <input required value={faqForm.question}
                      onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                      placeholder="Apakah bisa survey lokasi gratis?"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Jawaban *</label>
                    <textarea required value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Bisa. Kami melayani survey lokasi gratis..." rows={3}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                  </div>
                  <div className="w-48">
                    <label className="text-sm text-slate-400 mb-1 block">Urutan tampil</label>
                    <input type="number" value={faqForm.sort_order}
                      onChange={(e) => setFaqForm({ ...faqForm, sort_order: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={isFaqPending}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                      {isFaqPending ? "Menyimpan..." : editFaq ? "Simpan Perubahan" : "Tambah FAQ"}
                    </button>
                    <button type="button" onClick={resetFaqForm}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg transition">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingFaq ? (
              <div className="text-slate-400 text-center py-16">Memuat data...</div>
            ) : faqItems.length === 0 ? (
              <div className="text-slate-400 text-center py-16">Belum ada FAQ.</div>
            ) : (
              <div className="flex flex-col gap-3">
                {faqItems.map((item: FaqItem) => (
                  <div key={item.id} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm mb-1">{item.question}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button type="button" onClick={() => openEditFaq(item)}
                          className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition">
                          Edit
                        </button>
                        {deleteFaqConfirm === item.id ? (
                          <div className="flex gap-1">
                            <button type="button" onClick={() => deleteFaqMutation.mutate(item.id)}
                              disabled={deleteFaqMutation.isPending}
                              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">
                              Hapus?
                            </button>
                            <button type="button" onClick={() => setDeleteFaqConfirm(null)}
                              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition">
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button type="button" onClick={() => setDeleteFaqConfirm(item.id)}
                            className="text-xs bg-slate-700 hover:bg-red-600 text-slate-400 hover:text-white px-3 py-1 rounded transition">
                            Hapus
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB DESAIN LAYANAN */}
        {activeTab === "desain" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Desain Layanan
                <span className="ml-2 text-sm font-normal text-slate-400">({desainItems.length} item)</span>
              </h2>
              <button type="button"
                onClick={() => { resetDesainForm(); setShowDesainForm(true); }}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
                + Tambah Desain
              </button>
            </div>

            {showDesainForm && (
              <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
                <h3 className="font-semibold text-white mb-4">
                  {editDesain ? "Edit Desain" : "Tambah Desain"}
                </h3>
                <form onSubmit={handleDesainSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Layanan *</label>
                    <select required value={desainForm.service_slug}
                      onChange={(e) => setDesainForm({ ...desainForm, service_slug: e.target.value })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500">
                      <option value="">Pilih layanan</option>
                      {SERVICES_SLUGS.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Nama Desain *</label>
                    <input required value={desainForm.name}
                      onChange={(e) => setDesainForm({ ...desainForm, name: e.target.value })}
                      placeholder="Pagar Minimalis Hollow 4x4"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-400 mb-1 block">URL Foto *</label>
                    <input required value={desainForm.image_url}
                      onChange={(e) => setDesainForm({ ...desainForm, image_url: e.target.value })}
                      placeholder="https://i.ibb.co/xxxxx/foto.jpg"
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-400 mb-1 block">Spesifikasi / Deskripsi</label>
                    <textarea value={desainForm.description}
                      onChange={(e) => setDesainForm({ ...desainForm, description: e.target.value })}
                      placeholder="Besi hollow 4x4, finishing cat duco, anti karat..."
                      rows={2}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1 block">Urutan tampil</label>
                    <input type="number" value={desainForm.sort_order}
                      onChange={(e) => setDesainForm({ ...desainForm, sort_order: Number(e.target.value) })}
                      className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button type="submit" disabled={isDesainPending}
                      className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
                      {isDesainPending ? "Menyimpan..." : editDesain ? "Simpan Perubahan" : "Tambah Desain"}
                    </button>
                    <button type="button" onClick={resetDesainForm}
                      className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg transition">
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loadingDesain ? (
              <div className="text-slate-400 text-center py-16">Memuat data...</div>
            ) : desainItems.length === 0 ? (
              <div className="text-slate-400 text-center py-16">Belum ada desain.</div>
            ) : (
              <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 text-left">
                      <th className="px-4 py-3 font-medium">Foto</th>
                      <th className="px-4 py-3 font-medium">Nama Desain</th>
                      <th className="px-4 py-3 font-medium">Layanan</th>
                      <th className="px-4 py-3 font-medium">Deskripsi</th>
                      <th className="px-4 py-3 font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desainItems.map((item: ServiceDesign) => (
                      <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                        <td className="px-4 py-3">
                          <img src={item.image_url} alt={item.name}
                            className="w-14 h-10 object-cover rounded-md bg-slate-700" />
                        </td>
                        <td className="px-4 py-3 font-medium text-white">{item.name}</td>
                        <td className="px-4 py-3">
                          <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs">
                            {SERVICES_SLUGS.find(s => s.slug === item.service_slug)?.label ?? item.service_slug}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs max-w-xs truncate">
                          {item.description ?? "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button type="button" onClick={() => openEditDesain(item)}
                              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition">
                              Edit
                            </button>
                            {deleteDesainConfirm === item.id ? (
                              <div className="flex gap-1">
                                <button type="button" onClick={() => deleteDesainMutation.mutate(item.id)}
                                  disabled={deleteDesainMutation.isPending}
                                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition">
                                  Hapus?
                                </button>
                                <button type="button" onClick={() => setDeleteDesainConfirm(null)}
                                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition">
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <button type="button" onClick={() => setDeleteDesainConfirm(item.id)}
                                className="text-xs bg-slate-700 hover:bg-red-600 text-slate-400 hover:text-white px-3 py-1 rounded transition">
                                Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

