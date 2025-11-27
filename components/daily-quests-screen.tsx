"use client"

import { MobileShell } from "./ui/mobile-shell"
import { QuestCard } from "./ui/quest-card"
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
    emoji: "🇮🇹",
    title: "Draw a recreation of Italian brainrot",
    difficulty: "easy",
    description: "Channel your inner artist and recreate that iconic Italian brainrot meme.",
  },
  {
    id: "2",
    emoji: "🌀",
    title: "Spin in a circle for 5 seconds and take a selfie mid-spin",
    difficulty: "easy",
    description: "Embrace the chaos and capture the blur!",
  },
  {
    id: "3",
    emoji: "📸",
    title: "Photograph an object that represents your vibe today",
    difficulty: "medium",
    description: "Find something that speaks to your current energy and snap it.",
  },
  {
    id: "4",
    emoji: "📝",
    title: "Leave a tiny positive note in a library book",
    difficulty: "medium",
    description: "Spread joy to a future reader with a small surprise message.",
  },
  {
    id: "5",
    emoji: "🎨",
    title: "Draw something upside-down using only your non-dominant hand",
    difficulty: "hard",
    description: "Double the challenge, double the weirdness!",
  },
  {
    id: "6",
    emoji: "🧦",
    title: "Run an errand with socks on your hands",
    difficulty: "hard",
    description: "Go to a store or cafe. Yes, with sock mittens. Own it.",
  },
]

const DIFFICULTY_ORDER: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 }
const SORTED_QUESTS = [...QUESTS].sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty])

export function DailyQuestsScreen() {
  return (
    <MobileShell hasBottomNav className="relative">
      <div className="pt-6 pb-4">
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

      <div className="flex flex-col gap-4 mt-2 pb-4">
        {SORTED_QUESTS.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </MobileShell>
  )
}
