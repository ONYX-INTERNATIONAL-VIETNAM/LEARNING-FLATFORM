"use client";

import { Header, Footer } from "@/components/layout";
import { CartProvider } from "@/components/features/cart/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// animation config
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 overflow-hidden">
                    {/* HERO */}
                    <section className="relative">
                        {/* Ảnh full-bleed không gây scroll ngang */}
                        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                            <img
                                src="/images/home/Background-contact.png"  // đổi đúng path ảnh PNG/WebP của bạn trong /public
                                alt=""
                                className="block w-screen h-auto select-none pointer-events-none"
                                draggable={false}
                            />

                            {/* TEXT: góc trên-trái của màn hình */}
                            <div className="absolute z-10 left-4 top-4 md:left-8 md:top-8">
                                <h1 className="text-amber-500 font-extrabold text-3xl md:text-5xl leading-tight text-center">
                                    Khám phá ONYX
                                </h1>
                                <p className="mt-2 max-w-xl text-sm md:text-base text-slate-600 text-center">
                                    Nền tảng học tập & thương mại điện tử hiện đại - kết nối tri thức, cộng đồng và cơ hội
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* FORM + INFO */}
                    <section className="container mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-12">
                        {/* FORM */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            variants={fadeInUp}
                        >
                            <Card className="rounded-2xl shadow-lg flex py-20 bg-[var(--secondary-color)] text-white">
                                <CardContent className="m-auto w-full space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Họ và tên
                                        </label>
                                        <Input
                                            placeholder="Nhập họ và tên..."
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({ ...form, name: e.target.value })
                                            }
                                            className="w-full bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="example@email.com"
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({ ...form, email: e.target.value })
                                            }
                                            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Nội dung
                                        </label>
                                        <Textarea
                                            rows={6}
                                            placeholder="Viết tin nhắn của bạn..."
                                            value={form.message}
                                            onChange={(e) =>
                                                setForm({ ...form, message: e.target.value })
                                            }
                                            className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm"
                                        />
                                    </div>

                                    <Button className="w-full py-6 text-base rounded-md bg-[var(--primary-color)]">
                                        Gửi liên hệ
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* INFO */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Địa chỉ</p>
                                    <p className="text-muted-foreground">
                                        123 Nguyễn Văn Cừ, Q.5, TP.HCM
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Điện thoại</p>
                                    <p className="text-muted-foreground">(+84) 123 456 789</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-accent" />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-muted-foreground">support@onyx.edu</p>
                                </div>
                            </div>

                            {/* GOOGLE MAP */}
                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18..."
                                    width="100%"
                                    height="250"
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </motion.div>
                    </section>
                </main>

                <Footer />
            </div>
        </CartProvider>
    );
}
