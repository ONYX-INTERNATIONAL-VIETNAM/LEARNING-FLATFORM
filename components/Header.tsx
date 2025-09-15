import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/onyx-logo.webp"
              alt="ONYX Learning Platform"
              width={120}
              height={40}
              className="h-auto w-auto"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#courses"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Khóa học
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Giới thiệu
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-accent transition-colors"
          >
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Đăng ký
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
