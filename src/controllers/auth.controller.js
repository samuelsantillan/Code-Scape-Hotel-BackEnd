import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken, AccessTokenForgotPassword } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password, role, state } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["The email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
      state,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      state: userSaved.state,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json(["The email does not exist"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json(["The password is incorrect"]);
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {});
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      state: userFound.state,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);
  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);
    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      state: userFound.state,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email, role, state } = req.body;
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        username,
        email,
        role,
        state,
      },
      { new: true }
    );
    return res.json(userUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("Room not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUserAdmin = async (req, res) => {
  const { username, email, password, role, state } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      role,
      state,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      state: userSaved.state,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const passwordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const email1 = req.body.email;
    const userFound = await User.findOne({ email });
    if (userFound) {
      let payload = {
        id: userFound._id,
        email: userFound.email,
      };
      let token = AccessTokenForgotPassword(payload);
      res.send(
        '<a href="/resetpassword/' +
          payload.id +
          "/" +
          token +
          '">Reset password</a>'
      );
    } else {
      res.status(400).json(["The email does not exist"]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const passwordResetView = async (req, res) => {
  try {
    const { id, token } = req.params;
    const userFound = await User.findById(id);
    if (userFound) {
      jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);
        return res.json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
          state: userFound.state,
        });
      });
    } else {
      res.status(400).json(["The email does not exist"]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}