"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { ProgramTable } from "@/components/program-table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WeeklyProgramHistory() {
  const [fromDate, setFromDate] = useState("Agustus 2025");
  const [toDate, setToDate] = useState("September 2025");
  const router = useRouter();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Program Mingguan
        </h1>

        <Button
          className="bg-olive cursor-pointer text-white px-6 py-3 text-base mb-6"
          onClick={() => router.push("/weekly-program/create")}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Buat program baru
        </Button>

        {/* Action Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900"> Riwayat</h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Dari</span>
              <DatePicker value={fromDate} onChange={setFromDate} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hingga</span>
              <DatePicker value={toDate} onChange={setToDate} />
            </div>

            <Button variant="outline" className="bg-olive cursor-pointer text-white">
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <ProgramTable />
    </div>
  );
}
