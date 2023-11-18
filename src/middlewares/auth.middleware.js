import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
export const auth = (req, res, next) => {


  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });

      req.user = user; 
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

