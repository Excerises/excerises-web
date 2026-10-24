import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { News } from "@/types/model";

type NewsCardProps = {
  news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative">
        <Image
          src={news.image as never}
          alt={news.title}
          height={200}
          width={400}
          className="relative object-cover h-48 w-full bg-gradient-to-br from-primary/20 to-emerald-900/20"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge className="rounded-full">Public</Badge>
          <span className="text-muted-foreground">{news.created_at}</span>
        </div>
        <CardTitle className="mt-2 text-xl leading-snug">
          {news.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {news.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          render={<Link href={`/news/${news.id}`} />}
          className="px-0"
        >
          Read More <ArrowRight className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
