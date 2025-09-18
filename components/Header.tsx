"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/courses", label: "Khóa học" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/onyx-logo.webp"
            alt="ONYX Learning Platform"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="outline" size="icon" className="relative ml-1">
            <Link href="/cart" aria-label="Giỏ hàng">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Đăng nhập</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/register">Đăng ký</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/10 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <Button asChild variant="outline" className="mt-2" onClick={() => setOpen(false)}>
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Xem giỏ hàng {count > 0 ? `(${count})` : ""}
              </Link>
            </Button>
            <div className="flex gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login">Đăng nhập</Link>
              </Button>
              <Button
                asChild
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/register">Đăng ký</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
