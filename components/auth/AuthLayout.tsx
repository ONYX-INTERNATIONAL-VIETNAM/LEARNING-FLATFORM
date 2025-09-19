import type React from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Back Home */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-accent hover:text-accent-foreground bg-accent/10 hover:bg-accent/20 rounded-full transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
          </svg>
          Về trang chủ
        </Link>
      </div>

      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent/20 via-muted/30 to-accent/10 items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-80 h-80 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/children-learning-online.jpg"
              alt="Children learning online"
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Học tập vui nhộn cùng ONYX
          </h3>
          <p className="text-muted-foreground">
            Tham gia cộng đồng học tập trực tuyến lớn nhất dành cho trẻ em
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
