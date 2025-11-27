"use client"

import { MobileShell } from "@/components/ui/mobile-shell"
import { Heart, MessageCircle, Users } from "lucide-react"

const feedItems = [
  {
    id: "1",
    user: { name: "Alex", avatar: "A", color: "from-pink to-orange" },
    quest: "Caw at a seagull",
    difficulty: "hard",
    photo: "/feed-caw-seagull.png",
    timestamp: "2h ago",
    likes: 12,
    comments: 3,
  },
  {
    id: "2",
    user: { name: "Sam", avatar: "S", color: "from-teal to-sky" },
    quest: "Wave at your reflection with a goofy face",
    difficulty: "easy",
    photo: "/feed-goofy-wave.png",
    timestamp: "5h ago",
    likes: 8,
    comments: 1,
  },
  {
    id: "3",
    user: { name: "Jordan", avatar: "J", color: "from-purple to-pink" },
    quest: "Send a letter to a random address",
    difficulty: "medium",
    photo: "/feed-random-letter.png",
    timestamp: "1d ago",
    likes: 24,
    comments: 7,
  },
]

export function FriendsFeedScreen() {
  return (
    <MobileShell className="relative">
      <div className="space-y-4 relative z-10">
        <div className="pt-4 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple to-pink flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-purple">Friends Feed</h1>
            <p className="text-sm text-purple/60 font-bold">See what your friends are up to</p>
          </div>
        </div>

        <div className="space-y-4 pb-4">
          {feedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="p-3 flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${item.user.color} flex items-center justify-center text-white font-extrabold shadow-lg`}
                >
                  {item.user.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-extrabold text-purple">{item.user.name}</p>
                  <p className="text-xs text-purple/50 font-bold">{item.timestamp}</p>
                </div>
              </div>

              <div className="aspect-[4/3] bg-purple/10">
                <img src={item.photo || "/placeholder.svg"} alt={item.quest} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 space-y-3">
                <p className="text-sm font-bold text-purple">{item.quest}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-purple/50 hover:text-pink transition-colors group">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-purple/50 hover:text-sky transition-colors group">
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">{item.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  )
}
