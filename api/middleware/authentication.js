import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY || "DFASFSDFDS";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user.role = user.role;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export { authenticate };
