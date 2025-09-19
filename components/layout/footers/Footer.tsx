import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/onyx-logo.webp"
              alt="ONYX Learning Platform"
              width={120}
              height={40}
              className="h-auto w-auto"
            />
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Nền tảng giáo dục trực tuyến hàng đầu dành cho trẻ em, mang đến
              trải nghiệm học tập vui nhộn và hiệu quả.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-full bg-background border hover:bg-accent/10 hover:text-accent transition"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-accent transition">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-accent transition">
                  Khóa học
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="hover:text-accent transition">
                  Giáo viên
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-accent transition">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-accent transition">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ONYX Learning Platform. Tất cả quyền được
          bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
