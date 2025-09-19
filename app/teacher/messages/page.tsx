"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Search, Pin } from "lucide-react";

// ==== Types ====
type ConversationType = "private" | "group" | "announcement";

interface Message {
  id: number;
  sender: "me" | "them";
  text: string;
  time: string;
}
interface Conversation {
  id: number;
  name: string;
  type: ConversationType;
  avatar?: string;
  lastMessage: string;
  time: string;
  messages: Message[];
  pinned?: boolean;
}

// ==== Fake data ====
const initialConversations: Conversation[] = [
  {
    id: 1,
    name: "Toán 6A",
    type: "group",
    avatar: "/class1.png",
    lastMessage: "Các em nhớ làm bài tập nhé!",
    time: "2025-09-19",
    messages: [
      { id: 1, sender: "me", text: "Chào cả lớp 👋", time: "08:00" },
      { id: 2, sender: "them", text: "Dạ vâng ạ!", time: "08:05" },
    ],
    pinned: true,
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    type: "private",
    lastMessage: "Thầy ơi em chưa hiểu bài",
    time: "2025-09-18",
    messages: [{ id: 1, sender: "them", text: "Thầy ơi em chưa hiểu bài", time: "21:30" }],
  },
  {
    id: 3,
    name: "Thông báo Lớp 7A",
    type: "announcement",
    lastMessage: "Ngày mai kiểm tra Toán",
    time: "2025-09-18",
    messages: [{ id: 1, sender: "me", text: "Ngày mai lớp có bài kiểm tra Toán 📘", time: "10:00" }],
  },
];

// ==== Reusable Item ====
function ConversationItem({ c, active, onSelect }: { c: Conversation; active: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-3 p-3 cursor-pointer transition ${
        active ? "bg-accent/20 border-l-4 border-accent" : "hover:bg-accent/10"
      }`}
    >
      <Avatar>
        {c.avatar ? <AvatarImage src={c.avatar} /> : <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>}
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate flex items-center gap-1">
          {c.name}
          {c.pinned && <Pin className="h-3 w-3 text-accent" />}
        </p>
        <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
      </div>
      <span className="text-xs text-muted-foreground">{c.time}</span>
    </div>
  );
}

// ==== Main Page ====
export default function MessagesPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selected, setSelected] = useState<Conversation>(initialConversations[0]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = { ...selected, lastMessage: input, time: new Date().toLocaleDateString("vi-VN"), messages: [...selected.messages, newMsg] };
    setSelected(updated);
    setConversations((prev) => prev.map((c) => (c.id === selected.id ? updated : c)));
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected.messages]);

  // lọc theo search
  const filterConvs = (type?: ConversationType) => {
    return conversations
      .filter((c) =>
        [c.name, c.lastMessage].some((field) => field.toLowerCase().includes(search.toLowerCase()))
      )
      .filter((c) => (!type ? true : c.type === type))
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.time).getTime() - new Date(a.time).getTime();
      });
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-muted/30 rounded-lg shadow">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        <div className="p-3 border-b flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm" className="h-8 bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="group">Nhóm</TabsTrigger>
            <TabsTrigger value="private">Cá nhân</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1">
            <ScrollArea className="h-[calc(100vh-180px)]">
              {filterConvs().map((c) => (
                <ConversationItem key={c.id} c={c} active={c.id === selected.id} onSelect={() => setSelected(c)} />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="group" className="flex-1">
            <ScrollArea className="h-[calc(100vh-180px)]">
              {filterConvs("group").map((c) => (
                <ConversationItem key={c.id} c={c} active={c.id === selected.id} onSelect={() => setSelected(c)} />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="private" className="flex-1">
            <ScrollArea className="h-[calc(100vh-180px)]">
              {filterConvs("private").map((c) => (
                <ConversationItem key={c.id} c={c} active={c.id === selected.id} onSelect={() => setSelected(c)} />
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-3 border-b bg-white">
          <Avatar>
            {selected.avatar ? <AvatarImage src={selected.avatar} /> : <AvatarFallback>{selected.name.charAt(0)}</AvatarFallback>}
          </Avatar>
          <div>
            <p className="font-medium">{selected.name}</p>
            <p className="text-xs text-muted-foreground">Đang offline</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selected.messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] px-4 py-2 my-1 text-sm shadow rounded-2xl ${
                  m.sender === "me" ? "bg-accent text-white" : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[10px] opacity-70 block mt-1 text-right">{m.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center gap-2">
          <Input placeholder="Nhập tin nhắn..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} 
          className="bg-white border border-gray-300 text-gray-900 rounded-md shadow-sm" />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
