"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

type Tab = "lembah" | "bukit" | "danau";
type Division = "operasional" | "landscape" | "projek";

interface Job {
  jenisPekerjaan: string;
  lokasiHole: string;
  keteranganLokasi: string;
  divisi: Division;
  prioritas: number;
  mandor: Tab;
  gambar?: string;
}

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Job) => void;
  division: Division;
  mandor: Tab;
}

export function AddJobModal({
  isOpen,
  onClose,
  onSubmit,
  division,
  mandor,
}: AddJobModalProps) {
  const [formData, setFormData] = useState<Job>({
    jenisPekerjaan: "",
    lokasiHole: "",
    keteranganLokasi: "",
    divisi: division,
    prioritas: 1,
    mandor: mandor,
    gambar: undefined,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      jenisPekerjaan: "",
      lokasiHole: "",
      keteranganLokasi: "",
      divisi: division,
      prioritas: 1,
      mandor: mandor,
      gambar: undefined,
    });
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // In a real app, you'd upload this file and get a URL
      setFormData({ ...formData, gambar: file.name });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFormData({ ...formData, gambar: undefined });
  };

  const getDivisionLabel = (div: Division) => {
    return div.charAt(0).toUpperCase() + div.slice(1);
  };

  const getMandorLabel = (mandorName: Tab) => {
    return mandorName.charAt(0).toUpperCase() + mandorName.slice(1);
  };

  // Generate hole options 1-27
  const holeOptions = Array.from({ length: 27 }, (_, i) => i + 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Tambah Pekerjaan
            <div className="text-sm font-normal text-gray-500 mt-1">
              {getMandorLabel(mandor)} | 1-9
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Division - Readonly */}
          <div>
            <Label htmlFor="divisi">Divisi</Label>
            <Input
              id="divisi"
              value={getDivisionLabel(division)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* Job Type */}
          <div>
            <Label htmlFor="jenisPekerjaan">Jenis Pekerjaan</Label>
            <Input
              id="jenisPekerjaan"
              placeholder="Isi jenis pekerjaan"
              value={formData.jenisPekerjaan}
              onChange={(e) =>
                setFormData({ ...formData, jenisPekerjaan: e.target.value })
              }
              required
            />
          </div>

          {/* Hole Selection */}
          <div>
            <Label htmlFor="hole">Hole</Label>
            <Select
              value={formData.lokasiHole}
              onValueChange={(value) =>
                setFormData({ ...formData, lokasiHole: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih hole" />
              </SelectTrigger>
              <SelectContent>
                {holeOptions.map((hole) => (
                  <SelectItem key={hole} value={hole.toString()}>
                    {hole}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="lokasi">Lokasi</Label>
            <Input
              id="lokasi"
              placeholder="Isi lokasi"
              value={formData.keteranganLokasi}
              onChange={(e) =>
                setFormData({ ...formData, keteranganLokasi: e.target.value })
              }
            />
          </div>

          {/* Priority */}
          <div>
            <Label htmlFor="prioritas">Prioritas</Label>
            <Select
              value={formData.prioritas.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, prioritas: Number.parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((priority) => (
                  <SelectItem key={priority} value={priority.toString()}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="gambar">Gambar</Label>
            <div className="mt-1">
              {!selectedFile ? (
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Upload gambar</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700 truncate">
                    {selectedFile.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mandor - Readonly */}
          <div>
            <Label htmlFor="mandor">Mandor</Label>
            <Input
              id="mandor"
              value={getMandorLabel(mandor)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Tambah Pekerjaan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
