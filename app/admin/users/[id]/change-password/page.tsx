"use client";

import AdminLayout from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/mockups/users";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = mockUsers.find((u) => String(u.id) === params.id);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <AdminLayout
        breadcrumbs={[["Master Data"], ["User"], ["Change Password"]]}
      >
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
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password confirmation does not match.");
      return;
    }

    setSaving(true);
    // TODO: replace with a real API call
    console.log("Change password for", user.id);
    setSaving(false);
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout
      breadcrumbs={[["Master Data"], ["User"], ["Change Password"]]}
    >
      <Card>
        <CardContent className="py-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <p className="text-sm text-muted-foreground">
              Change password for <strong>{user.name}</strong>
            </p>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}