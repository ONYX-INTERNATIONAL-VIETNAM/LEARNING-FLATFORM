import { Card } from "@/components/ui/card";
import { Atom, Languages, Calculator, Music2, Palette } from "lucide-react";

const categories = [
  { icon: Calculator, name: "Toán học", count: 124 },
  { icon: Languages, name: "Tiếng Anh", count: 98 },
  { icon: Atom, name: "Khoa học", count: 76 },
  { icon: Music2, name: "Âm nhạc", count: 34 },
  { icon: Palette, name: "Mỹ thuật", count: 41 },
];

export default function CategoriesPreview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Danh mục phổ biến</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá các lĩnh vực học tập đa dạng, phù hợp với mọi lứa tuổi và cấp độ.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map(({ icon: Icon, name, count }, i) => (
            <Card key={i} className="p-5 text-center border hover:border-accent transition">
              <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-accent" />
              </div>
              <div className="font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">{count}+ khóa</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
