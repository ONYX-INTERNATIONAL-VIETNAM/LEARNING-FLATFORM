"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { ProductForm } from "../components/ProductForm";
import { ConfirmDialog } from "@/components/common";
import { toast } from "sonner";
import type { ProductFormData } from "../components/product";
// ====================== TYPES ======================
type Product = {
  id: string;
  name: string;
  type: string;
  price: number | null;
  status: "draft" | "published";
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  level: string;
  duration: string;
  tags: string[];
  fileUrl: string | null;
};

// ====================== FAKE DATA ======================
const fakeProduct: Product = {
  id: "1",
  name: "English Grammar Basics",
  type: "Course",
  price: null,
  status: "published",
  description: "This is a beginner-level grammar course with 10 lessons.",
  author: "Alice Teacher",
  createdAt: "2025-09-10",
  updatedAt: "2025-09-16",
  language: "English",
  level: "Beginner",
  duration: "10 hours",
  tags: ["grammar", "english", "beginner"],
  fileUrl: "/uploads/english-grammar.pdf",
};

// ====================== COMPONENT ======================
export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // giả lập dữ liệu product từ server
  const product: Product = { ...fakeProduct, id: id as string };

  // Update product
  const handleUpdate = async (data: ProductFormData) => {
    const updated: Product = {
      ...product, // giữ các field server có sẵn
      ...data,    // merge field từ form
      status: data.isPublished ? "published" : "draft",
      updatedAt: new Date().toISOString(),
      fileUrl: data.file ? URL.createObjectURL(data.file) : product.fileUrl,
    };
  
    console.log("Update product:", updated);
    // gọi API update
  };

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting product:", id);
      // 👉 TODO: gọi API xoá sản phẩm ở đây
      toast.success("Xóa sản phẩm thành công ");
      router.push("/admin/products");
    } catch (err) {
      console.log('err', err);
      toast.error("Không thể xóa sản phẩm ");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Chi tiết sản phẩm</h1>
          <p className="text-gray-600 text-sm">
            Xem và chỉnh sửa thông tin sản phẩm trong hệ thống
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/admin/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
      </div>

      {/* Content */}
      {!isEditing ? (
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
              </Button>
              <ConfirmDialog
                title="Xóa sản phẩm"
                description="Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác."
                triggerVariant="destructive"
                triggerLabel="Xóa"
                onConfirm={() => handleDelete(product.id)}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Tags & Status */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{product.type}</Badge>
              {product.price !== null ? (
                <Badge>{(product.price as number).toLocaleString()}₫</Badge>
              ) : (
                <Badge>Miễn phí</Badge>
              )}
              <Badge
                variant={product.status === "published" ? "default" : "outline"}
              >
                {product.status}
              </Badge>
              <Badge>{product.language}</Badge>
              <Badge>{product.level}</Badge>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold">Mô tả</h2>
              <p className="text-gray-700 mt-1">{product.description}</p>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <strong>Tác giả:</strong> {product.author}
              </p>
              <p>
                <strong>Thời lượng:</strong> {product.duration}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {product.createdAt}
              </p>
              <p>
                <strong>Cập nhật lần cuối:</strong> {product.updatedAt}
              </p>
            </div>

            {/* Tags */}
            <div>
              <h2 className="font-semibold">Tags</h2>
              <div className="flex gap-2 mt-1">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* File */}
            {product.fileUrl && (
              <div>
                <h2 className="font-semibold">Tệp đính kèm</h2>
                <a
                  href={product.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {product.fileUrl.split("/").pop()}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <ProductForm
          mode="edit"
          defaultValues={product}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}
