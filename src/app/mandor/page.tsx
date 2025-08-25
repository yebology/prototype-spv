"use client";

import type React from "react";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Upload,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Job {
  id: string;
  name: string;
  formData: {
    lokasiHole: string;
    jumlahTKDiminta: string;
    jumlahTKTersedia: string;
    namaTK: string;
  };
  uploadedFiles: {
    masalah: File | null;
    perbaikan: File | null;
  };
}

export default function OperationalApp() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "perapian-tanaka",
      name: "Perapian TANAKA",
      formData: {
        lokasiHole: "",
        jumlahTKDiminta: "",
        jumlahTKTersedia: "",
        namaTK: "",
      },
      uploadedFiles: {
        masalah: null,
        perbaikan: null,
      },
    },
    {
      id: "fly-mow",
      name: "Fly Mow",
      formData: {
        lokasiHole: "",
        jumlahTKDiminta: "",
        jumlahTKTersedia: "",
        namaTK: "",
      },
      uploadedFiles: {
        masalah: null,
        perbaikan: null,
      },
    },
  ]);

  const [landscapeJobs, setLandscapeJobs] = useState<Job[]>([
    {
      id: "tanaka-landscape",
      name: "Tanaka Landscape",
      formData: {
        lokasiHole: "",
        jumlahTKDiminta: "",
        jumlahTKTersedia: "",
        namaTK: "",
      },
      uploadedFiles: {
        masalah: null,
        perbaikan: null,
      },
    },
  ]);

  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({
    "fly-mow": true,
  });

  const [expandedLandscapeItems, setExpandedLandscapeItems] = useState<{
    [key: string]: boolean;
  }>({});

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const toggleLandscapeExpanded = (itemId: string) => {
    setExpandedLandscapeItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleInputChange = (jobId: string, field: string, value: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              formData: {
                ...job.formData,
                [field]: value,
              },
            }
          : job
      )
    );
  };

  const handleLandscapeInputChange = (
    jobId: string,
    field: string,
    value: string
  ) => {
    setLandscapeJobs((prev) =>
      prev.map((job) =>
        job.id === jobId
          ? {
              ...job,
              formData: {
                ...job.formData,
                [field]: value,
              },
            }
          : job
      )
    );
  };

  const handleFileUpload = (
    jobId: string,
    type: "masalah" | "perbaikan",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? {
                ...job,
                uploadedFiles: {
                  ...job.uploadedFiles,
                  [type]: file,
                },
              }
            : job
        )
      );
    }
  };

  const handleLandscapeFileUpload = (
    jobId: string,
    type: "masalah" | "perbaikan",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLandscapeJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? {
                ...job,
                uploadedFiles: {
                  ...job.uploadedFiles,
                  [type]: file,
                },
              }
            : job
        )
      );
    }
  };

  const handleSimpan = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      console.log(`Form data for ${job.name}:`, job.formData);
      console.log(`Uploaded files for ${job.name}:`, job.uploadedFiles);
      alert(`Data untuk ${job.name} berhasil disimpan!`);
    }
  };

  const handleLandscapeSimpan = (jobId: string) => {
    const job = landscapeJobs.find((j) => j.id === jobId);
    if (job) {
      console.log(`Form data for ${job.name}:`, job.formData);
      console.log(`Uploaded files for ${job.name}:`, job.uploadedFiles);
      alert(`Data untuk ${job.name} berhasil disimpan!`);
    }
  };

  const handleTambahPekerjaan = () => {
    const newJobNumber = jobs.length + 1;
    const newJob: Job = {
      id: `job-${Date.now()}`,
      name: `Pekerjaan ${newJobNumber}`,
      formData: {
        lokasiHole: "",
        jumlahTKDiminta: "",
        jumlahTKTersedia: "",
        namaTK: "",
      },
      uploadedFiles: {
        masalah: null,
        perbaikan: null,
      },
    };

    setJobs((prev) => [...prev, newJob]);

    setExpandedItems((prev) => ({
      ...prev,
      [newJob.id]: true,
    }));
  };

  const handleTambahLandscape = () => {
    const newJobNumber = landscapeJobs.length + 1;
    const newJob: Job = {
      id: `landscape-${Date.now()}`,
      name: `Landscape ${newJobNumber}`,
      formData: {
        lokasiHole: "",
        jumlahTKDiminta: "",
        jumlahTKTersedia: "",
        namaTK: "",
      },
      uploadedFiles: {
        masalah: null,
        perbaikan: null,
      },
    };

    setLandscapeJobs((prev) => [...prev, newJob]);

    setExpandedLandscapeItems((prev) => ({
      ...prev,
      [newJob.id]: true,
    }));
  };

  const handleTitleEdit = (jobId: string, currentTitle: string) => {
    setEditingJobId(jobId);
    setEditingTitle(currentTitle);
  };

  const handleTitleSave = (jobId: string) => {
    if (editingTitle.trim()) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, name: editingTitle.trim() } : job
        )
      );
      setLandscapeJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, name: editingTitle.trim() } : job
        )
      );
    }
    setEditingJobId(null);
    setEditingTitle("");
  };

  const handleTitleCancel = () => {
    setEditingJobId(null);
    setEditingTitle("");
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-100 min-h-screen">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-2 bg-white">
        <span className="text-black font-medium">9:41</span>
        <div className="bg-black rounded-full px-4 py-1 w-32 h-6"></div>
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 bg-gray-200">
        <h1 className="text-2xl font-bold text-black">Hari ini</h1>
      </div>

      {/* Operasional Section */}
      <div className="px-4 py-4">
        <Card className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-center mb-4">Operasional</h2>

          {jobs.map((job, index) => (
            <div key={job.id} className="mb-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-gray-600 font-medium">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {editingJobId === job.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTitleSave(job.id);
                          } else if (e.key === "Escape") {
                            handleTitleCancel();
                          }
                        }}
                        className="text-sm font-medium bg-white border-gray-300 flex-1"
                        autoFocus
                      />
                      <button
                        onClick={() => handleTitleSave(job.id)}
                        className="text-olive text-xs px-2 py-1 hover:bg-green-50 rounded"
                      >
                        ✓
                      </button>
                      <button
                        onClick={handleTitleCancel}
                        className="text-red-600 text-xs px-2 py-1 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span
                      className="font-medium cursor-pointer hover:text-blue-600 flex-1"
                      onDoubleClick={() => handleTitleEdit(job.id, job.name)}
                      title="Double-click to edit"
                    >
                      {job.name}
                    </span>
                  )}
                </div>
                <div
                  className="cursor-pointer p-1"
                  onClick={() => toggleExpanded(job.id)}
                >
                  {expandedItems[job.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Expanded Form */}
              {expandedItems[job.id] && (
                <div className="mt-3 space-y-4">
                  {/* Lokasi hole */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lokasi hole
                    </label>
                    <Input
                      placeholder="Cth 3,5"
                      value={job.formData.lokasiHole}
                      onChange={(e) =>
                        handleInputChange(job.id, "lokasiHole", e.target.value)
                      }
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>

                  {/* Jumlah TK */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jumlah TK diminta
                      </label>
                      <Input
                        placeholder="Cth 1"
                        value={job.formData.jumlahTKDiminta}
                        onChange={(e) =>
                          handleInputChange(
                            job.id,
                            "jumlahTKDiminta",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Jumlah TK tersedia
                      </label>
                      <Input
                        placeholder="Cth 10"
                        value={job.formData.jumlahTKTersedia}
                        onChange={(e) =>
                          handleInputChange(
                            job.id,
                            "jumlahTKTersedia",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Nama TK */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama TK
                    </label>
                    <Input
                      placeholder="Cth Ali, Louis"
                      value={job.formData.namaTK}
                      onChange={(e) =>
                        handleInputChange(job.id, "namaTK", e.target.value)
                      }
                      className="bg-gray-50 border-gray-200"
                    />
                  </div>

                  {/* Upload Buttons */}
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <span className="text-sm font-medium">
                          Upload foto masalah
                        </span>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(job.id, "masalah", e)
                          }
                        />
                      </label>
                      {job.uploadedFiles.masalah && (
                        <p className="text-xs text-olive mt-1">
                          File terpilih: {job.uploadedFiles.masalah.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <span className="text-sm font-medium">
                          Upload foto perbaikan
                        </span>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(job.id, "perbaikan", e)
                          }
                        />
                      </label>
                      {job.uploadedFiles.perbaikan && (
                        <p className="text-xs text-olive mt-1">
                          File terpilih: {job.uploadedFiles.perbaikan.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Simpan Button */}
                  <Button
                    onClick={() => handleSimpan(job.id)}
                    className="w-full bg-olive cursor-pointer text-white font-medium py-3 rounded-lg"
                  >
                    Simpan
                  </Button>
                </div>
              )}
            </div>
          ))}
        </Card>

        {/* Add Job Button */}
        <Button
          onClick={handleTambahPekerjaan}
          className="w-full mt-4 bg-olive text-white font-medium py-3 rounded-lg"
        >
          + Tambahkan Pekerjaan
        </Button>

        {/* Landscape Section */}
        <div className="mt-6">
          <Card className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-xl font-bold text-center mb-4">Landscape</h2>

            {landscapeJobs.map((job, index) => (
              <div key={job.id} className="mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-gray-600 font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {editingJobId === job.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleTitleSave(job.id);
                            } else if (e.key === "Escape") {
                              handleTitleCancel();
                            }
                          }}
                          className="text-sm font-medium bg-white border-gray-300 flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => handleTitleSave(job.id)}
                          className="text-olive text-xs px-2 py-1 hover:bg-green-50 rounded"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleTitleCancel}
                          className="text-red-600 text-xs px-2 py-1 hover:bg-red-50 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span
                        className="font-medium cursor-pointer hover:text-blue-600 flex-1"
                        onDoubleClick={() => handleTitleEdit(job.id, job.name)}
                        title="Double-click to edit"
                      >
                        {job.name}
                      </span>
                    )}
                  </div>
                  <div
                    className="cursor-pointer p-1"
                    onClick={() => toggleLandscapeExpanded(job.id)}
                  >
                    {expandedLandscapeItems[job.id] ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Form */}
                {expandedLandscapeItems[job.id] && (
                  <div className="mt-3 space-y-4">
                    {/* Lokasi hole */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lokasi hole
                      </label>
                      <Input
                        placeholder="Cth 3,5"
                        value={job.formData.lokasiHole}
                        onChange={(e) =>
                          handleLandscapeInputChange(
                            job.id,
                            "lokasiHole",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>

                    {/* Jumlah TK */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jumlah TK diminta
                        </label>
                        <Input
                          placeholder="Cth 1"
                          value={job.formData.jumlahTKDiminta}
                          onChange={(e) =>
                            handleLandscapeInputChange(
                              job.id,
                              "jumlahTKDiminta",
                              e.target.value
                            )
                          }
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Jumlah TK tersedia
                        </label>
                        <Input
                          placeholder="Cth 10"
                          value={job.formData.jumlahTKTersedia}
                          onChange={(e) =>
                            handleLandscapeInputChange(
                              job.id,
                              "jumlahTKTersedia",
                              e.target.value
                            )
                          }
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>

                    {/* Nama TK */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nama TK
                      </label>
                      <Input
                        placeholder="Cth Ali, Louis"
                        value={job.formData.namaTK}
                        onChange={(e) =>
                          handleLandscapeInputChange(
                            job.id,
                            "namaTK",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>

                    {/* Upload Buttons */}
                    <div className="space-y-3">
                      <div>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm font-medium">
                            Upload foto masalah
                          </span>
                          <Upload className="w-5 h-5 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleLandscapeFileUpload(job.id, "masalah", e)
                            }
                          />
                        </label>
                        {job.uploadedFiles.masalah && (
                          <p className="text-xs text-olive mt-1">
                            File terpilih: {job.uploadedFiles.masalah.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm font-medium">
                            Upload foto perbaikan
                          </span>
                          <Upload className="w-5 h-5 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleLandscapeFileUpload(job.id, "perbaikan", e)
                            }
                          />
                        </label>
                        {job.uploadedFiles.perbaikan && (
                          <p className="text-xs text-olive mt-1">
                            File terpilih: {job.uploadedFiles.perbaikan.name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Simpan Button */}
                    <Button
                      onClick={() => handleLandscapeSimpan(job.id)}
                      className="w-full bg-olive text-white font-medium py-3 rounded-lg"
                    >
                      Simpan
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </Card>

          {/* Add Landscape Job Button */}
          <Button
            onClick={handleTambahLandscape}
            className="w-full mt-4 bg-olive text-white font-medium py-3 rounded-lg"
          >
            + Tambahkan Landscape
          </Button>
        </div>
      </div>
    </div>
  );
}
