import { validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

/*
  Takes an array of express-validator functions, and validates the structure
  of the incoming JSON request body.

  We use this to validate incoming data before we use it.
*/
const validate = (validations: Array<any>) => async (req: Request, res: Response, next: NextFunction) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

export default validate;
