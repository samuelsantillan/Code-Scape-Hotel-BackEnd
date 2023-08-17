import express from "express";
import morgan from "morgan";
import roomRoutes from "./routes/room.routes.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173","http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json()); // Para que express entienda los datos que vienen en formato json
app.use(cookieParser());
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
export default app;
