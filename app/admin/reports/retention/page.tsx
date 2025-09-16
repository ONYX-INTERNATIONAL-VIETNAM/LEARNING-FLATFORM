"use client";

export default function RetentionReportPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Báo cáo Giữ chân</h1>
      <p className="text-gray-600">
        Phân tích cohort retention, churn rate và tỷ lệ quay lại theo tuần/tháng.
      </p>
      {/* TODO: thêm Cohort chart, churn analysis */}
    </div>
  );
}
