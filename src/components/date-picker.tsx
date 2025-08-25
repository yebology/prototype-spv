"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    "Januari 2025",
    "Februari 2025",
    "Maret 2025",
    "April 2025",
    "Mei 2025",
    "Juni 2025",
    "Juli 2025",
    "Agustus 2025",
    "September 2025",
    "Oktober 2025",
    "November 2025",
    "Desember 2025",
  ];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-40 justify-between text-gray-700"
      >
        {value}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {months.map((month) => (
            <button
              key={month}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                onChange(month);
                setIsOpen(false);
              }}
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
