import { Mongoose, Model } from 'mongoose';
import * as models from './models';

export class MongooseAdapter {
  private static instance: MongooseAdapter;
  private readonly mongoose: Mongoose;
  private connectionString: string;
  models: { [name: string]: Model<any> } = {};

  constructor() {
    this.mongoose = new Mongoose();
    this.connectionString = process.env.MONGO_CONNECTION_STRING ?? '';
    console.log('MongooseAdapter created');
  }

  static getInstance() {
    if (MongooseAdapter.instance) return MongooseAdapter.instance;
    MongooseAdapter.instance = new MongooseAdapter();
    return MongooseAdapter.instance;
  }

  connect() {
    console.log(this.connectionString);
    this.mongoose
      .connect(this.connectionString, {
        authSource: 'admin',
      })
      .catch(err => console.error('Error on conneting...', err));
  }

  registerSchemas() {
    Object.entries(models.schemas).forEach(([schemaName, schema]) => {
      this.mongoose.model(schemaName, schema);
    });
  }

  async checkConnection() {
    return new Promise<string>((resolve, reject) => {
      this.mongoose.connection.on('connected', () => {
        resolve('Mongoose connected');
      });
      this.mongoose.connection.on('error', err => {
        reject(`Mongoose connection error: ', ${err.message}`);
      });
      this.mongoose.connection.on('disconnected', error => {
        reject(`Mongoose disconnected: ${error}`);
      });
    });
  }
}
