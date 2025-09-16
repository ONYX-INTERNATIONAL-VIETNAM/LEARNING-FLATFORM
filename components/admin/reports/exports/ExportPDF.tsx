"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function ExportPDF() {
  return (
    <Button variant="outline" className="bg-white border border-gray-300 rounded-md shadow-sm">
      <FileText className="w-4 h-4 mr-2" />
      Xuất PDF
    </Button>
  );
}
