import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import jwt_simple from "jwt-simple";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: 86400, // 24 horas
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token); // token es la respuesta de la promesa
      }
    );
  });
}

export function AccessTokenForgotPassword(payload){
  let token = jwt_simple.encode(payload, TOKEN_SECRET); // token = JWT
  return token;
}