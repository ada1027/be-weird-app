import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface WeirdButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
  size?: "default" | "lg"
}

export const WeirdButton = forwardRef<HTMLButtonElement, WeirdButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative font-semibold rounded-2xl transition-all duration-200 active:scale-95",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          {
            "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5":
              variant === "primary",
            "bg-transparent text-foreground border-2 border-border hover:bg-muted hover:border-muted-foreground/20":
              variant === "ghost",
          },
          {
            "px-6 py-3 text-base": size === "default",
            "px-8 py-4 text-lg": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

WeirdButton.displayName = "WeirdButton"
