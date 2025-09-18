// types/product.ts
export type Product = {
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
  
  export type ProductFormData = {
    name: string;
    type: string;
    price: number | null;
    description: string;
    isPublished: boolean;
    tags: string[];
    language: string;
    level: string;
    duration: string;
    file?: File | null;
  };
  