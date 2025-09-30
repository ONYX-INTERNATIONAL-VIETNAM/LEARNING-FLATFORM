"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-[url('/images/hero-bg.png')] bg-cover bg-center
        py-12 md:py-20
        pb-0
      "
    >
      {/* lớp gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#BFE6FF_0%,rgba(255,255,255,0.3)_50%,#FDF5FF_100%)]" />
      {/* lớp trắng mờ */}
      <div className="absolute inset-0 bg-white/40 md:bg-white/30" />

      {/* content */}
      <div className="relative container mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-28 items-start">
          
          {/* Cột trái */}
          <div className="flex flex-col items-start">
            {/* Card tiêu đề + mô tả */}
            <div
              className="
                bg-[rgba(249,250,251,0.72)] rounded-[28px]
                shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                p-6 md:p-10 w-full
              "
            >
              <h1
                className="
                  text-4xl md:text-5xl lg:text-5xl font-extrabold leading-[56px]
                  text-[var(--secondary-color)] wrap-break-word
                  mb-4 md:mb-6 font-montserrat
                "
              >
                Học tập trực tuyến <br/><span className="text-[var(--primary-color)]">vui nhộn</span>{" "}
                cho trẻ em toàn thế giới
              </h1>

              <p className="text-[--var(text-color)] text-base md:text-lg leading-relaxed max-w-2xl">
                Nền tảng giáo dục ONYX mang đến trải nghiệm học tập tương tác,
                thú vị và dễ tiếp cận cho học sinh và giáo viên trên khắp thế giới.
              </p>
            </div>

            {/* Nút CTA nằm ngoài khung */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between w-full">
              <Button
                size="lg"
                className="
                  rounded-2xl text-2xl py-8
                  bg-[rgba(245,158,11,0.72)] hover:bg-[var(--primary-color)] text-white
                  shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                "
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Tham gia học ngay
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="
                  rounded-2xl text-2xl py-8
                  bg-[#F8FAFC]
                  shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
                  hover:bg-[var(--bg-color)]
                  
                "
              >
                <Users className="mr-2 h-5 w-5" />
                Dành cho giảng viên
              </Button>
            </div>
          </div>

          {/* Cột phải */}
          <div
            className="
              bg-[rgba(17,24,39,0.3)] text-white
              rounded-[28px] p-6 md:p-10
              shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)]
              flex flex-col justify-center
            "
          >
            <ul className="space-y-4">
              <li className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img src="/images/home/Asset 101.svg" alt="Toàn cầu" className="w-12 h-12" />
                  <h3 className="md:text-xl font-bold">Toàn cầu</h3>
                </div>
                <p className="text-white/85 md:text-lg leading-relaxed max-w-xs">
                  Kết nối học sinh và giáo viên từ khắp nơi trên thế giới
                </p>
              </li>

              <li className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img src="/images/home/Asset 102.svg" alt="Tương tác" className="w-12 h-12" />
                  <h3 className="md:text-xl font-bold">Tương tác</h3>
                </div>
                <p className="text-white/85 md:text-lg leading-relaxed max-w-xs">
                  Học lập trình thông qua trò chơi, video và bài tập thú vị
                </p>
              </li>

              <li className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <img src="/images/home/Asset 103.svg" alt="Chất lượng" className="w-12 h-12" />
                  <h3 className="md:text-xl font-bold">Chất lượng</h3>
                </div>
                <p className="text-white/85 md:text-lg leading-relaxed max-w-xs">
                  Nội dung được thiết kế bởi các chuyên gia giáo dục
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
