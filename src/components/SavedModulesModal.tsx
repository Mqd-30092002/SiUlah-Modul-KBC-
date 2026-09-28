import React from 'react';
import { X, BookOpen, Trash2, Calendar, Download, FileText, CheckCircle2 } from 'lucide-react';

export interface SavedModul {
  id: string;
  mapel: string;
  kelas: string;
  waktu: string;
  topik?: string;
  namaGuru?: string;
  namaSekolah?: string;
  content: string;
  createdAt: string;
}

interface SavedModulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: SavedModul[];
  onSelect: (modul: SavedModul) => void;
  onDelete: (id: string) => void;
}

export const SavedModulesModal: React.FC<SavedModulesModalProps> = ({
  isOpen,
  onClose,
  modules,
  onSelect,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-lg">
            <BookOpen className="w-5 h-5" />
            <span>Arsip Modul Ajar Tersimpan ({modules.length})</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1">
          {modules.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-12 h-12 mx-auto stroke-1 text-slate-300 mb-2" />
              <p className="text-sm font-medium">Belum ada modul yang tersimpan.</p>
              <p className="text-xs text-slate-400 mt-1">
                Gunakan tombol "Simpan Modul" setelah membuat RPP/Modul Ajar.
              </p>
            </div>
          ) : (
            modules.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition bg-slate-50/50 flex items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm truncate">
                      {item.mapel}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                      {item.kelas}
                    </span>
                    {item.waktu && (
                      <span className="text-xs text-slate-500 font-normal">
                        ({item.waktu})
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 italic">
                    {item.topik || item.content.slice(0, 120)}...
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {item.namaSekolah && <span>• {item.namaSekolah}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Buka
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Hapus Modul"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
