import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import FormGroup from "./form-group";
import { FieldError } from "../field";

export type FormControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = ControllerProps<TFieldValues, TName, TTransformedValues> & {
  label?: string;
  required?: boolean;
};

export function FormControl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>({
  label,
  required,
  render,
  ...props
}: FormControlProps<TFieldValues, TName, TTransformedValues>) {
  return (
    <Controller
      {...props}
      render={(renderProps) => (
        <FormGroup label={label} required={required}>
          {render(renderProps)}
          {renderProps.fieldState.invalid && (
            <FieldError>
              {renderProps.fieldState.error?.message ||
                "Field value is invalid"}
            </FieldError>
          )}
        </FormGroup>
      )}
    />
  );
}
