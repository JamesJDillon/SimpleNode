import { User } from '@prisma/client';
import { Request, Response } from 'express';

import { body } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "../misc/db";

const prisma = client.instance;

const loginValidation = [
  body('email', 'Invalid email')
    .exists()
    .withMessage('Email required.')
    .isEmail()
    .withMessage('Email is invalid.'),
  body('password', 'Password required.').exists(),
];

const registerValidation = [
  body('email', 'Invalid email')
    .exists()
    .withMessage('Email required.')
    .isEmail()
    .withMessage('Email is invalid.'),
  body('password', 'Password required.').exists(),
];

class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User cannot be found.',
        });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET as string,
          {
            algorithm: 'HS256',
            expiresIn: '1000h',
          },
        );

        return res.status(200).json({
          success: true,
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password.',
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'Oops, something went wrong.',
      });
    }
  }

  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const user: User | null = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        success: false, message: 'Account with this email already exists.',
      });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser: User | null = await prisma.user.create({
      data: {
        email,
        password: encryptedPass,
      },
    });

    return res.status(200).json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  }
}

export { AuthController, loginValidation, registerValidation };
