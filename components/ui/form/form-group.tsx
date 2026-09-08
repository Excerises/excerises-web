import { FieldLabel } from "../field";

export interface FormGroupProps {
  label?: string;
  labelFor?: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormGroup({
  label,
  labelFor,
  required,
  children,
}: FormGroupProps) {
  return (
    <div className="space-y-2">
      {label && (
        <FieldLabel
          className={[
            required ? "after:content-['*'] after:text-destructive" : "",
          ].join(" ")}
          htmlFor={labelFor}
        >
          {label}
        </FieldLabel>
      )}
      {children}
    </div>
  );
}
