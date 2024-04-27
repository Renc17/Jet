import { Request, Response, NextFunction } from 'express';
import { CategorySchema, EstablishmentSchema } from './zod';

export const validateCreateEstablishment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success, error } = EstablishmentSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);
  next();
};

export const validateCreateMenuCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success, error } = CategorySchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);
  next();
};
