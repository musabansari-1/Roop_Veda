import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

export function Button({
  className,
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-forest text-white shadow-glow hover:-translate-y-0.5 hover:bg-forest/90",
        variant === "secondary" &&
          "border border-forest/10 bg-white text-forest hover:bg-mist",
        variant === "ghost" && "bg-transparent text-forest hover:bg-white/60",
        fullWidth && "w-full",
        className
      )}
      {...props}
    />
  );
}
