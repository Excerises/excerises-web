import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

export interface TopFilterProps {
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export default function TopFilter({ searchPlaceholder, actions }: TopFilterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="relative min-w-lg max-w-full">
        <div className="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center">
          <SearchIcon className="size-4 text-muted-foreground" />
        </div>
        <Input
          className="pl-10 w-full"
          placeholder={searchPlaceholder || "Search data..."}
        />
      </div>
      <div className="flex items-center gap-2 shrink-0">{actions}</div>
    </div>
  );
}
