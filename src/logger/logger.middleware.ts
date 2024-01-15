import { Request, Response, NextFunction } from 'express';

/*
npx @nestjs/cli g middleware logger
*/
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request by', req.ip);
//     next();
//   }
// }

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request by', req.ip);
  next();
}
