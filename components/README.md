# Components Organization

Cấu trúc components đã được tổ chức lại một cách logic và gọn gàng theo các nhóm chức năng:

## 📁 Cấu trúc thư mục

```
components/
├── 🎨 ui/                     # UI primitives (shadcn/ui components)
├── 🏗️  layout/                # Layout components
│   ├── headers/               # Header components
│   ├── sidebars/              # Sidebar components
│   └── footers/               # Footer components
├── 🔐 auth/                   # Authentication components
├── 📚 course/                 # Course-related components
│   ├── cards/                 # Course card components
│   ├── builder/               # Course builder components
│   └── player/                # Video player components
├── 🔧 common/                 # Common reusable components
│   ├── cards/                 # Card components
│   ├── forms/                 # Form components
│   └── dialogs/               # Dialog components
├── ⚡ features/               # Feature-specific components
│   ├── landing/               # Landing page components
│   ├── quiz/                  # Quiz components
│   ├── student/               # Student management components
│   └── cart/                  # Shopping cart components
└── 👨‍💼 admin/                  # Admin-specific components
    └── reports/               # Admin reports
```

## 🚀 Cách sử dụng

### Import từ index files

Thay vì import trực tiếp từ file component:
```tsx
// ❌ Cách cũ
import Header from '../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import CourseCard from '../components/CourseCard';
```

Sử dụng import từ index files:
```tsx
// ✅ Cách mới
import { Header, AdminSidebar } from '@/components/layout';
import { CourseCard } from '@/components/course';
```

### Import tất cả từ components chính

```tsx
// Import tất cả components
import { 
  Header, 
  AdminSidebar, 
  CourseCard, 
  LoginForm,
  HeroSection 
} from '@/components';
```

## 📝 Lợi ích của cấu trúc mới

1. **Tổ chức logic**: Components được nhóm theo chức năng và mục đích sử dụng
2. **Dễ tìm kiếm**: Biết ngay component nằm ở đâu dựa trên chức năng
3. **Import gọn gàng**: Sử dụng index files để import nhiều components cùng lúc
4. **Scalability**: Dễ dàng thêm components mới vào đúng nhóm
5. **Maintainability**: Dễ bảo trì và refactor code

## 🎯 Quy tắc đặt tên

- **PascalCase** cho tên component
- **camelCase** cho tên thư mục
- **index.ts** files để export components
- Tên thư mục phản ánh chức năng của components bên trong

## 📋 Component Guidelines

- Mỗi component nên có một mục đích rõ ràng
- Đặt component vào đúng thư mục theo chức năng
- Cập nhật index.ts khi thêm component mới
- Sử dụng TypeScript cho type safety
