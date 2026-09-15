"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NewsStatus } from "@/types/model";
import {
  EyeIcon,
  ImageIcon,
  Lightbulb,
  Loader2,
  Newspaper,
  Save,
  Type,
} from "lucide-react";
import { cn } from "cn";

export interface NewsFormValues {
  title: string;
  description: string;
  thumbnail: string;
  status: NewsStatus;
  content: string;
}

interface NewsFormProps {
  initial: NewsFormValues;
  submitLabel: string;
  savingLabel?: string;
  meta?: { views: number; id?: string };
  onSubmit: (values: NewsFormValues) => Promise<void> | void;
  onCancel: () => void;
}

const statusOptions: Array<{
  value: NewsStatus;
  hint: string;
  activeClass: string;
  dotClass: string;
}> = [
  {
    value: "published",
    hint: "Langsung tampil ke pengguna",
    activeClass:
      "border-primary/50 bg-primary/10 text-primary dark:text-primary",
    dotClass: "bg-primary",
  },
  {
    value: "draft",
    hint: "Simpan dulu, terbitkan nanti",
    activeClass:
      "border-muted-foreground/30 bg-muted text-muted-foreground",
    dotClass: "bg-muted-foreground",
  },
];

export default function NewsForm({
  initial,
  submitLabel,
  savingLabel = "Saving...",
  meta,
  onSubmit,
  onCancel,
}: NewsFormProps) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [thumbnail, setThumbnail] = useState(initial.thumbnail);
  const [status, setStatus] = useState<NewsStatus>(initial.status);
  const [content, setContent] = useState(initial.content);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      title !== initial.title ||
      description !== initial.description ||
      thumbnail !== initial.thumbnail ||
      status !== initial.status ||
      content !== initial.content,
    [title, description, thumbnail, status, content, initial],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || saving) return;
    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim(),
        status,
        content: content.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden pt-0">
          <div className="h-16 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent sm:h-20" />
          <CardContent className="-mt-7 pb-6 sm:-mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {thumbnail.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail.trim()}
                  alt={title.trim() || "Thumbnail"}
                  className="size-14 shrink-0 rounded-2xl object-cover shadow-lg ring-4 ring-background"
                />
              ) : (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg ring-4 ring-background">
                  <Newspaper className="size-7" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-semibold tracking-tight">
                  {title.trim() || "Berita baru"}
                </h1>
                <p className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                  {meta?.id && (
                    <>
                      <span className="tabular-nums">ID: {meta.id}</span>
                      <span aria-hidden>·</span>
                    </>
                  )}
                  <span className="tabular-nums">
                    {meta?.views ?? 0} views
                  </span>
                  <span aria-hidden>·</span>
                  <span>{content.trim().length} karakter</span>
                  {dirty && (
                    <Badge variant="outline" className="ml-1">
                      Unsaved changes
                    </Badge>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid items-start gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="size-4 text-muted-foreground" />
                  Basic info
                </CardTitle>
                <CardDescription>
                  Judul, deskripsi singkat, dan thumbnail berita.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="cth. Panduan Nutrisi untuk Pemula"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <Label htmlFor="description">Description</Label>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {description.length} karakter
                    </span>
                  </div>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Ringkasan satu kalimat yang tampil di daftar..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://..."
                    inputMode="url"
                  />
                  {thumbnail.trim() && (
                    <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnail.trim()}
                        alt="Preview thumbnail"
                        className="h-14 w-20 shrink-0 rounded-lg object-cover ring-1 ring-foreground/10"
                      />
                      <p className="truncate text-xs text-muted-foreground">
                        {thumbnail.trim()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="size-4 text-muted-foreground" />
                  Content
                </CardTitle>
                <CardDescription>
                  Isi berita dengan textarea sederhana, satu paragraf per
                  baris kosong.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Badge variant="secondary" className="tabular-nums">
                    {content.trim().length} karakter
                  </Badge>
                </div>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder={"Paragraf pembuka...\n\nParagraf kedua..."}
                  required
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 lg:sticky lg:top-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <EyeIcon className="size-4 text-muted-foreground" />
                  Status
                </CardTitle>
                <CardDescription>Pilih status publikasi.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  {statusOptions.map((opt) => {
                    const active = status === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setStatus(opt.value)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                          active
                            ? opt.activeClass
                            : "border-border hover:bg-muted/60",
                        )}
                      >
                        <span
                          className={cn(
                            "size-2.5 shrink-0 rounded-full",
                            opt.dotClass,
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold capitalize">
                            {opt.value}
                          </span>
                          <span className="block truncate text-xs opacity-70">
                            {opt.hint}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="space-y-2">
                  <Label>Status (select)</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as NewsStatus)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published" label="Published">
                        Published
                      </SelectItem>
                      <SelectItem value="draft" label="Draft">
                        Draft
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="size-4 text-muted-foreground" />
                  Summary
                </CardTitle>
                <CardDescription>Live preview sebelum disimpan.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="truncate font-semibold">{title.trim() || "-"}</p>
                <p className="line-clamp-2 text-xs text-muted-foreground">
                  {description.trim() || "-"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant={
                      status === "published" ? "default" : "secondary"
                    }
                  >
                    {status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="tabular-nums">
                    {meta?.views ?? 0} views
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-2.5">
                <Lightbulb className="size-4 shrink-0 text-muted-foreground" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tulis judul maksimal 80 karakter dan deskripsi satu kalimat
                  agar tampil rapi di daftar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving || !title.trim() || !content.trim()}
            className="ml-auto"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? savingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
