import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface AdminStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function AdminStatCard({
  label,
  value,
  icon: Icon,
  subtitle,
  trend,
  trendUp,
}: AdminStatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-5 text-primary" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="text-sm font-medium text-muted-foreground">
            {label}
          </div>
          <div className="text-xl font-semibold tracking-tight">{value}</div>
          {(subtitle || trend) && (
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              {trend && (
                <span
                  className={
                    trendUp === false ? "text-destructive" : "text-emerald-600"
                  }
                >
                  {trend}
                </span>
              )}
              {subtitle && (
                <span className="truncate text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
