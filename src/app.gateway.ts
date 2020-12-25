import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface ConnectedUser {
  socketId?: string;
  userId: number;
}

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer()
  public server: Server;

  public users: ConnectedUser[] = [];

  afterInit(server: Server) {
    this.logger.log(`server initialized`);
  }

  handleConnection(client: Socket) {
    const { userId } = client.handshake.query;
    const user: ConnectedUser = { socketId: client.id, userId: Number(userId) };
    this.users.push(user);
  }

  handleDisconnect(client: Socket) {
    this.users = this.users.filter((user) => user.socketId !== client.id);
    this.logger.log(`Client Disconnected ${client.id}`);
  }
}
