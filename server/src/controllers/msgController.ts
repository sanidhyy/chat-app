import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import msgModel from "../model/msgModel.js";
import { requireEnv } from "../env.js";

type EncryptedMessage = {
  iv: string;
  content: string;
};

const encrypt = (msg: string): EncryptedMessage => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    requireEnv("MESSAGE_ALGORITHM"),
    requireEnv("MESSAGE_SECRET_KEY"),
    iv
  );

  const encrypted = Buffer.concat([cipher.update(msg), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash: EncryptedMessage): string => {
  const decipher = crypto.createDecipheriv(
    requireEnv("MESSAGE_ALGORITHM"),
    requireEnv("MESSAGE_SECRET_KEY"),
    Buffer.from(hash.iv, "hex")
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString();
};

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to, message } = req.body as {
      from: string;
      to: string;
      message: string;
    };
    const encryptedMsg = JSON.stringify(encrypt(message));
    const data = await msgModel.create({
      message: { text: encryptedMsg },
      users: [from, to],
      sender: from,
    });

    if (!data) {
      return res.json({ msg: "Failed to add message to the database." });
    }
    return res.json({ msg: "Message added successfully." });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.body as { from: string; to: string };
    const messages = await msgModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    const allMessages = messages.map((msg) => {
      const encryptedText = msg.message?.text;
      if (!encryptedText) {
        throw new Error("Stored message is missing ciphertext");
      }

      return {
        fromSelf: msg.sender.toString() === from,
        message: decrypt(JSON.parse(encryptedText) as EncryptedMessage),
      };
    });

    res.json(allMessages);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
