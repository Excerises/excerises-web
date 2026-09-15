import { News } from "@/types/model";
import { mockUsers } from "./users";

const user = (index: number) => mockUsers[index % mockUsers.length];

export const mockNews: News[] = [
  {
    id: "1",
    title: "Panduan Nutrisi untuk Pemula",
    description: "Dasar pola makan seimbang untuk mendukung program latihan.",
    content:
      "Nutrisi adalah fondasi dari setiap program kebugaran.\nMulailah dengan menghitung kebutuhan kalori harian.\nPrioritaskan protein 1.6-2.2g per kg berat badan.\nJangan lupakan serat dari sayur dan buah.",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    status: "published",
    viewed_count: 1240,
    creator: user(0),
    created_at: "2026-08-20 09:00:00",
    updated_at: "2026-08-20 09:00:00",
  },
  {
    id: "2",
    title: "5 Kesalahan Umum Saat Squat",
    description: "Hindari cedera lutut dengan memperbaiki form squat.",
    content:
      "Squat adalah gerakan fundamental namun sering salah.\nJaga dada tetap tegak dan lutut sejajar jari kaki.\nJangan biarkan tumit terangkat.\nGunakan beban ringan dulu untuk melatih pola gerak.",
    thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    status: "published",
    viewed_count: 986,
    creator: user(0),
    created_at: "2026-08-25 10:30:00",
    updated_at: "2026-08-26 08:15:00",
  },
  {
    id: "3",
    title: "Pentingnya Istirahat dan Recovery",
    description: "Otot tumbuh saat istirahat, bukan saat latihan.",
    content:
      "Latihan keras tanpa recovery berujung overtraining.\nTidur 7-9 jam per malam untuk pemulihan optimal.\nSisipkan 1-2 hari rest day per minggu.\nAktif recovery seperti jalan ringan membantu sirkulasi.",
    status: "published",
    viewed_count: 754,
    creator: user(7),
    created_at: "2026-09-01 14:00:00",
    updated_at: "2026-09-01 14:00:00",
  },
  {
    id: "4",
    title: "Program Full Body 3x Seminggu",
    description: "Draft program latihan full body untuk pekerja sibuk.",
    content:
      "Program ini dirancang untuk 3 sesi 45 menit.\nHari A: squat, bench press, row.\nHari B: deadlift, overhead press, pull up.\nAlternasikan A-B-A lalu B-A-B tiap minggu.",
    status: "draft",
    viewed_count: 0,
    creator: user(0),
    created_at: "2026-09-05 11:20:00",
    updated_at: "2026-09-05 11:20:00",
  },
  {
    id: "5",
    title: "Hidrasi: Kunci Performa yang Sering Dilupakan",
    description: "Dehidrasi 2% saja bisa menurunkan performa signifikan.",
    content:
      "Minum 500ml air 2 jam sebelum latihan.\nTambahkan 250ml tiap 20 menit selama latihan intens.\nElektrolit penting untuk sesi di atas 60 menit.\nUrin kuning pucat tanda hidrasi cukup.",
    thumbnail: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80",
    status: "published",
    viewed_count: 642,
    creator: user(7),
    created_at: "2026-09-08 08:45:00",
    updated_at: "2026-09-08 08:45:00",
  },
  {
    id: "6",
    title: "Latihan Kardio vs Angkat Beban untuk Fat Loss",
    description: "Mana yang lebih efektif untuk menurunkan lemak?",
    content:
      "Kombinasi keduanya paling efektif.\nAngkat beban menjaga massa otot saat defisit kalori.\nKardio menambah pengeluaran energi harian.\nFokus utama tetap defisit kalori yang konsisten.",
    status: "published",
    viewed_count: 531,
    creator: user(0),
    created_at: "2026-09-10 16:10:00",
    updated_at: "2026-09-10 16:10:00",
  },
  {
    id: "7",
    title: "Meal Prep Mingguan Hemat dan Sehat",
    description: "Draft panduan meal prep 5 hari kerja.",
    content:
      "Siapkan protein pokok: ayam, telur, tempe.\nKarbo: nasi merah, oat, ubi.\nSayur beku untuk efisiensi.\nSimpan dalam wadah kaca per porsi.",
    status: "draft",
    viewed_count: 0,
    creator: user(7),
    created_at: "2026-09-12 09:30:00",
    updated_at: "2026-09-12 09:30:00",
  },
  {
    id: "8",
    title: "Teknik Pernapasan Saat Angkat Beban",
    description: "Bracing dan valsalva untuk angkatan berat yang aman.",
    content:
      "Tarik napas dalam ke perut sebelum menurunkan beban.\nKencangkan core seperti menahan pukulan.\nHembuskan saat melewati titik tersulit.\nJangan menahan napas terlalu lama bagi pemula.",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    status: "published",
    viewed_count: 418,
    creator: user(0),
    created_at: "2026-09-13 07:50:00",
    updated_at: "2026-09-13 07:50:00",
  },
];
