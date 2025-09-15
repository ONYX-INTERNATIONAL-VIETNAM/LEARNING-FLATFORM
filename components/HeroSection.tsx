import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Globe } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Học tập trực tuyến <span className="text-accent">vui nhộn</span> cho
            trẻ em toàn thế giới
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Nền tảng giáo dục ONYX mang đến trải nghiệm học tập tương tác, thú
            vị và dễ tiếp cận cho học sinh và giáo viên trên khắp thế giới.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Bắt đầu học ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent"
            >
              <Users className="mr-2 h-5 w-5" />
              Dành cho giáo viên
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Toàn cầu</h3>
                <p className="text-muted-foreground text-sm">
                  Kết nối học sinh và giáo viên từ khắp nơi trên thế giới
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tương tác</h3>
                <p className="text-muted-foreground text-sm">
                  Học tập thông qua trò chơi, video và bài tập thú vị
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Chất lượng</h3>
                <p className="text-muted-foreground text-sm">
                  Nội dung được thiết kế bởi các chuyên gia giáo dục
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
