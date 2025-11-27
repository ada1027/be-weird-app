import { cn } from "@/lib/utils"

type Difficulty = "easy" | "medium" | "hard"

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

const difficultyConfig: Record<Difficulty, { label: string; className: string }> = {
  easy: {
    label: "Easy",
    className: "bg-mint/20 text-[#2a8a7a] border-mint",
  },
  medium: {
    label: "Medium",
    className: "bg-accent/30 text-[#9a7a00] border-accent",
  },
  hard: {
    label: "Hard",
    className: "bg-coral/20 text-[#c44545] border-coral",
  },
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty]
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
