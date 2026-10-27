import { HTMLAttributes, ReactNode } from "react";
import Header from "./header";
import { Badge } from "../ui/badge";
import StartTrainingToday from "./start-training-today";
import Footer from "./footer";

export function HomeLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <StartTrainingToday />
      <Footer />
    </div>
  );
}

export function HomeSection({
  badge,
  title,
  description,
  children,
  muted,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  muted?: boolean;
  badge?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section
      id="features"
      className={["border-t", muted && "bg-muted/40", className].join(" ")}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          {badge && (
            <Badge variant="secondary" className="rounded-full">
              {badge}
            </Badge>
          )}
          {title && (
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
