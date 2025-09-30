// components/sections/CategoriesPreview.tsx
"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

const categories = [
  { src: "/images/home/Asset 49.svg", name: "Toán học", count: 157 },
  { src: "/images/home/Asset 51.svg", name: "Tiếng anh", count: 154 },
  { src: "/images/home/Asset 48.svg", name: "Khoa học", count: 108 },
  { src: "/images/home/Asset 47.svg", name: "Âm nhạc", count: 53 },
  { src: "/images/home/Asset 50.svg", name: "Mỹ thuật", count: 28 },
];

export default function CategoriesPreview() {
  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="mx-auto mb-6">
            <img
              src="/images/home/Asset 52.svg"
              alt=""
              className="mx-auto w-36 h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">Danh mục phổ biến</h2>
          <p className="text-[#4B4C4C] max-w-2xl mx-auto text-sm md:text-base">
            Khám phá các lĩnh vực học tập đa dạng, phù hợp với mọi lứa tuổi và cấp độ.
          </p>
        </div>

        {/* List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 place-items-center">
          {categories.map(({ src, name, count }) => (
            <Card
              key={name}
              className="
                        relative w-[150px] h-[230px] md:w-[160px] md:h-[240px]
                        rounded-[999px] overflow-hidden select-none border-none
                      "
            >
              {/* BG paper */}
              <Image
                src="/images/home/category-card.png"
                alt=""
                fill
                sizes="(min-width:768px) 160px, 150px"
                className="object-cover"
                priority={false}
              />

              {/* Overlay opacity (nhạt như ảnh) */}
              <div className="absolute inset-0 bg-white/70" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center pt-5 pb-6">
                {/* Icon giữa */}
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src={src}
                    alt={name}
                    width={110}
                    height={110}
                    className="w-[92px] h-[92px] md:w-[100px] md:h-[100px] object-contain"
                  />
                </div>

                {/* Tên + số khóa NẰM TRONG OVAL */}
                <div className="text-center leading-tight">
                  <div className="text-[20px] md:text-[22px] font-extrabold text-[var(--text-color)]">
                    {name}
                  </div>
                  <div className="mt-1 text-[12px] md:text-[12.5px] text-[#4B4C4C]">
                    +{count} khóa
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
