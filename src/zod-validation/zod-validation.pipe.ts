import { PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const body = JSON.parse(Object.keys(value)[0]);
    return this.schema.parse(body);
  }
}
