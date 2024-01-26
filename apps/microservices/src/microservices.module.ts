import { Module } from '@nestjs/common';
import { MicroservicesController } from './microservices.controller';

@Module({
  imports: [],
  controllers: [MicroservicesController],
})
export class AppModule {}
