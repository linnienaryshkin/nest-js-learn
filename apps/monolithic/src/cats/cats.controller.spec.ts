import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "This action returns all cats" on findAll()', () => {
    expect(controller.findAll()).toStrictEqual([]);
  });

  it('should return "This action returns a #1 cat" on findOne()', () => {
    expect(controller.findOne(1)).toBe('This action returns a #1 cat');
  });

  it('should return {name: cat1, age: 1, breed: breed1} on create()', async () => {
    expect(
      await controller.create({ name: 'cat1', age: 1, breed: 'breed1' }),
    ).toStrictEqual({
      name: 'cat1',
      age: 1,
      breed: 'breed1',
    });
  });
});
