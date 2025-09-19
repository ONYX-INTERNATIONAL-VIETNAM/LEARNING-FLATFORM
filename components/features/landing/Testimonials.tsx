"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Carousel, CarouselItem } from "@/components/ui/carousel"; // 👈 dùng carousel bạn đã tạo

const items = [
  {
    name: "Lan Anh",
    role: "Phụ huynh lớp 4",
    avatar: "/images/avatar.jpg",
    quote: "Bé rất thích các bài học có trò chơi. Điểm số cải thiện rõ rệt!",
  },
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
    quote: "Quản lý lớp và chấm bài tiện. Báo cáo giúp theo sát từng học sinh.",
  },
  {
    name: "Ngọc Mai",
    role: "Phụ huynh lớp 2",
    avatar: "/images/avatar.jpg",
    quote: "Bé nhà mình học rất chăm nhờ hệ thống điểm thưởng. Rất hài lòng!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Phản hồi từ người dùng
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chia sẻ chân thực từ phụ huynh, học sinh và giáo viên đang sử dụng ONYX.
          </p>
        </div>

        {/* Carousel */}
        <Carousel options={{ align: "start", loop: true }}>
          {items.map(({ name, role, avatar, quote }, i) => (
            <CarouselItem key={i}>
              <Card className="h-full border hover:border-accent transition">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={avatar}
                      alt={name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold leading-tight">{name}</div>
                      <div className="text-xs text-muted-foreground">{role}</div>
                    </div>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    “{quote}”
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
