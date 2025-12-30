// hooks/useSocialInteractions.ts
import { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  getDocs,
  writeBatch,
  increment,
  updateDoc,
  getDoc
} from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'

export interface Like {
  id: string
  postId: string
  userId: string
  createdAt: any
}

export interface Comment {
  id: string
  postId: string
  userId: string
  username: string
  content: string
  createdAt: any
}

// Hook to manage likes for a post
export function useLikes(postId: string) {
  const [likes, setLikes] = useState<Like[]>([])
  const [likeCount, setLikeCount] = useState(0)
  const [userHasLiked, setUserHasLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const currentUser = auth.currentUser

  useEffect(() => {
    if (!postId) return

    const likesRef = collection(db, 'likes')
    const q = query(likesRef, where('postId', '==', postId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const likesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Like[]

      setLikes(likesData)
      setLikeCount(likesData.length)
      
      if (currentUser) {
        setUserHasLiked(likesData.some(like => like.userId === currentUser.uid))
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [postId, currentUser])

  const toggleLike = async () => {
    if (!currentUser) {
      alert('Please sign in to like posts')
      return
    }

    try {
      if (userHasLiked) {
        // Unlike: find and delete the like document
        const likeToDelete = likes.find(like => like.userId === currentUser.uid)
        if (likeToDelete) {
          await deleteDoc(doc(db, 'likes', likeToDelete.id))
        }
      } else {
        // Like: create new like document
        await addDoc(collection(db, 'likes'), {
          postId,
          userId: currentUser.uid,
          createdAt: serverTimestamp()
        })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return { likes, likeCount, userHasLiked, toggleLike, loading }
}

// Hook to manage comments for a post
export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!postId) return

    const commentsRef = collection(db, 'comments')
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('createdAt', 'asc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[]

      setComments(commentsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [postId])

  const addComment = async (content: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) {
      alert('Please sign in to comment')
      return
    }

    if (!content.trim()) return

    try {
      await addDoc(collection(db, 'comments'), {
        postId,
        userId: currentUser.uid,
        username: currentUser.displayName || 'Anonymous',
        content: content.trim(),
        createdAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const deleteComment = async (commentId: string) => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    try {
      const comment = comments.find(c => c.id === commentId)
      if (comment && comment.userId === currentUser.uid) {
        await deleteDoc(doc(db, 'comments', commentId))
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  return { comments, addComment, deleteComment, loading }
}

// Hook to get aggregated social stats for multiple posts
export function usePostsSocialStats(postIds: string[]) {
  const [stats, setStats] = useState<Record<string, { likes: number; comments: number; userHasLiked: boolean }>>({})
  const [loading, setLoading] = useState(true)

  const currentUser = auth.currentUser

  useEffect(() => {
    if (!postIds.length) {
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        const newStats: Record<string, { likes: number; comments: number; userHasLiked: boolean }> = {}

        // Fetch all likes for these posts
        const likesRef = collection(db, 'likes')
        const likesQuery = query(likesRef, where('postId', 'in', postIds))
        const likesSnapshot = await getDocs(likesQuery)
        
        const likesByPost: Record<string, Like[]> = {}
        likesSnapshot.docs.forEach(doc => {
          const like = { id: doc.id, ...doc.data() } as Like
          if (!likesByPost[like.postId]) likesByPost[like.postId] = []
          likesByPost[like.postId].push(like)
        })

        // Fetch all comments for these posts
        const commentsRef = collection(db, 'comments')
        const commentsQuery = query(commentsRef, where('postId', 'in', postIds))
        const commentsSnapshot = await getDocs(commentsQuery)
        
        const commentsByPost: Record<string, number> = {}
        commentsSnapshot.docs.forEach(doc => {
          const comment = doc.data()
          commentsByPost[comment.postId] = (commentsByPost[comment.postId] || 0) + 1
        })

        // Aggregate stats
        postIds.forEach(postId => {
          const postLikes = likesByPost[postId] || []
          newStats[postId] = {
            likes: postLikes.length,
            comments: commentsByPost[postId] || 0,
            userHasLiked: currentUser ? postLikes.some(like => like.userId === currentUser.uid) : false
          }
        })

        setStats(newStats)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching social stats:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [postIds.join(','), currentUser])

  return { stats, loading }
}