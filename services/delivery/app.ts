import express, { Express, Router } from 'express';
import { MongooseAdapter } from './mongoose';
import { AppRouter } from './routes';
import http, { Server } from 'http';
import { SocketIO } from './io';
import cors from 'cors';

export class App {
  express: Express;
  private readonly mongooseAdapter = MongooseAdapter.getInstance();
  router: Router;
  server: Server;

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    SocketIO.getInstance(this.server).startConnection();
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
      })
    );
    this.router = AppRouter.getInstance().router;
    this.registerRoutes();
  }

  async run() {
    this.mongooseAdapter.connect();
    this.mongooseAdapter.checkConnection().catch(error => {
      throw new Error(error);
    });
    await this.mongooseAdapter.registerSchemas();
    this.server.listen(process.env.PORT || 3000, () => {
      console.log(
        `[server]: Server is running at http://localhost:${process.env.PORT || 3000}`
      );
    });
  }

  private registerRoutes() {
    this.express.use('/api', this.router);
  }
}
