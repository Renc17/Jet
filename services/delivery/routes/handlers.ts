import { Request, Response } from 'express';
import { MongooseAdapter } from '../mongoose';
import { SocketIO } from '../io';
import * as z from 'zod';
import { CategorySchema } from './zod';
import { Schema } from 'mongoose';

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
    const { name, dishes } = req.body as z.infer<typeof CategorySchema>;

    if (dishes.length < 2) {
      return res.status(400).json({
        message: 'Category must have at least 2 dishes',
      });
    }

    const Dish = MongooseAdapter.getInstance().models['Dish'];
    if (!Dish)
      return res.status(500).json({
        message: 'Schema dish not registered',
      });

    const Category = MongooseAdapter.getInstance().models['Category'];
    if (!Category)
      return res.status(500).json({
        message: 'Schema category not registered',
      });

    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();
    if (existingCategory) {
      return res.status(400).json({
        message: `Category ${req.body.name} already exists`,
      });
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

    const newDishes = await Dish.insertMany(dishes).catch(err => {
      return Object.values(err.result.insertedIds);
    });

    if (!newDishes.length) {
      return res
        .status(400)
        .json({ message: 'Dishes already belong to another categogry' });
    }

    Category.create({
      name: req.body.name,
      dishes: newDishes.map(d => d._id),
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
      .populate({
        path: 'categories',
        populate: {
          path: 'dishes',
          model: 'Dish',
        },
        select: 'name dishes',
      })
      .exec();

    if (!menu.length) {
      return res.status(400).json({
        message: 'There is no operating menu for this period',
      });
    }

    res.status(200).json(menu);
  }

  async createOrder(req: Request, res: Response) {
    const { establishmentId } = req.params;
    enum SupprtedCurrency {
      'GBP' = 'GBP',
      'CAD' = 'CAD',
      'USD' = 'USD',
      'EUR' = 'EUR',
    }
    type BodyParams = {
      dishes: {
        dishId: string;
        quantity: number;
      }[];
      currency: SupprtedCurrency;
      firstName: string;
      lastName: string;
      address: {
        street: string;
        county: string;
        postalCode: string;
        floor: string;
      };
    };
    const { dishes, firstName, lastName, address, currency } =
      req.body as BodyParams;

    const socket = SocketIO.getInstance();
    if (!socket) {
      console.error('Web sockets are not available');
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

    const Order = MongooseAdapter.getInstance().models['Order'];
    if (!Order)
      return res.status(500).json({
        message: 'Schema order not registered',
      });

    const Dish = MongooseAdapter.getInstance().models['Dish'];
    if (!Dish)
      return res.status(500).json({
        message: 'Schema dish not registered',
      });

    const existingDishes = await Dish.find({
      _id: { $in: dishes.map(d => d.dishId) },
    })
      .lean()
      .exec();

    if (existingDishes.length !== dishes.length) {
      return res.status(404).json({
        message: `Invalid dish IDs`,
      });
    }

    type DishType = {
      _id: Schema.Types.ObjectId;
      name: string;
      price: number;
    };

    const price = dishes.reduce((acc, dish) => {
      const d = (existingDishes as unknown as DishType[]).find(
        d => dish.dishId === d._id.toString()
      )!;
      return (acc += d.price * dish.quantity);
    }, 0);

    Order.create({
      dishes,
      firstName,
      lastName,
      address,
      price,
      establishmentId,
    })
      .then(async result => {
        const order = await Order.findOne({ _id: result._id })
          .populate({
            path: 'dishes',
            populate: {
              path: 'dishId',
              model: 'Dish',
            },
          })
          .exec();

        if (socket) {
          socket.io.emit('order', order);
        }
        return res.status(200).json(result);
      })
      .catch(err => {
        res.status(409).json({
          message: err,
        });
      });
  }

  async getOrder(req: Request, res: Response) {
    const { establishmentId, orderId } = req.params;
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

    const Order = MongooseAdapter.getInstance().models['Order'];
    if (!Order)
      return res.status(500).json({
        message: 'Schema order not registered',
      });

    Order.find({ _id: orderId })
      .populate({
        path: 'dishes',
        populate: {
          path: 'dishId',
          model: 'Dish',
        },
      })
      .exec()
      .then(result => res.status(200).json(result))
      .catch(err => {
        res.status(409).json({
          message: err,
        });
      });
  }
}
