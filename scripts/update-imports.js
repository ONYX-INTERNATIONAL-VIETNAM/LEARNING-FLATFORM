#!/usr/bin/env node

/**
 * Script để cập nhật imports sau khi tổ chức lại components
 * Chạy: node scripts/update-imports.js
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';

// Mapping từ component cũ sang đường dẫn mới
const componentMapping = {
  // Layout components
  'Header': '@/components/layout',
  'AdminHeader': '@/components/layout',
  'StudentHeader': '@/components/layout',
  'TeacherHeader': '@/components/layout',
  'AdminSidebar': '@/components/layout',
  'StudentSidebar': '@/components/layout',
  'TeacherSidebar': '@/components/layout',
  'LessonSidebar': '@/components/layout',
  'Footer': '@/components/layout',
  
  // Auth components
  'LoginForm': '@/components/auth',
  'RegisterForm': '@/components/auth',
  'AuthGuard': '@/components/auth',
  'AuthLayout': '@/components/auth',
  
  // Course components
  'CourseCard': '@/components/course',
  'CourseHeader': '@/components/course',
  'CoursesPreview': '@/components/course',
  'CourseForm': '@/components/course',
  'SectionBuilder': '@/components/course',
  'VideoPlayer': '@/components/course',
  'VideoLibrary': '@/components/course',
  
  // Common components
  'StatsCard': '@/components/common',
  'ProgressCard': '@/components/common',
  'ClassCard': '@/components/common',
  'ConfirmDialog': '@/components/common',
  'RichTextEditor': '@/components/common',
  'FadeInSection': '@/components/common',
  'AchievementBadge': '@/components/common',
  'ThemeProvider': '@/components/common',
  
  // Feature components
  'HeroSection': '@/components/features',
  'CallToAction': '@/components/features',
  'WhyChooseUs': '@/components/features',
  'Testimonials': '@/components/features',
  'Newsletter': '@/components/features',
  'CategoriesPreview': '@/components/features',
  'QuizComponent': '@/components/features',
  'QuestionForm': '@/components/features',
  'QuestionList': '@/components/features',
  'StudentList': '@/components/features',
  'GradeBook': '@/components/features',
  'AttendanceTracker': '@/components/features',
  'AssignmentManager': '@/components/features',
  'CartContext': '@/components/features',
};

function updateImports() {
  console.log('🔄 Đang cập nhật imports...');
  
  // Tìm tất cả files .tsx, .ts trong src
  const files = glob.sync('**/*.{ts,tsx}', {
    ignore: ['node_modules/**', 'dist/**', '.next/**']
  });
  
  files.forEach(file => {
    if (file.includes('components/')) return; // Bỏ qua files trong components
    
    const content = fs.readFileSync(file, 'utf8');
    let newContent = content;
    
    // Cập nhật imports
    Object.entries(componentMapping).forEach(([component, newPath]) => {
      const oldImportRegex = new RegExp(
        `import\\s+{?\\s*${component}\\s*}?\\s+from\\s+['"][^'"]*components[^'"]*${component}['"]`,
        'g'
      );
      
      const newImport = `import { ${component} } from '${newPath}'`;
      newContent = newContent.replace(oldImportRegex, newImport);
    });
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log(`✅ Updated: ${file}`);
    }
  });
  
  console.log('✨ Hoàn thành cập nhật imports!');
}

// Chạy script
updateImports();
