import { Router } from 'express';
import { RouteHandlers } from './handlers';
import {
  validateCreateEstablishment,
  validateCreateMenuCategory,
  validateCreateMenu,
  validateCreateOrder,
} from './validators';

export class AppRouter {
  private static _instance: AppRouter;
  router: Router;
  private readonly routeHandlers: RouteHandlers;

  constructor() {
    this.router = Router();
    this.routeHandlers = new RouteHandlers();
    this.registerRoutes();
  }

  static getInstance() {
    if (AppRouter._instance) return AppRouter._instance;
    AppRouter._instance = new AppRouter();
    return AppRouter._instance;
  }

  registerRoutes() {
    this.router.post(
      '/establishment',
      validateCreateEstablishment,
      this.routeHandlers.createEstablishment
    );
    this.router.post(
      '/:establishmentId/category',
      validateCreateMenuCategory,
      this.routeHandlers.createMenuCategory
    );
    this.router.post(
      '/:establishmentId/menu',
      validateCreateMenu,
      this.routeHandlers.createMenu
    );
    this.router.get('/:establishmentId/menu', this.routeHandlers.getMenu);
    this.router.post(
      '/:establishmentId/order',
      validateCreateOrder,
      this.routeHandlers.createOrder
    );
    this.router.get(
      '/:establishmentId/order/:orderId',
      this.routeHandlers.getOrder
    );
  }
}
