import http, { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export class SocketIO {
  private static instance: SocketIO;
  io: SocketIOServer;

  constructor(server: Server) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: 'http://localhost:4000',
        methods: ['GET', 'POST'],
      },
    });
  }

  static getInstance(server?: Server) {
    if (SocketIO.instance) return SocketIO.instance;
    if (!server) {
      throw new Error('Server not provided for socket');
    }
    SocketIO.instance = new SocketIO(server);
    return SocketIO.instance;
  }

  startConnection() {
    this.io.on('connection', (socket: Socket) => {
      console.log('A client connected');

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });
  }
}
