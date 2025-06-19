export interface Home {
  id: string; // Firestore document ID
  name: string;
  ownerId: string; // UID of the user who created it
  memberIds: string[]; // UIDs of users invited to access this home
  createdAt: string; // ISO date string
}
