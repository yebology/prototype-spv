"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Mountain,
  Waves,
  FileText,
  ChevronLeft,
  Search,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DailyProgramPage() {
  const getRandomJenisPekerjaan = () => {
    const workTypes = [
      "Pemeliharaan rumput green",
      "Penyiraman fairway",
      "Pemangkasan pohon",
      "Pembersihan bunker pasir",
      "Perawatan sistem irigasi",
      "Pemupukan area tee",
      "Perbaikan jalur cart",
      "Pembersihan kolam air",
      "Perawatan landscape taman",
      "Pemeliharaan peralatan",
      "Penyemprotan pestisida",
      "Aerasi tanah green",
    ];
    return workTypes[Math.floor(Math.random() * workTypes.length)];
  };

  const getRandomStatus = () => {
    return Math.random() > 0.4 ? "active" : "inactive"; // 60% chance of active status
  };

  const workData = [
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      lokasi: "4,5,6,7, 8,9",
      tkDibutuhkan: 3,
      tkTersedia: 3,
      namaTk: "ajet, agus, m darmawan, gurnandar",
      status: getRandomStatus(),
    },
    {
      no: "02",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      lokasi: "4,5,6,7, 8,9",
      tkDibutuhkan: 3,
      tkTersedia: 3,
      namaTk: "ajet, agus, darmawan, gurnandar",
      status: getRandomStatus(),
    },
  ];

  const landscapeData = [
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      lokasi: "4,5,6,7, 8,9",
      tkDibutuhkan: 3,
      tkTersedia: 3,
      namaTk: "ajet agus darmawan gurnandar",
      status: getRandomStatus(),
    },
    {
      no: "02",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      lokasi: "4,5,6,7, 8,9",
      tkDibutuhkan: 3,
      tkTersedia: 3,
      namaTk: "ajet agus darmawan gurnandar",
      status: getRandomStatus(),
    },
  ];

  const renderTableRows = (
    data: typeof workData,
    sectionType: "operasional" | "landscape"
  ) => {
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      rows.push(
        <tr key={i} className="border-b border-gray-100">
          <td className="py-4 px-2 text-sm">{item.no}</td>
          <td className="py-4 px-2 text-sm max-w-xs truncate">
            {item.jenisPekerjaan}
          </td>
          <td className="py-4 px-2 text-sm">{item.lokasi}</td>
          <td className="py-4 px-2 text-sm text-center">{item.tkDibutuhkan}</td>
          <td className="py-4 px-2 text-sm text-center">{item.tkTersedia}</td>
          <td className="py-4 px-2 text-sm max-w-xs truncate">{item.namaTk}</td>
          <td className="py-4 px-2">
            <Button
              size="sm"
              disabled={item.status === "inactive"}
              className={`text-xs ${
                item.status === "inactive"
                  ? "bg-gray-400 hover:bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-olive text-white"
              }`}
            >
              Klik utk melihat
            </Button>
          </td>
          <td className="py-4 px-2">
            <div
              className={`w-6 h-6 rounded-full border-2 ${
                item.status === "active"
                  ? "bg-olive border-olive"
                  : "bg-white border-gray-300"
              }`}
            >
              {item.status === "active" && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </td>
        </tr>
      );
    }
    return rows;
  };

  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ChevronLeft
                className="w-5 h-5 text-gray-500 cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Detail Harian
                </h1>
                <p className="text-sm text-gray-500">10/01/2025</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-400" />
                <Bell className="w-5 h-5 text-gray-400" />
                <Settings className="w-5 h-5 text-gray-400" />
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-sm text-gray-500">Mon Jan 10 9:41 AM</span>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Mandor Bukit</p>
              <p className="text-xs text-gray-500">Agus Gusnandar</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Supervisor Bukit
              </p>
              <p className="text-xs text-gray-500">Agus Gusnandar</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Telah disetujui pada tanggal
              </p>
              <p className="text-xs text-gray-500">10/01/2025</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Operasional Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Operasional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        No.
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Jenis Pekerjaan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Lokasi Hole
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Dibutuhkan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Tersedia
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Nama TK
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Foto
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderTableRows(workData, "operasional")}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Landscape Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Landscape</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        No.
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Jenis Pekerjaan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Lokasi Hole
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Dibutuhkan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Tersedia
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Nama TK
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Foto
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>{renderTableRows(landscapeData, "landscape")}</tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Projek Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Projek</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        No.
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Jenis Pekerjaan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Lokasi Hole
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Dibutuhkan
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        TK Tersedia
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Nama TK
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Foto
                      </th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={8}
                        className="py-8 text-center text-gray-500 text-sm"
                      >
                        No data available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
