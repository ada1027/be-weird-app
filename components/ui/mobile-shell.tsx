import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface MobileShellProps {
  children: ReactNode
  className?: string
  hasBottomNav?: boolean
  noScroll?: boolean
}

export function MobileShell({ children, className, hasBottomNav = false, noScroll = false }: MobileShellProps) {
  return (
    <div className={cn(
      "bg-background flex justify-center items-center fixed inset-0",
      noScroll ? "overflow-hidden" : "overflow-auto"
    )}>
      <div
        className={cn(
          "w-full max-w-[430px] h-full",
          "px-6 pt-10",
          hasBottomNav ? "pb-4" : "pb-8",
          "flex flex-col",
          noScroll && "overflow-hidden",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}