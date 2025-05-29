import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('HomeShelf API is running.');
});

// Connect to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
