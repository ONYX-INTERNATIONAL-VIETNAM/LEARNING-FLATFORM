"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { CartProvider, useCart } from "@/components/cart/CartContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";

// animation config
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

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
  levelColor: i % 2 === 0 ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800",
}));

function CoursesGrid() {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popular"); // sort state
  const [activeCat, setActiveCat] = useState("all");

  const perPage = 6;

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "life", name: "Tâm lý - Kỹ năng sống" },
    { id: "math", name: "Toán học" },
    { id: "english", name: "Tiếng Anh" },
    { id: "science", name: "Khoa học" },
  ];

  // lọc theo danh mục
  let filtered = allCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  if (activeCat !== "all") {
    filtered = filtered.filter((c) => c.level.toLowerCase().includes(activeCat));
  }

  // sắp xếp
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "new") {
    filtered.sort((a, b) => Number(b.id) - Number(a.id)); // giả định id lớn hơn là mới hơn
  }

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
      <main className="flex-1">
        {/* HERO */}
        <div className="relative bg-gradient-to-r from-accent/10 to-transparent py-20 text-center space-y-6 mb-12"
        >
          <div className="container mx-auto px-6 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Cửa hàng khóa học
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá, chọn mua và bắt đầu hành trình học tập của bạn ngay hôm nay
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <CoursesGrid />
        </div>
      </main>
      <Footer />
    </CartProvider>
  );
}
