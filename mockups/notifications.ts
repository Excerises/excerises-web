import { Notification } from "@/types/model";
import { mockUsers } from "./users";

function formatDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function offset({ days = 0, hours = 0, minutes = 0 }: { days?: number; hours?: number; minutes?: number }): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  d.setMinutes(d.getMinutes() - minutes);
  return formatDate(d);
}

const user = (index: number) => mockUsers[index % mockUsers.length];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    user_id: "2",
    title: "Pengguna baru mendaftar",
    description: "Budi Santoso baru saja membuat akun dan melengkapi profil kebugaran.",
    created_at: offset({ minutes: 25 }),
    updated_at: offset({ minutes: 25 }),
    user: user(1),
  },
  {
    id: 2,
    user_id: "3",
    title: "Sesi workout selesai",
    description: "Siti Aminah menyelesaikan sesi Full Body Beginner selama 45 menit.",
    readed_at: offset({ hours: 1 }),
    created_at: offset({ hours: 2 }),
    updated_at: offset({ hours: 2 }),
    user: user(2),
  },
  {
    id: 3,
    user_id: "4",
    title: "Target mingguan tercapai",
    description: "Andi Pratama mencapai target 4x workout minggu ini.",
    created_at: offset({ hours: 5 }),
    updated_at: offset({ hours: 5 }),
    user: user(3),
  },
  {
    id: 4,
    user_id: "5",
    title: "Pengguna baru mendaftar",
    description: "Dewi Lestari baru saja membuat akun.",
    readed_at: offset({ days: 1, hours: 2 }),
    created_at: offset({ days: 1, hours: 1 }),
    updated_at: offset({ days: 1, hours: 1 }),
    user: user(4),
  },
  {
    id: 5,
    user_id: "6",
    title: "Pengingat workout terlewat",
    description: "Rizky Ramadhan melewatkan jadwal workout kemarin sore.",
    created_at: offset({ days: 1, hours: 4 }),
    updated_at: offset({ days: 1, hours: 4 }),
    user: user(5),
  },
  {
    id: 6,
    user_id: "7",
    title: "Feedback sesi diterima",
    description: "Putri Ayu memberikan rating 5 untuk sesi Cardio Blast.",
    created_at: offset({ days: 1, hours: 8 }),
    updated_at: offset({ days: 1, hours: 8 }),
    user: user(6),
  },
  {
    id: 7,
    user_id: "8",
    title: "Login dari perangkat baru",
    description: "Fajar Nugroho login dari perangkat baru (Chrome, Windows).",
    readed_at: offset({ days: 3 }),
    created_at: offset({ days: 3 }),
    updated_at: offset({ days: 3 }),
    user: user(7),
  },
  {
    id: 8,
    user_id: "9",
    title: "BMI pengguna diperbarui",
    description: "Data BMI Intan Permata diperbarui setelah input berat badan terbaru.",
    created_at: offset({ days: 4 }),
    updated_at: offset({ days: 4 }),
    user: user(8),
  },
  {
    id: 9,
    user_id: "10",
    title: "Sesi workout dibatalkan",
    description: "Hendra Gunawan membatalkan sesi latihan kekuatan terjadwal.",
    readed_at: offset({ days: 5 }),
    created_at: offset({ days: 6 }),
    updated_at: offset({ days: 6 }),
    user: user(9),
  },
  {
    id: 10,
    user_id: "2",
    title: "Artikel berita baru diterbitkan",
    description: "Artikel 'Panduan Nutrisi untuk Pemula' telah diterbitkan.",
    created_at: offset({ days: 9 }),
    updated_at: offset({ days: 9 }),
    user: user(1),
  },
  {
    id: 11,
    user_id: "3",
    title: "Latihan baru ditambahkan",
    description: "10 latihan baru ditambahkan ke kategori Strength.",
    readed_at: offset({ days: 14 }),
    created_at: offset({ days: 15 }),
    updated_at: offset({ days: 15 }),
    user: user(2),
  },
  {
    id: 12,
    user_id: "1",
    title: "Backup data bulanan selesai",
    description: "Backup otomatis data pengguna bulan ini selesai tanpa error.",
    readed_at: offset({ days: 30 }),
    created_at: offset({ days: 32 }),
    updated_at: offset({ days: 32 }),
    user: user(0),
  },
];
