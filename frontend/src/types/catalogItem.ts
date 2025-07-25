export type CatalogItem = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  homeId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[]; // e.g., ["food", "tools", "books"]
};
