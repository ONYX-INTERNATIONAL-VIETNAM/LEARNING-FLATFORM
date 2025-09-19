"use client";

import { useState, useEffect } from "react";
import { Header, Footer } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import {
    Mail,
    CreditCard,
    Wallet,
    Landmark,
    Gift,
    Lock,
    LogOut,
} from "lucide-react";
import { CartProvider } from "@/components/features/cart/CartContext";

// ==== Fake Auth Hook ====
function useUser() {
    const [user, setUser] = useState<null | {
        name: string;
        email: string;
        avatar: string;
    }>(null);

    useEffect(() => {
        setUser({
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            avatar: "https://i.pravatar.cc/100?img=5",
        });
    }, []);

    return { user, setUser };
}

// ==== Fake Cart Data ====
const fakeItems = [
    {
        id: "1",
        title: "Toán học cơ bản",
        price: 339000,
        qty: 1,
        image: "/colorful-math-learning-for-kids.jpg",
    },
    {
        id: "2",
        title: "Lịch sử thế giới cho thiếu nhi",
        price: 309000,
        qty: 1,
        image: "/english-learning-for-children-with-books.jpg",
    },
];

// ==== Inner Component ====
function CheckoutInner() {
    const [email, setEmail] = useState("");
    const [promo, setPromo] = useState("");
    const [payment, setPayment] = useState("card");
    const { user, setUser } = useUser();

    // Tính toán giá
    const sumOriginal = fakeItems.reduce((s, i) => s + i.price * 2, 0);
    const sumDiscounted = fakeItems.reduce((s, i) => s + i.price * i.qty, 0);
    const discountAmount = sumOriginal - sumDiscounted;

    return (
        <main className="flex-1 container mx-auto px-6 py-12">
            {/* === Progress Steps === */}
            <div className="max-w-2xl mx-auto mb-12">
                {/* Desktop / Tablet: horizontal */}
                <ol className="hidden sm:flex items-center w-full">
                    {/* Step 1 */}
                    <li className="flex items-center flex-1 relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-semibold z-10">
                            1
                        </div>
                        <span className="ml-2 text-sm font-medium text-accent">Đăng nhập</span>
                        <div className="flex-1 h-0.5 bg-accent mx-4" />
                    </li>

                    {/* Step 2 */}
                    <li className="flex items-center flex-1 relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold z-10">
                            2
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Thanh toán</span>
                        <div className="flex-1 h-0.5 bg-gray-300 mx-4" />
                    </li>

                    {/* Step 3 */}
                    <li className="flex items-center relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold z-10">
                            3
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Hoàn tất</span>
                    </li>
                </ol>

                {/* Mobile: vertical */}
                <ol className="flex flex-col gap-6 sm:hidden justify-center">
                    {/* Step 1 */}
                    <li className="flex items-center gap-3 relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-semibold">
                            1
                        </div>
                        <span className="text-sm font-medium text-accent">Đăng nhập</span>
                        <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-accent" />
                    </li>

                    {/* Step 2 */}
                    <li className="flex items-center gap-3 relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold">
                            2
                        </div>
                        <span className="text-sm font-medium text-gray-600">Thanh toán</span>
                        <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-300" />
                    </li>

                    {/* Step 3 */}
                    <li className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold">
                            3
                        </div>
                        <span className="text-sm font-medium text-gray-600">Hoàn tất</span>
                    </li>
                </ol>
            </div>

            {/* === Main Content === */}
            <div className="grid lg:grid-cols-3 gap-10">
                {/* LEFT */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Step 1: Login */}
                    <section>
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Mail className="h-5 w-5 text-accent" />
                            1. Đăng nhập hoặc tạo tài khoản
                        </h2>
                        <Card className="p-6 space-y-1 border shadow-sm">
                            {user ? (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0 flex justify-center sm:justify-start">
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={56}
                                            height={56}
                                            className="rounded-full ring-2 ring-white shadow"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="font-semibold text-base">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>

                                    {/* Logout button */}
                                    <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setUser(null)}
                                            className="flex items-center gap-1 w-full sm:w-auto"
                                        >
                                            <LogOut className="h-4 w-4" /> Đăng xuất
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Input
                                        type="email"
                                        placeholder="vd: ban@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                                    />
                                    <Button className="w-full bg-accent text-white font-semibold rounded-md shadow-sm hover:opacity-90">
                                        Tiếp tục
                                    </Button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 justify-center py-3 rounded-md shadow-sm"
                                        >
                                            <Image
                                                src="/images/Google.svg.png"
                                                alt="Google"
                                                width={16}
                                                height={16}
                                            />
                                            Google
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 justify-center py-3 rounded-md shadow-sm"
                                        >
                                            <Image
                                                src="/images/Facebook.svg.png"
                                                alt="Facebook"
                                                width={16}
                                                height={16}
                                            />
                                            Facebook
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </section>

                    {/* Step 2: Payment */}
                    <section>
                        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-accent" />
                            2. Phương thức thanh toán
                        </h2>
                        <Card className="p-6 space-y-6 border shadow-sm">
                            <RadioGroup
                                value={payment}
                                onValueChange={setPayment}
                                className="space-y-3"
                            >
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="card" id="pm-card" className="bg-white border border-gray-300" />
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-gray-500" /> Thẻ
                                        tín dụng/Ghi nợ
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="wallet" id="pm-wallet" className="bg-white border border-gray-300" />
                                    <span className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4 text-gray-500" /> Ví điện tử
                                        (Momo, ZaloPay)
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="bank" id="pm-bank" className="bg-white border border-gray-300" />
                                    <span className="flex items-center gap-2">
                                        <Landmark className="h-4 w-4 text-gray-500" /> Chuyển
                                        khoản ngân hàng
                                    </span>
                                </label>
                            </RadioGroup>

                            {/* Promo */}
                            <div className="space-y-2 pt-4 border-t">
                                <label className="flex items-center gap-2 font-medium">
                                    <Gift className="h-4 w-4 text-orange-500" /> Mã khuyến mãi
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Nhập mã khuyến mãi..."
                                        value={promo}
                                        onChange={(e) => setPromo(e.target.value)}
                                        className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                                    />
                                    <Button variant="outline" className="rounded-md shadow-sm">
                                        Áp dụng
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* RIGHT: Order Summary */}
                <aside className="bg-white border rounded-md shadow-sm h-fit">
                    <div className="p-6 space-y-6">
                        <h2 className="text-lg font-bold">Tóm tắt đơn hàng</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Giá gốc:</span>
                                <span className="line-through">
                                    {sumOriginal.toLocaleString("vi-VN")}₫
                                </span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Giảm giá:</span>
                                <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Tổng cộng ({fakeItems.length} khóa học):</span>
                                <span className="text-accent">
                                    {sumDiscounted.toLocaleString("vi-VN")}₫
                                </span>
                            </div>
                        </div>

                        <Button className="w-full bg-accent text-white font-semibold rounded-md shadow-sm hover:opacity-90 flex items-center justify-center gap-2">
                            <Lock className="h-4 w-4" /> Hoàn tất thanh toán
                        </Button>

                        <div className="border-t pt-4 space-y-4">
                            <h3 className="text-sm font-semibold">Chi tiết đơn hàng</h3>
                            {fakeItems.map((c) => (
                                <div key={c.id} className="flex gap-3">
                                    <Image
                                        src={c.image}
                                        alt={c.title}
                                        width={64}
                                        height={40}
                                        className="rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium line-clamp-2">
                                            {c.title}
                                        </p>
                                        <div className="flex gap-2 items-center text-sm">
                                            <span className="font-semibold text-primary">
                                                {c.price.toLocaleString("vi-VN")}₫
                                            </span>
                                            <span className="line-through text-xs text-muted-foreground">
                                                {(c.price * 2).toLocaleString("vi-VN")}₫
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}

// ==== Page Wrapper ====
export default function CheckoutPage() {
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <CheckoutInner />
                <Footer />
            </div>
        </CartProvider>
    );
}
