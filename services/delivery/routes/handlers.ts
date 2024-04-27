import { Request, Response } from 'express';
import { MongooseAdapter } from '../mongoose';

export class RouteHandlers {
  async createEstablishment(req: Request, res: Response) {
    const establishment = MongooseAdapter.getInstance().models['Establishment'];
    if (!establishment)
      return res.status(500).json({
        message: 'Schema establishment not registered',
      });

    establishment
      .create(req.body)
      .then(result => res.status(200).json(result))
      .catch(err => {
        res.status(409).json({
          message: err.errorResponse.errmsg,
        });
      });
  }
}
