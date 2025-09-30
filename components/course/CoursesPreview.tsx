// components/sections/CoursesCarousel.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

const COURSES = [
  {
    id: "c1",
    title: "Toán học cơ bản",
    description: "Học toán vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/images/home/Asset 97.svg",
    level: "Cơ bản",
    duration: "4 tuần",
    students: 2590,
    rating: 4.7,
    price: 390000,
    badge: "bg-blue-100 text-blue-800",
    teacher: "Cô Lan",
  },
  {
    id: "c2",
    title: "Tiếng Anh cho trẻ em",
    description: "Phát triển kỹ năng tiếng Anh qua câu chuyện và bài hát",
    image: "/images/home/Asset 98.svg",
    level: "Sơ cấp",
    duration: "5 tuần",
    students: 2180,
    rating: 4.8,
    price: 450000,
    badge: "bg-green-100 text-green-800",
    teacher: "Thầy John",
  },
  {
    id: "c3",
    title: "Khoa học thú vị",
    description: "Khám phá thế giới khoa học qua thí nghiệm đơn giản",
    image: "/images/home/Asset 99.svg",
    level: "Trung cấp",
    duration: "7 tuần",
    students: 650,
    rating: 4.7,
    price: 420000,
    badge: "bg-purple-100 text-purple-800",
    teacher: "Cô Mai",
  },
  {
    id: "c4",
    title: "Thiên văn nhập môn",
    description: "Làm quen bầu trời đêm qua các hoạt động trực quan",
    image: "/images/home/Asset 97.svg",
    level: "Sơ cấp",
    duration: "4 tuần",
    students: 880,
    rating: 4.6,
    price: 410000,
    badge: "bg-pink-100 text-pink-800",
    teacher: "Thầy Nam",
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(n);

export default function CoursesCarousel() {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [spv, setSpv] = React.useState(1);
  const [page, setPage] = React.useState(0);

  const calcSpv = React.useCallback(() => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }, []);

  React.useEffect(() => {
    const handle = () => setSpv(calcSpv());
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [calcSpv]);

  const scrollToPage = React.useCallback(
    (p: number) => {
      const el = viewportRef.current;
      if (!el) return;
      const totalPages = Math.max(1, Math.ceil(COURSES.length / spv));
      console.log({ p, totalPages });

      const next = ((p % totalPages) + totalPages) % totalPages;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setPage(next);
    },
    [spv]
  );

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const curr = Math.round(el.scrollLeft / el.clientWidth);
        setPage(curr);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(COURSES.length / spv));

  return (
    <section className="relative isolate  overflow-hidden bg-white">
      {/* ======= 2 SVG nền lượn sóng ======= */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* TOP wave */}
        <img
          src="/images/home/Vector1.svg"
          alt=""
          draggable={false}
          className="
                absolute top-0 left-0
                w-screen max-w-none
                h-full
                object-contain object-left
              "
        />
        {/* BOTTOM-RIGHT wave */}
        <img
          src="/images/home/Vector2.svg" // đổi sang đường dẫn thật của bạn
          alt=""
          draggable={false}
          className="absolute right-[-4%] bottom-[-8%] w-[70vw] md:w-[48vw] lg:w-[42vw] h-auto object-contain"
        />
      </div>
      {/* ======= hết nền ======= */}

      {/* Nội dung đặt lên trên overlay */}
      <div className="relative z-10 container mx-auto px-16 my-24">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center">
            <img
              src="/images/home/Asset 100.svg"
              alt="graduation-hat"
              className="w-36 h-20"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-montserrat">
            Khóa học phổ biến
          </h2>
          <p className="text-[#4B4C4C] max-w-2xl mx-auto">
            Khám phá các khóa học được thiết kế đặc biệt cho trẻ em với phương
            pháp học tập hiện đại
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel>
            {COURSES.map((c) => (
              <CarouselItem key={c.id}>
                {/* Dùng wrapper padding để tạo gutter giữa các slide */}
                <div className="p-3 md:p-3.5 lg:p-4 h-full">
                  <Card className="h-full rounded-[28px] overflow-hidden border border-[#e9eef5] bg-white gap-1">
                    {/* Ảnh minh họa */}
                    <div className="relative aspect-[4/3] rounded-t-[28px] overflow-hidden bg-white">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="(min-width:1024px) 32vw, (min-width:640px) 48vw, 94vw"
                        className="object-contain p-5"
                        priority
                      />
                    </div>

                    {/* Tiêu đề */}
                    <CardHeader className="px-6 pt-4 pb-0">
                      <CardTitle className="text-[22px] md:text-2xl font-extrabold leading-snug text-slate-900 line-clamp-2">
                        {c.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Nội dung */}
                    <CardContent className="px-6 pb-6 pt-3 space-y-2">
                      <p className="text-[15px] leading-relaxed text-slate-500 line-clamp-1">
                        {c.description}
                      </p>

                      <ul className="space-y-3 text-[14px] text-slate-400">
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {c.students.toLocaleString()} học sinh đã tham gia
                          </span>
                        </li>
                        <li className="flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{c.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{c.duration}</span>
                          </div>
                        </li>
                      </ul>

                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center text-[14px] text-slate-600">
                          <Star className="h-4 w-4 mr-1 fill-[#F6C646] text-[#F6C646]" />
                          <span>{c.rating}</span>
                        </div>

                        <button
                          className="rounded-full bg-[#F6C646] hover:bg-[#f3bb2a] text-[#3b3b3b]
                             text-[13px] font-semibold px-5 py-2
                             shadow-[0_6px_18px_rgba(246,198,70,0.4)] hover:scale-110 transition"
                        >
                          Tham gia ngay
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </div>

        {/* Dots + nút tím */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <button className="rounded-full px-7 py-3 bg-[var(--secondary-color)] text-white text-sm font-semibold">
            Xem tất cả khóa học
          </button>
        </div>
      </div>
    </section>
  );
}
