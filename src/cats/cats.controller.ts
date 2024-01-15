import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Cat, CatsService } from './cats.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validation/zod-validation.pipe';

export const CreateCatDto = Cat.required();
export type CreateCatDto = z.infer<typeof CreateCatDto>;

/*
npx @nestjs/cli g controller cats

curl -X GET localhost:3000/cats
curl -X GET localhost:3000/cats/1
curl -X POST localhost:3000/cats -d '{"name": "cat1", "age": 1, "breed": "breed1"}'
curl -X GET localhost:3000/cats/observable
curl -X GET localhost:3000/cats/throw
*/
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }

  @Get('observable')
  findAllObservable(): Observable<any[]> {
    return of([1, 2, 3], [4, 5, 6]);
  }

  @Get('throw')
  throw(): never {
    throw new Error('error');
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateCatDto))
  create(@Body() createCatDto: CreateCatDto): Cat {
    return this.catsService.create(createCatDto);
  }
}
