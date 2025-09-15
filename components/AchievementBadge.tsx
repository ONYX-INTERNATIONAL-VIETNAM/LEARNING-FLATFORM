import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Target } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  description: string;
  type: "trophy" | "star" | "award" | "target";
  earned: boolean;
  date?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  award: Award,
  target: Target,
};

const colorMap = {
  trophy: "text-yellow-500",
  star: "text-blue-500",
  award: "text-purple-500",
  target: "text-green-500",
};

const AchievementBadge = ({
  title,
  description,
  type,
  earned,
  date,
}: AchievementBadgeProps) => {
  const Icon = iconMap[type];
  const iconColor = colorMap[type];

  return (
    <Card
      className={`${
        earned ? "border-accent/50 bg-accent/5" : "opacity-60 grayscale"
      }`}
    >
      <CardContent className="p-4 text-center">
        <div
          className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
            earned ? "bg-accent/20" : "bg-muted"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${
              earned ? iconColor : "text-muted-foreground"
            }`}
          />
        </div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {earned && date && (
          <Badge variant="secondary" className="text-xs">
            {date}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementBadge;
