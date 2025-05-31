import express from 'express';
import connectDB from './db/connect.db.js';
import dotenv from 'dotenv';
import { UserRouter } from './routes/user.routes.js';
import { AuthRouter } from './routes/auth.routes.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { ListingRoutes } from './routes/listing.routes.js';
import path from 'path';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection error: ${error.message}`);
  });


const _dirname = path.resolve();

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter);
app.use('/api/v1/listings', ListingRoutes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(_dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, '/Frontend', 'dist', 'index.html'));
});