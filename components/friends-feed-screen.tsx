"use client"

import { MobileShell } from "@/components/ui/mobile-shell"
import { Heart, MessageCircle } from "lucide-react"

interface FeedItem {
  id: string
  userName: string
  avatarEmoji: string
  questTitle: string
  photoUrl: string
  timestamp: string
  likes: number
  comments: number
}

const MOCK_FEED: FeedItem[] = [
  {
    id: "1",
    userName: "Alex",
    avatarEmoji: "🦊",
    questTitle: "Wore mismatched socks all day",
    photoUrl: "/colorful-mismatched-socks.jpg",
    timestamp: "2h ago",
    likes: 12,
    comments: 3,
  },
  {
    id: "2",
    userName: "Jordan",
    avatarEmoji: "🐸",
    questTitle: "Had a full conversation with my plant",
    photoUrl: "/person-talking-to-houseplant.jpg",
    timestamp: "5h ago",
    likes: 24,
    comments: 7,
  },
  {
    id: "3",
    userName: "Sam",
    avatarEmoji: "🌸",
    questTitle: "Skipped instead of walked to class",
    photoUrl: "/person-skipping-joyfully.jpg",
    timestamp: "8h ago",
    likes: 31,
    comments: 5,
  },
  {
    id: "4",
    userName: "Riley",
    avatarEmoji: "🎸",
    questTitle: "Danced for 30 seconds in public",
    photoUrl: "/person-dancing-happy.jpg",
    timestamp: "1d ago",
    likes: 45,
    comments: 12,
  },
]

export function FriendsFeedScreen() {
  return (
    <MobileShell hasBottomNav>
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg -mx-6 px-6 pt-2 pb-4 -mt-14 pt-14">
        <h1 className="text-2xl font-extrabold text-foreground">Friend Feed</h1>
        <p className="text-muted-foreground text-sm mt-1">See what your weird friends are up to</p>
      </div>

      {/* Feed list */}
      <div className="flex flex-col gap-5 mt-2">
        {MOCK_FEED.map((item) => (
          <article key={item.id} className="bg-card rounded-2xl shadow-sm overflow-hidden">
            {/* User header */}
            <div className="flex items-center gap-3 p-4 pb-2">
              <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-xl">
                {item.avatarEmoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{item.userName}</p>
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </div>

            {/* Quest title */}
            <p className="px-4 pb-3 text-sm text-foreground">{item.questTitle}</p>

            {/* Photo */}
            <div className="aspect-[4/3] w-full bg-muted">
              <img
                src={item.photoUrl || "/placeholder.svg"}
                alt={item.questTitle}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 p-4">
              <button className="flex items-center gap-1.5 text-muted-foreground active:scale-95 transition-transform">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{item.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-muted-foreground active:scale-95 transition-transform">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{item.comments}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </MobileShell>
  )
}
