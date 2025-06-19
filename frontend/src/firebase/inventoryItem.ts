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
import { db } from '../firebase';
import type { InventoryItem } from '../types/inventoryItem';

/** Collection reference */
const inventoryRef = collection(db, 'inventoryItems');

/** Create a new inventory item */
export const createInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
  const docRef = await addDoc(inventoryRef, item);
  return docRef.id;
};

/** Get all inventory items for a specific home */
export const getInventoryItemsForHome = async (
  homeId: string
): Promise<InventoryItem[]> => {
  const q = query(inventoryRef, where('homeId', '==', homeId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<InventoryItem, 'id'>),
  }));
};

/** Get a single inventory item by ID */
export const getInventoryItem = async (
  id: string
): Promise<InventoryItem | null> => {
  const docRef = doc(db, 'inventoryItems', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...(snapshot.data() as Omit<InventoryItem, 'id'>) };
};

/** Update an existing inventory item */
export const updateInventoryItem = async (
  id: string,
  updates: Partial<InventoryItem>
) => {
  const docRef = doc(db, 'inventoryItems', id);
  await updateDoc(docRef, updates);
};

/** Delete an inventory item */
export const deleteInventoryItem = async (id: string) => {
  const docRef = doc(db, 'inventoryItems', id);
  await deleteDoc(docRef);
};
