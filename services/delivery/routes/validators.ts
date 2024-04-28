import { Request, Response, NextFunction } from 'express';
import {
  CategorySchema,
  EstablishmentSchema,
  MenuSchema,
  OrderSchema,
} from './zod';

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

export const validateCreateMenu = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success, error } = MenuSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);
  next();
};

export const validateCreateOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { success, error } = OrderSchema.safeParse(req.body);
  if (!success) return res.status(400).send(error);
  next();
};
