import AuthHeader from "@/components/auth/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
}
