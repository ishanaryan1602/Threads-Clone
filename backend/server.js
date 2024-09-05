import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRouters from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from 'cors'

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/users", userRouters);
app.use("/api/posts", postRoutes);
app.get("/test", (req,res)=>{
  return res.send("Test API is working")
});

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
