import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

export function connectDB() {
  mongoose
    .connect(process.env.BOT_SERVER_DB_URL!)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(`DB connection failed: ${err}`));

  app.listen(process.env.BOT_SERVER_PORT, () => {
    console.log(`Server started on port ${process.env.BOT_SERVER_PORT}`);
  });
}
