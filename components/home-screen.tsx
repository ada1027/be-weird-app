"use client"

import { MobileShell } from "@/components/ui/mobile-shell"
import { WeirdButton } from "@/components/ui/weird-button"

export function HomeScreen() {
  return (
    <MobileShell hasBottomNav>
      {/* Logo */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-coral">Be</span> <span className="text-foreground">Weird</span>
          <span className="inline-block ml-1 text-accent animate-bounce">~</span>
        </h1>
      </header>

      {/* Main Card */}
      <main className="flex-1 flex flex-col">
        <div className="bg-card rounded-3xl shadow-xl shadow-foreground/5 p-6 flex flex-col items-center text-center">
          {/* Illustration Placeholder */}
          <div className="w-full aspect-square max-w-[240px] bg-gradient-to-br from-peach via-lavender to-sky rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.4),transparent_50%)]" />
            <div className="text-6xl select-none" aria-hidden="true">
              <span className="inline-block animate-pulse">🌀</span>
              <span className="inline-block -ml-2 animate-pulse [animation-delay:100ms]">✨</span>
              <span className="inline-block -ml-2 animate-pulse [animation-delay:200ms]">🎲</span>
            </div>
          </div>

          {/* Hero Copy */}
          <p className="text-sm text-muted-foreground font-medium mb-2">School, home, school, home…</p>
          <h2 className="text-2xl font-bold text-foreground mb-4 text-balance">
            Break the loop. <span className="text-primary">Be weird.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mb-8">
            Student life can feel like a never-ending repeat button. We forget tiny joys because they seem
            "inefficient." Get a small, healthy, delightful weird mission every day.
          </p>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-3">
            <WeirdButton variant="primary" size="lg" className="w-full">
              See today&apos;s quests
            </WeirdButton>
            <WeirdButton variant="ghost" size="default" className="w-full">
              Browse past weirdness
            </WeirdButton>
          </div>
        </div>
      </main>

      {/* Footer hint */}
      <footer className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">Swipe up for more chaos</p>
      </footer>
    </MobileShell>
  )
}
