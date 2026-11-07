import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Input } from "./input";
import { useState } from "react";

export type InputPasswordProps = React.ComponentProps<"input"> & {};

export function InputPassword({
  placeholder = "*******",
  className,
  ...props
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        className={["pr-10", className].join(" ")}
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        className="absolute top-0 bottom-0 right-0 w-10 flex items-center justify-center outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
