"use client"

import { useState, useEffect } from "react"
import { MobileShell } from "@/components/ui/mobile-shell"
import { Heart, MessageCircle, Users, Send } from "lucide-react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useLikes, useComments } from "@/hooks/useSocialInteractions"

interface Post {
  id: string
  userId: string
  username: string
  questTitle: string
  questDifficulty: "easy" | "medium" | "hard"
  photoUrl: string
  createdAt: any
}

function PostCard({ post }: { post: Post }) {
  const { likeCount, userHasLiked, toggleLike } = useLikes(post.id)
  const { comments, addComment } = useComments(post.id)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const difficultyColors = {
    easy: "from-green-400 to-emerald-500",
    medium: "from-yellow-400 to-orange-500",
    hard: "from-red-400 to-pink-500",
  }

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      await addComment(commentText)
      setCommentText("")
    }
  }

  const getTimeAgo = (timestamp: any) => {
    if (!timestamp) return "just now"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1">
      {/* User Header */}
      <div className="p-3 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-lg">
          {post.username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <p className="font-extrabold text-purple-600">{post.username}</p>
          <p className="text-xs text-purple-400 font-bold">{getTimeAgo(post.createdAt)}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full bg-gradient-to-r ${difficultyColors[post.questDifficulty]} text-white text-xs font-bold`}
        >
          {post.questDifficulty}
        </div>
      </div>

      {/* Photo */}
      {post.photoUrl && (
        <div className="aspect-[4/3] bg-purple-100">
          <img src={post.photoUrl} alt={post.questTitle} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Quest Title */}
      <div className="p-4 space-y-3">
        <p className="text-sm font-bold text-purple-600">{post.questTitle}</p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 transition-colors group ${
              userHasLiked ? "text-pink-500" : "text-purple-400 hover:text-pink-500"
            }`}
          >
            <Heart
              className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                userHasLiked ? "fill-current" : ""
              }`}
            />
            <span className="text-sm font-bold">{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-purple-400 hover:text-sky-500 transition-colors group"
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">{comments.length}</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-3 border-t border-purple-200 pt-3">
            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 rounded-full border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-purple-50 rounded-xl p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-purple-600 text-xs">{comment.username}</p>
                      <p className="text-sm text-purple-800 mt-1">{comment.content}</p>
                    </div>
                    <span className="text-xs text-purple-400">{getTimeAgo(comment.createdAt)}</span>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-center text-purple-400 text-sm py-4">No comments yet. Be the first!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function FriendsFeedScreen() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[]

      setPosts(postsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <MobileShell className="relative">
      <div className="space-y-4 relative z-10">
        {/* Header */}
        <div className="pt-4 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-purple-600">Friends Feed</h1>
            <p className="text-sm text-purple-400 font-bold">See what your friends are up to</p>
          </div>
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-purple-400 font-bold">No posts yet. Complete a quest to get started!</p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  )
}