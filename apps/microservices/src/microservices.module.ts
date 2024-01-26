import { Module } from '@nestjs/common';
import { MicroservicesController } from './microservices.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [MicroservicesController],
})
export class AppModule {}
