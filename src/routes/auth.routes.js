import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
  createUserAdmin,
  passwordReset
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout",  logout);
router.get("/getUsers", getUsers);
router.put('/updateUser/:id', updateUser );
router.get('/getUser/:id', getUser);
router.delete('/deleteUser/:id', deleteUser);
router.post('/createUserAdmin', createUserAdmin);
router.post('/passwordReset', passwordReset);
export default router;