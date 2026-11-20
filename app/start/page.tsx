import { redirect } from "next/navigation";

export default function StartPage() {
  redirect("/start/calculate-fitness");
}
