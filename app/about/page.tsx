"use client";

import { Header, Footer } from "@/components/layout";
import Image from "next/image";
import { CartProvider } from "@/components/features/cart/CartContext";
import { Award, Users, Lightbulb, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// animation config
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 overflow-hidden">
          {/* HERO */}
          <section className="relative">
            {/* Ảnh full-bleed không gây scroll ngang */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
              <img
                src="/images/home/Background-about.png"  // đổi đúng path ảnh PNG/WebP của bạn trong /public
                alt=""
                className="block w-screen h-auto select-none pointer-events-none"
                draggable={false}
              />

              {/* TEXT: góc trên-trái của màn hình */}
              <div className="absolute z-10 left-4 top-4 md:left-8 md:top-8">
                <h1 className="text-amber-500 font-extrabold text-3xl md:text-5xl leading-tight text-center">
                  Khám phá ONYX
                </h1>
                <p className="mt-2 max-w-xl text-sm md:text-base text-slate-600 text-center">
                  Nền tảng học tập & thương mại điện tử hiện đại - kết nối tri thức, cộng đồng và cơ hội
                </p>
              </div>
            </div>
          </section>

          {/* MISSION + IMAGE */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="container mx-auto px-16 pb-16"
          >
            <div className="grid md:grid-cols-12 items-center gap-12 md:gap-16">
              {/* Image LEFT */}
              <div className="md:col-span-5 order-1">
                <Image
                  src="/images/children-learning-online.jpg"
                  alt="Về ONYX"
                  width={640}
                  height={480}
                  className="w-full h-auto rounded-3xl shadow-2xl object-cover ring-1 ring-black/5"
                  priority
                />
              </div>

              {/* Text RIGHT */}
              <div className="md:col-span-7 order-2 space-y-6 md:pl-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
                  Tầm nhìn & Sứ mệnh
                </h2>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-prose">
                  ONYX không chỉ là nơi học tập, mà còn là cầu nối truyền cảm hứng,
                  phát triển kỹ năng và mở ra cơ hội toàn cầu.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-amber-500 shrink-0" />
                    <span className="text-slate-800 font-medium">
                      <span className="font-semibold">200+</span> khóa học đa dạng
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-amber-500 shrink-0" />
                    <span className="text-slate-800 font-medium">
                      <span className="font-semibold">1000+</span> học viên đã tham gia
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-6 w-6 text-amber-500 shrink-0" />
                    <span className="text-slate-800 font-medium">
                      Đội ngũ giảng viên hàng đầu
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>


          {/* STATS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={fadeInUp}
            className="bg-[var(--secondary-color)] py-20"
          >
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center text-white">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">200+</h3>
                <p>Khóa học</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">1,000+</h3>
                <p>Học viên</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold">50+</h3>
                <p>Giảng viên</p>
              </div>
            </div>
          </motion.section>

          {/* CORE VALUES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeInUp}
            className="container mx-auto px-16 py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
              Giá trị cốt lõi
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <Card className="p-10 rounded-2xl">
                <Award className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-foreground">
                  Chất lượng
                </h3>
                <p className="text-muted-foreground">
                  Khóa học đạt chuẩn quốc tế, luôn cập nhật để bắt kịp xu thế.
                </p>
              </Card>
              <Card className="p-10 rounded-2xl">
                <Users className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-foreground">
                  Kết nối
                </h3>
                <p className="text-muted-foreground">
                  Tạo cầu nối giữa giáo viên, học sinh và doanh nghiệp.
                </p>
              </Card>
              <Card className="p-10 rounded-2xl">
                <Lightbulb className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-foreground">
                  Đổi mới
                </h3>
                <p className="text-muted-foreground">
                  Không ngừng ứng dụng công nghệ mới để nâng cao trải nghiệm học tập.
                </p>
              </Card>
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
