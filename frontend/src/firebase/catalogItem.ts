import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import type { CatalogItem } from '../types/catalogItem';

const catalogRef = collection(db, 'catalogItems');

// Add a new catalog item
export const addCatalogItem = async (item: Omit<CatalogItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date();
  const docRef = await addDoc(catalogRef, {
    ...item,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
};

// Get catalog items for a home
export const getCatalogItemsByHome = async (homeId: string): Promise<CatalogItem[]> => {
  const q = query(catalogRef, where('homeId', '==', homeId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CatalogItem, 'id'>),
  }));
};

// Update a catalog item
export const updateCatalogItem = async (
  id: string,
  updates: Partial<Omit<CatalogItem, 'id' | 'homeId' | 'createdBy'>>
) => {
  const docRef = doc(db, 'catalogItems', id);
  await updateDoc(docRef, { ...updates, updatedAt: new Date() });
};

// Delete a catalog item
export const deleteCatalogItem = async (id: string) => {
  const docRef = doc(db, 'catalogItems', id);
  await deleteDoc(docRef);
};
