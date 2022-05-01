import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import RequestUser from "../types/requser";

const hasRole = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: 'Authorisation required.',
    });
  }

  // get the token without the "Bearer ".
  const [, token] = req.headers.authorization.split(' ');
  try {
    // verify the token.
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as RequestUser;

    // check it has the role required of this route.
    if (roles.includes(payload.role as string)) {
      // attach the decoded token to the request object.
      req.user = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      };

      // progress to the controller.
      return next();
    }
    // roles don't match; user is forbidden.
    return res.status(403).json({
      success: false,
      message: 'Forbidden.',
    });
  } catch (e) {
    // malformed token.
    return res.status(500).json({
      success: false,
      message: 'Invalid token.',
    });
  }
};

export default hasRole;
