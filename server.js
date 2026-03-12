import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import fs from "fs";
import path from "path";


const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://blogifypage.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("server is running");
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "blogify",
    });

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
}

startServer();
