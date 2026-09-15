"use client";

import AdminLayout from "@/components/admin/layout";
import NewsForm, { NewsFormValues } from "@/components/admin/news-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewsNewPage() {
  const router = useRouter();

  const handleSubmit = async (values: NewsFormValues) => {
    // TODO: replace with a real create API call
    console.log("Create news", values);

    await new Promise((r) => setTimeout(r, 400));
    router.push("/admin/news");
  };

  return (
    <AdminLayout breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["New"]]}>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <NewsForm
        initial={{
          title: "",
          description: "",
          thumbnail: "",
          status: "draft",
          content: "",
        }}
        submitLabel="Create berita"
        savingLabel="Creating..."
        meta={{ views: 0 }}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </AdminLayout>
  );
}
