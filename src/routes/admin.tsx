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

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const CATEGORIES = [
  "Pagar", "Kanopi", "Railing", "Balkon",
  "Tralis", "Baja Ringan", "Las Panggilan",
  "Konstruksi Baja", "Pintu Besi",
];

const emptyForm: PortfolioCreateInput = {
  title: "",
  category: "",
  location: "",
  description: "",
  image_url: "",
  is_featured: 0,
  sort_order: 0,
};
function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (password === "barabajalas2024") {
                  setAuthed(true);
                } else {
                  setAuthError("Password salah");
                }
              }
            }}
            className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-orange-500"
          />
          {authError && (
            <p className="text-red-400 text-sm mb-3">{authError}</p>
          )}
          <button
            onClick={() => {
              if (password === "barabajalas2024") {
                setAuthed(true);
              } else {
                setAuthError("Password salah");
              }
            }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Masuk
          </button>
        </div>
      </div>
    );
  }

return <AdminDashboard onLogout={() => setAuthed(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<PortfolioCreateInput>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

const { data: items = [], isLoading, error } = useQuery({
  queryKey: ["admin-portfolio"],
  queryFn: () => getPortfolioItems(),
  retry: false,
  throwOnError: false,
});

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-portfolio"] });

  const createMutation = useMutation({
    mutationFn: (data: PortfolioCreateInput) =>
      createPortfolioItem({ data }),
    onSuccess: () => { invalidate(); resetForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: (data: PortfolioCreateInput & { id: number }) =>
      updatePortfolioItem({ data }),
    onSuccess: () => { invalidate(); resetForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      deletePortfolioItem({ data: { id } }),
    onSuccess: () => { invalidate(); setDeleteConfirm(null); },
  });

  function resetForm() {
    setForm(emptyForm);
    setEditItem(null);
    setShowForm(false);
  }

  function openEdit(item: PortfolioItem) {
    setEditItem(item);
    setForm({
      title: item.title,
      category: item.category,
      location: item.location,
      description: item.description ?? "",
      image_url: item.image_url,
      is_featured: item.is_featured,
      sort_order: item.sort_order,
    });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate({ ...form, id: editItem.id });
    } else {
      createMutation.mutate(form);
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;
<button
  onClick={() => { resetForm(); setShowForm(true); }}
  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
>
  + Tambah Item
</button>
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 text-xs">Bara Baja Las CMS</p>
        </div>
        <div className="flex gap-3">
        
          <a href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-white transition">
            Lihat Website ↗
          </a>
          <button
            onClick={onLogout}
            className="text-sm text-slate-400 hover:text-red-400 transition"
          >
            Keluar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Portfolio
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({items.length} item)
            </span>
          </h2>
<button
  onClick={() => {
    console.log("KLIK TAMBAH ITEM", showForm);
    resetForm();
    setShowForm(true);
    console.log("SETELAH SET", showForm);
  }}
  className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
>
  + Tambah Item
</button>
        </div>

        {showForm && (
          <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <h3 className="font-semibold text-white mb-4">
              {editItem ? "Edit Item Portfolio" : "Tambah Item Portfolio"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Judul *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Pagar Minimalis Modern"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Kategori *</label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Pilih kategori</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Lokasi *</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Karawang Barat"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">URL Gambar *</label>
                <input
                  required
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="/assets/foto-proyek.jpg"
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-slate-400 mb-1 block">Deskripsi</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Deskripsi singkat proyek (opsional)"
                  rows={2}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Urutan tampil</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_featured === 1}
                    onChange={(e) => setForm({ ...form, is_featured: e.target.checked ? 1 : 0 })}
                    className="accent-orange-500"
                  />
                  Tampilkan di halaman utama
                </label>
              </div>
              <div className="md:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
                >
                  {isPending ? "Menyimpan..." : editItem ? "Simpan Perubahan" : "Tambah Item"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-5 py-2 rounded-lg transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}
        {isLoading ? (
          <div className="text-slate-400 text-center py-16">Memuat data...</div>
        ) : items.length === 0 ? (
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
                {items.map((item: PortfolioItem) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30 transition"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-14 h-10 object-cover rounded-md bg-slate-700"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{item.title}</td>
                    <td className="px-4 py-3">
                      <span className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.location}</td>
                    <td className="px-4 py-3">
                      {item.is_featured === 1 ? (
                        <span className="text-orange-400 text-xs font-medium">✓ Ya</span>
                      ) : (
                        <span className="text-slate-500 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition"
                        >
                          Edit
                        </button>
                        {deleteConfirm === item.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => deleteMutation.mutate(item.id)}
                              disabled={deleteMutation.isPending}
                              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                            >
                              Hapus?
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="text-xs bg-slate-700 hover:bg-red-600 text-slate-400 hover:text-white px-3 py-1 rounded transition"
                          >
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
    </div>
  );
}