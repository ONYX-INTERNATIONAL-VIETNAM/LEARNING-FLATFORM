import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import Image from "next/image";

const courses = [
  {
    id: 1,
    title: "Toán học cơ bản",
    description:
      "Học toán một cách vui nhộn với trò chơi và hình ảnh sinh động",
    image: "/colorful-math-learning-for-kids.jpg",
    level: "Cơ bản",
    duration: "4 tuần",
    students: 1250,
    rating: 4.8,
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "Tiếng Anh cho trẻ em",
    description: "Phát triển kỹ năng tiếng Anh qua câu chuyện và bài hát",
    image: "/english-learning-for-children-with-books.jpg",
    level: "Sơ cấp",
    duration: "6 tuần",
    students: 980,
    rating: 4.9,
    color: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "Khoa học thú vị",
    description: "Khám phá thế giới khoa học qua thí nghiệm đơn giản",
    image: "/fun-science-experiments-for-kids.jpg",
    level: "Trung cấp",
    duration: "5 tuần",
    students: 756,
    rating: 4.7,
    color: "bg-purple-100 text-purple-800",
  },
];

const CoursesPreview = () => {
  return (
    <section id="courses" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Khóa học phổ biến
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các khóa học được thiết kế đặc biệt cho trẻ em với phương
            pháp học tập hiện đại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={course.color}>{course.level}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students.toLocaleString()} học sinh
                  </div>
                </div>

                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  Tham gia khóa học
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            Xem tất cả khóa học
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
