import { Request, Response } from 'express';
import { MongooseAdapter } from '../mongoose';

export class RouteHandlers {
  async createEstablishment(req: Request, res: Response) {
    const Establishment = MongooseAdapter.getInstance().models['Establishment'];
    if (!Establishment)
      return res.status(500).json({
        message: 'Schema establishment not registered',
      });

    Establishment.create(req.body)
      .then(result => res.status(200).json(result))
      .catch(err => {
        res.status(409).json({
          message: err.errorResponse.errmsg,
        });
      });
  }

  async createMenuCategory(req: Request, res: Response) {
    const { establishmentId } = req.params;

    const Category = MongooseAdapter.getInstance().models['Category'];
    if (!Category)
      return res.status(500).json({
        message: 'Schema category not registered',
      });

    const Establishment = MongooseAdapter.getInstance().models['Establishment'];
    if (!Establishment)
      return res.status(500).json({
        message: 'Schema establishment not registered',
      });

    const establishment = await Establishment.findOne({
      _id: establishmentId,
    }).exec();
    if (!establishment)
      return res.status(404).json({
        message: `Establishment ${establishmentId} not found`,
      });

    Category.create({
      ...req.body,
      establishmentId,
    })
      .then(result => res.status(200).json(result))
      .catch(err => {
        res.status(409).json({
          message: err,
        });
      });
  }
}
