"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "../components/ProductForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreateProductPage() {
  const router = useRouter();

  const handleSubmit = (data: unknown) => {
    console.log("Create product:", data);

    // 👉 TODO: Gọi API backend để lưu sản phẩm
    // await fetch("/api/products", { method: "POST", body: JSON.stringify(data) })

    // Sau khi lưu thành công, điều hướng về danh sách
    router.push("/admin/products");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tạo sản phẩm mới</h1>
          <p className="text-gray-600 text-sm">
            Nhập thông tin chi tiết để thêm sản phẩm vào hệ thống
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>

      {/* Form */}
      <ProductForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/products")}
      />
    </div>
  );
}
