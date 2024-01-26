import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats/cats.service';

/*
curl -X GET localhost:3000
*/
@Controller()
export class AppController {
  constructor(private catsService: CatsService) {}

  @Get()
  getHello(): string {
    return this.catsService.meow();
  }
}
