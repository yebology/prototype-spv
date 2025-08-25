"use client";

import { useState } from "react";
import { MapPin, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface ScheduleEntry {
  id: string;
  nomor: string;
  hari: string;
  tanggal: string;
  selected: boolean;
}

export default function WorkSchedulePage() {
  const [selectedArea, setSelectedArea] = useState("Lembah");
  const [startDate, setStartDate] = useState("2025-08-01");
  const [endDate, setEndDate] = useState("2025-09-01");
  const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([
    {
      id: "1",
      nomor: "01",
      hari: "Senin",
      tanggal: "1 Agustus 2025",
      selected: true,
    },
    {
      id: "2",
      nomor: "02",
      hari: "Selasa",
      tanggal: "2 Agustus 2025",
      selected: false,
    },
    {
      id: "3",
      nomor: "03",
      hari: "Rabu",
      tanggal: "3 Agustus 2025",
      selected: false,
    },
    {
      id: "4",
      nomor: "02",
      hari: "Senin",
      tanggal: "4 Agustus 2025",
      selected: false,
    },
    {
      id: "5",
      nomor: "02",
      hari: "Senin",
      tanggal: "5 Agustus 2025",
      selected: false,
    },
    {
      id: "6",
      nomor: "02",
      hari: "Senin",
      tanggal: "6 Agustus 2025",
      selected: false,
    },
    {
      id: "7",
      nomor: "02",
      hari: "Senin",
      tanggal: "7 Agustus 2025",
      selected: false,
    },
    {
      id: "8",
      nomor: "02",
      hari: "Senin",
      tanggal: "8 Agustus 2025",
      selected: false,
    },
    {
      id: "9",
      nomor: "02",
      hari: "Senin",
      tanggal: "9 Agustus 2025",
      selected: false,
    },
    {
      id: "10",
      nomor: "02",
      hari: "Senin",
      tanggal: "10 Agustus 2025",
      selected: false,
    },
  ]);

  const areas = [
    { id: "lembah", name: "Lembah", icon: MapPin },
    { id: "bukit", name: "Bukit", icon: MapPin },
    { id: "danau", name: "Danau", icon: MapPin },
  ];

  const toggleSelection = (id: string) => {
    setScheduleEntries((entries) =>
      entries.map((entry) =>
        entry.id === id ? { ...entry, selected: !entry.selected } : entry
      )
    );
  };

  const selectAll = () => {
    setScheduleEntries((entries) =>
      entries.map((entry) => ({ ...entry, selected: true }))
    );
  };

  const deselectAll = () => {
    setScheduleEntries((entries) =>
      entries.map((entry) => ({ ...entry, selected: false }))
    );
  };

  const exportData = () => {
    const selectedEntries = scheduleEntries.filter((entry) => entry.selected);
    console.log("Exporting selected entries:", selectedEntries);
    alert(`Mengekspor ${selectedEntries.length} entri yang dipilih`);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Program Harian
              </h1>
              <div className="text-sm text-gray-600 mb-4">
                <p className="font-medium">
                  Penyedia Tenaga Kerja : PT. DEDIDE AGRO LESTARI
                </p>
                <p>
                  Area: Lembah, CH, FC, Villa, Main Gate, Driving Range,
                  Parkiran
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Dari
                    </label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Hingga
                    </label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-40"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      router.push("/daily-program/create");
                    }}
                    className="bg-olive cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambahkan Pekerjaan
                  </Button>
                  <Button onClick={exportData} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <Card className="overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Riwayat</h3>
                  <div className="flex items-center gap-2">
                    <Button onClick={selectAll} variant="outline" size="sm">
                      Pilih Semua
                    </Button>
                    <Button onClick={deselectAll} variant="outline" size="sm">
                      Batal Pilih
                    </Button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nomor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hari
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal Program
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pilih
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scheduleEntries.map((entry, key) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => {
                          router.push("/daily-program/detail/" + entry.id);
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.hari}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.tanggal}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Checkbox
                            checked={entry.selected}
                            onCheckedChange={() => toggleSelection(entry.id)}
                            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                    {scheduleEntries.filter((entry) => entry.selected).length}{" "}
                    dari {scheduleEntries.length} item dipilih
                  </span>
                  <div className="flex items-center gap-4">
                    <span>Total Entries: {scheduleEntries.length}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
