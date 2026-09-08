import AdminStatCard, {
  AdminStatCardProps,
} from "@/components/admin/dashboard/stat-card";
import AdminLayout from "@/components/admin/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DumbbellIcon, UsersIcon } from "lucide-react";

export default function AdminPage() {
  const stats: AdminStatCardProps[] = [
    {
      label: "Users",
      value: "675",
      icon: UsersIcon,
    },
    {
      label: "Excercises",
      value: "2500",
      icon: DumbbellIcon,
    },
  ];

  return (
    <AdminLayout breadcrumbs={[["Dashboard"]]}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <AdminStatCard key={i} {...stat} />
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          incidunt, vitae consectetur commodi ab quae! Aperiam fugit magni quia
          neque, adipisci distinctio consequatur itaque accusantium excepturi
          quis deleniti minus porro!
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
