import { HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import ThemeToggler from "../theme-toggler";

export interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: [label: string, url?: string | undefined][];
}

export default function AdminLayout({
  children,
  breadcrumbs,
}: AdminLayoutProps) {
  return (
    <>
      <header className="flex h-16 justify-between shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="size-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs?.map(([label, url], i) => (
                <>
                  <BreadcrumbSeparator key={i} />
                  {url ? (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbLink href={url}>{label}</BreadcrumbLink>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem key={i}>
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mr-3">
          <ThemeToggler />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
    </>
  );
}
