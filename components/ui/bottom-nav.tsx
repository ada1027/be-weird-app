"use client"

import { cn } from "@/lib/utils"
import { Calendar, Home, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/main/quests", label: "Quests", icon: Sparkles },
  { href: "/main/calendar", label: "Calendar", icon: Calendar },
  { href: "/main/feed", label: "Feed", icon: Users },
]

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-card/80 backdrop-blur-lg",
        "border-t border-border",
        "pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <div className="mx-auto max-w-[430px] px-2">
        <div className="flex items-center justify-around h-14">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5",
                  "w-16 h-full",
                  "transition-all duration-200 ease-out",
                  "active:scale-95",
                  isActive ? "text-coral" : "text-muted-foreground",
                )}
              >
                <Icon
                  className={cn("w-6 h-6 transition-transform duration-200", isActive && "scale-110")}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={cn("text-[10px] font-semibold tracking-tight", isActive && "font-bold")}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}