export type CourseMeta = {
    id: string;
    description: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    durationHours: number;
    lessons: number;
    tags: string[];
    prerequisites?: string[];
    outcomes?: string[];
    syllabus?: Array<{ title: string; items: string[] }>;
    cover?: string;
  };
  
  export const courseMeta: Record<string, CourseMeta> = {
    c1: {
      id: "c1",
      description:
        "Nền tảng React: JSX, component, props/state, lifecycle, hooks cơ bản và best practices.",
      level: "Beginner",
      durationHours: 12,
      lessons: 18,
      tags: ["React", "Frontend", "Hooks"],
      outcomes: [
        "Hiểu component-based UI",
        "Sử dụng state & props",
        "Quản lý side-effect với useEffect",
      ],
      syllabus: [
        { title: "Khởi động", items: ["JSX & Rendering", "Component & Props"] },
        { title: "Trạng thái", items: ["State & Event", "useEffect cơ bản"] },
        { title: "Tối ưu", items: ["Memoization", "Best Practices"] },
      ],
    },
    c2: {
      id: "c2",
      description:
        "Đi sâu vào Next.js App Router, routing nâng cao, data fetching, caching và SEO.",
      level: "Intermediate",
      durationHours: 16,
      lessons: 20,
      tags: ["Next.js", "Routing", "SSR/SSG"],
      outcomes: [
        "Sử dụng App Router",
        "Triển khai data fetching song song",
        "Tối ưu SEO & perf",
      ],
    },
    c3: {
      id: "c3",
      description:
        "Tối ưu truy vấn PostgreSQL với index, explain analyze, và chiến lược tối ưu truy vấn.",
      level: "Advanced",
      durationHours: 10,
      lessons: 12,
      tags: ["PostgreSQL", "Indexing", "Performance"],
      outcomes: [
        "Đọc query plan",
        "Chọn index phù hợp",
        "Tối ưu hóa join & filter",
      ],
    },
  };
  