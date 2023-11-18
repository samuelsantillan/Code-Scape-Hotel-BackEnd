import express from "express";
import morgan from "morgan";
import roomRoutes from "./routes/room.routes.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomUser from "./routes/room.user.routes.js";
import cookieParser from "cookie-parser";
import jwt from "jwt-simple";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import newsletterRoutes from "./routes/newsletter.routes.js";
import contactRoutes from "./routes/contact.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("trust proxy", true);

app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:3000",
      "https://app.hotelcodescape.tech",
    ],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/src/upload")));

app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "upload", imageName);
  res.sendFile(imagePath);
});

app.use((req, res, next) => {
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", newsletterRoutes);
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use("/api", roomUser);
app.use("/api", contactRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/forgotpassword", function (req, res) {
  res.send(
    '<form action="/api/passwordReset" method="POST">' +
      '<input type="email" name="email" value="santillans226@gmail.com" placeholder="Enter your email address..." />' +
      '<input type="submit" value="Reset Password" />' +
      "</form>"
  );
});

export default app;
