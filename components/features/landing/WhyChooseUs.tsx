import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Sparkles, MonitorPlay, LineChart } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "An toàn & kiểm duyệt", desc: "Nội dung phù hợp trẻ em, bảo mật dữ liệu." },
  { icon: Sparkles, title: "Học vui – nhớ lâu", desc: "Gamification, huy hiệu, mini game tăng hứng thú." },
  { icon: MonitorPlay, title: "Video & lớp trực tuyến", desc: "VOD chất lượng cao, lớp học live mượt mà." },
  { icon: LineChart, title: "Theo dõi tiến độ", desc: "Báo cáo chi tiết, nhắc lịch, theo dõi mục tiêu." },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Vì sao chọn ONYX?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trải nghiệm học tập lấy trẻ em làm trung tâm: an toàn – thú vị – hiệu quả.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Card key={i} className="h-full border hover:border-accent transition">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
