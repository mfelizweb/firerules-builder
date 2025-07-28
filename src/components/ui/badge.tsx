import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-zinc-900 text-white": variant === "default",
          "bg-zinc-100 text-zinc-800": variant === "secondary",
          "bg-red-500 text-white": variant === "destructive",
          "border border-zinc-200 text-zinc-900": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
