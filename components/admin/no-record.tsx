import { FolderIcon, LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ReactNode } from "react";

export interface NoRecordProps {
  title?: string;
  message: string;
  icon?: LucideIcon;
  children?: ReactNode;
}

export function NoRecord({
  title = "Empty Record",
  icon: Icon = FolderIcon,
  message,
  children,
}: NoRecordProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      {children && (
        <EmptyContent className="flex-row justify-center gap-2">
          {children}
        </EmptyContent>
      )}
    </Empty>
  );
}
