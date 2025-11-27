import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface MobileShellProps {
  children: ReactNode
  className?: string
  hasBottomNav?: boolean
}

export function MobileShell({ children, className, hasBottomNav = false }: MobileShellProps) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div
        className={cn(
          "w-full max-w-[430px] min-h-screen",
          "px-6 pt-14",
          hasBottomNav ? "pb-24" : "pb-8",
          "flex flex-col",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
