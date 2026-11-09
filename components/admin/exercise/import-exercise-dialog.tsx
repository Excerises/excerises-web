import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogRootProps } from "@base-ui/react";
import { ReactNode, useRef, useState } from "react";

export type ImportExerciseDialogProps = DialogRootProps & {
  trigger: ReactNode;
  onImport?: (file?: File) => void;
  loading?: boolean;
};

export function ImportExerciseDialog({
  trigger,
  onImport,
  loading,
  ...props
}: ImportExerciseDialogProps) {
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>({} as never);

  function handleFileChange() {
    const files = inputRef.current.files;
    if (!files || files.length == 0) {
      setFile(undefined);
      return;
    }

    const file = files.item(0);
    if (file) {
      setFile(file);
    }
  }

  function handleImport() {
    onImport?.(file);
  }

  return (
    <Dialog {...props}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Exercises</DialogTitle>
        </DialogHeader>

        <Field>
          <Input
            id="exercise-excel"
            type="file"
            accept=".csv,.xls,.xlsx"
            ref={inputRef}
            onChange={handleFileChange}
          />
          <FieldDescription>Select file to import exercises.</FieldDescription>
        </Field>

        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            }
          />
          <Button disabled={!file || loading} onClick={handleImport}>
            {loading ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
