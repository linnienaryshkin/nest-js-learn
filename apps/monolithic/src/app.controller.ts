import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
import { MyLibraryService } from '@app/my-library';

/*
curl -X GET localhost:3000
curl -X GET localhost:3000/library
*/
@Controller()
export class AppController {
  constructor(
    private catsService: CatsService,
    private myLibraryService: MyLibraryService,
  ) {}

  @Get()
  getHello(): string {
    return this.catsService.meow();
  }

  @Get('library')
  triggerLibrary(): void {
    this.myLibraryService.sayHello();
  }
}
