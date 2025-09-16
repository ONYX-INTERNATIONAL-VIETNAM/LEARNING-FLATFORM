"use client";

export default function ExportsReportPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Xuất dữ liệu</h1>
      <p className="text-gray-600">
        Tải báo cáo dưới dạng CSV/PDF hoặc thiết lập lịch gửi định kỳ qua email.
      </p>
      {/* TODO: thêm nút Export CSV, Export PDF, cài đặt recurring reports */}
    </div>
  );
}
