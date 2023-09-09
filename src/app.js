import express from "express";
import morgan from "morgan";
import roomRoutes from "./routes/room.routes.js";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roomUser from "./routes/room.user.routes.js";
import cookieParser from "cookie-parser";
import jwt from "jwt-simple";
import bodyParser from "body-parser";

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

app.use((req, res, next) => {
  // DESCOMENTAR ESTO EN LOCALHOST
  // res.setHeader('Access-Control-Allow-Origin', 'https://app.hotelcodescape.tech');
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use("/api", roomUser);

app.get("/forgotpassword", function (req, res) {
  res.send(
    '<form action="/api/passwordReset" method="POST">' +
      '<input type="email" name="email" value="santillans226@gmail.com" placeholder="Enter your email address..." />' +
      '<input type="submit" value="Reset Password" />' +
      "</form>"
  );
});


export default app;
