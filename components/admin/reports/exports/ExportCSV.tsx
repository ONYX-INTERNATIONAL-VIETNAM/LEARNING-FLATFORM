"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ExportCSV({
  getData,
  filename = "report.csv",
}: {
  getData: () => Record<string, unknown>[];
  filename?: string;
}) {
  const handleExport = () => {
    const data = getData();
    const headers = Object.keys(data[0] ?? {}).join(",");
    const rows = data.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline" className="bg-white border border-gray-300 rounded-md shadow-sm">
      <Download className="w-4 h-4 mr-2" />
      Xuất CSV
    </Button>
  );
}
