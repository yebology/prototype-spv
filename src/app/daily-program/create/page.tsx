"use client";

import { useState } from "react";
import { Plus, X, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface TaskRow {
  id: string;
  nomor: number;
  jenisPengerjaan: string;
  lokasiHole: string;
  prioritas: string;
  gambar: File | null;
  gambarName: string;
  mandor: string;
  keterangan: string;
  completed: boolean;
}

interface Location {
  id: string;
  name: string;
  tasks: TaskRow[];
  nextNomor: number;
}

interface Division {
  id: string;
  name: string;
  locations: Location[];
}

export default function GolfCourseManagement() {
  const [date, setDate] = useState("2025-01-01");
  const [divisions, setDivisions] = useState<Division[]>([
    {
      id: "1",
      name: "Operasional",
      locations: [
        {
          id: "1",
          name: "Green",
          nextNomor: 2,
          tasks: [
            {
              id: "1",
              nomor: 1,
              jenisPengerjaan: "Verticut Green",
              lokasiHole: "1-5",
              prioritas: "3",
              gambar: null,
              gambarName: "image1.jpg",
              mandor: "Lembah",
              keterangan: "tolong dipotong dengan speed 9...",
              completed: false,
            },
          ],
        },
      ],
    },
  ]);
  const [newLocationName, setNewLocationName] = useState("");
  const [showNewLocationInput, setShowNewLocationInput] = useState<
    string | null
  >(null);
  const [newDivisionName, setNewDivisionName] = useState("");
  const [showNewDivisionInput, setShowNewDivisionInput] = useState(false);

  const holeOptions = Array.from({ length: 27 }, (_, i) => (i + 1).toString());
  const prioritasOptions = ["1", "2", "3", "4", "5"];
  const mandorOptions = ["Lembah", "Bukit", "Danau"];

  const addTaskToLocation = (divisionId: string, locationId: string) => {
    setDivisions((prev) =>
      prev.map((division) => {
        if (division.id === divisionId) {
          return {
            ...division,
            locations: division.locations.map((location) => {
              if (location.id === locationId) {
                const newTask: TaskRow = {
                  id: Date.now().toString(),
                  nomor: location.nextNomor,
                  jenisPengerjaan: "",
                  lokasiHole: "",
                  prioritas: "",
                  gambar: null,
                  gambarName: "",
                  mandor: "",
                  keterangan: "",
                  completed: false,
                };
                return {
                  ...location,
                  tasks: [...location.tasks, newTask],
                  nextNomor: location.nextNomor + 1,
                };
              }
              return location;
            }),
          };
        }
        return division;
      })
    );
  };

  const removeTaskFromLocation = (
    divisionId: string,
    locationId: string,
    taskId: string
  ) => {
    setDivisions((prev) =>
      prev.map((division) => {
        if (division.id === divisionId) {
          return {
            ...division,
            locations: division.locations.map((location) => {
              if (location.id === locationId) {
                return {
                  ...location,
                  tasks: location.tasks.filter((task) => task.id !== taskId),
                };
              }
              return location;
            }),
          };
        }
        return division;
      })
    );
  };

  const updateTask = (
    divisionId: string,
    locationId: string,
    taskId: string,
    field: keyof TaskRow,
    value: any
  ) => {
    setDivisions((prev) =>
      prev.map((division) => {
        if (division.id === divisionId) {
          return {
            ...division,
            locations: division.locations.map((location) => {
              if (location.id === locationId) {
                return {
                  ...location,
                  tasks: location.tasks.map((task) => {
                    if (task.id === taskId) {
                      return { ...task, [field]: value };
                    }
                    return task;
                  }),
                };
              }
              return location;
            }),
          };
        }
        return division;
      })
    );
  };

  const addNewLocation = (divisionId: string) => {
    if (newLocationName.trim()) {
      const newLocation: Location = {
        id: Date.now().toString(),
        name: newLocationName.trim(),
        tasks: [],
        nextNomor: 1,
      };
      setDivisions((prev) =>
        prev.map((division) => {
          if (division.id === divisionId) {
            return {
              ...division,
              locations: [...division.locations, newLocation],
            };
          }
          return division;
        })
      );
      setNewLocationName("");
      setShowNewLocationInput(null);
    }
  };

  const addNewDivision = () => {
    if (newDivisionName.trim()) {
      const newDivision: Division = {
        id: Date.now().toString(),
        name: newDivisionName.trim(),
        locations: [],
      };
      setDivisions((prev) => [...prev, newDivision]);
      setNewDivisionName("");
      setShowNewDivisionInput(false);
    }
  };

  const handleFileUpload = (
    divisionId: string,
    locationId: string,
    taskId: string,
    file: File | null
  ) => {
    updateTask(divisionId, locationId, taskId, "gambar", file);
    updateTask(
      divisionId,
      locationId,
      taskId,
      "gambarName",
      file ? file.name : ""
    );
  };

  const handleSaveProgram = () => {
    console.log("[v0] Saving program data:", { date, divisions });
    // Here you would typically send the data to your backend
    alert("Program berhasil disimpan!");
  };

  const toggleTaskCompletion = (
    divisionId: string,
    locationId: string,
    taskId: string
  ) => {
    setDivisions((prev) =>
      prev.map((division) => {
        if (division.id === divisionId) {
          return {
            ...division,
            locations: division.locations.map((location) => {
              if (location.id === locationId) {
                return {
                  ...location,
                  tasks: location.tasks.map((task) => {
                    if (task.id === taskId) {
                      return { ...task, completed: !task.completed };
                    }
                    return task;
                  }),
                };
              }
              return location;
            }),
          };
        }
        return division;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Buat Program Harian</h1>
          <Button
            onClick={handleSaveProgram}
            className="bg-olive"
          >
            Buat Program
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="relative">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-40"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-8">
          {divisions.map((division) => (
            <div key={division.id} className="space-y-6">
              <h2 className="text-lg font-medium">{division.name}</h2>

              <div className="space-y-6 ml-4">
                {division.locations.map((location) => (
                  <Card key={location.id} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium">{location.name}</h3>
                      <Button
                        onClick={() =>
                          addTaskToLocation(division.id, location.id)
                        }
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-9 gap-4 mb-2 text-sm text-gray-600 font-medium">
                      <div>Nomor</div>
                      <div>Jenis Pengerjaan</div>
                      <div>Lokasi Hole</div>
                      <div>Prioritas</div>
                      <div>Gambar</div>
                      <div>Mandor</div>
                      <div>Keterangan</div>
                      <div>Status</div>
                      <div>Aksi</div>
                    </div>

                    <div className="space-y-2">
                      {location.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="grid grid-cols-9 gap-4 items-center p-3 bg-gray-50 rounded-lg border"
                        >
                          <div className="text-sm font-medium">
                            {task.nomor.toString().padStart(2, "0")}
                          </div>

                          <div>
                            <Input
                              value={task.jenisPengerjaan}
                              onChange={(e) =>
                                updateTask(
                                  division.id,
                                  location.id,
                                  task.id,
                                  "jenisPengerjaan",
                                  e.target.value
                                )
                              }
                              placeholder="Jenis pengerjaan"
                              className="text-sm"
                            />
                          </div>

                          <div>
                            <Select
                              value={task.lokasiHole}
                              onValueChange={(value) =>
                                updateTask(
                                  division.id,
                                  location.id,
                                  task.id,
                                  "lokasiHole",
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue placeholder="Pilih hole" />
                              </SelectTrigger>
                              <SelectContent>
                                {holeOptions.map((hole) => (
                                  <SelectItem key={hole} value={hole}>
                                    {hole}
                                  </SelectItem>
                                ))}
                                <SelectItem value="1-5">1-5</SelectItem>
                                <SelectItem value="6-10">6-10</SelectItem>
                                <SelectItem value="11-15">11-15</SelectItem>
                                <SelectItem value="16-20">16-20</SelectItem>
                                <SelectItem value="21-27">21-27</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Select
                              value={task.prioritas}
                              onValueChange={(value) =>
                                updateTask(
                                  division.id,
                                  location.id,
                                  task.id,
                                  "prioritas",
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue placeholder="Prioritas" />
                              </SelectTrigger>
                              <SelectContent>
                                {prioritasOptions.map((priority) => (
                                  <SelectItem key={priority} value={priority}>
                                    {priority}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(
                                  division.id,
                                  location.id,
                                  task.id,
                                  e.target.files?.[0] || null
                                )
                              }
                              className="text-sm"
                            />
                            {task.gambarName && (
                              <div className="text-xs text-gray-500 mt-1 truncate">
                                {task.gambarName}
                              </div>
                            )}
                          </div>

                          <div>
                            <Select
                              value={task.mandor}
                              onValueChange={(value) =>
                                updateTask(
                                  division.id,
                                  location.id,
                                  task.id,
                                  "mandor",
                                  value
                                )
                              }
                            >
                              <SelectTrigger className="text-sm">
                                <SelectValue placeholder="Mandor" />
                              </SelectTrigger>
                              <SelectContent>
                                {mandorOptions.map((mandor) => (
                                  <SelectItem key={mandor} value={mandor}>
                                    {mandor}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Input
                              value={task.keterangan}
                              onChange={(e) =>
                                updateTask(
                                  division.id,
                                  location.id,
                                  task.id,
                                  "keterangan",
                                  e.target.value
                                )
                              }
                              placeholder="Keterangan"
                              className="text-sm"
                            />
                          </div>

                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                toggleTaskCompletion(
                                  division.id,
                                  location.id,
                                  task.id
                                )
                              }
                              className={
                                task.completed
                                  ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                              }
                            >
                              {task.completed ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </Button>
                          </div>

                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeTaskFromLocation(
                                  division.id,
                                  location.id,
                                  task.id
                                )
                              }
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}

                <div className="flex flex-col items-center gap-4">
                  <Button
                    onClick={() => setShowNewLocationInput(division.id)}
                    className="bg-gray-800 hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Lokasi
                  </Button>

                  {showNewLocationInput === division.id && (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newLocationName}
                        onChange={(e) => setNewLocationName(e.target.value)}
                        placeholder="Nama lokasi (contoh: Fairway, Teebox)"
                        className="w-64"
                        onKeyPress={(e) =>
                          e.key === "Enter" && addNewLocation(division.id)
                        }
                      />
                      <Button
                        onClick={() => addNewLocation(division.id)}
                        size="sm"
                      >
                        Tambah
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setShowNewLocationInput(null);
                          setNewLocationName("");
                        }}
                      >
                        Batal
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button
            onClick={() => setShowNewDivisionInput(true)}
            variant="secondary"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Divisi
          </Button>

          {showNewDivisionInput && (
            <div className="flex items-center gap-2">
              <Input
                value={newDivisionName}
                onChange={(e) => setNewDivisionName(e.target.value)}
                placeholder="Nama divisi (contoh: Maintenance, Security)"
                className="w-64"
                onKeyPress={(e) => e.key === "Enter" && addNewDivision()}
              />
              <Button onClick={addNewDivision} size="sm">
                Tambah
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowNewDivisionInput(false);
                  setNewDivisionName("");
                }}
              >
                Batal
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
