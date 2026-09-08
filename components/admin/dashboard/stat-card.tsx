import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface AdminStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export default function AdminStatCard({
  label,
  value,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <Card className="p-3">
      <div className="flex items-center gap-5">
        <Icon className="size-8 text-primary/50" />
        <div className="flex flex-col">
          <div className="text-sm font-medium text-muted-foreground">
            {label}
          </div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
    </Card>
  );
}
