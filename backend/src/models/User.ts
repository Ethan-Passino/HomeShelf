import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  homes: string[]; // references to Home documents
  invitedTo: string[]; // homes the user was invited to
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    homes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
      },
    ],
    invitedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Home',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
