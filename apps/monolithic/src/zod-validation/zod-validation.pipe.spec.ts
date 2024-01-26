import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  });

  it('should be defined', () => {
    expect(new ZodValidationPipe(schema)).toBeDefined();
  });
});
