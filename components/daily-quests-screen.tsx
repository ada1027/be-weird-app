"use client"

import { MobileShell } from "./ui/mobile-shell"
import { QuestCard } from "./ui/quest-card"
import { RainbowWave } from "./ui/rainbow-wave"
import { Sparkles } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard"

interface Quest {
  id: string
  emoji: string
  title: string
  difficulty: Difficulty
  description: string
}

const QUESTS: Quest[] = [
  {
    id: "1",
    emoji: "🌿",
    title: "Touch some grass",
    difficulty: "easy",
    description: "Go outside and literally touch grass for 30 seconds.",
  },
  {
    id: "2",
    emoji: "🎵",
    title: "Hum to a stranger",
    difficulty: "medium",
    description: "Hum your favorite tune near someone you don't know.",
  },
  {
    id: "3",
    emoji: "📝",
    title: "Write a tiny poem",
    difficulty: "medium",
    description: "Write a 3-line poem about the last thing you ate.",
  },
  {
    id: "4",
    emoji: "🌀",
    title: "Spin until dizzy",
    difficulty: "easy",
    description: "Find a safe space and spin around 5 times. Embrace the chaos.",
  },
  {
    id: "5",
    emoji: "💌",
    title: "Compliment a stranger",
    difficulty: "hard",
    description: "Give a genuine compliment to someone you've never met.",
  },
]

export function DailyQuestsScreen() {
  return (
    <MobileShell hasBottomNav className="relative">
      <div className="absolute top-0 left-0 right-0 opacity-40">
        <RainbowWave />
      </div>

      <div className="sticky top-0 z-10 bg-gradient-to-b from-sky/90 to-transparent backdrop-blur-sm -mx-6 px-6 pt-6 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange to-pink flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-purple">Today&apos;s Quests</h1>
            <p className="text-purple/60 text-sm font-bold">Tiny doses of chaos</p>
          </div>
        </div>
      </div>

      {/* Quest list */}
      <div className="flex flex-col gap-4 mt-2 pb-4">
        {QUESTS.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </MobileShell>
  )
}
