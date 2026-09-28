import React, { useState } from 'react';
import { X, Building2, Check } from 'lucide-react';

export interface KopSuratData {
  enabled: boolean;
  dinas: string;
  sekolah: string;
  alamat: string;
  kontak: string;
  npsn: string;
}

interface KopSuratModalProps {
  isOpen: boolean;
  onClose: () => void;
  kopData: KopSuratData;
  onSave: (data: KopSuratData) => void;
}

export const KopSuratModal: React.FC<KopSuratModalProps> = ({
  isOpen,
  onClose,
  kopData,
  onSave,
}) => {
  const [formData, setFormData] = useState<KopSuratData>(kopData);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg">
            <Building2 className="w-5 h-5" />
            <span>Pengaturan Kop Surat Sekolah</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-indigo-50/70 rounded-xl border border-indigo-100">
            <input
              type="checkbox"
              id="enableKop"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="enableKop" className="text-sm font-medium text-indigo-950 cursor-pointer">
              Tampilkan Kop Surat Resmi saat Dicetak / Ekspor PDF
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Instansi Pembina / Dinas Pendidikan
            </label>
            <input
              type="text"
              value={formData.dinas}
              onChange={(e) => setFormData({ ...formData, dinas: e.target.value })}
              placeholder="Contoh: DINAS PENDIDIKAN DAN KEBUDAYAAN KABUPATEN..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nama Satuan Pendidikan (Sekolah)
            </label>
            <input
              type="text"
              value={formData.sekolah}
              onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
              placeholder="Contoh: SD NEGERI 1 MERDEKA BELAJAR"
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                NPSN
              </label>
              <input
                type="text"
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                placeholder="Contoh: 20109988"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Kontak / Email / Website
              </label>
              <input
                type="text"
                value={formData.kontak}
                onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                placeholder="Telp: 021-xxx | info@sekolah.sch.id"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Alamat Lengkap Sekolah & Kode Pos
            </label>
            <input
              type="text"
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              placeholder="Jl. Pendidikan No. 45, Kecamatan..."
              className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition"
            >
              <Check className="w-4 h-4" />
              Simpan Kop Surat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
