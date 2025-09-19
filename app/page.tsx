"use client";

import { Header, Footer } from "@/components/layout";
import { 
  HeroSection, 
  WhyChooseUs, 
  CategoriesPreview, 
  Testimonials, 
  CallToAction, 
  Newsletter 
} from "@/components/features";
import { CoursesPreview } from "@/components/course";
import { CartProvider } from "@/components/features/cart/CartContext";
import { FadeInSection } from "@/components/common";

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
