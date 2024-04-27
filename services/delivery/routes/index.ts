import { Router } from 'express';
import { RouteHandlers } from './handlers';
import { validateCreateEstablishment } from './validators';

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
  }
}
