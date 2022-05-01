import { User } from '@prisma/client';
import { Request, Response } from 'express';

import client from '../misc/db';
import RequestUser from '../types/requser';

const prisma = client.instance;

class UserController {
  static async getUserDetails(req: Request, res: Response) {
    const { id, email, role }: RequestUser = req.user;

    const user: User | null = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user?.id,
        email: user?.email,
        role: user?.role,
      },
    });
  }
}

export default UserController;
