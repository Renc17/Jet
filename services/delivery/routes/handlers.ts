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

  async createMenu(req: Request, res: Response) {
    const { establishmentId } = req.params;

    const data = req.body as {
      tagline: string;
      operatingStartDate?: Date;
      operatingEndDate?: Date;
      categories: string[];
    };

    const operatingEndDate = data.operatingEndDate
      ? new Date(data.operatingEndDate)
      : undefined;
    const operatingStartDate = data.operatingStartDate
      ? new Date(data.operatingStartDate)
      : undefined;

    if (operatingStartDate && operatingEndDate) {
      const diff = operatingEndDate.getTime() - operatingStartDate.getTime();
      if (diff < 0) {
        return res.status(400).json({
          message: 'Invalid Time Period. Start date should be before end date',
        });
      }
    }

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

    const Menu = MongooseAdapter.getInstance().models['Menu'];
    if (!Menu)
      return res.status(500).json({
        message: 'Schema menu not registered',
      });

    const menus = await Menu.find({
      establishmentId,
      $or: [
        {
          operatingPeriod: { $ne: null },
          'operatingPeriod.startDate': { $lte: operatingEndDate },
          'operatingPeriod.endDate': { $gte: operatingStartDate },
        },
        {
          operatingPeriod: { $eq: null },
        },
      ],
    }).exec();

    if (menus.length) {
      return res.status(400).json({
        message: 'There is an operating menu for this period',
      });
    }

    Menu.create({
      tagline: data.tagline,
      operatingPeriod: {
        startDate: operatingStartDate,
        endDate: operatingEndDate,
      },
      categories: data.categories,
      establishmentId,
    })
      .then(async result => {
        await Establishment.findByIdAndUpdate(establishmentId, {
          operating: true,
        }).exec();
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(409).json({
          message: err,
        });
      });
  }

  async getMenu(req: Request, res: Response) {
    const { establishmentId } = req.params;
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

    const Menu = MongooseAdapter.getInstance().models['Menu'];
    if (!Menu)
      return res.status(500).json({
        message: 'Schema menu not registered',
      });

    const menu = await Menu.find({
      establishmentId,
      $or: [
        {
          operatingPeriod: { $ne: null },
          'operatingPeriod.startDate': {
            $lte: new Date(),
          },
          'operatingPeriod.endDate': {
            $gte: new Date(),
          },
        },
        {
          operatingPeriod: { $eq: null },
        },
      ],
    })
      .populate({ path: 'categories', select: 'name dishes' })
      .exec();

    if (!menu.length) {
      return res.status(400).json({
        message: 'There is no operating menu for this period',
      });
    }

    res.status(200).json(menu);
  }
}
