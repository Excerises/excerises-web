import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/constant/app";
import StoreButtons from "./store-buttons";

export default function StartTrainingToday() {
  return (
    <section id="download" className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-center text-white sm:px-12 lg:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_45%,transparent),transparent)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <Badge className="rounded-full bg-white/10 text-white hover:bg-white/15">
              Free Download
            </Badge>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start Training Smarter Today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Download {APP_NAME} on Google Play or the App Store, predict your
              fitness level in minutes, and get your first personalized training
              plan.
            </p>
            <div className="mt-8 flex justify-center">
              <StoreButtons dark />
            </div>
            <p className="mt-5 text-xs text-white/50">
              Available on Android and iOS • Free plan included • No credit card
              required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
