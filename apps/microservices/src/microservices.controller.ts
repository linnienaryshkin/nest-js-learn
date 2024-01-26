import { Controller, Get } from '@nestjs/common';

/*
curl http://localhost:3000
*/
@Controller()
export class MicroservicesController {
  @Get()
  getHello(): string {
    return 'Hello Microservices!';
  }
}
