"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sampleData = [
  { id: 1, nomor: "01", tanggal: "17 Agustus - 23 Agustus 2025" },
  { id: 2, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 3, nomor: "03", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 4, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 5, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 6, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 7, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 8, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 9, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
  { id: 10, nomor: "02", tanggal: "24 Agustus - 31 Agustus 2025" },
];

export function ProgramTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const router = useRouter();

  const handleSelectionChange = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Nomor
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Program
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Pilih
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sampleData.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                router.push("/weekly-program/detail/" + item.id);
              }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.nomor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.tanggal}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelectionChange(item.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
