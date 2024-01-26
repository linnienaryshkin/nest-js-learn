import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [CatsModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return string', () => {
      expect(appController.getHello()).toEqual(expect.any(String));
    });
  });
});
