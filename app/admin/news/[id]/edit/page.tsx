"use client";

import AdminLayout from "@/components/admin/layout";
import NewsForm, { NewsFormValues } from "@/components/admin/news-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import {
  useGetAdminNewsDetail,
  useUpdateNews,
} from "@/hooks/api/news/use-news-query";
import { getApiErrorMessage } from "@/network/api";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function NewsEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { query: newsQuery } = useGetAdminNewsDetail({ newsId: params.id });
  const updateNews = useUpdateNews();
  const news = newsQuery.data?.data;

  if (newsQuery.isLoading) {
    return (
      <AdminLayout
        breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["Edit"]]}
      >
        <div className="flex items-center justify-center py-24">
          <Spinner />
        </div>
      </AdminLayout>
    );
  }

  if (newsQuery.isError || !news) {
    return (
      <AdminLayout
        breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["Edit"]]}
      >
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Newspaper className="size-6 text-muted-foreground" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">Berita tidak ditemukan</p>
              <p className="text-sm text-muted-foreground">
                ID yang kamu buka tidak cocok dengan data mana pun.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/news")}
            >
              <ArrowLeft className="size-4" />
              Kembali ke daftar
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const handleSubmit = async (values: NewsFormValues) => {
    try {
      await updateNews.mutation.mutateAsync({
        newsId: news.id,
        req: {
          title: values.title,
          description: values.description,
          content: values.content,
          image: values.image || undefined,
          status: values.status,
        },
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Update failed",
        description: getApiErrorMessage(error),
      });
      return;
    }

    toast.add({
      type: "success",
      title: "News updated",
      description: `Changes for "${values.title}" have been saved.`,
    });
    router.push("/admin/news");
  };

  return (
    <AdminLayout
      breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["Edit"]]}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <NewsForm
        initial={{
          title: news.title,
          description: news.description ?? "",
          image: news.image ?? "",
          status: news.status ?? "published",
          content: news.content,
        }}
        submitLabel="Save changes"
        meta={{ views: news.viewed_count, id: String(news.id) }}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </AdminLayout>
  );
}
