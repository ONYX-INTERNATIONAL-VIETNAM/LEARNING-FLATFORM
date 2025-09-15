"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search } from "lucide-react";

// Fake data danh sách bạn
const conversations = [
  {
    id: 1,
    name: "Tấn Dương Thiên",
    avatar: "/avatar1.png",
    lastMessage: "😳 Hi",
    time: "6/09/25",
    messages: [
      { id: 1, sender: "them", text: "hello", time: "04:25" },
      { id: 2, sender: "me", text: "hello", time: "07:57" },
      { id: 3, sender: "them", text: "😳 Hi", time: "07:58" },
    ],
  },
  {
    id: 2,
    name: "Dương Tấn Lợi",
    avatar: "",
    lastMessage: "hello",
    time: "6/09/25",
    messages: [{ id: 1, sender: "them", text: "hello", time: "09:30" }],
  },
  {
    id: 3,
    name: "Hoàng Duyên",
    avatar: "",
    lastMessage: "hello",
    time: "6/09/25",
    messages: [{ id: 1, sender: "them", text: "hello", time: "10:15" }],
  },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setSelected({
      ...selected,
      messages: [...selected.messages, newMsg],
    });
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-muted/30 rounded-lg shadow">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col">
        <div className="p-3 border-b flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Tìm kiếm" className="h-8" />
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/10 ${
                selected.id === c.id ? "bg-accent/20" : ""
              }`}
            >
              <Avatar>
                {c.avatar ? (
                  <AvatarImage src={c.avatar} />
                ) : (
                  <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{c.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {c.lastMessage}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{c.time}</span>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-3 border-b bg-white">
          <Avatar>
            {selected.avatar ? (
              <AvatarImage src={selected.avatar} />
            ) : (
              <AvatarFallback>{selected.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{selected.name}</p>
            <p className="text-xs text-muted-foreground">Đang offline</p>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 space-y-3">
          {selected.messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm shadow ${
                  m.sender === "me"
                    ? "bg-accent text-white"
                    : "bg-muted text-gray-900"
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[10px] opacity-70 block mt-1">
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input */}
        <div className="p-3 border-t bg-white flex items-center gap-2">
          <Input
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
