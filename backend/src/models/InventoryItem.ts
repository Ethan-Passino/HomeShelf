import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
  catalogItemId: string;
  quantity: number;
  expirationDate?: Date;
  location: string;
  homeId: string;
  description?: string;
}

const InventoryItemSchema: Schema = new Schema(
  {
    catalogItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CatalogItem',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    expirationDate: {
      type: Date,
    },
    location: {
      type: String,
      required: true,
    },
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const InventoryItem = mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);

export default InventoryItem;
