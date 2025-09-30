"use client";

import { useState } from "react";
import { Header, Footer } from "@/components/layout";
import { CourseCard } from "@/components/course";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CartProvider, useCart } from "@/components/features/cart/CartContext";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  totalLessons: number;
  duration: string;
  students: number;
  level: string;
  levelColor: string;
}

const allCourses: Course[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Khóa học số ${i + 1}`,
  description: "Khóa học hấp dẫn giúp bạn phát triển kỹ năng toàn diện.",
  image: "/colorful-math-learning-for-kids.jpg",
  price: 199000 + i * 10000,
  totalLessons: 20,
  duration: `${4 + (i % 3)} tuần`,
  students: 1000 + i * 13,
  level: i % 2 === 0 ? "Cơ bản" : "Trung cấp",
  levelColor:
    i % 2 === 0 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800",
}));

function CoursesGrid() {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popular");
  const [activeCat, setActiveCat] = useState("all");

  const perPage = 6;

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "life", name: "Tâm lý - Kỹ năng sống" },
    { id: "math", name: "Toán học" },
    { id: "english", name: "Tiếng Anh" },
    { id: "science", name: "Khoa học" },
  ];

  let filtered = allCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  if (activeCat !== "all") {
    filtered = filtered.filter((c) =>
      c.level.toLowerCase().includes(activeCat)
    );
  }

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sort === "new") filtered.sort((a, b) => Number(b.id) - Number(a.id));

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="grid md:grid-cols-4 gap-8">
      {/* LEFT MENU */}
      <aside className="md:col-span-1">
        <Card className="p-6 space-y-3 sticky top-24 gap-0">
          <h2 className="text-lg font-semibold">Danh mục</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-lg ${activeCat === cat.id
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "hover:bg-accent/10"
                    }`}
                  onClick={() => {
                    setActiveCat(cat.id);
                    setPage(1);
                  }}
                >
                  {cat.name}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      {/* RIGHT COURSES */}
      <div className="md:col-span-3 space-y-6">
        {/* Top filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Hiển thị {(page - 1) * perPage + 1}–
            {Math.min(page * perPage, filtered.length)} trong {filtered.length} kết quả
          </p>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Tìm kiếm khóa học..."
              className="w-48"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Phổ biến</SelectItem>
                <SelectItem value="new">Mới nhất</SelectItem>
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              footer={
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/courses/1`}>Xem chi tiết</Link>
                  </Button>
                  <Button
                    onClick={() =>
                      addItem({
                        id: course.id,
                        title: course.title,
                        price: course.price,
                        image: course.image,
                        qty: 1,
                      })
                    }
                    className="flex-1 bg-accent transition-all"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Thêm vào giỏ
                  </Button>
                </div>
              }
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => page > 1 && setPage(page - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => page < totalPages && setPage(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1 overflow-x-hidden">
        <section className="relative">
          {/* Ảnh full-bleed không gây scroll ngang */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <img
              src="/images/home/Background.png"  // đổi đúng path ảnh PNG/WebP của bạn trong /public
              alt=""
              className="block w-screen h-auto select-none pointer-events-none"
              draggable={false}
            />

            {/* TEXT: góc trên-trái của màn hình */}
            <div className="absolute z-10 left-4 top-4 md:left-8 md:top-8">
              <h1 className="text-amber-500 font-extrabold text-3xl md:text-5xl leading-tight text-center">
                Cửa hàng khóa học
              </h1>
              <p className="mt-2 max-w-xl text-sm md:text-base text-[#4B4C4C] text-center">
                Khám phá, chọn mua và bắt đầu hành trình học tập của bạn ngay hôm nay
              </p>
            </div>
          </div>
        </section>

        {/* Nội dung – cần chồng nhẹ lên phần cong */}
        <div className="container relative z-10 -mt-4 md:-mt-6 mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <CoursesGrid />
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
