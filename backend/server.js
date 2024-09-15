import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import messageRoutes from "./routes/messageRoutes.js"
import path from 'path'

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use("/api/users", userRouters);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.get("/test", (req, res) => {
  return res.send("Test API is working");
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
