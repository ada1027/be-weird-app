// lib/postUtils.ts
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '@/lib/firebase'

export interface CreatePostData {
  questId: string
  questTitle: string
  questDifficulty: 'easy' | 'medium' | 'hard'
  photo?: File
}

export async function uploadPostPhoto(file: File, userId: string): Promise<string> {
  const timestamp = Date.now()
  const filename = `posts/${userId}/${timestamp}_${file.name}`
  const storageRef = ref(storage, filename)

  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)
  
  return downloadURL
}

export async function createPost(data: CreatePostData): Promise<string> {
  const currentUser = auth.currentUser
  
  if (!currentUser) {
    throw new Error('User must be authenticated to create a post')
  }

  let photoUrl = ''
  
  if (data.photo) {
    photoUrl = await uploadPostPhoto(data.photo, currentUser.uid)
  }

  const postData = {
    userId: currentUser.uid,
    username: currentUser.displayName || 'Anonymous',
    questId: data.questId,
    questTitle: data.questTitle,
    questDifficulty: data.questDifficulty,
    photoUrl,
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(collection(db, 'posts'), postData)
  
  return docRef.id
}