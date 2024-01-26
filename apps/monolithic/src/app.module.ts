import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { logger } from './logger/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { SseModule } from './sse/sse.module';
import { WebSocketsController } from './web-sockets/web-sockets.controller';
import { WebSocketsModule } from './web-sockets/web-sockets.module';
import { MyLibraryModule } from '@app/my-library';
import { AsyncLocalStorage } from 'async_hooks';

@Module({
  imports: [
    CatsModule,
    SseModule,
    WebSocketsModule,
    DevtoolsModule.register({
      // Go to https://devtools.nestjs.com/
      http: process.env.NODE_ENV !== 'production',
    }),
    MyLibraryModule,
  ],
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  controllers: [AppController, WebSocketsController],
})
export class AppModule {
  constructor(
    // inject the AsyncLocalStorage in the module constructor,
    private readonly als: AsyncLocalStorage<{ userId: string }>,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(CatsController);

    // bind the middleware,
    consumer
      .apply((req, res, next) => {
        // populate the store with some default values
        // based on the request,
        const store = {
          userId: req.headers['x-user-id'],
        };
        // and pass the "next" function as callback
        // to the "als.run" method together with the store.
        this.als.run(store, () => next());
      })
      // and register it for all routes (in case of Fastify use '(.*)')
      .forRoutes('*');
  }
}
