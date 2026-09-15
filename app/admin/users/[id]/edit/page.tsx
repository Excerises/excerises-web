"use client";

import AdminLayout from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/mockups/users";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = mockUsers.find((u) => String(u.id) === params.id);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Edit"]]}>
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            User not found.
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: replace with a real API call
    console.log("Update user", { id: user.id, name, email });
    setSaving(false);
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Edit"]]}>
      <Card>
        <CardContent className="py-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}