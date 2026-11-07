"use client";

import AdminLayout from "@/components/admin/layout";
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
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateProfileAuth,
  useUpdateProfileAuthForm,
} from "@/hooks/api/profile/use-update-profile";
import { FormControl } from "@/components/ui/form/form-control";
import { useAuth } from "@/context/auth-context";
import { InputPassword } from "@/components/ui/input-password";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { getError } from "@/lib/error";

export default function AccountPage() {
  const { user } = useAuth();
  const { control, setError, handleSubmit, setValue } =
    useUpdateProfileAuthForm();

  const { mutation } = useUpdateProfileAuth();

  const onUpdateProfile = handleSubmit(async (v) => {
    if (v.password != v.password_confirmation) {
      setError("password_confirmation", {
        message: "password confirmation mismatch",
      });
      return;
    }

    try {
      await mutation.mutateAsync({
        email: v.email,
        name: v.name,
        password: v.password,
      });

      toast.add({
        type: "success",
        title: "Account updated",
        description: "Your account successfully updated",
      });
    } catch (err: unknown) {
      toast.add({
        type: "error",
        title: "Failed update account",
        description: getError(err),
      });
    }
  });

  function updateField() {
    if (!user) {
      return;
    }

    setValue("name", user.name);
    setValue("email", user.email);
  }

  useEffect(() => {
    updateField();
  }, [user]);
  useEffect(() => {
    updateField();
  }, []);

  return (
    <AdminLayout breadcrumbs={[["Account"]]}>
      <form onSubmit={onUpdateProfile}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Account</CardTitle>
            <CardDescription>Update your identity here.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormControl
              control={control}
              name="name"
              required
              label="Full Name"
              render={({ field }) => (
                <Input placeholder="Enter full name" {...field} />
              )}
            />
            <FormControl
              control={control}
              name="email"
              required
              label="Email"
              render={({ field }) => (
                <Input placeholder="Enter email" type="email" {...field} />
              )}
            />
            <Field>
              <Label>Role</Label>
              <div>
                <Badge
                  variant={user?.role === "admin" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {user?.role.toUpperCase()}
                </Badge>
              </div>
            </Field>
          </CardContent>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Leave password empty if you don{"'"}t want to change it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormControl
              control={control}
              name="password"
              label="New Password"
              render={({ field }) => <InputPassword {...field} />}
            />
            <FormControl
              control={control}
              name="password_confirmation"
              label="New Password Confirmation"
              render={({ field }) => <InputPassword {...field} />}
            />
          </CardContent>
          <CardFooter className="pt-4">
            <Button type="submit" size="sm">
              Save data
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AdminLayout>
  );
}
