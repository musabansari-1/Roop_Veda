import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-forest/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ember focus:ring-2 focus:ring-ember/20",
        className
      )}
      {...props}
    />
  );
}
