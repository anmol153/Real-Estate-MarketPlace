import express from 'express';
import connectDB from './db/connect.db.js';
const app = express();
import dotenv from 'dotenv';
import { UserRouter } from './routes/user.routes.js';
dotenv.config();


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

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.use("/api/v1/user", UserRouter);