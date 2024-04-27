import express, { Express, Request, Response, Router } from 'express';
import { MongooseAdapter } from './mongoose';

export class App {
  express: Express;
  private readonly mongooseAdapter = MongooseAdapter.getInstance();

  constructor() {
    this.express = express();
    this.express.use(express.json());
    this.registerRoutes();
  }

  async run() {
    this.mongooseAdapter.connect();
    this.mongooseAdapter.checkConnection().catch(error => {
      throw new Error(error);
    });
    await this.mongooseAdapter.registerSchemas();
    this.express.listen(process.env.PORT || 3000, () => {
      console.log(
        `[server]: Server is running at http://localhost:${process.env.PORT || 3000}`
      );
    });
  }

  private registerRoutes() {
    this.express.use('/api', (req: Request, res: Response) => {
      console.log('this is middleware gate');
      res.send('Hello World');
    });
  }
}
