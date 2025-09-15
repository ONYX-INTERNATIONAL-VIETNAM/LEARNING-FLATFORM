import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import  CoursesPreview  from "@/components/CoursesPreview";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CoursesPreview />
      </main>
      <Footer />
    </div>
  );
}
