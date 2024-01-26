import { Injectable } from '@nestjs/common';
import { z } from 'zod';

export const Cat = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
});
export type Cat = z.infer<typeof Cat>;

/*
npx @nestjs/cli g service cats
*/
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  meow(): string {
    return 'Meow!';
  }
}
