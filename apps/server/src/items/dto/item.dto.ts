import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const ItemDtoSchema = z.object({
  name: z.string().min(3).max(255),
  householdId: z.string().uuid(),
});

export class ItemDto extends createZodDto(ItemDtoSchema) {}

export class ItemUpdateDto extends createZodDto(ItemDtoSchema.partial()) {}
