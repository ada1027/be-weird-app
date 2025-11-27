import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from './firebase';

// Get current user ID
export const getCurrentUserId = () => {
  return auth.currentUser?.uid || null;
};

// Save completed quest
export const saveCompletedQuest = async (questId: string, date: string) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const docRef = doc(db, 'completedQuests', userId, 'dates', date);
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Add to existing array
      await updateDoc(docRef, {
        questIds: arrayUnion(questId),
        updatedAt: serverTimestamp()
      });
    } else {
      // Create new document
      await setDoc(docRef, {
        questIds: [questId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving quest:', error);
    throw error;
  }
};

// Remove completed quest (if user unchecks)
export const removeCompletedQuest = async (questId: string, date: string) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const docRef = doc(db, 'completedQuests', userId, 'dates', date);
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const currentQuests = docSnap.data().questIds || [];
      const updatedQuests = currentQuests.filter((id: string) => id !== questId);
      
      await updateDoc(docRef, {
        questIds: updatedQuests,
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error removing quest:', error);
    throw error;
  }
};

// Get completed quests for a date
export const getCompletedQuests = async (date: string): Promise<string[]> => {
  const userId = getCurrentUserId();
  if (!userId) return [];

  const docRef = doc(db, 'completedQuests', userId, 'dates', date);
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().questIds || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting quests:', error);
    return [];
  }
};

// Get all completed quests (for calendar view)
export const getAllCompletedQuests = async (): Promise<{ [date: string]: string[] }> => {
  const userId = getCurrentUserId();
  if (!userId) return {};

  // For hackathon, we'll fetch last 30 days
  const result: { [date: string]: string[] } = {};
  const promises = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toDateString();
    
    promises.push(
      getCompletedQuests(dateKey).then(quests => {
        if (quests.length > 0) {
          result[dateKey] = quests;
        }
      })
    );
  }

  await Promise.all(promises);
  return result;
};

// Upload photo for quest
export const uploadQuestPhoto = async (file: File, questId: string): Promise<string> => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const timestamp = Date.now();
  const storageRef = ref(storage, `users/${userId}/quests/${questId}_${timestamp}.jpg`);
  
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

// Save custom quest
export const saveCustomQuest = async (questText: string) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  const docRef = doc(db, 'customQuests', userId);
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        quests: arrayUnion(questText),
        updatedAt: serverTimestamp()
      });
    } else {
      await setDoc(docRef, {
        quests: [questText],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error saving custom quest:', error);
    throw error;
  }
};

// Get custom quests
export const getCustomQuests = async (): Promise<string[]> => {
  const userId = getCurrentUserId();
  if (!userId) return [];

  const docRef = doc(db, 'customQuests', userId);
  
  try {
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().quests || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting custom quests:', error);
    return [];
  }
};