import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const ListItemDtoSchema = z.object({
  itemId: z.string().uuid(),
  householdId: z.string().uuid(),
  details: z.string().max(255),
});

export const ListItemUpdateSchema = z
  .object({
    details: z.string().max(255),
    completedAt: z.date().nullable(),
  })
  .partial();

export class ListItemDto extends createZodDto(ListItemDtoSchema) {}
export class ListItemUpdateDto extends createZodDto(ListItemUpdateSchema) {}
