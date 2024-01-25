import { Module } from '@nestjs/common';
import { WebSocketsGateway } from './web-sockets.gateway';
import { WebSocketsController } from './web-sockets.controller';

@Module({
  controllers: [WebSocketsController],
  providers: [WebSocketsGateway],
})
export class WebSocketsModule {}
