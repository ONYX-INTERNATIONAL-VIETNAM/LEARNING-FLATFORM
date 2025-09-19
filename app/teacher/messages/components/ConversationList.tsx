"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

const conversations = {
  starred: [
    { id: 1, name: "Giáo viên Toán", lastMessage: "Nhớ làm bài tập nhé!", avatar: "" },
  ],
  group: [],
  private: [
    { id: 2, name: "Tấn Dương Thiên", lastMessage: "😳 Hi", avatar: "/avatar1.png" },
    { id: 3, name: "Dương Tấn Lợi", lastMessage: "hello", avatar: "" },
    { id: 4, name: "Hoàng Duyên", lastMessage: "hello", avatar: "" },
  ],
};

export function ConversationList({
  onSelect,
}: {
  onSelect: (c: Conversation) => void;
}) {
  return (
    <Accordion type="multiple" defaultValue={["starred", "group", "private"]}>
      {/* Đã ghim */}
      <AccordionItem value="starred">
        <AccordionTrigger>Đã ghim ({conversations.starred.length})</AccordionTrigger>
        <AccordionContent>
          {conversations.starred.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect(c)}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <Avatar>
                {c.avatar ? <AvatarImage src={c.avatar} /> : <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* Nhóm */}
      <AccordionItem value="group">
        <AccordionTrigger>Nhóm ({conversations.group.length})</AccordionTrigger>
        <AccordionContent>
          {conversations.group.length === 0 && (
            <p className="text-sm text-muted-foreground p-2">Không có nhóm nào</p>
          )}
        </AccordionContent>
      </AccordionItem>

      {/* Riêng tư */}
      <AccordionItem value="private">
        <AccordionTrigger>Riêng tư ({conversations.private.length})</AccordionTrigger>
        <AccordionContent>
          {conversations.private.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect(c)}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-accent/10 rounded-md"
            >
              <Avatar>
                {c.avatar ? <AvatarImage src={c.avatar} /> : <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
