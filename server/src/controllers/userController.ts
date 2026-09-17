import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { type UserDocument } from "../model/userModel.js";

const toPublicUser = (user: { toObject: () => UserDocument }) => {
  const { password, ...safeUser } = user.toObject();
  void password;
  return safeUser;
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
      return res.json({ msg: "Email is already in use.", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.json({ status: true, user: toPublicUser(user) });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        msg: "Incorrect Email or Password.",
        status: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        msg: "Incorrect Email or Password.",
        status: false,
      });
    }

    return res.json({ status: true, user: toPublicUser(user) });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

export const setAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const { image: avatarImage } = req.body as { image: string };

    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    return res.json({
      isSet: Boolean(userData),
      image: userData ? avatarImage : "",
    });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "isAvatarImageSet",
      "_id",
    ]);

    return res.json(users);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
