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

        <main className="flex-1">
          {/* HERO */}
          <div className="relative bg-gradient-to-r from-accent/10 to-transparent py-20 text-center space-y-6"
          >
            <div className="container mx-auto px-6 text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Khám phá ONYX
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nền tảng học tập & thương mại điện tử hiện đại – kết nối tri thức,
                cộng đồng và cơ hội.
              </p>
            </div>
          </div>

          {/* MISSION + IMAGE */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Text content */}
            <div className="space-y-6 ps-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                Sứ mệnh & Tầm nhìn
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ONYX không chỉ là nơi học tập, mà còn là cầu nối truyền cảm hứng,
                phát triển kỹ năng và mở ra cơ hội toàn cầu.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <span className="text-foreground font-medium">
                    200+ khóa học đa dạng
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-accent" />
                  <span className="text-foreground font-medium">
                    1000+ học viên đang tham gia
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-accent" />
                  <span className="text-foreground font-medium">
                    Đội ngũ giảng viên hàng đầu
                  </span>
                </li>
              </ul>
            </div>

            {/* Image */}
            <Image
              src="/images/children-learning-online.jpg"
              alt="Về ONYX"
              width={640}
              height={420}
              className="rounded-2xl shadow-2xl object-cover"
            />
          </motion.section>

          {/* STATS */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={fadeInUp}
            className="bg-muted/20 py-20"
          >
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-foreground">200+</h3>
                <p className="text-muted-foreground">Khóa học</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-foreground">1,000+</h3>
                <p className="text-muted-foreground">Học viên</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-foreground">50+</h3>
                <p className="text-muted-foreground">Giảng viên</p>
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
            className="container mx-auto px-6 py-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
              Giá trị cốt lõi
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <Card className="p-10 rounded-2xl shadow-lg hover:shadow-2xl transition">
                <Award className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-foreground">
                  Chất lượng
                </h3>
                <p className="text-muted-foreground">
                  Khóa học đạt chuẩn quốc tế, luôn cập nhật để bắt kịp xu thế.
                </p>
              </Card>
              <Card className="p-10 rounded-2xl shadow-lg hover:shadow-2xl transition">
                <Users className="mx-auto h-12 w-12 text-accent mb-4" />
                <h3 className="font-semibold text-xl mb-3 text-foreground">
                  Kết nối
                </h3>
                <p className="text-muted-foreground">
                  Tạo cầu nối giữa giáo viên, học sinh và doanh nghiệp.
                </p>
              </Card>
              <Card className="p-10 rounded-2xl shadow-lg hover:shadow-2xl transition">
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
