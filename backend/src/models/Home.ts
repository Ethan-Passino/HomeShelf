import mongoose, { Schema, Document } from 'mongoose';

export interface IHome extends Document {
  name: string;
  owner: string; // user ID
  invitedUsers: string[]; // user IDs
}

const HomeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    invitedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model<IHome>('Home', HomeSchema);

export default Home;
