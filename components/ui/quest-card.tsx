"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { DifficultyBadge } from "./difficulty-badge"
import { Camera, Check } from "lucide-react"

type Difficulty = "easy" | "medium" | "hard"

interface Quest {
  id: string
  emoji: string
  title: string
  difficulty: Difficulty
  description: string
}

interface QuestCardProps {
  quest: Quest
  className?: string
}

export function QuestCard({ quest, className }: QuestCardProps) {
  const [completed, setCompleted] = useState(false)
  const [hasPhoto, setHasPhoto] = useState(false)

  return (
    <div
      className={cn(
        "bg-card rounded-3xl p-4 shadow-sm border border-border",
        "transition-all duration-300",
        completed && "bg-mint/10 border-mint/30",
        className,
      )}
    >
      <div className="flex gap-3">
        {/* Emoji icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-lavender/20 flex items-center justify-center text-2xl">
          {quest.emoji}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title row with badge */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3
              className={cn("font-bold text-foreground text-base", completed && "line-through text-muted-foreground")}
            >
              {quest.title}
            </h3>
            <DifficultyBadge difficulty={quest.difficulty} />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-3">{quest.description}</p>

          {/* Photo area */}
          <button
            onClick={() => setHasPhoto(!hasPhoto)}
            className={cn(
              "w-full h-20 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2",
              "transition-all duration-200 active:scale-[0.98]",
              hasPhoto
                ? "bg-sky/20 border-sky text-sky"
                : "border-border text-muted-foreground hover:border-muted-foreground hover:bg-muted/50",
            )}
          >
            {hasPhoto ? (
              <>
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Photo added</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Add photo</span>
              </>
            )}
          </button>

          {/* Complete button */}
          <button
            onClick={() => setCompleted(!completed)}
            className={cn(
              "mt-3 w-full py-2.5 rounded-xl font-semibold text-sm",
              "transition-all duration-200 active:scale-[0.97]",
              completed ? "bg-mint text-white" : "bg-primary text-primary-foreground shadow-md shadow-primary/20",
            )}
          >
            {completed ? (
              <span className="flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                Completed
              </span>
            ) : (
              "Complete"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
