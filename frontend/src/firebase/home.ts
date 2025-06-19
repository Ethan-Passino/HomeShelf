import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import type { Home } from '../types/home';

const homesCollection = collection(db, 'homes');

export const createHome = async (home: Omit<Home, 'id'>): Promise<string> => {
  const docRef = await addDoc(homesCollection, home);
  return docRef.id;
};

export const getHomesByUser = async (userId: string): Promise<Home[]> => {
  const q = query(homesCollection, where('memberIds', 'array-contains', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Home));
};

export const getHomeById = async (homeId: string): Promise<Home | null> => {
  const docRef = doc(homesCollection, homeId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Home) : null;
};

export const updateHome = async (homeId: string, updates: Partial<Home>): Promise<void> => {
  const docRef = doc(homesCollection, homeId);
  await updateDoc(docRef, updates);
};

export const deleteHome = async (homeId: string): Promise<void> => {
  const docRef = doc(homesCollection, homeId);
  await deleteDoc(docRef);
};
