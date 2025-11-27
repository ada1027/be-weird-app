import type React from "react"
import { BottomNav } from "@/components/ui/bottom-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="iphone-wrapper" className="flex flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNav />
    </div>
  )
}
