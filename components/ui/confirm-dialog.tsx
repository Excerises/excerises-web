"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { Button, buttonVariants } from "@/components/ui/button";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  confirmVariant?: VariantProps<typeof buttonVariants>["variant"];
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "destructive",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          data-slot="confirm-dialog-overlay"
          className="fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs"
        />
        <DialogPrimitive.Popup
          data-slot="confirm-dialog-content"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2",
            "flex flex-col gap-1.5 rounded-lg bg-popover bg-clip-padding p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none",
            "transition duration-200 ease-in-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          )}
        >
          <DialogPrimitive.Title
            data-slot="confirm-dialog-title"
            className="font-heading font-medium text-foreground"
          >
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description
            data-slot="confirm-dialog-description"
            className="text-sm text-muted-foreground"
          >
            {description}
          </DialogPrimitive.Description>
          <div className="mt-3 flex justify-end gap-2">
            <DialogPrimitive.Close
              data-slot="confirm-dialog-cancel"
              render={<Button type="button" variant="outline" size="sm" />}
            >
              {cancelText}
            </DialogPrimitive.Close>
            <Button
              type="button"
              size="sm"
              variant={confirmVariant}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default ConfirmDialog;
