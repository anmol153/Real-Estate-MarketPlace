import express from 'express';
import connectDB from './db/connect.db.js';
import dotenv from 'dotenv';
import { UserRouter } from './routes/user.routes.js';
import { AuthRouter } from './routes/auth.routes.js';
import errorHandler from './middleware/errorHandler.js';
dotenv.config();
const app = express();
app.use(express.json());

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
  app.use("/api/v1/auth", AuthRouter);

  app.use(errorHandler);