// components/sidebar.tsx
"use client";

import { useState } from "react";
import { Home, ClipboardList, File, Settings, Grid, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "0", icon: Grid, hasSubmenu: true, href: "/" },
  { id: "1", icon: Calendar, hasSubmenu: false, href: "/weekly-program" },
  { id: "2", icon: File, hasSubmenu: true, href: "/daily-program" },
];

const subMenu = [
  { id: "lembah", label: "Lembah" },
  { id: "bukit", label: "Bukit"},
  { id: "danau", label: "Danau"},
];

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string | null>();
  const router = useRouter();

  return (
    <aside className="flex">
      {/* Sidebar utama */}
      <div className="flex flex-col items-center gap-4 bg-white shadow-lg p-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.hasSubmenu ? (
              <button
                onClick={() => {
                  if (item.href) {
                    router.push(item.href);
                  }
                  setActiveMenu(activeMenu === item.id ? null : item.id);
                }}
                className={cn(
                  "p-2 rounded-xl hover:bg-gray-200",
                  activeMenu === item.id && "bg-green-100"
                )}
              >
                <item.icon className="w-6 h-6 text-gray-700" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveMenu(null); // <-- submenu dimatikan kalau klik menu id=1
                  router.push(item.href!);
                }}
                className="p-2 rounded-xl hover:bg-gray-200"
              >
                <item.icon className="w-6 h-6 text-gray-700" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar kedua (submenu) */}
      {activeMenu && (
        <div className="w-40 bg-white shadow-md border-l">
          <ul className="flex flex-col">
            {subMenu.map((s) => (
              <li key={s.id}>
                <button
                        className={`w-full text-left px-4 py-3 hover:bg-olive hover:text-white cursor-pointer ${s.id === "lembah" && 'bg-olive text-white'}`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
