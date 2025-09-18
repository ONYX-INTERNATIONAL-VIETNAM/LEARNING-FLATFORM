"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Star } from "lucide-react";
import { CartProvider } from "@/components/cart/CartContext";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

// Animation config cho Hero
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

// ======= Fake data =======
const CART_ITEMS = [
  { id: "1", title: "Toán học cơ bản", instructor: "Nguyễn Văn A", price: 199000, image: "/colorful-math-learning-for-kids.jpg", rating: 4.8, reviews: 230 },
  { id: "2", title: "Tiếng Anh cho trẻ em", instructor: "Nguyễn Văn B", price: 249000, image: "/english-learning-for-children-with-books.jpg", rating: 4.9, reviews: 150 },
  { id: "3", title: "Khoa học tự nhiên vui nhộn", instructor: "Cô Lan", price: 179000, image: "/english-learning-for-children-with-books.jpg", rating: 4.7, reviews: 120 },
];


const RECOMMENDED = [
  { id: "6", title: "Lập trình Scratch cho trẻ em", instructor: "Trần Minh", price: 299000, image: "/english-learning-for-children-with-books.jpg", rating: 4.8, reviews: 300 },
  { id: "7", title: "Vẽ sáng tạo cho trẻ em", instructor: "Nguyễn Hoa", price: 159000, image: "/english-learning-for-children-with-books.jpg", rating: 4.6, reviews: 90 },
  { id: "8", title: "Khám phá vũ trụ", instructor: "Phạm Tuấn", price: 219000, image: "/english-learning-for-children-with-books.jpg", rating: 4.9, reviews: 250 },
  { id: "9", title: "Kỹ năng sống cơ bản", instructor: "Hoàng Hạnh", price: 169000, image: "/english-learning-for-children-with-books.jpg", rating: 4.7, reviews: 130 },
];

const RECENTLY_VIEWED = [
  { id: "10", title: "Âm nhạc cho thiếu nhi", instructor: "Phạm Dũng", price: 189000, image: "/english-learning-for-children-with-books.jpg", rating: 4.5, reviews: 80 },
  { id: "11", title: "Thí nghiệm khoa học tại nhà", instructor: "Lê Hòa", price: 209000, image: "/english-learning-for-children-with-books.jpg", rating: 4.7, reviews: 140 },
  { id: "12", title: "Truyện cổ tích tiếng Anh", instructor: "Ngô Thảo", price: 149000, image: "/english-learning-for-children-with-books.jpg", rating: 4.6, reviews: 95 },
  { id: "13", title: "Yoga và vận động cho trẻ em", instructor: "Đỗ Hương", price: 199000, image: "/english-learning-for-children-with-books.jpg", rating: 4.8, reviews: 160 },
];

// ======= Main Page =======
export default function CartPage() {
  const [selected, setSelected] = useState<string[]>(CART_ITEMS.map((i) => i.id));
  const [coupon, setCoupon] = useState("");

  const toggleSelect = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const removeItem = (id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const selectedItems = CART_ITEMS.filter((i) => selected.includes(i.id));
  const total = selectedItems.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        {/* HERO */}
        <div className="bg-gradient-to-r from-accent/10 to-transparent py-20 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Giỏ hàng của bạn
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kiểm tra lại các khóa học bạn đã thêm vào giỏ trước khi thanh toán
          </p>
        </div>

        {/* MAIN */}
        <main className="flex-1 container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          {/* LEFT - Cart Items */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-6">Các khóa học trong giỏ</h2>
            {CART_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b pb-4 mb-4 last:border-0"
              >
                <Input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="mt-3 h-5 w-5 accent-accent"
                />
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.instructor}</p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span>{item.rating}</span>
                    <span className="text-muted-foreground">({item.reviews})</span>
                  </div>
                  <p className="text-primary font-semibold mt-1">
                    {item.price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  aria-label="Xóa sản phẩm"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          {/* RIGHT - Summary */}
          <aside className="border rounded-lg p-6 bg-white shadow-lg h-fit space-y-6">
            <h2 className="text-xl font-semibold">Tóm tắt đơn hàng</h2>
            <p className="text-sm text-muted-foreground">
              Bạn đã chọn {selected.length} khóa học
            </p>
            <div className="flex justify-between text-sm">
              <span>Tạm tính</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>

            {/* Coupon */}
            <div className="space-y-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Nhập mã giảm giá"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
              <Button className="w-full" variant="outline" disabled={!coupon.trim()}>
                Áp dụng
              </Button>
            </div>

            <div className="flex justify-between font-semibold text-lg">
              <span>Tổng cộng</span>
              <span>{total.toLocaleString("vi-VN")}₫</span>
            </div>

            <Button
              asChild
              className="w-full bg-accent disabled:opacity-50"
              disabled={selected.length === 0}
            >
              <Link href="/checkout">Đi tới thanh toán</Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              30 ngày hoàn tiền nếu không hài lòng
            </p>
          </aside>
        </main>

        {/* Recommended Carousel */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Khóa học được gợi ý</h2>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {RECOMMENDED.map((c) => (
              <div
                key={c.id}
                className="min-w-[250px] snap-start border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  width={300}
                  height={180}
                  className="rounded-md object-cover mb-3"
                />
                <h3 className="font-semibold text-sm line-clamp-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.instructor}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span>{c.rating}</span>
                  <span className="text-muted-foreground">({c.reviews})</span>
                </div>
                <p className="text-primary font-semibold mt-1">
                  {c.price.toLocaleString("vi-VN")}₫
                </p>
                <Button size="sm" className="mt-3 w-full bg-accent">
                  Thêm vào giỏ
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Viewed Carousel */}
        <section className="container mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-6">Khóa học bạn vừa xem</h2>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {RECENTLY_VIEWED.map((c) => (
              <div
                key={c.id}
                className="min-w-[250px] snap-start border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  width={300}
                  height={180}
                  className="rounded-md object-cover mb-3"
                />
                <h3 className="font-semibold text-sm line-clamp-2">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.instructor}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span>{c.rating}</span>
                  <span className="text-muted-foreground">({c.reviews})</span>
                </div>
                <p className="text-primary font-semibold mt-1">
                  {c.price.toLocaleString("vi-VN")}₫
                </p>
                <Button size="sm" className="mt-3 w-full bg-accent">
                  Thêm vào giỏ
                </Button>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </CartProvider>
  );
}
