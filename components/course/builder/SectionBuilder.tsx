"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  GripVertical,
  Edit,
  Trash2,
  Video,
  FileText,
  HelpCircle,
  Link,
  Upload,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

interface Activity {
  id: string;
  type:
    | "video"
    | "document"
    | "quiz"
    | "assignment"
    | "forum"
    | "url"
    | "scorm";
  title: string;
  description?: string;
  visible: boolean;
}

interface Section {
  id: string;
  title: string;
  activities: Activity[];
  visible: boolean;
}

type ActivityType = {
  type: Activity["type"];
  label: string;
  icon: LucideIcon;
  color: string;
};

const activityTypes: ActivityType[] = [
  {
    type: "video",
    label: "Video bài giảng",
    icon: Video,
    color: "bg-red-100 text-red-700",
  },
  {
    type: "document",
    label: "Tài liệu",
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
  },
  {
    type: "quiz",
    label: "Bài kiểm tra",
    icon: HelpCircle,
    color: "bg-green-100 text-green-700",
  },
  {
    type: "assignment",
    label: "Bài tập",
    icon: Upload,
    color: "bg-purple-100 text-purple-700",
  },
  {
    type: "forum",
    label: "Diễn đàn thảo luận",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-700",
  },
  {
    type: "url",
    label: "Liên kết web",
    icon: Link,
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    type: "scorm",
    label: "Gói SCORM",
    icon: BarChart3,
    color: "bg-yellow-100 text-yellow-700",
  },
];

const SectionBuilder = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "1",
      title: "Chương 1: Giới thiệu",
      activities: [],
      visible: true,
    },
  ]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      title: `Chương ${sections.length + 1}: Tiêu đề mới`,
      activities: [],
      visible: true,
    };
    setSections([...sections, newSection]);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, title } : section
      )
    );
  };

  const addActivity = (sectionId: string, activityType: Activity["type"]) => {
    const activityTypeInfo = activityTypes.find(
      (type) => type.type === activityType
    );
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: activityType,
      title: `${activityTypeInfo?.label} mới`,
      visible: true,
    };

    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? { ...section, activities: [...section.activities, newActivity] }
          : section
      )
    );
  };

  const removeActivity = (sectionId: string, activityId: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              activities: section.activities.filter(
                (activity) => activity.id !== activityId
              ),
            }
          : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Xây dựng nội dung khóa học</h2>
          <p className="text-gray-600">
            Tạo các chương và thêm hoạt động học tập
          </p>
        </div>
        <Button onClick={addSection}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm chương
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="border-l-4 border-l-accent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                <div className="flex-1">
                  <Input
                    value={section.title}
                    onChange={(e) =>
                      updateSectionTitle(section.id, e.target.value)
                    }
                    className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Thêm hoạt động
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {activityTypes.map((activityType) => (
                      <DropdownMenuItem
                        key={activityType.type}
                        onClick={() =>
                          addActivity(section.id, activityType.type)
                        }
                      >
                        <activityType.icon className="w-4 h-4 mr-2" />
                        {activityType.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(section.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {section.activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Chưa có hoạt động nào trong chương này</p>
                  <p className="text-sm">Nhấn &quot;Thêm hoạt động&quot; để bắt đầu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {section.activities.map((activity) => {
                    const activityTypeInfo = activityTypes.find(
                      (type) => type.type === activity.type
                    );
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <div className="flex items-center gap-2">
                          {activityTypeInfo && (
                            <Badge className={activityTypeInfo.color}>
                              <activityTypeInfo.icon className="w-3 h-3 mr-1" />
                              {activityTypeInfo.label}
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            value={activity.title}
                            onChange={(e) => {
                              setSections(
                                sections.map((s) =>
                                  s.id === section.id
                                    ? {
                                        ...s,
                                        activities: s.activities.map((a) =>
                                          a.id === activity.id
                                            ? { ...a, title: e.target.value }
                                            : a
                                        ),
                                      }
                                    : s
                                )
                              );
                            }}
                            className="border-none p-0 h-auto bg-transparent"
                          />
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            removeActivity(section.id, activity.id)
                          }
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-end pt-6 border-t">
        <Button variant="outline">Xem trước</Button>
        <Button>Lưu khóa học</Button>
      </div>
    </div>
  );
};

export default SectionBuilder;
