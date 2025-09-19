"use client";

import { useParams } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Star, Users, Clock, Globe, Heart, Share2, ShoppingCart, RefreshCw } from "lucide-react";
import { CartProvider, useCart } from "@/components/features/cart/CartContext";
import { motion } from "framer-motion";

/* ================== Types ================== */
interface Teacher {
  name: string;
  bio: string;
  avatar: string;
}

interface Review {
  user: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface CurriculumSection {
  section: string;
  items: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  reviewsCount: number;
  language: string;
  level: string;
  teacher: Teacher;
  whatLearn: string[];
  requirements: string[];
  curriculum: CurriculumSection[];
  reviews: Review[];
  ratingBreakdown: Record<number, number>;
  lastUpdate: string;
  faq: { q: string; a: string }[];
}

/* ================== Demo Data ================== */
const COURSES: Course[] = [
  {
    id: "1",
    title: "Toán học cơ bản",
    description: "Học toán một cách vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/colorful-math-learning-for-kids.jpg",
    price: 199000,
    duration: "4 tuần",
    students: 1250,
    rating: 4.8,
    reviewsCount: 230,
    language: "Tiếng Việt",
    level: "Cơ bản",
    teacher: {
      name: "Nguyễn Văn A",
      bio: "Thạc sĩ Toán học, 10 năm kinh nghiệm giảng dạy cho học sinh tiểu học.",
      avatar: "/images/avatar.jpg",
    },
    whatLearn: [
      "Nắm vững kiến thức toán học cơ bản",
      "Thực hành với trò chơi & hoạt động",
      "Áp dụng kiến thức vào thực tế",
    ],
    requirements: ["Có máy tính hoặc điện thoại", "Tinh thần ham học hỏi"],
    curriculum: [
      { section: "Số học cơ bản", items: ["Giới thiệu về số học", "Cộng trừ cơ bản", "Nhân chia đơn giản"] },
      { section: "Hình học", items: ["Hình học cơ bản", "Ôn tập & Kiểm tra"] },
    ],
    reviews: [
      { user: "Lan Anh", rating: 5, comment: "Khóa học rất dễ hiểu, con mình học rất thích!", avatar: "/images/avatar.jpg" },
      { user: "Minh Khoa", rating: 4, comment: "Bài giảng sinh động, nhưng mong có thêm nhiều trò chơi hơn.", avatar: "/images/avatar.jpg" },
    ],
    ratingBreakdown: { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 },
    lastUpdate: "Tháng 8, 2025",
    faq: [
      { q: "Khóa học có phù hợp cho trẻ lớp 1 không?", a: "Có, nội dung được thiết kế dễ hiểu, phù hợp cho trẻ từ lớp 1 đến lớp 3." },
      { q: "Tôi có thể học trên điện thoại không?", a: "Hoàn toàn được. Khóa học hỗ trợ học trên cả điện thoại và máy tính." },
    ],
  },
];

/* ================== Component ================== */
function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find((c) => c.id === id);
  const { addItem } = useCart();

  if (!course) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy khóa học</h1>
      </div>
    );
  }

  const relatedCourses = COURSES.filter((c) => c.id !== course.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* HERO giống Udemy */}
      <section className="bg-primary/80 text-white">
        <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            <p className="text-lg opacity-90">{course.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                {course.rating} ({course.reviewsCount} đánh giá)
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" /> {course.students.toLocaleString("vi-VN")} học viên
              </span>
            </div>
            <p className="text-sm">
              Giảng viên: <span className="font-medium">{course.teacher.name}</span>
            </p>
            <div className="flex gap-6 text-sm text-gray-300">
              <span className="flex items-center"><RefreshCw className="h-4 w-4 mr-1" /> Cập nhật {course.lastUpdate}</span>
              <span className="flex items-center"><Globe className="h-4 w-4 mr-1" /> {course.language}</span>
              <span>Cấp độ: {course.level}</span>
            </div>
          </div>
          {/* Thumbnail trong hero (desktop) */}
          <div className="hidden md:block">
            <Image src={course.image} alt={course.title} width={500} height={280} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        {/* MAIN CONTENT */}
        <div className="md:col-span-2 space-y-12">
          {/* What you'll learn */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Bạn sẽ học được gì</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-700 list-disc pl-6">
              {course.whatLearn.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </section>

          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Yêu cầu</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {course.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>

          {/* Curriculum */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>
            <Accordion type="single" collapsible>
              {course.curriculum.map((sec, idx) => (
                <AccordionItem key={idx} value={`sec-${idx}`}>
                  <AccordionTrigger>{sec.section}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="pl-6 list-disc text-gray-700">
                      {sec.items.map((it, i) => <li key={i}>{it}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <Accordion type="single" collapsible>
              {course.faq.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-700">{f.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Giảng viên</h2>
            <div className="flex gap-4 items-center">
              <Image src={course.teacher.avatar} alt={course.teacher.name} width={80} height={80} className="rounded-full" />
              <div>
                <p className="font-semibold">{course.teacher.name}</p>
                <p className="text-sm text-gray-500">{course.teacher.bio}</p>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Đánh giá từ học viên</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center justify-center bg-white shadow p-6 rounded-lg">
                <span className="text-5xl font-bold">{course.rating}</span>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">{course.reviewsCount} đánh giá</p>
              </div>
              <div className="md:col-span-2 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-10 text-sm">{star}★</span>
                    <Progress value={course.ratingBreakdown[star]} className="flex-1 h-2" />
                    <span className="w-10 text-sm text-right">{course.ratingBreakdown[star]}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {course.reviews.map((r, idx) => (
                <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <Image src={r.avatar} alt={r.user} width={40} height={40} className="rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.user}</span>
                        <span className="flex items-center text-sm">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          {r.rating}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{r.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-8 sticky top-20 h-fit">
          {/* BUY BOX */}
          <div className="bg-white border rounded-lg shadow-md overflow-hidden">
            <Image src={course.image} alt={course.title} width={400} height={250} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-4">
              <div className="text-3xl font-bold text-primary">{course.price.toLocaleString("vi-VN")}₫</div>
              <Button
                onClick={() => addItem({ id: course.id, title: course.title, price: course.price, image: course.image, qty: 1 })}
                className="w-full bg-accent"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ
              </Button>
              <Button variant="outline" className="w-full">Mua ngay</Button>
              <div className="flex justify-between text-sm text-gray-500">
                <Button variant="ghost" size="sm" className="flex items-center gap-1"><Heart className="h-4 w-4" /> Yêu thích</Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1"><Share2 className="h-4 w-4" /> Chia sẻ</Button>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 border-t pt-4">
                <li><Clock className="inline h-4 w-4 mr-1" /> {course.duration}</li>
                <li><Globe className="inline h-4 w-4 mr-1" /> Ngôn ngữ: {course.language}</li>
                <li>Cấp độ: {course.level}</li>
              </ul>
            </div>
          </div>

          {/* RELATED COURSES */}
          <div className="bg-white border rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Khóa học liên quan</h3>
            <div className="space-y-4">
              {relatedCourses.map((related) => (
                <motion.div key={related.id} whileHover={{ scale: 1.02 }} className="flex gap-3 items-center border rounded-md p-2 hover:shadow-sm">
                  <Image src={related.image} alt={related.title} width={80} height={60} className="rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{related.title}</p>
                    <p className="text-xs text-gray-500">{related.price.toLocaleString("vi-VN")}₫</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => addItem({ id: related.id, title: related.title, price: related.price, image: related.image, qty: 1 })}>
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <CartProvider>
      <CourseDetail />
    </CartProvider>
  );
}
