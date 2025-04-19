import express from 'express';
import connectDB from './db/connect.db.js';
const app = express();
import dotenv from 'dotenv';
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
  })