"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
import { CartProvider } from "@/components/cart/CartContext";

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
            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
                            1
                        </div>
                        <span className="font-semibold text-accent">Đăng nhập</span>
                    </div>
                    <div className="w-12 h-px bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                            2
                        </div>
                        <span className="text-gray-600">Thanh toán</span>
                    </div>
                    <div className="w-12 h-px bg-gray-300" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold">
                            3
                        </div>
                        <span className="text-gray-600">Hoàn tất</span>
                    </div>
                </div>
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
                        <Card className="p-6 space-y-6 border shadow-sm">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setUser(null)}
                                        className="flex items-center gap-1"
                                    >
                                        <LogOut className="h-4 w-4" /> Đăng xuất
                                    </Button>
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
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                                                alt="Google"
                                                className="w-4 h-4"
                                            />
                                            Google
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 justify-center py-3 rounded-md shadow-sm"
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                                                alt="Facebook"
                                                className="w-4 h-4"
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
                                    <RadioGroupItem value="card" id="pm-card" className="bg-white border border-gray-300"/>
                                    <span className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-gray-500" /> Thẻ
                                        tín dụng/Ghi nợ
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="wallet" id="pm-wallet" className="bg-white border border-gray-300"/>
                                    <span className="flex items-center gap-2">
                                        <Wallet className="h-4 w-4 text-gray-500" /> Ví điện tử
                                        (Momo, ZaloPay)
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <RadioGroupItem value="bank" id="pm-bank" className="bg-white border border-gray-300"/>
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
