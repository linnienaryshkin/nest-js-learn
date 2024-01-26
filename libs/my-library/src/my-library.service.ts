import { Injectable } from '@nestjs/common';

@Injectable()
export class MyLibraryService {
  sayHello(): void {
    console.log('Hello From Library!');
  }
}
