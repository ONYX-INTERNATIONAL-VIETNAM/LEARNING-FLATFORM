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
                <main className="flex-1">
                    {/* HERO */}
                    <div className="bg-gradient-to-r from-accent/10 to-transparent py-20 text-center space-y-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                            Liên hệ với ONYX
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Bạn có thắc mắc hoặc muốn hợp tác? Gửi ngay thông tin cho chúng tôi,
                            đội ngũ ONYX sẽ phản hồi nhanh nhất.
                        </p>
                    </div>

                    {/* FORM + INFO */}
                    <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
                        {/* FORM */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            variants={fadeInUp}
                        >
                            <Card className="rounded-2xl shadow-lg flex py-20">
                                <CardContent className="m-auto w-full space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">
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
                                        <label className="text-sm font-medium text-gray-700">
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
                                        <label className="text-sm font-medium text-gray-700">
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

                                    <Button className="w-full py-6 text-base rounded-md">
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
