import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db';
import authRoutes from './routes/authRoutes';
import homeRoutes from './routes/homeRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth');
app.use('/api/homes', homeRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (_req, res) => {
  res.send('HomeShelf API is running.');
});

// Connect to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
