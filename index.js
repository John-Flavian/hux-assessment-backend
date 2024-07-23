import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use("/api", routes);

await mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connection successful.");
  })
  .catch((error) => {
    console.log(`${error} \n Database connection failed.`);
  });

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
