import { Mongoose } from 'mongoose';

export class MongooseAdapter {
  private static instance: MongooseAdapter;
  private readonly mongoose: Mongoose;
  private connectionString: string;

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

  async connect() {
    this.mongoose.connect(this.connectionString);
  }

  async checkConnection() {
    return new Promise<string>((resolve, reject) => {
      this.mongoose.connection.on('connected', () => {
        resolve('Mongoose connected');
      });
      this.mongoose.connection.on('error', err => {
        reject(`Mongoose connection error: ', ${err.message}`);
      });
      this.mongoose.connection.on('disconnected', () => {
        reject('Mongoose disconnected');
      });
    });
  }
}
