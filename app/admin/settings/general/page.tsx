"use client";

import { useRef, useState } from "react";
import AdminLayout from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockGeneralSettings } from "@/mockups/settings";
import { ImageIcon } from "lucide-react";

export default function GeneralSettingsPage() {
  const [appName, setAppName] = useState(mockGeneralSettings.appName);
  const [tagline, setTagline] = useState(mockGeneralSettings.tagline);
  const [description, setDescription] = useState(
    mockGeneralSettings.description,
  );
  const [email, setEmail] = useState(mockGeneralSettings.email);
  const [phone, setPhone] = useState(mockGeneralSettings.phone);
  const [address, setAddress] = useState(mockGeneralSettings.address);
  const [logoUrl, setLogoUrl] = useState(mockGeneralSettings.logoUrl);
  const [primaryColor, setPrimaryColor] = useState(
    mockGeneralSettings.primaryColor,
  );
  const [footerText, setFooterText] = useState(mockGeneralSettings.footerText);
  const [errors, setErrors] = useState<{ appName?: string; email?: string }>(
    {},
  );
  const [notice, setNotice] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl);
    setLogoUrl(URL.createObjectURL(file));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);

    const nextErrors: { appName?: string; email?: string } = {};
    if (!appName.trim()) nextErrors.appName = "Nama aplikasi wajib diisi.";
    if (
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      nextErrors.email = "Format email tidak valid.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setNotice("Pengaturan umum berhasil disimpan.");
  }

  return (
    <AdminLayout breadcrumbs={[["Settings"], ["General"]]}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Umum</CardTitle>
            <CardDescription>
              Profil perusahaan yang tampil di seluruh aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <Label htmlFor="settings-app-name">Nama Aplikasi</Label>
                <Input
                  id="settings-app-name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Nama aplikasi"
                />
                {errors.appName && <FieldError>{errors.appName}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="settings-tagline">Tagline</Label>
                <Input
                  id="settings-tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Slogan singkat aplikasi"
                />
              </Field>
            </div>
            <Field>
              <Label htmlFor="settings-description">Deskripsi</Label>
              <textarea
                id="settings-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi singkat tentang aplikasi"
                rows={3}
                className="min-h-20 w-full rounded-md border border-input bg-transparent px-2.5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
              />
              <FieldDescription>
                Tampil di halaman landing dan meta aplikasi.
              </FieldDescription>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <Label htmlFor="settings-email">Email Kontak</Label>
                <Input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="halo@perusahaan.id"
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="settings-phone">Nomor Telepon</Label>
                <Input
                  id="settings-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+62 ..."
                />
              </Field>
            </div>
            <Field>
              <Label htmlFor="settings-address">Alamat</Label>
              <Input
                id="settings-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Alamat kantor"
              />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>
              Logo, warna utama, dan teks footer aplikasi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Field>
              <Label>Logo / Icon</Label>
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoUrl}
                      alt="Logo aplikasi"
                      className="size-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="size-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    Ganti Logo
                  </Button>
                  <FieldDescription>
                    PNG, JPG, atau SVG. Maksimal 2 MB.
                  </FieldDescription>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <Label htmlFor="settings-primary-color">Warna Primer</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="settings-primary-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-9 w-12 cursor-pointer rounded-md border border-input bg-transparent p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#000000"
                    className="font-mono uppercase"
                  />
                </div>
                <FieldDescription>
                  Warna utama tombol dan aksen aplikasi.
                </FieldDescription>
              </Field>
              <Field>
                <Label htmlFor="settings-footer">Teks Footer</Label>
                <Input
                  id="settings-footer"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="© 2026 ..."
                />
              </Field>
            </div>
            {notice && (
              <p className="text-sm text-muted-foreground">{notice}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" size="sm">
              Simpan Pengaturan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </AdminLayout>
  );
}
