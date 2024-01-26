import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats/cats.service';
import { MyLibraryService } from '@app/my-library';
import { AsyncLocalStorage } from 'async_hooks';

/*
curl -X GET localhost:3000
curl -X GET localhost:3000/library
curl -X GET localhost:3000/user -H "x-user-id: $RANDOM"
*/
@Controller()
export class AppController {
  constructor(
    private catsService: CatsService,
    private myLibraryService: MyLibraryService,
    private readonly als: AsyncLocalStorage<{ userId: string }>,
  ) {}

  @Get()
  getHello(): string {
    return this.catsService.meow();
  }

  @Get('library')
  triggerLibrary(): void {
    this.myLibraryService.sayHello();
  }

  @Get('user')
  getCatForUser() {
    const store = this.als.getStore();
    return store;
  }
}
