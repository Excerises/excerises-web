"use client";

import AdminLayout from "@/components/admin/layout";
import NewsForm, { NewsFormValues } from "@/components/admin/news-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockNews } from "@/mockups/news";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function NewsEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const news = mockNews.find((n) => String(n.id) === params.id);

  if (!news) {
    return (
      <AdminLayout breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["Edit"]]}>
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
    // TODO: replace with a real update API call
    console.log("Update news", { id: news.id, ...values });

    await new Promise((r) => setTimeout(r, 400));
    router.push("/admin/news");
  };

  return (
    <AdminLayout breadcrumbs={[["Master Data", "/admin/news"], ["News"], ["Edit"]]}>
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
          thumbnail: news.thumbnail ?? "",
          status: news.status,
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
