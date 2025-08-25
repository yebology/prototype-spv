"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Search, Bell, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WeeklyProgramPage() {
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

  const workData = [
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      hole: "4,5,6,7, 8,9",
      keterangan: "",
    },
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      hole: "4,5,6,7, 8,9",
      keterangan: "",
    },
  ];

  const landscapeData = [
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      hole: "4,5,6,7, 8,9",
      keterangan: "",
    },
    {
      no: "01",
      jenisPekerjaan: getRandomJenisPekerjaan(),
      hole: "4,5,6,7, 8,9",
      keterangan: "",
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
          <td className="py-4 px-2 text-sm">{item.hole}</td>
          <td className="py-4 px-2 text-sm text-center">{item.keterangan}</td>
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
                  Detail Mingguan
                </h1>
                <p className="text-sm text-gray-500">17 - 23 Agustus 2025</p>
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
              <p className="text-sm font-medium text-gray-900">
                Telah dibuat pada tanggal
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
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Green
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                            Hole
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows(workData, "operasional")}</tbody>
                    </table>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 my-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Tee Box
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                            Hole
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows(workData, "operasional")}</tbody>
                    </table>
                  </CardContent>
                </Card>
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
                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Green
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                            Hole
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows(workData, "operasional")}</tbody>
                    </table>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 my-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Tee Box
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                            Hole
                          </th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                            Keterangan
                          </th>
                        </tr>
                      </thead>
                      <tbody>{renderTableRows(workData, "operasional")}</tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Projek Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Projek</CardTitle>
            </CardHeader>
            <CardContent>
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
                      Hole
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">
                      Keterangan
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
