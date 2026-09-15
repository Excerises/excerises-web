export interface GeneralSettings {
  appName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
  footerText: string;
}

export const mockGeneralSettings: GeneralSettings = {
  appName: "Excerises",
  tagline: "Latihan Lebih Cerdas Setiap Hari",
  description:
    "Platform fitness untuk mencatat latihan, memantau progres, dan mendapatkan panduan workout yang dipersonalisasi.",
  email: "halo@fitnessapp.id",
  phone: "+62 21 5080 1234",
  address: "Jl. Sudirman Kav. 52-53, Jakarta Selatan 12190",
  logoUrl: "/logo.png",
  primaryColor: "#16a34a",
  footerText: "© 2026 Excerises. Seluruh hak cipta dilindungi.",
};
