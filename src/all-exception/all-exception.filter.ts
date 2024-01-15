import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodError } from 'zod';

/*
npx @nestjs/cli g filter http-exception
*/
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof ZodError) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.status(400).json({
        statusCode: 400,
        message: exception.message,
        errors: exception.errors,
      });
    }

    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.status(exception.getStatus()).json(exception.getResponse());
    }
  }
}
