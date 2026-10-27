"use client";

import { HomeLayout, HomeSection } from "@/components/home/layout";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useGetNewsDetail } from "@/hooks/api/news/use-news-query";
import { FolderIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { query: newsQuery } = useGetNewsDetail({ newsId: id });

  const news = newsQuery.data?.data;

  return (
    <HomeLayout>
      {newsQuery.isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : news ? (
        <>
          {news.image && (
            <div className="relative">
              <HomeSection muted>
                <img
                  src={news.image}
                  alt={news.title}
                  className="absolute top-0 left-0 right-0 bottom-0 object-cover"
                />
              </HomeSection>
            </div>
          )}
          <HomeSection
            badge={`${news.viewed_count} viewed`}
            title={news.title}
            description={news.description}
          >
            {news.content}
          </HomeSection>
        </>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>News not found</EmptyTitle>
            <EmptyDescription>
              The news you looking for was not found. Contact our admin if you
              feel excused.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button render={<Link href="/#news"></Link>}>Back to News</Button>
          </EmptyContent>
        </Empty>
      )}
    </HomeLayout>
  );
}
