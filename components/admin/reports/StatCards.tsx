"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export function StatCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

export default function StatCards({
  items,
}: {
  items: Array<{ title: string; value: ReactNode; hint?: string; icon?: ReactNode }>;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((it) => (
        <StatCard key={it.title} {...it} />
      ))}
    </div>
  );
}
