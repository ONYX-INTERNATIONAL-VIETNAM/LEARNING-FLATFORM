import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, ShoppingCart } from "lucide-react";
import Image from "next/image";

const COURSES = [
  {
    id: "c1",
    title: "Toán học cơ bản",
    description: "Học toán vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/colorful-math-learning-for-kids.jpg",
    level: "Cơ bản",
    duration: "4 tuần",
    students: 1250,
    rating: 4.8,
    color: "bg-blue-100 text-blue-800",
    price: 390000,
  },
  {
    id: "c2",
    title: "Tiếng Anh cho trẻ em",
    description: "Phát triển kỹ năng tiếng Anh qua câu chuyện và bài hát",
    image: "/english-learning-for-children-with-books.jpg",
    level: "Sơ cấp",
    duration: "6 tuần",
    students: 980,
    rating: 4.9,
    color: "bg-green-100 text-green-800",
    price: 450000,
  },
  {
    id: "c3",
    title: "Khoa học thú vị",
    description: "Khám phá thế giới khoa học qua thí nghiệm đơn giản",
    image: "/fun-science-experiments-for-kids.jpg",
    level: "Trung cấp",
    duration: "5 tuần",
    students: 756,
    rating: 4.7,
    color: "bg-purple-100 text-purple-800",
    price: 420000,
  },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n
  );

export default function CoursesPreview() {

  return (
    <section id="courses" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Khóa học phổ biến</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các khóa học được thiết kế đặc biệt cho trẻ em với phương pháp học tập hiện đại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {COURSES.map((course) => (
            <Card key={course.id} className="overflow-hidden border hover:border-accent transition">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${course.color} rounded-full px-3 py-1 text-xs font-medium`}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{course.duration}</div>
                  <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{course.students.toLocaleString()} học sinh</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-semibold">{fmt(course.price)}</div>
                  <Button
                    className="bg-accent"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Thêm vào giỏ
                  </Button>


                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 hover:border-accent">
            Xem tất cả khóa học
          </Button>
        </div>
      </div>
    </section>
  );
}
