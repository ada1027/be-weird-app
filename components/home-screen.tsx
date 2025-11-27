"use client"

import { MobileShell } from "@/components/ui/mobile-shell"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export function HomeScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(40), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <MobileShell hasBottomNav className="relative">
      {/* Semi-transparent white container frame */}
      <div className="absolute inset-3 top-6 bottom-20 bg-white/50 backdrop-blur-md rounded-3xl shadow-lg flex flex-col overflow-hidden">
        <header className="text-center pt-6 pb-4">
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="rainbow-text">Be Weird</span>
          </h1>
          <p className="text-slate-400 text-base font-medium mt-2">Your daily dose of chaos</p>
        </header>

        {/* Character Section */}
        <div className="flex justify-center py-4">
          <div className="relative w-36 h-44 drop-shadow-md">
            <Image src="/ubc-bird.png" alt="UBC Thunderbird mascot" fill className="object-contain" priority />
          </div>
        </div>

        <div className="px-8 pb-4">
          <p className="text-center text-slate-600 font-semibold text-base mb-2">Today's Progress</p>
          <div className="w-full h-5 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full rainbow-gradient-animated rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-slate-400 text-sm mt-1.5">{progress}% complete</p>
        </div>

        <div className="px-6 pb-4">
          <div className="bg-white/60 rounded-2xl p-5 text-center">
            <h2 className="text-base font-bold text-slate-700 mb-3">Daily Vibes Forecast ✨🌈</h2>
            <p className="text-sm text-slate-500">Today's vibe: 73% unhinged 😵‍💫</p>
            <p className="text-sm text-slate-500 mt-1">Emotion: pesto-coded 🧃🌿</p>
          </div>
        </div>

        <div className="mt-auto px-6 pb-6 flex flex-col gap-3">
          <Link href="/quests" className="w-full">
            <button className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              See today's quests
            </button>
          </Link>
          <Link href="/calendar" className="w-full">
            <button className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300 text-white font-semibold text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              Browse past weirdness
            </button>
          </Link>
        </div>
      </div>
    </MobileShell>
  )
}
