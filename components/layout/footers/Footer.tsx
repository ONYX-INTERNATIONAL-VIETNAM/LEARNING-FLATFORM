// components/common/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const socials = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Twitter, href: "#", label: "Twitter/X" },
    { Icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative">
      {/* Ảnh nền wave */}
      <div
        className="
          absolute inset-0 -z-10
          bg-[url('/images/home/Footer.png')]
          bg-no-repeat bg-top md:bg-center bg-cover
        "
        aria-hidden
      />

      {/* Nội dung footer */}
      {/* NOTE: chừa khoảng cho wave theo từng breakpoint */}
      <div className="relative z-10 container mx-auto px-4 pb-12 pt-[220px] sm:pt-[280px] md:pt-[360px] lg:pt-[450px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Logo + mô tả + social */}
          <div className="md:col-span-5">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/onyx-logo.webp"
                alt="ONYX Learning Platform"
                width={140}
                height={40}
                className="h-auto w-auto"
                priority
              />
            </Link>

            <p className="mb-6 max-w-md text-sm text-gray-600">
              Nền tảng giáo dục trực tuyến hàng đầu dành cho trẻ em, mang đến
              trải nghiệm học tập vui nhộn và hiệu quả.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    inline-flex h-9 w-9 items-center justify-center
                    rounded-full border border-gray-200 bg-white
                    text-gray-700 transition
                    hover:border-yellow-400 hover:text-yellow-500
                  "
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div className="md:col-span-3">
            <h3 className="mb-3 font-semibold text-gray-900">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="transition hover:text-yellow-600">Về chúng tôi</Link></li>
              <li><Link href="/courses" className="transition hover:text-yellow-600">Khóa học</Link></li>
              <li><Link href="/teachers" className="transition hover:text-yellow-600">Giáo viên</Link></li>
              <li><Link href="/contact" className="transition hover:text-yellow-600">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="md:col-span-4">
            <h3 className="mb-3 font-semibold text-gray-900">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="transition hover:text-yellow-600">Trung tâm trợ giúp</Link></li>
              <li><Link href="/privacy-policy" className="transition hover:text-yellow-600">Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="transition hover:text-yellow-600">Điều khoản sử dụng</Link></li>
              <li><Link href="/faq" className="transition hover:text-yellow-600">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10">
          <div className="relative my-4 flex items-center justify-center">
            <span className="h-px w-full bg-gray-200" />
            <span className="mx-4 whitespace-nowrap text-[11px] text-gray-500">
              © {new Date().getFullYear()} ONYX Learning Platform. Tất cả quyền được bảo lưu.
            </span>
            <span className="h-px w-full bg-gray-200" />
          </div>
        </div>
      </div>
    </footer>
  );
}
