"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  jenisKerja: string;
  lokasiHole: string;
  hari: string;
  keterangan: string;
}

interface LocationSection {
  id: string;
  name: string;
  tasks: Task[];
}

interface DivisionSection {
  id: string;
  name: string;
  locations: LocationSection[];
}

export function CreateProgramForm() {
  const router = useRouter();
  const [programDate, setProgramDate] = useState(() => {
    const today = new Date();
    return today
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  });
  const [divisions, setDivisions] = useState<DivisionSection[]>([
    {
      id: "div-1",
      name: "Operasional",
      locations: [
        {
          id: "loc-1",
          name: "Green",
          tasks: [
            {
              id: "task-1",
              jenisKerja: "Verticut green",
              lokasiHole: "3, 5",
              hari: "Senin",
              keterangan: "Potong dengan ukuran kecil",
            },
          ],
        },
        {
          id: "loc-2",
          name: "Tee Box",
          tasks: [
            {
              id: "task-2",
              jenisKerja: "Spot pupuk",
              lokasiHole: "13, 19, 20",
              hari: "Senin",
              keterangan: "Pakai pupuk cap Yobol",
            },
            {
              id: "task-3",
              jenisKerja: "Top dress rumbut baru",
              lokasiHole: "23 - 24, 1",
              hari: "Senin",
              keterangan: "Potong dengan ukuran kecil",
            },
          ],
        },
      ],
    },
    {
      id: "div-2",
      name: "Project & landskap",
      locations: [
        {
          id: "loc-3",
          name: "All",
          tasks: [
            {
              id: "task-4",
              jenisKerja: "Pruning hole",
              lokasiHole: "7, 21",
              hari: "Senin",
              keterangan: "Potong dengan ukuran kecil",
            },
          ],
        },
      ],
    },
  ]);

  const addDivision = () => {
    if (divisions.length >= 3) return;

    const newDivision: DivisionSection = {
      id: `div-${Date.now()}`,
      name: "New Division",
      locations: [],
    };
    setDivisions([...divisions, newDivision]);
  };

  const updateDivisionName = (divisionId: string, name: string) => {
    setDivisions(
      divisions.map((div) => (div.id === divisionId ? { ...div, name } : div))
    );
  };

  const addLocation = (divisionId: string) => {
    const newLocation: LocationSection = {
      id: `loc-${Date.now()}`,
      name: "New Location",
      tasks: [],
    };

    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? { ...div, locations: [...div.locations, newLocation] }
          : div
      )
    );
  };

  const updateLocationName = (
    divisionId: string,
    locationId: string,
    name: string
  ) => {
    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              locations: div.locations.map((loc) =>
                loc.id === locationId ? { ...loc, name } : loc
              ),
            }
          : div
      )
    );
  };

  const deleteLocation = (divisionId: string, locationId: string) => {
    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              locations: div.locations.filter((loc) => loc.id !== locationId),
            }
          : div
      )
    );
  };

  const addTask = (divisionId: string, locationId: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      jenisKerja: "",
      lokasiHole: "",
      hari: "",
      keterangan: "",
    };

    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              locations: div.locations.map((loc) =>
                loc.id === locationId
                  ? { ...loc, tasks: [...loc.tasks, newTask] }
                  : loc
              ),
            }
          : div
      )
    );
  };

  const updateTask = (
    divisionId: string,
    locationId: string,
    taskId: string,
    field: keyof Task,
    value: string
  ) => {
    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              locations: div.locations.map((loc) =>
                loc.id === locationId
                  ? {
                      ...loc,
                      tasks: loc.tasks.map((task) =>
                        task.id === taskId ? { ...task, [field]: value } : task
                      ),
                    }
                  : loc
              ),
            }
          : div
      )
    );
  };

  const deleteTask = (
    divisionId: string,
    locationId: string,
    taskId: string
  ) => {
    setDivisions(
      divisions.map((div) =>
        div.id === divisionId
          ? {
              ...div,
              locations: div.locations.map((loc) =>
                loc.id === locationId
                  ? {
                      ...loc,
                      tasks: loc.tasks.filter((task) => task.id !== taskId),
                    }
                  : loc
              ),
            }
          : div
      )
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Buat Program Mingguan
            </h1>
            <Input
              type="date"
              value={programDate}
              onChange={(e) => setProgramDate(e.target.value)}
              className="text-sm text-gray-600 mt-1 border-none p-0 focus-visible:ring-0 bg-transparent w-auto"
            />
          </div>
        </div>
        <Button
          variant="secondary"
          className="bg-gray-200 hover:bg-gray-300"
          onClick={() => router.push("/")}
        >
          Buat rencana
        </Button>
      </div>

      {/* Division Sections */}
      <div className="space-y-8">
        {divisions.map((division) => (
          <div
            key={division.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <Input
              value={division.name}
              onChange={(e) => updateDivisionName(division.id, e.target.value)}
              className="text-xl font-semibold mb-6 border-none p-0 focus-visible:ring-0 bg-transparent"
            />

            {/* Location Sections */}
            <div className="space-y-6">
              {division.locations.map((location) => (
                <div key={location.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      value={location.name}
                      onChange={(e) =>
                        updateLocationName(
                          division.id,
                          location.id,
                          e.target.value
                        )
                      }
                      className="font-medium border-none p-0 focus-visible:ring-0 bg-transparent"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteLocation(division.id, location.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Task Table */}
                  <div className="bg-white rounded border">
                    <div className="grid grid-cols-6 gap-4 p-3 bg-gray-50 border-b text-sm font-medium text-gray-600">
                      <div>Nomor</div>
                      <div>Jenis Pengerjaan</div>
                      <div>Lokasi Hole</div>
                      <div>Hari</div>
                      <div>Keterangan</div>
                      <div>Aksi</div>
                    </div>

                    {location.tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className="grid grid-cols-6 gap-4 p-3 border-b last:border-b-0"
                      >
                        <div className="text-sm text-gray-600 py-2">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <Input
                          value={task.jenisKerja}
                          onChange={(e) =>
                            updateTask(
                              division.id,
                              location.id,
                              task.id,
                              "jenisKerja",
                              e.target.value
                            )
                          }
                          className="border-gray-200"
                        />
                        <Input
                          value={task.lokasiHole}
                          onChange={(e) =>
                            updateTask(
                              division.id,
                              location.id,
                              task.id,
                              "lokasiHole",
                              e.target.value
                            )
                          }
                          className="border-gray-200"
                        />
                        <Input
                          value={task.hari}
                          onChange={(e) =>
                            updateTask(
                              division.id,
                              location.id,
                              task.id,
                              "hari",
                              e.target.value
                            )
                          }
                          className="border-gray-200"
                        />
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
                          className="border-gray-200"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteTask(division.id, location.id, task.id)
                          }
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Add Task Button */}
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addTask(division.id, location.id)}
                      className="bg-gray-800 text-white hover:bg-gray-700 rounded-full p-2"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Location Button */}
            <div className="mt-6">
              <Button
                variant="secondary"
                onClick={() => addLocation(division.id)}
                className="bg-gray-200 hover:bg-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Lokasi
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Division Button */}
      {divisions.length < 3 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            onClick={addDivision}
            className="bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Divisi
          </Button>
        </div>
      )}
    </div>
  );
}
