import { Request, Response, NextFunction } from 'express';
import { EstablishmentSchema } from './zod';

export const validateCreateEstablishment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success, error } = EstablishmentSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);
  next();
};
