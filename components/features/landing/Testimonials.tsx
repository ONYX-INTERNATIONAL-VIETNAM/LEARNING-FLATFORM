// components/sections/Testimonials.tsx
"use client";

import Image from "next/image";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Quote } from "lucide-react";

type TItem = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const items: TItem[] = [
  {
    name: "Minh Khoa",
    role: "Học sinh lớp 6",
    avatar: "/images/avatar.jpg",
    quote: "Video dễ hiểu, vui nhộn. Em thích hệ thống huy hiệu!",
  },
  {
    name: "Cô Hạnh",
    role: "Giáo viên Toán",
    avatar: "/images/avatar.jpg",
    quote:
      "Quản lý lớp tốt và chấm bài tiện, báo cáo theo sát từng học sinh.",
  },
  {
    name: "Ngọc Mai",
    role: "Phụ huynh lớp 2",
    avatar: "/images/avatar.jpg",
    quote:
      "Bé nhà mình rất chăm nhờ hệ thống điểm thưởng. Rất hài lòng!",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      {/* BG layer */}
      <div
        className="absolute inset-0 -z-10 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/images/home/group-17.png')",
          backgroundSize: "cover",
        }}
        aria-hidden
      />

      {/* icon chuông */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/home/Asset 46.svg"
          alt="Bell"
          width={56}
          height={56}
          className="h-10 w-10 md:h-20 md:w-36"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* chỉ 1 dấu ngoặc kép mở bên trái */}
        <Quote
          className="pointer-events-none absolute left-2  z-10 hidden md:block -scale-x-100 text-[var(--secondary-color)]"
          size={72}
        />

        {/* tiêu đề + mô tả */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-color)] font-montserrat">
            Phản hồi từ người dùng
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#4B4C4C]">
            Chia sẻ chân thực từ phụ huynh, học sinh và giáo viên đang sử dụng ONYX.
          </p>
        </div>

        {/* CAROUSEL */}
        <Carousel>
          {items.map(({ name, role, avatar, quote }, i) => (
            <CarouselItem key={i}>
              <div
                className="
                  h-full rounded-[22px]
                  ring-1 ring-black/5
                  text-white
                  shadow-[0_8px_0_0_rgba(0,0,0,0.15)]
                  bg-gradient-to-b from-[#F5C53A] to-[#E3B11F]
                "
              >
                <div className="flex h-full flex-col p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <Image
                      src={avatar}
                      alt={name}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-white/70"
                    />
                    <div>
                      <div className="text-sm font-bold leading-tight text-white">
                        {name}
                      </div>
                      <div className="text-[11px] leading-tight text-white/90">
                        {role}
                      </div>
                    </div>
                  </div>

                  <p className="mt-auto text-[13px] italic leading-relaxed text-white">
                    “{quote}”
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
