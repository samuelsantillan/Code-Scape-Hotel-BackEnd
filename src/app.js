import express from "express";
import morgan from "morgan";
import roomRoutes from "./routes/room.routes.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomUser from "./routes/room.user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.set('trust proxy', true);

app.use(
  cors({
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://localhost:3001',
      'http://localhost:3000',
      'https://app.hotelcodescape.tech'
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  // DESCOMENTAR ESTO EN LOCALHOST
  // res.setHeader('Access-Control-Allow-Origin', 'https://app.hotelcodescape.tech');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use("/api", roomUser);

export default app;
