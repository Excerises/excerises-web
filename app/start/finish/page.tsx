"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, Download } from "lucide-react";
import { useStartContext } from "@/context/start-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APP_NAME } from "@/constant/app";
import StoreButtons from "@/components/home/store-buttons";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function FinishPage() {
  const router = useRouter();
  const { exercises } = useStartContext();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (exercises.length === 0) {
      router.replace("/start/recommend-exercises");
    }
  }, [exercises, router]);

  if (exercises.length === 0) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Your Recommended Exercises
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {exercises.length} exercises tailored to your fitness level and
          preferences.
        </p>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Dumbbell className="size-4 text-primary" />
                {exercise.name}
              </CardTitle>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <Badge variant="secondary">
                  {capitalize(exercise.body_part)}
                </Badge>
                <Badge variant="outline">
                  {capitalize(exercise.equipment)}
                </Badge>
                <Badge variant="outline">{capitalize(exercise.target)}</Badge>
                <Badge variant="ghost">{capitalize(exercise.difficulty)}</Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 -mx-4 border-t bg-background/90 py-4 backdrop-blur-md sm:-mx-6">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Button
            className="w-full"
            size="lg"
            onClick={() => setShowDialog(true)}
          >
            <Dumbbell className="size-4" />
            Start Session
          </Button>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Download className="size-6 text-primary" />
            </div>
            <DialogTitle className="text-center">Download the App</DialogTitle>
            <DialogDescription className="text-center">
              To start your training session, download {APP_NAME} on your mobile
              device.
            </DialogDescription>
          </DialogHeader>
          <StoreButtons />
        </DialogContent>
      </Dialog>
    </div>
  );
}
