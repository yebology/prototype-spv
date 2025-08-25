"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check, Circle, CircleCheck } from "lucide-react";
import { AddJobModal } from "@/components/add-job-modal";

type Tab = "lembah" | "bukit" | "danau";
type Division = "operasional" | "landscape" | "projek";

interface Job {
  id: string;
  nomor: string;
  jenisPekerjaan: string;
  lokasiHole: string;
  keteranganLokasi: string;
  status: "completed" | "pending" | "in-progress";
  divisi: Division;
  prioritas: number;
  mandor: Tab;
  gambar?: string;
}

const initialJobs: Job[] = [
  {
    id: "1",
    nomor: "01",
    jenisPekerjaan: "Perapian TANAKA",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "completed",
    divisi: "operasional",
    prioritas: 1,
    mandor: "lembah",
  },
  {
    id: "2",
    nomor: "02",
    jenisPekerjaan: "Fly Mow",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "pending",
    divisi: "operasional",
    prioritas: 2,
    mandor: "lembah",
  },
  {
    id: "3",
    nomor: "03",
    jenisPekerjaan: "Proline",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "in-progress",
    divisi: "operasional",
    prioritas: 3,
    mandor: "lembah",
  },
  {
    id: "4",
    nomor: "01",
    jenisPekerjaan: "TANAKA Landscape",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "completed",
    divisi: "landscape",
    prioritas: 1,
    mandor: "lembah",
  },
  {
    id: "5",
    nomor: "02",
    jenisPekerjaan: "Pruning Pohon",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "pending",
    divisi: "landscape",
    prioritas: 2,
    mandor: "lembah",
  },
  {
    id: "6",
    nomor: "03",
    jenisPekerjaan: "Perapian Tanaman Srubs/tall air",
    lokasiHole: "3, 5",
    keteranganLokasi: "",
    status: "in-progress",
    divisi: "landscape",
    prioritas: 3,
    mandor: "lembah",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("lembah");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] =
    useState<Division>("operasional");

  const handleAddJob = (division: Division) => {
    setSelectedDivision(division);
    setIsModalOpen(true);
  };

  const handleJobSubmit = (jobData: Omit<Job, "id" | "nomor" | "status">) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      nomor: String(
        jobs.filter(
          (j) => j.divisi === jobData.divisi && j.mandor === activeTab
        ).length + 1
      ).padStart(2, "0"),
      status: "pending",
    };
    setJobs([...jobs, newJob]);
    setIsModalOpen(false);
  };

  const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
      case "in-progress":
        return (
          <Check className="w-5 h-5 text-green-600 bg-gray-300 rounded-full" />
        );
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getJobsByDivision = (division: Division) => {
    return jobs.filter(
      (job) => job.divisi === division && job.mandor === activeTab
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pekerjaan Hari Ini
          </h1>
          <p className="text-gray-600">
            Area : Lembah, CH, FC, Villa, Main Gate, Driving Range, Parkiran
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl px-4 py-8 flex flex-row items-center justify-center">
            <div className="flex flex-row w-1/2">
              <CircleCheck className="text-olive mr-2" />
              <span className="text-olive font-medium text-xl">Selesai</span>
            </div>
            <span className="w-1/2 text-2xl font-semibold text-end">20/20</span>
          </div>
          <div className="bg-white shadow rounded-2xl px-4 py-8 flex flex-row items-center justify-center">
            <div className="flex flex-row w-1/2">
              <CircleCheck className="text-olive mr-2" />
              <span className="text-olive font-medium text-xl">Proses</span>
            </div>
            <span className="w-1/2 text-2xl font-semibold text-end">20/20</span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Operasional Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Operasional</CardTitle>
              <Button
                onClick={() => handleAddJob("operasional")}
                className="bg-olive"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambahkan Pekerjaan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-gray-500 text-sm">
                      <th className="pb-3 font-medium">Nomor</th>
                      <th className="pb-3 font-medium">Jenis Pekerjaan</th>
                      <th className="pb-3 font-medium">Lokasi Hole</th>
                      <th className="pb-3 font-medium">Keterangan Lokasi</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getJobsByDivision("operasional").map((job, index) => (
                      <tr
                        key={job.id}
                        className={`border-b ${
                          job.status === "in-progress" ? "bg-gray-100" : ""
                        }`}
                      >
                        <td className="py-4">{job.nomor}</td>
                        <td className="py-4">{job.jenisPekerjaan}</td>
                        <td className="py-4">{job.lokasiHole}</td>
                        <td className="py-4">{job.keteranganLokasi}</td>
                        <td className="py-4">{getStatusIcon(job.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Landscape Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Landscape</CardTitle>
              <Button
                onClick={() => handleAddJob("landscape")}
                className="bg-olive"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambahkan Pekerjaan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-gray-500 text-sm">
                      <th className="pb-3 font-medium">Nomor</th>
                      <th className="pb-3 font-medium">Jenis Pekerjaan</th>
                      <th className="pb-3 font-medium">Lokasi Hole</th>
                      <th className="pb-3 font-medium">Keterangan Lokasi</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getJobsByDivision("landscape").map((job, index) => (
                      <tr
                        key={job.id}
                        className={`border-b ${
                          job.status === "in-progress" ? "bg-gray-100" : ""
                        }`}
                      >
                        <td className="py-4">{job.nomor}</td>
                        <td className="py-4">{job.jenisPekerjaan}</td>
                        <td className="py-4">{job.lokasiHole}</td>
                        <td className="py-4">{job.keteranganLokasi}</td>
                        <td className="py-4">{getStatusIcon(job.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Projek Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Projek</CardTitle>
              <Button
                onClick={() => handleAddJob("projek")}
                className="bg-olive"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambahkan Pekerjaan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-gray-500 text-sm">
                      <th className="pb-3 font-medium">Nomor</th>
                      <th className="pb-3 font-medium">Jenis Pekerjaan</th>
                      <th className="pb-3 font-medium">Lokasi Hole</th>
                      <th className="pb-3 font-medium">Keterangan Lokasi</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getJobsByDivision("projek").length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500"
                        >
                          Belum ada pekerjaan projek
                        </td>
                      </tr>
                    ) : (
                      getJobsByDivision("projek").map((job, index) => (
                        <tr
                          key={job.id}
                          className={`border-b ${
                            job.status === "in-progress" ? "bg-gray-100" : ""
                          }`}
                        >
                          <td className="py-4">{job.nomor}</td>
                          <td className="py-4">{job.jenisPekerjaan}</td>
                          <td className="py-4">{job.lokasiHole}</td>
                          <td className="py-4">{job.keteranganLokasi}</td>
                          <td className="py-4">{getStatusIcon(job.status)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJobSubmit}
        division={selectedDivision}
        mandor={activeTab}
      />
    </div>
  );
}
