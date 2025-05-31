import mongoose, { Schema, Document } from 'mongoose';

export interface ICatalogItem extends Document {
  name: string;
  imageUrl: string;
  createdBy: string; // User ID
  homeId?: string;   // Optional, for multi-home separation
}

const CatalogItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    homeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
    },
  },
  {
    timestamps: true,
  }
);

const CatalogItem = mongoose.model<ICatalogItem>('CatalogItem', CatalogItemSchema);

export default CatalogItem;
