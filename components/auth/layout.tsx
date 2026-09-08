interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, description, children }: Props) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-full w-md">
        <div className="mb-5">
          <div className="font-semibold text-xl mb-1">{title}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {children}
      </div>
    </div>
  );
}
