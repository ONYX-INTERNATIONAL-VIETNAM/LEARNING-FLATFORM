"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CoursesPreview from "@/components/CoursesPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import CategoriesPreview from "@/components/CategoriesPreview";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Newsletter from "@/components/Newsletter";
import { CartProvider } from "@/components/cart/CartContext";
import FadeInSection from "@/components/FadeInSection";

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 space-y-24">
          <FadeInSection>
            <HeroSection />
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <CoursesPreview />
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <WhyChooseUs />
          </FadeInSection>
          <FadeInSection delay={0.3}>
            <CategoriesPreview />
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <Testimonials />
          </FadeInSection>
          <FadeInSection delay={0.5}>
            <CallToAction />
          </FadeInSection>
          <FadeInSection delay={0.6}>
            <Newsletter />
          </FadeInSection>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
