import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { SseModule } from './sse/sse.module';
import { WebSocketsController } from './web-sockets/web-sockets.controller';
import { WebSocketsModule } from './web-sockets/web-sockets.module';

@Module({
  imports: [CatsModule, SseModule, WebSocketsModule],
  controllers: [AppController, WebSocketsController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);
  }
}
