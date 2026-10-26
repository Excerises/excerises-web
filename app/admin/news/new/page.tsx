"use client";

import AdminLayout from "@/components/admin/layout";
import NewsForm, { NewsFormValues } from "@/components/admin/news-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useCreateNews } from "@/hooks/api/news/use-news-query";
import { getApiErrorMessage } from "@/network/api";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewsNewPage() {
  const router = useRouter();
  const createNews = useCreateNews();

  const handleSubmit = async (values: NewsFormValues) => {
    try {
      await createNews.mutation.mutateAsync({
        title: values.title,
        description: values.description,
        content: values.content,
        image: values.image || undefined,
        status: values.status,
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Create failed",
        description: getApiErrorMessage(error),
      });
      return;
    }

    toast.add({
      type: "success",
      title: "News created",
      description: `"${values.title}" has been added.`,
    });
    router.push("/admin/news");
  };

  return (
    <AdminLayout
      breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["New"]]}
    >
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
          image: "",
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
