export type InventoryItem = {
  id: string;
  homeId: string;
  catalogItemId: string;
  quantity: number;
  location?: string; // e.g., "Pantry", "Fridge", "Garage"
  expirationDate?: string; // ISO 8601 format: "2025-06-18"
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
