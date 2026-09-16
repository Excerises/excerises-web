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

type NewsCardProps = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  image: string;
};

export default function NewsCard({
  category,
  date,
  readTime,
  title,
  description,
  image,
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-emerald-900/20">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-8 opacity-80"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge className="rounded-full">{category}</Badge>
          <span className="text-muted-foreground">{date}</span>
          <span className="text-muted-foreground">• {readTime}</span>
        </div>
        <CardTitle className="mt-2 text-xl leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="link" render={<Link href="/news" />} className="px-0">
          Read More <ArrowRight className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
