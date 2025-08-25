import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        {/* Sidebar fixed */}
        <div className="w-64 flex min-h-screen fixed top-0 left-0">
          <Sidebar />
        </div>

        {/* Main content diberi margin-left agar tidak ketutup sidebar */}
        <main className="flex-1 p-6 ml-64 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
